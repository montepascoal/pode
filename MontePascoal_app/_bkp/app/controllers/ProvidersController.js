/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// CONTROLLER USER /////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//  --------------------------------------------------------------------------------------------------------------------------------------- Modules -----

const utils = require("../utils/utils.js");

const {
  USERS,
  EMPLOYEES,
  COMPANIES,
  CONFIG_COUNTRIES,
  CONFIG_STATES,
  CONFIG_CITIES,
  CONFIG_EMPLOYEES_DEPARTMENTS,
  CONFIG_EMPLOYEES_OCCUPATIONS,
  PROVIDERS,
  CONFIG_PROVIDERS_SERVICES
} = require("../models");

const LogsController = require('./LogsController');
const UsersController = require('./UsersController');

//  ------------------------------------------------------------------------------------------------------------------------------------- Class API -----
class ProvidersController {
  constructor() {
    //   this.step1 = this.step1.bind(this);
    //   this.step2 = this.step2.bind(this);
  }

  providersPost = async ({body,params}, res) => {
    const objData = { idMain: undefined, id: undefined, data: {} };

    try {
      const perId = "D001";
      const logMsg = "API ==> Controller => providersPost -> Start";
      const { useId } = body;

      utils.devLog(0, logMsg, null);
      const objResAuth = await UsersController.usersPermission(useId,perId);
      if (!objResAuth.resData.permission) {
        utils.devLog(2, "API ==> Permission -> FALSE", null);
        return utils.resError(403, objResAuth.resMessage, { perId: objResAuth.resData.perId }, res );
      }
      utils.devLog(2, "API ==> Permission -> TRUE", null);

      // Function Controller Action
      // let { proId } = params;
      utils.devLog(2, null, body);
      if (!validateParameters(body)) {
        return utils.resError(400,`API ==> Controller => providersPost -> Invalid parameters`, null, res);
      }

      utils.devLog(2, "API ==> Controller => providersPost : objData", null);
      utils.devLog(2, null, objData);

      // Verifica se usuário possui permissão geral sobre as empresas
      // if (objResAuth.resData.useKeyCompany !== 0) {
      //   // Verifica se o registro que deseja alterar pertente a empresa que possui permissão
      //   if (objData.data.comId !== objResAuth.resData.useKeyCompany) {
      //     return utils.resError(403, "API ==> Controller => usersPermission -> Forbidden byId", null, res );
      //   }
      // }

      // Check unique key => proDocCpfCnpj
      const resProvidersGetId = await PROVIDERS.findAll({
        where: {
          proDocCpfCnpj: objData.data.proDocCpfCnpj
        }
      });
      utils.devLog(2, null, resProvidersGetId);
      if (resProvidersGetId.length > 0) {
        return utils.resError(409, "API ==> Controller => providersPost -> Unique-key conflict", null, res );
      }

      // Save DATA Providers
      utils.devLog(2, "API ==> Controller => providersPost -> Save Providers", null);
      const resProvidersPost = await PROVIDERS.create(objData.data);
      objData.id = resProvidersPost.dataValues.id;

      // Save DATA services
      utils.devLog(2, "API ==> Controller => providersPost -> Save Services", null);
      const resProvidersServicesPost  = await resProvidersPost.setPROVIDERS_SERVICES(objData.data.lstServices)

      LogsController.logsCreate(useId, perId, logMsg, `=> [${useId}] # Fornecedor: Cadastrado ## [${objData.id}] ${objData.data.proName}`, objData.id);
      return utils.resSuccess('API ==> Controller => providersPost -> Success',{proId: objData.id }, res);    

    } catch (error) {
      return utils.resError(500,`API ==> Controller => providersPost -> Error`, error, res);
    }

    function validateParameters(obj) {
      try {
        let isValid = true;

        // proStatus
        objData.data.proStatus = true;
        utils.devLog(2, 'proStatus -> '+isValid, null);

        // useId
        objData.data.useId = 1; // noAuth
        utils.devLog(2, 'useId -> '+isValid, null);

        // proInfPerson
        if (
          obj.proInfPerson === undefined ||
          obj.proInfPerson === "" ||
          obj.proInfPerson === null ||
          typeof(obj.proInfPerson) !== "string"
        ) {
          isValid = false;
        } else {
          utils.devLog(2, 'proInfPerson [tmp] -> '+isValid, null);
          if (obj.proInfPerson !== 'CPF' && obj.proInfPerson !== 'CNPJ') {
            isValid = false;
          } else {
            objData.data.proInfPerson = obj.proInfPerson;
          }
        }
        utils.devLog(2, 'proInfPerson -> '+isValid, null);

        // proName
        if (
          obj.proName === undefined ||
          obj.proName === "" ||
          obj.proName === null ||
          typeof(obj.proName) !== "string"
        ) {
          isValid = false;
        } else {
          objData.data.proName = obj.proName;
        }
        utils.devLog(2, 'proName -> '+isValid, null);

        // proNameCompany
        if (obj.proNameCompany === undefined ||
          obj.proNameCompany === null) {
          objData.data.proNameCompany = null;
        } else {
          if (
            obj.proNameCompany === "" ||
            typeof(obj.proNameCompany) !== "string"
          ) {
            isValid = false;
          } else {
            objData.data.proNameCompany = obj.proNameCompany;
          }
        }
        utils.devLog(2, 'proNameCompany -> '+isValid, null);

        // proDocCpfCnpj
        if (
          obj.proDocCpfCnpj === undefined ||
          obj.proDocCpfCnpj === "" ||
          obj.proDocCpfCnpj === null ||
          typeof(obj.proDocCpfCnpj) !== "string" ||
          (obj.proDocCpfCnpj.length !== 11 && obj.proDocCpfCnpj.length !== 14 )
        ) {
          isValid = false;
        } else {
          objData.data.proDocCpfCnpj = obj.proDocCpfCnpj;
        }
        utils.devLog(2, 'proDocCpfCnpj -> '+isValid, null);

        // proDocRegistrationStateIndicator - disabled
        // if (
        //   obj.proDocRegistrationStateIndicator === undefined ||
        //   obj.proDocRegistrationStateIndicator === "" ||
        //   obj.proDocRegistrationStateIndicator === null ||
        //   typeof(obj.proDocRegistrationStateIndicator) !== "string"
        // ) {
        //   isValid = false;
        // } else {
        //   utils.devLog(2, 'proDocRegistrationStateIndicator [tmp] -> '+isValid, null);
        //   if (obj.proDocRegistrationStateIndicator !== 'Não Contribuinte' && obj.proDocRegistrationStateIndicator !== 'Contribuinte' && obj.proDocRegistrationStateIndicator !== 'Contribuinte Isento') {
        //     isValid = false;
        //   } else {
        //     objData.data.proDocRegistrationStateIndicator = obj.proDocRegistrationStateIndicator;
        //   }
        // }
        utils.devLog(2, 'proDocRegistrationStateIndicator -> '+isValid, null);

        // proDocRegistrationState
        if (obj.proDocRegistrationState === undefined||
          obj.proDocRegistrationState === null) {
          objData.data.proDocRegistrationState = null;
        } else {
          if (
            obj.proDocRegistrationState === "" ||
            typeof(obj.proDocRegistrationState) !== "string"
          ) {
            isValid = false;
          } else {
            objData.data.proDocRegistrationState = obj.proDocRegistrationState;
          }
        }
        utils.devLog(2, 'proDocRegistrationState -> '+isValid, null);

        // proDocRegistrationMunicipal
        if (obj.proDocRegistrationMunicipal === undefined||
          obj.proDocRegistrationMunicipal === null) {
          objData.data.proDocRegistrationMunicipal = null;
        } else {
          if (
            obj.proDocRegistrationMunicipal === "" ||
            typeof(obj.proDocRegistrationMunicipal) !== "string"
          ) {
            isValid = false;
          } else {
            objData.data.proDocRegistrationMunicipal = obj.proDocRegistrationMunicipal;
          }
        }
        utils.devLog(2, 'proDocRegistrationMunicipal -> '+isValid, null);

        // proAddCep
        if (
          obj.proAddCep === undefined ||
          obj.proAddCep === "" ||
          obj.proAddCep === null ||
          typeof(obj.proAddCep) !== "string" ||
          obj.proAddCep.length !== 8
        ) {
          isValid = false;
        } else {
          objData.data.proAddCep = obj.proAddCep;
        }
        utils.devLog(2, 'proAddCep -> '+isValid, null);

        // proAddAddress
        if (
          obj.proAddAddress === undefined ||
          obj.proAddAddress === "" ||
          obj.proAddAddress === null ||
          typeof(obj.proAddAddress) !== "string"
        ) {
          isValid = false;
        } else {
          objData.data.proAddAddress = obj.proAddAddress;
        }
        utils.devLog(2, 'proAddAddress -> '+isValid, null);

        // proAddComplement
        if (obj.proAddComplement === undefined ||
          obj.proAddComplement === null) {
          objData.data.proAddComplement = null;
        } else {
          if (
            obj.proAddComplement === "" ||
            typeof(obj.proAddComplement) !== "string"
          ) {
            isValid = false;
          } else {
            objData.data.proAddComplement = obj.proAddComplement;
          }
        }
        utils.devLog(2, 'proAddComplement -> '+isValid, null);

        // proAddNumber
        if (obj.proAddNumber === undefined ||
          obj.proAddNumber === null) {
          objData.data.proAddNumber = null;
        } else {
          if (
            obj.proAddNumber === "" ||
            typeof(obj.proAddNumber) !== "string"
          ) {
            isValid = false;
          } else {
            objData.data.proAddNumber = obj.proAddNumber;
          }
        }
        utils.devLog(2, 'proAddNumber -> '+isValid, null);

        // proAddDistrict
        if (
          obj.proAddDistrict === undefined ||
          obj.proAddDistrict === "" ||
          obj.proAddDistrict === null ||
          typeof(obj.proAddDistrict) !== "string"
        ) {
          isValid = false;
        } else {
          objData.data.proAddDistrict = obj.proAddDistrict;
        }
        utils.devLog(2, 'proAddDistrict -> '+isValid, null);

        // proAddCouId
        obj.proAddCouId = Number(obj.proAddCouId);
        if (
          obj.proAddCouId === undefined ||
          obj.proAddCouId === "" ||
          obj.proAddCouId === null ||
          isNaN(obj.proAddCouId) ||
          typeof(obj.proAddCouId) !== "number"||
          !utils.validateNumberPositive(obj.proAddCouId)
        ) {
          isValid = false;
        } else {
          objData.data.proAddCouId = 1;// 1 = Brasil // Number(obj.proAddCouId);
        }
        utils.devLog(2, 'proAddCouId -> '+isValid, null);

        // proAddStaId
        obj.proAddStaId = Number(obj.proAddStaId);
        if (
          obj.proAddStaId === undefined ||
          obj.proAddStaId === "" ||
          obj.proAddStaId === null ||
          isNaN(obj.proAddStaId) ||
          typeof(obj.proAddStaId) !== "number" ||
          !utils.validateNumberPositive(obj.proAddStaId)
        ) {
          isValid = false;
        } else {
          objData.data.proAddStaId = Number(obj.proAddStaId);
        }
        utils.devLog(2, 'proAddStaId -> '+isValid, null);

        // proAddCitId
        obj.proAddCitId = Number(obj.proAddCitId);
        if (
          obj.proAddCitId === undefined ||
          obj.proAddCitId === "" ||
          obj.proAddCitId === null ||
          isNaN(obj.proAddCitId) ||
          typeof(obj.proAddCitId) !== "number"||
          !utils.validateNumberPositive(obj.proAddCitId)
        ) {
          isValid = false;
        } else {
          objData.data.proAddCitId = Number(obj.proAddCitId);
        }
        utils.devLog(2, 'proAddCitId -> '+isValid, null);

        // proConPhone1
        if (
          obj.proConPhone1 === undefined ||
          obj.proConPhone1 === "" ||
          obj.proConPhone1 === null ||
          typeof(obj.proConPhone1) !== "string"||
          (obj.proConPhone1.length !== 10 && obj.proConPhone1.length !== 11 )
        ) {
          isValid = false;
        } else {
          objData.data.proConPhone1 = obj.proConPhone1;
        }
        utils.devLog(2, 'proConPhone1 -> '+isValid, null);

        // proConPhone2
        if (obj.proConPhone2 === undefined ||
          obj.proConPhone2 === null) {
          objData.data.proConPhone2 = null;
        } else {
          if (
            obj.proConPhone2 === "" ||
            obj.proConPhone2 === null ||
            typeof(obj.proConPhone2) !== "string"||
            (obj.proConPhone2.length !== 10 && obj.proConPhone2.length !== 11 )
          ) {
            isValid = false;
          } else {
            objData.data.proConPhone2 = obj.proConPhone2;
          }
        }
        utils.devLog(2, 'proConPhone2 -> '+isValid, null);

        // proConEmail
        if (
          obj.proConEmail === undefined ||
          obj.proConEmail === "" ||
          obj.proConEmail === null ||
          typeof(obj.proConEmail) !== "string"
        ) {
          isValid = false;
        } else {
          objData.data.proConEmail = obj.proConEmail;
        }
        utils.devLog(2, 'proConEmail -> '+isValid, null);

        // proObservations
        if (obj.proObservations === undefined||
          obj.proObservations === null) {
          objData.data.proObservations = null;
        } else {
          if (
            obj.proObservations === "" ||
            typeof(obj.proObservations) !== "string"
          ) {
            isValid = false;
          } else {
            objData.data.proObservations = obj.proObservations;
          }
        }
        utils.devLog(2, 'proObservations -> '+isValid, null);

        // obj.lstServices
        utils.devLog(2, 'lstServices [tmp] 1 -> '+isValid, null);
        obj.lstServices.map( (item,i) => {
          utils.devLog(2, 'lstServices [tmp] 2 -> '+isValid, null);
          item = Number(item);
          if (
            item === undefined ||
            item === "" ||
            item === null ||
            isNaN(item) ||
            typeof(item) !== "number"||
            !utils.validateNumberPositive(item)
          ) {
            isValid = false;
          } else {
            item = Number(item);
          }
        })
        utils.devLog(2, 'lstServices [tmp] 3 -> '+isValid, null);
        if (obj.lstServices.length > 0) {
          utils.devLog(2, 'lstServices [tmp] 4 -> '+isValid, null);
          objData.data.lstServices = obj.lstServices;
        } else {
          isValid = false;
          // objData.data.obj.lstServices = [];
        }
        utils.devLog(2, 'lstServices -> '+isValid, null);

        // proCreated
        // objData.data.proCreated = new Date();

        // proUpdated
        // objData.data.proUpdated = new Date();

        // proDeleted
        // objData.data.proDeleted = null;

        utils.devLog(2, 'Finish -> '+isValid, null);

        return isValid;
      } catch (error) {
        return false;
      }
    }
  }

  providersGetAll = async ({body,params}, res) => {
    try {
      const perId = "D002";
      const logMsg = "API ==> Controller => providersGetAll -> Start";
      const { useId } = body;
      
      utils.devLog(0, logMsg, null);
      // utils.devLog(2, null, useId);
      const objResAuth = await UsersController.usersPermission(useId,perId);
      if (!objResAuth.resData.permission) {
        utils.devLog(2, "API ==> Permission -> FALSE", null);
        return utils.resError(403, objResAuth.resMessage, {perId: objResAuth.resData.perId}, res );
      }
      utils.devLog(2, "API ==> Permission -> TRUE", null);
      
      // Function Controller Action
      
      // Check companies permissions
      const filter = {};
      // if (objResAuth.resData.useKeyCompany !== 0) {
      //   filter.comId = objResAuth.resData.useKeyCompany;
      // }
      const resProvidersGetAll = await PROVIDERS.findAll({
        where: filter,
        order: [
          ['id', 'ASC'],
        ],
        include: [
          // 'COMPANIES',
          // 'USERS',
          // 'CONFIG_COUNTRIES',
          // 'CONFIG_STATES',
          // 'CONFIG_CITIES',
          // 'PROVIDERS_CONTACTS',
          // 'PROVIDERS_SERVICES',
          // 'PROVIDERS_FILES',
        ],
      });

      LogsController.logsCreate(useId, perId, logMsg, `=> [${useId}] # Fornecedor: Listagem geral ## [geral]`, null);
      return utils.resSuccess('API ==> Controller => providersGetAll -> Success', resProvidersGetAll, res );
    } catch (error) {
      return utils.resError(500,`API ==> Controller => providersGetAll -> Error`, error, res);
    }
  }

  providersGetId = async ({body,params}, res) => {
    const objData = { idMain: undefined, id: undefined, data: {} };

    try {
      const perId = "D003";
      const logMsg = "API ==> Controller => providersGetId -> Start";
      const { useId } = body;

      utils.devLog(0, logMsg, null);
      const objResAuth = await UsersController.usersPermission(useId,perId);
      if (!objResAuth.resData.permission) {
        utils.devLog(2, "API ==> Permission -> FALSE", null);
        return utils.resError(403, objResAuth.resMessage, { perId: objResAuth.resData.perId }, res );
      }
      utils.devLog(2, "API ==> Permission -> TRUE", null);

      // Function Controller Action
      let { proId } = params;
      if (!validateParameters(proId)) {
        return utils.resError(400,`API ==> Controller => providersGetId -> Invalid parameters`, null, res);
      }

      const resProvidersGetId = await PROVIDERS.findByPk(objData.id,{
        include: [
          // 'COMPANIES',
          // 'USERS',
          'CONFIG_COUNTRIES',
          'CONFIG_STATES',
          'CONFIG_CITIES',
          'PROVIDERS_CONTACTS',
          // 'PROVIDERS_SERVICES',
          {
            model: CONFIG_PROVIDERS_SERVICES,
            as: 'PROVIDERS_SERVICES',
            through: { attributes: [] },
          },
          'PROVIDERS_FILES',
        ],
      });

      if (resProvidersGetId) {
        // if (objResAuth.resData.useKeyCompany !== 0) {
        //   if (resProvidersGetId.comId !== objResAuth.resData.useKeyCompany) {
        //     return utils.resError(403, "API ==> Controller => usersPermission -> Forbidden byId", null, res );
        //   }
        // }
        LogsController.logsCreate(useId, perId, logMsg, `=> [${useId}] # Fornecedor: Consultado ## [${objData.id}] ${resProvidersGetId.proName}`, objData.id);
        return utils.resSuccess('API ==> Controller => providersGetId -> Success',resProvidersGetId, res);    
      } else {
        return utils.resError(404,`API ==> Controller => providersGetId -> Not found`, null, res);
      }
    } catch (error) {
      return utils.resError(500,`API ==> Controller => providersGetId -> Error`, error, res);
    }

    function validateParameters(proId) {
      try {
        let isValid = true;

        // proId
        proId = Number(proId);
        if (
          proId === undefined ||
          proId === "" ||
          proId === null ||
          isNaN(proId) ||
          typeof(proId) !== "number"||
          !utils.validateNumberPositive(proId)
        ) {
          isValid = false;
        } else {
          objData.id = proId;
        }

        return isValid;
      } catch (error) {
        return false;
      }
    }
  }

  providersPut = async ({body,params}, res) => {
    const objData = { idMain: undefined, id: undefined, data: {} };

    try {
      const perId = "D004";
      const logMsg = "API ==> Controller => providersPut -> Start";
      const { useId } = body;

      utils.devLog(0, logMsg, null);
      const objResAuth = await UsersController.usersPermission(useId,perId);
      if (!objResAuth.resData.permission) {
        utils.devLog(2, "API ==> Permission -> FALSE", null);
        return utils.resError(403, objResAuth.resMessage, { perId: objResAuth.resData.perId }, res );
      }
      utils.devLog(2, "API ==> Permission -> TRUE", null);

      // Function Controller Action
      let { proId } = params;
      utils.devLog(2, null, body);
      if (!validateParameters(proId, body)) {
        return utils.resError(400,`API ==> Controller => providersPut -> Invalid parameters`, null, res);
      }

      utils.devLog(2, "API ==> Controller => providersPut : objData", null);
      utils.devLog(2, null, objData);

      // Check Providers
      const resProvidersGetId = await PROVIDERS.findByPk(objData.id,{});
      if (resProvidersGetId) {
        // Verifica se usuário possui permissão geral sobre as empresas
        // if (objResAuth.resData.useKeyCompany !== 0) {
        //   // Verifica se o registro que deseja alterar pertente a empresa que possui permissão
        //   if (resProvidersGetId.comId !== objResAuth.resData.useKeyCompany) {
        //     return utils.resError(403, "API ==> Controller => usersPermission -> Forbidden byId", null, res );
        //   }
        // }
      } else {
        return utils.resError(404,`API ==> Controller => providersPut -> providersGetId -> Not found`, null, res);
      }

      // Check unique key => proDocCpfCnpj
      if (objData.data.proDocCpfCnpj !== resProvidersGetId.proDocCpfCnpj) {
        const resProvidersGetAllbyUnique = await PROVIDERS.findAll({
          where: {
            proDocCpfCnpj: objData.data.proDocCpfCnpj
          }
        });
        utils.devLog(2, null, resProvidersGetAllbyUnique);
        if (resProvidersGetAllbyUnique.length > 0) {
          return utils.resError(409, "API ==> Controller => providersPut -> Unique-key conflict", null, res );
        }
      }

      // Update Providers
      const resProvidersPut = await resProvidersGetId.update(objData.data);

      LogsController.logsCreate(useId, perId, logMsg, `=> [${useId}] # Fornecedor: Atualizado ## [${objData.id}] ${resProvidersGetId.proName}`, objData.id);
      return utils.resSuccess('API ==> Controller => providersPut -> Success',{proId: objData.id }, res);    

    } catch (error) {
      return utils.resError(500,`API ==> Controller => providersPut -> Error`, error, res);
    }

    function validateParameters(proId, obj) {
      try {
        let isValid = true;

        // proId
        proId = Number(proId);
        if (
          proId === undefined ||
          proId === "" ||
          proId === null ||
          isNaN(proId) ||
          typeof(proId) !== "number"
        ) {
          isValid = false;
        } else {
          objData.id = proId;
        }
        utils.devLog(2, 'proId -> '+isValid, null);

        // useId
        // objData.data.useId = 1; // noAuth
        // utils.devLog(2, 'useId -> '+isValid, null);
  
        // proInfPerson
        if (
          obj.proInfPerson === undefined ||
          obj.proInfPerson === "" ||
          obj.proInfPerson === null ||
          typeof(obj.proInfPerson) !== "string"
        ) {
          isValid = false;
        } else {
          utils.devLog(2, 'proInfPerson [tmp] -> '+isValid, null);
          if (obj.proInfPerson !== 'CPF' && obj.proInfPerson !== 'CNPJ') {
          isValid = false;
          } else {
          objData.data.proInfPerson = obj.proInfPerson;
          }
        }
        utils.devLog(2, 'proInfPerson -> '+isValid, null);

        // proName
        if (
          obj.proName === undefined ||
          obj.proName === "" ||
          obj.proName === null ||
          typeof(obj.proName) !== "string"
        ) {
          isValid = false;
        } else {
          objData.data.proName = obj.proName;
        }
        utils.devLog(2, 'proName -> '+isValid, null);

        // proNameCompany
        if (obj.proNameCompany === undefined ||
          obj.proNameCompany === null) {
          objData.data.proNameCompany = null;
        } else {
          if (
          obj.proNameCompany === "" ||
          typeof(obj.proNameCompany) !== "string"
          ) {
          isValid = false;
          } else {
          objData.data.proNameCompany = obj.proNameCompany;
          }
        }
        utils.devLog(2, 'proNameCompany -> '+isValid, null);

        // proDocCpfCnpj
        if (
          obj.proDocCpfCnpj === undefined ||
          obj.proDocCpfCnpj === "" ||
          obj.proDocCpfCnpj === null ||
          typeof(obj.proDocCpfCnpj) !== "string" ||
          (obj.proDocCpfCnpj.length !== 11 && obj.proDocCpfCnpj.length !== 14 )
        ) {
          isValid = false;
        } else {
          objData.data.proDocCpfCnpj = obj.proDocCpfCnpj;
        }
        utils.devLog(2, 'proDocCpfCnpj -> '+isValid, null);

        // proDocRegistrationStateIndicator - disabled
        // if (
        //   obj.proDocRegistrationStateIndicator === undefined ||
        //   obj.proDocRegistrationStateIndicator === "" ||
        //   obj.proDocRegistrationStateIndicator === null ||
        //   typeof(obj.proDocRegistrationStateIndicator) !== "string"
        // ) {
        //   isValid = false;
        // } else {
        //   utils.devLog(2, 'proDocRegistrationStateIndicator [tmp] -> '+isValid, null);
        //   if (obj.proDocRegistrationStateIndicator !== 'Não Contribuinte' && obj.proDocRegistrationStateIndicator !== 'Contribuinte' && obj.proDocRegistrationStateIndicator !== 'Contribuinte Isento') {
        //   isValid = false;
        //   } else {
        //   objData.data.proDocRegistrationStateIndicator = obj.proDocRegistrationStateIndicator;
        //   }
        // }
        utils.devLog(2, 'proDocRegistrationStateIndicator -> '+isValid, null);

        // proDocRegistrationState
        if (obj.proDocRegistrationState === undefined||
          obj.proDocRegistrationState === null) {
          objData.data.proDocRegistrationState = null;
        } else {
          if (
          obj.proDocRegistrationState === "" ||
          typeof(obj.proDocRegistrationState) !== "string"
          ) {
          isValid = false;
          } else {
          objData.data.proDocRegistrationState = obj.proDocRegistrationState;
          }
        }
        utils.devLog(2, 'proDocRegistrationState -> '+isValid, null);

        // proDocRegistrationMunicipal
        if (obj.proDocRegistrationMunicipal === undefined||
          obj.proDocRegistrationMunicipal === null) {
          objData.data.proDocRegistrationMunicipal = null;
        } else {
          if (
          obj.proDocRegistrationMunicipal === "" ||
          typeof(obj.proDocRegistrationMunicipal) !== "string"
          ) {
          isValid = false;
          } else {
          objData.data.proDocRegistrationMunicipal = obj.proDocRegistrationMunicipal;
          }
        }
        utils.devLog(2, 'proDocRegistrationMunicipal -> '+isValid, null);

        // proAddCep
        if (
          obj.proAddCep === undefined ||
          obj.proAddCep === "" ||
          obj.proAddCep === null ||
          typeof(obj.proAddCep) !== "string" ||
          obj.proAddCep.length !== 8
        ) {
          isValid = false;
        } else {
          objData.data.proAddCep = obj.proAddCep;
        }
        utils.devLog(2, 'proAddCep -> '+isValid, null);

        // proAddAddress
        if (
          obj.proAddAddress === undefined ||
          obj.proAddAddress === "" ||
          obj.proAddAddress === null ||
          typeof(obj.proAddAddress) !== "string"
        ) {
          isValid = false;
        } else {
          objData.data.proAddAddress = obj.proAddAddress;
        }
        utils.devLog(2, 'proAddAddress -> '+isValid, null);

        // proAddComplement
        if (obj.proAddComplement === undefined ||
          obj.proAddComplement === null) {
          objData.data.proAddComplement = null;
        } else {
          if (
            obj.proAddComplement === "" ||
            typeof(obj.proAddComplement) !== "string"
          ) {
            isValid = false;
          } else {
            objData.data.proAddComplement = obj.proAddComplement;
          }
        }
        utils.devLog(2, 'proAddComplement -> '+isValid, null);

        // proAddNumber
        if (obj.proAddNumber === undefined ||
          obj.proAddNumber === null) {
          objData.data.proAddNumber = null;
        } else {
          if (
            obj.proAddNumber === "" ||
            typeof(obj.proAddNumber) !== "string"
          ) {
            isValid = false;
          } else {
            objData.data.proAddNumber = obj.proAddNumber;
          }
        }
        utils.devLog(2, 'proAddNumber -> '+isValid, null);

        // proAddDistrict
        if (
          obj.proAddDistrict === undefined ||
          obj.proAddDistrict === "" ||
          obj.proAddDistrict === null ||
          typeof(obj.proAddDistrict) !== "string"
        ) {
          isValid = false;
        } else {
          objData.data.proAddDistrict = obj.proAddDistrict;
        }
        utils.devLog(2, 'proAddDistrict -> '+isValid, null);

        // proAddCouId
        obj.proAddCouId = Number(obj.proAddCouId);
        if (
          obj.proAddCouId === undefined ||
          obj.proAddCouId === "" ||
          obj.proAddCouId === null ||
          isNaN(obj.proAddCouId) ||
          typeof(obj.proAddCouId) !== "number"||
          !utils.validateNumberPositive(obj.proAddCouId)
        ) {
          isValid = false;
        } else {
          objData.data.proAddCouId = 1;// 1 = Brasil // Number(obj.proAddCouId);
        }
        utils.devLog(2, 'proAddCouId -> '+isValid, null);

        // proAddStaId
        obj.proAddStaId = Number(obj.proAddStaId);
        if (
          obj.proAddStaId === undefined ||
          obj.proAddStaId === "" ||
          obj.proAddStaId === null ||
          isNaN(obj.proAddStaId) ||
          typeof(obj.proAddStaId) !== "number" ||
          !utils.validateNumberPositive(obj.proAddStaId)
        ) {
          isValid = false;
        } else {
          objData.data.proAddStaId = Number(obj.proAddStaId);
        }
        utils.devLog(2, 'proAddStaId -> '+isValid, null);

        // proAddCitId
        obj.proAddCitId = Number(obj.proAddCitId);
        if (
          obj.proAddCitId === undefined ||
          obj.proAddCitId === "" ||
          obj.proAddCitId === null ||
          isNaN(obj.proAddCitId) ||
          typeof(obj.proAddCitId) !== "number"||
          !utils.validateNumberPositive(obj.proAddCitId)
        ) {
          isValid = false;
        } else {
          objData.data.proAddCitId = Number(obj.proAddCitId);
        }
        utils.devLog(2, 'proAddCitId -> '+isValid, null);

        // proConPhone1
        if (
          obj.proConPhone1 === undefined ||
          obj.proConPhone1 === "" ||
          obj.proConPhone1 === null ||
          typeof(obj.proConPhone1) !== "string"||
          (obj.proConPhone1.length !== 10 && obj.proConPhone1.length !== 11 )
        ) {
          isValid = false;
        } else {
          objData.data.proConPhone1 = obj.proConPhone1;
        }
        utils.devLog(2, 'proConPhone1 -> '+isValid, null);

        // proConPhone2
        if (obj.proConPhone2 === undefined ||
          obj.proConPhone2 === null) {
          objData.data.proConPhone2 = null;
        } else {
          if (
          obj.proConPhone2 === "" ||
          obj.proConPhone2 === null ||
          typeof(obj.proConPhone2) !== "string"||
          (obj.proConPhone2.length !== 10 && obj.proConPhone2.length !== 11 )
          ) {
          isValid = false;
          } else {
          objData.data.proConPhone2 = obj.proConPhone2;
          }
        }
        utils.devLog(2, 'proConPhone2 -> '+isValid, null);

        // proConEmail
        if (
          obj.proConEmail === undefined ||
          obj.proConEmail === "" ||
          obj.proConEmail === null ||
          typeof(obj.proConEmail) !== "string"
        ) {
          isValid = false;
        } else {
          objData.data.proConEmail = obj.proConEmail;
        }
        utils.devLog(2, 'proConEmail -> '+isValid, null);

        // proObservations
        if (obj.proObservations === undefined||
          obj.proObservations === null) {
          objData.data.proObservations = null;
        } else {
          if (
          obj.proObservations === "" ||
          typeof(obj.proObservations) !== "string"
          ) {
          isValid = false;
          } else {
          objData.data.proObservations = obj.proObservations;
          }
        }
        utils.devLog(2, 'proObservations -> '+isValid, null);

        // proCreated
        // objData.data.proCreated = new Date();

        // proUpdated
        // objData.data.proUpdated = new Date();

        // proDeleted
        // objData.data.proDeleted = null;

        utils.devLog(2, 'Finish -> '+isValid, null);

        return isValid;
      } catch (error) {
        return false;
      }
    }
  }

  providersPatch = async ({body,params}, res) => {
    const objData = { idMain: undefined, id: undefined, data: {} };

    try {
      const perId = "D005";
      const logMsg = "API ==> Controller => providersPatch -> Start";
      const { useId } = body;

      utils.devLog(0, logMsg, null);
      const objResAuth = await UsersController.usersPermission(useId,perId);
      if (!objResAuth.resData.permission) {
        utils.devLog(2, "API ==> Permission -> FALSE", null);
        return utils.resError(403, objResAuth.resMessage, { perId: objResAuth.resData.perId }, res );
      }
      utils.devLog(2, "API ==> Permission -> TRUE", null);

      // Function Controller Action
      let { proId } = params;
      utils.devLog(2, null, proId);
      utils.devLog(2, null, body);
      if (!validateParameters(proId, body)) {
        return utils.resError(400,`API ==> Controller => providersPatch -> Invalid parameters`, null, res);
      }
      
      utils.devLog(2, "API ==> Controller => providersPatch : objData", null);
      utils.devLog(2, null, objData);

      // Check Providers
      const resProvidersGetId = await PROVIDERS.findByPk(objData.id,{});
      if (resProvidersGetId) {
        // Verifica se usuário possui permissão geral sobre as empresas
        // if (objResAuth.resData.useKeyCompany !== 0) {
        //   if (resProvidersGetId.comId !== objResAuth.resData.useKeyCompany) {
        //     return utils.resError(403, "API ==> Controller => usersPermission -> Forbidden byId", null, res );
        //   }
        // }
      } else {
        return utils.resError(404,`API ==> Controller => providersPatch -> providersGetId -> Not found`, null, res);
      }

      // Update Providers
      const resProvidersPatch = await resProvidersGetId.update(objData.data);

      LogsController.logsCreate(useId, perId, logMsg, `=> [${useId}] # Fornecedor: Atualizado [status] ## [${objData.id}] ${resProvidersGetId.proName}`, objData.id);
      return utils.resSuccess('API ==> Controller => providersPatch -> Success',{proId: objData.id }, res);    

    } catch (error) {
      return utils.resError(500,`API ==> Controller => providersPatch -> Error`, error, res);
    }

    function validateParameters(proId, obj) {
      try {
        let isValid = true;

        // proId
        proId = Number(proId);
        if (
          proId === undefined ||
          proId === "" ||
          proId === null ||
          isNaN(proId) ||
          typeof(proId) !== "number"||
          !utils.validateNumberPositive(proId)
        ) {
          isValid = false;
        } else {
          objData.id = proId;
        }
        utils.devLog(2, null, isValid);

        // proStatus
        if (
          obj.proStatus === undefined ||
          obj.proStatus === "" ||
          obj.proStatus === null ||
          typeof(obj.proStatus) !== "boolean" ||
          !utils.validateBoolean(obj.proStatus)
        ) {
          isValid = false;
        } else {
          objData.data.proStatus = obj.proStatus;
        }
        utils.devLog(2, null, isValid);

        // proCreated
        // objData.data.proCreated = new Date();

        // proUpdated
        // objData.data.proUpdated = new Date();

        // proDeleted
        // objData.data.proDeleted = null;

        // console.log(isValid)

        return isValid;
      } catch (error) {
        return false;
      }
    }
  }

  providersDelete = async ({body,params}, res) => {
    const objData = { idMain: undefined, id: undefined, data: {} };

    try {
      const perId = "D006";
      const logMsg = "API ==> Controller => providersDelete -> Start";
      const { useId } = body;

      utils.devLog(0, logMsg, null);
      const objResAuth = await UsersController.usersPermission(useId,perId);
      if (!objResAuth.resData.permission) {
        utils.devLog(2, "API ==> Permission -> FALSE", null);
        return utils.resError(403, objResAuth.resMessage, { perId: objResAuth.resData.perId }, res );
      }
      utils.devLog(2, "API ==> Permission -> TRUE", null);

      // Function Controller Action
      let { proId } = params;
      if (!validateParameters(proId)) {
        return utils.resError(400,`API ==> Controller => providersDelete -> Invalid parameters`, null, res);
      }
      
      utils.devLog(2, "API ==> Controller => providersDelete : objData", null);
      utils.devLog(2, null, objData);

      // Check Providers
      const resProvidersGetId = await PROVIDERS.findByPk(objData.id,{});
      if (resProvidersGetId) {
        // Verifica se usuário possui permissão geral sobre as empresas
        // if (objResAuth.resData.useKeyCompany !== 0) {
        //   if (resProvidersGetId.comId !== objResAuth.resData.useKeyCompany) {
        //     return utils.resError(403, "API ==> Controller => usersPermission -> Forbidden byId", null, res );
        //   }
        // }
      } else {
        return utils.resError(404,`API ==> Controller => providersDelete -> providersGetId -> Not found`, null, res);
      }

      // Delete Providers
      const resProvidersDelete = await resProvidersGetId.destroy();

      LogsController.logsCreate(useId, perId, logMsg, `=> [${useId}] # Fornecedor: Deletado ## [${objData.id}] ${resProvidersGetId.proName}`, objData.id);
      return utils.resSuccess('API ==> Controller => providersDelete -> Success',{proId: objData.id }, res);    

    } catch (error) {
      return utils.resError(500,`API ==> Controller => providersDelete -> Error`, error, res);
    }

    function validateParameters(proId) {
      try {
        let isValid = true;

        // proId
        proId = Number(proId);
        if (
          proId === undefined ||
          proId === "" ||
          proId === null ||
          isNaN(proId) ||
          typeof(proId) !== "number"||
          !utils.validateNumberPositive(proId)
        ) {
          isValid = false;
        } else {
          objData.id = proId;
        }

        return isValid;
      } catch (error) {
        return false;
      }
    }
  }
}

module.exports = new ProvidersController();
