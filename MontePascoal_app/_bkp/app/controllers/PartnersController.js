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
  PARTNERS,
  CONFIG_PARTNERS_SERVICES,
} = require("../models");

const LogsController = require('./LogsController');
const UsersController = require('./UsersController');

//  ------------------------------------------------------------------------------------------------------------------------------------- Class API -----
class PartnersController {
  constructor() {
    //   this.step1 = this.step1.bind(this);
    //   this.step2 = this.step2.bind(this);
  }

  partnersPost = async ({body,params}, res) => {
    const objData = { idMain: undefined, id: undefined, data: {} };

    try {
      const perId = "E001";
      const logMsg = "API ==> Controller => partnersPost -> Start";
      const { useId } = body;

      utils.devLog(0, logMsg, null);
      const objResAuth = await UsersController.usersPermission(useId,perId);
      if (!objResAuth.resData.permission) {
        utils.devLog(2, "API ==> Permission -> FALSE", null);
        return utils.resError(403, objResAuth.resMessage, { perId: objResAuth.resData.perId }, res );
      }
      utils.devLog(2, "API ==> Permission -> TRUE", null);

      // Function Controller Action
      // let { parId } = params;
      utils.devLog(2, null, body);
      if (!validateParameters(body)) {
        return utils.resError(400,`API ==> Controller => partnersPost -> Invalid parameters`, null, res);
      }

      utils.devLog(2, "API ==> Controller => partnersPost : objData", null);
      utils.devLog(2, null, objData);

      // Verifica se usuário possui permissão geral sobre as empresas
      // if (objResAuth.resData.useKeyCompany !== 0) {
      //   // Verifica se o registro que deseja alterar pertente a empresa que possui permissão
      //   if (objData.data.comId !== objResAuth.resData.useKeyCompany) {
      //     return utils.resError(403, "API ==> Controller => usersPermission -> Forbidden byId", null, res );
      //   }
      // }

      // Check unique key => parDocCpfCnpj
      const resPartnersGetId = await PARTNERS.findAll({
        where: {
          parDocCpfCnpj: objData.data.parDocCpfCnpj
        }
      });
      utils.devLog(2, null, resPartnersGetId);
      if (resPartnersGetId.length > 0) {
        return utils.resError(409, "API ==> Controller => partnersPost -> Unique-key conflict", null, res );
      }

      // Check nickname
      const resPartnersGetAllbyUniqueNickname = await USERS.findAll({
        where: {
          useNickname: `par-${objData.data.parDocCpfCnpj}`
        }
      });
      utils.devLog(2, null, resPartnersGetAllbyUniqueNickname);
      if (resPartnersGetAllbyUniqueNickname.length > 0) {
        return utils.resError(409, "API ==> Controller => partnersPost -> Unique-key conflict [useNickname]", null, res );
      }

      // Save DATA Partners
      utils.devLog(2, "API ==> Controller => partnersPost -> Save Partners", null);
      const resPartnersPost = await PARTNERS.create(objData.data);
      objData.id = resPartnersPost.dataValues.id;

      // Save DATA services
      utils.devLog(2, "API ==> Controller => partnersPost -> Save Services", null);
      const resPartnersServicesPost  = await resPartnersPost.setPARTNERS_SERVICES(objData.data.lstServices)

      // Create USER
      utils.devLog(2, "API ==> Controller => partnersPost -> Create User", null);
      const resUsersPost = await UsersController.usersPost({ body: {
        useId: useId,
        comId: 1,
        useKeyCompany: 0,
        useKeyType: "Partners",
        useKeyId: objData.id,
        useNickname: `par-${objData.data.parDocCpfCnpj}`,
      }});
      utils.devLog(2, "API ==> Controller => partnersPost -> resUsersPost -> Success", resUsersPost);
      if (resUsersPost.resStatus !== 200) {
        // Delete Partners
        const resPartnersDelete = await resPartnersPost.destroy()
        return utils.resError(424, "API ==> Controller => partnersPost -> resUsersPost -> Error", null, res );
      }

      LogsController.logsCreate(useId, perId, logMsg, `=> [${useId}] # Parceiros: Cadastrado ## [${objData.id}] ${objData.data.parName}`, objData.id);
      return utils.resSuccess('API ==> Controller => partnersPost -> Success',{parId: objData.id }, res);    

    } catch (error) {
      return utils.resError(500,`API ==> Controller => partnersPost -> Error`, error, res);
    }

    function validateParameters(obj) {
      try {
        let isValid = true;

        // parStatus
        objData.data.parStatus = true;
        utils.devLog(2, 'parStatus -> '+isValid, null);

        // useId
        objData.data.useId = 1; // noAuth
        utils.devLog(2, 'useId -> '+isValid, null);

        // parInfPerson
        if (
          obj.parInfPerson === undefined ||
          obj.parInfPerson === "" ||
          obj.parInfPerson === null ||
          typeof(obj.parInfPerson) !== "string"
        ) {
          isValid = false;
        } else {
          utils.devLog(2, 'parInfPerson [tmp] -> '+isValid, null);
          if (obj.parInfPerson !== 'CPF' && obj.parInfPerson !== 'CNPJ') {
            isValid = false;
          } else {
            objData.data.parInfPerson = obj.parInfPerson;
          }
        }
        utils.devLog(2, 'parInfPerson -> '+isValid, null);

        // parName
        if (
          obj.parName === undefined ||
          obj.parName === "" ||
          obj.parName === null ||
          typeof(obj.parName) !== "string"
        ) {
          isValid = false;
        } else {
          objData.data.parName = obj.parName;
        }
        utils.devLog(2, 'parName -> '+isValid, null);

        // parNameCompany
        if (obj.parNameCompany === undefined ||
          obj.parNameCompany === null) {
          objData.data.parNameCompany = null;
        } else {
          if (
            // obj.parNameCompany === "" ||
            typeof(obj.parNameCompany) !== "string"
          ) {
            isValid = false;
          } else {
            objData.data.parNameCompany = obj.parNameCompany;
          }
        }
        utils.devLog(2, 'parNameCompany -> '+isValid, null);

        // parDocCpfCnpj
        if (
          obj.parDocCpfCnpj === undefined ||
          obj.parDocCpfCnpj === "" ||
          obj.parDocCpfCnpj === null ||
          typeof(obj.parDocCpfCnpj) !== "string" ||
          (obj.parDocCpfCnpj.length !== 11 && obj.parDocCpfCnpj.length !== 14 )
        ) {
          isValid = false;
        } else {
          objData.data.parDocCpfCnpj = obj.parDocCpfCnpj;
        }
        utils.devLog(2, 'parDocCpfCnpj -> '+isValid, null);

        // parDocRegistrationStateIndicator
        // if (
        //   obj.parDocRegistrationStateIndicator === undefined ||
        //   obj.parDocRegistrationStateIndicator === "" ||
        //   obj.parDocRegistrationStateIndicator === null ||
        //   typeof(obj.parDocRegistrationStateIndicator) !== "string"
        // ) {
        //   isValid = false;
        // } else {
        //   utils.devLog(2, 'parDocRegistrationStateIndicator [tmp] -> '+isValid, null);
        //   if (obj.parDocRegistrationStateIndicator !== 'Não Contribuinte' && obj.parDocRegistrationStateIndicator !== 'Contribuinte' && obj.parDocRegistrationStateIndicator !== 'Contribuinte Isento') {
        //     isValid = false;
        //   } else {
        //     objData.data.parDocRegistrationStateIndicator = obj.parDocRegistrationStateIndicator;
        //   }
        // }
        utils.devLog(2, 'parDocRegistrationStateIndicator -> '+isValid, null);

        // parDocRegistrationState
        if (obj.parDocRegistrationState === undefined||
          obj.parDocRegistrationState === null) {
          objData.data.parDocRegistrationState = null;
        } else {
          if (
            obj.parDocRegistrationState === "" ||
            typeof(obj.parDocRegistrationState) !== "string"
          ) {
            isValid = false;
          } else {
            objData.data.parDocRegistrationState = obj.parDocRegistrationState;
          }
        }
        utils.devLog(2, 'parDocRegistrationState -> '+isValid, null);

        // parDocRegistrationMunicipal
        if (obj.parDocRegistrationMunicipal === undefined||
          obj.parDocRegistrationMunicipal === null) {
          objData.data.parDocRegistrationMunicipal = null;
        } else {
          if (
            obj.parDocRegistrationMunicipal === "" ||
            typeof(obj.parDocRegistrationMunicipal) !== "string"
          ) {
            isValid = false;
          } else {
            objData.data.parDocRegistrationMunicipal = obj.parDocRegistrationMunicipal;
          }
        }
        utils.devLog(2, 'parDocRegistrationMunicipal -> '+isValid, null);

        // parAddCep
        if (
          obj.parAddCep === undefined ||
          obj.parAddCep === "" ||
          obj.parAddCep === null ||
          typeof(obj.parAddCep) !== "string" ||
          obj.parAddCep.length !== 8
        ) {
          isValid = false;
        } else {
          objData.data.parAddCep = obj.parAddCep;
        }
        utils.devLog(2, 'parAddCep -> '+isValid, null);

        // parAddAddress
        if (
          obj.parAddAddress === undefined ||
          obj.parAddAddress === "" ||
          obj.parAddAddress === null ||
          typeof(obj.parAddAddress) !== "string"
        ) {
          isValid = false;
        } else {
          objData.data.parAddAddress = obj.parAddAddress;
        }
        utils.devLog(2, 'parAddAddress -> '+isValid, null);

        // parAddComplement
        if (obj.parAddComplement === undefined ||
          obj.parAddComplement === null) {
          objData.data.parAddComplement = null;
        } else {
          if (
            obj.parAddComplement === "" ||
            typeof(obj.parAddComplement) !== "string"
          ) {
            isValid = false;
          } else {
            objData.data.parAddComplement = obj.parAddComplement;
          }
        }
        utils.devLog(2, 'parAddComplement -> '+isValid, null);

        // parAddNumber
        if (obj.parAddNumber === undefined ||
          obj.parAddNumber === null) {
          objData.data.parAddNumber = null;
        } else {
          if (
            obj.parAddNumber === "" ||
            typeof(obj.parAddNumber) !== "string"
          ) {
            isValid = false;
          } else {
            objData.data.parAddNumber = obj.parAddNumber;
          }
        }
        utils.devLog(2, 'parAddNumber -> '+isValid, null);

        // parAddDistrict
        if (
          obj.parAddDistrict === undefined ||
          obj.parAddDistrict === "" ||
          obj.parAddDistrict === null ||
          typeof(obj.parAddDistrict) !== "string"
        ) {
          isValid = false;
        } else {
          objData.data.parAddDistrict = obj.parAddDistrict;
        }
        utils.devLog(2, 'parAddDistrict -> '+isValid, null);

        // parAddCouId
        obj.parAddCouId = Number(obj.parAddCouId);
        if (
          obj.parAddCouId === undefined ||
          obj.parAddCouId === "" ||
          obj.parAddCouId === null ||
          isNaN(obj.parAddCouId) ||
          typeof(obj.parAddCouId) !== "number"||
          !utils.validateNumberPositive(obj.parAddCouId)
        ) {
          isValid = false;
        } else {
          objData.data.parAddCouId = 1;// 1 = Brasil // Number(obj.parAddCouId);
        }
        utils.devLog(2, 'parAddCouId -> '+isValid, null);

        // parAddStaId
        obj.parAddStaId = Number(obj.parAddStaId);
        if (
          obj.parAddStaId === undefined ||
          obj.parAddStaId === "" ||
          obj.parAddStaId === null ||
          isNaN(obj.parAddStaId) ||
          typeof(obj.parAddStaId) !== "number" ||
          !utils.validateNumberPositive(obj.parAddStaId)
        ) {
          isValid = false;
        } else {
          objData.data.parAddStaId = Number(obj.parAddStaId);
        }
        utils.devLog(2, 'parAddStaId -> '+isValid, null);

        // parAddCitId
        obj.parAddCitId = Number(obj.parAddCitId);
        if (
          obj.parAddCitId === undefined ||
          obj.parAddCitId === "" ||
          obj.parAddCitId === null ||
          isNaN(obj.parAddCitId) ||
          typeof(obj.parAddCitId) !== "number"||
          !utils.validateNumberPositive(obj.parAddCitId)
        ) {
          isValid = false;
        } else {
          objData.data.parAddCitId = Number(obj.parAddCitId);
        }
        utils.devLog(2, 'parAddCitId -> '+isValid, null);

        // parConPhone1
        if (
          obj.parConPhone1 === undefined ||
          obj.parConPhone1 === "" ||
          obj.parConPhone1 === null ||
          typeof(obj.parConPhone1) !== "string"||
          (obj.parConPhone1.length !== 10 && obj.parConPhone1.length !== 11 )
        ) {
          isValid = false;
        } else {
          objData.data.parConPhone1 = obj.parConPhone1;
        }
        utils.devLog(2, 'parConPhone1 -> '+isValid, null);

        // parConPhone2
        if (obj.parConPhone2 === undefined ||
          obj.parConPhone2 === null) {
          objData.data.parConPhone2 = null;
        } else {
          if (
            obj.parConPhone2 === "" ||
            obj.parConPhone2 === null ||
            typeof(obj.parConPhone2) !== "string"||
            (obj.parConPhone2.length !== 10 && obj.parConPhone2.length !== 11 )
          ) {
            isValid = false;
          } else {
            objData.data.parConPhone2 = obj.parConPhone2;
          }
        }
        utils.devLog(2, 'parConPhone2 -> '+isValid, null);

        // parConEmail
        if (
          obj.parConEmail === undefined ||
          obj.parConEmail === "" ||
          obj.parConEmail === null ||
          typeof(obj.parConEmail) !== "string"
        ) {
          isValid = false;
        } else {
          objData.data.parConEmail = obj.parConEmail;
        }
        utils.devLog(2, 'parConEmail -> '+isValid, null);

        // parObservations
        if (obj.parObservations === undefined||
          obj.parObservations === null) {
          objData.data.parObservations = null;
        } else {
          if (
            obj.parObservations === "" ||
            typeof(obj.parObservations) !== "string"
          ) {
            isValid = false;
          } else {
            objData.data.parObservations = obj.parObservations;
          }
        }
        utils.devLog(2, 'parObservations -> '+isValid, null);

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

        // parCreated
        // objData.data.parCreated = new Date();

        // parUpdated
        // objData.data.parUpdated = new Date();

        // parDeleted
        // objData.data.parDeleted = null;

        utils.devLog(2, 'Finish -> '+isValid, null);

        return isValid;
      } catch (error) {
        return false;
      }
    }
  }

  partnersGetAll = async ({body,params}, res) => {
    try {
      const perId = "E002";
      const logMsg = "API ==> Controller => partnersGetAll -> Start";
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
      const resPartnersGetAll = await PARTNERS.findAll({
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
          // 'PARTNERS_CONTACTS',
          // 'PARTNERS_SERVICES',
          // 'PARTNERS_FILES',
        ],
      });

      LogsController.logsCreate(useId, perId, logMsg, `=> [${useId}] # Parceiros: Listagem geral ## [geral]`, null);
      return utils.resSuccess('API ==> Controller => partnersGetAll -> Success', resPartnersGetAll, res );
    } catch (error) {
      return utils.resError(500,`API ==> Controller => partnersGetAll -> Error`, error, res);
    }
  }

  partnersGetId = async ({body,params}, res) => {
    const objData = { idMain: undefined, id: undefined, data: {} };

    try {
      const perId = "E003";
      const logMsg = "API ==> Controller => partnersGetId -> Start";
      const { useId } = body;

      utils.devLog(0, logMsg, null);
      const objResAuth = await UsersController.usersPermission(useId,perId);
      if (!objResAuth.resData.permission) {
        utils.devLog(2, "API ==> Permission -> FALSE", null);
        return utils.resError(403, objResAuth.resMessage, { perId: objResAuth.resData.perId }, res );
      }
      utils.devLog(2, "API ==> Permission -> TRUE", null);

      // Function Controller Action
      let { parId } = params;
      if (!validateParameters(parId)) {
        return utils.resError(400,`API ==> Controller => partnersGetId -> Invalid parameters`, null, res);
      }

      const resPartnersGetId = await PARTNERS.findByPk(objData.id,{
        include: [
          // 'COMPANIES',
          // 'USERS',
          'CONFIG_COUNTRIES',
          'CONFIG_STATES',
          'CONFIG_CITIES',
          'PARTNERS_CONTACTS',
          // 'PARTNERS_SERVICES',
          {
            model: CONFIG_PARTNERS_SERVICES,
            as: 'PARTNERS_SERVICES',
            through: { attributes: [] },
          },
          'PARTNERS_FILES',
        ],
      });

      if (resPartnersGetId) {
        // if (objResAuth.resData.useKeyCompany !== 0) {
        //   if (resPartnersGetId.comId !== objResAuth.resData.useKeyCompany) {
        //     return utils.resError(403, "API ==> Controller => usersPermission -> Forbidden byId", null, res );
        //   }
        // }
        LogsController.logsCreate(useId, perId, logMsg, `=> [${useId}] # Parceiros: Consultado ## [${objData.id}] ${resPartnersGetId.parName}`, objData.id);
        return utils.resSuccess('API ==> Controller => partnersGetId -> Success',resPartnersGetId, res);    
      } else {
        return utils.resError(404,`API ==> Controller => partnersGetId -> Not found`, null, res);
      }
    } catch (error) {
      return utils.resError(500,`API ==> Controller => partnersGetId -> Error`, error, res);
    }

    function validateParameters(parId) {
      try {
        let isValid = true;

        // parId
        parId = Number(parId);
        if (
          parId === undefined ||
          parId === "" ||
          parId === null ||
          isNaN(parId) ||
          typeof(parId) !== "number"||
          !utils.validateNumberPositive(parId)
        ) {
          isValid = false;
        } else {
          objData.id = parId;
        }

        return isValid;
      } catch (error) {
        return false;
      }
    }
  }

  partnersPut = async ({body,params}, res) => {
    const objData = { idMain: undefined, id: undefined, data: {} };

    try {
      const perId = "E004";
      const logMsg = "API ==> Controller => partnersPut -> Start";
      const { useId } = body;

      utils.devLog(0, logMsg, null);
      const objResAuth = await UsersController.usersPermission(useId,perId);
      if (!objResAuth.resData.permission) {
        utils.devLog(2, "API ==> Permission -> FALSE", null);
        return utils.resError(403, objResAuth.resMessage, { perId: objResAuth.resData.perId }, res );
      }
      utils.devLog(2, "API ==> Permission -> TRUE", null);

      // Function Controller Action
      let { parId } = params;
      utils.devLog(2, null, body);
      if (!validateParameters(parId, body)) {
        return utils.resError(400,`API ==> Controller => partnersPut -> Invalid parameters`, null, res);
      }

      utils.devLog(2, "API ==> Controller => partnersPut : objData", null);
      utils.devLog(2, null, objData);

      // Check Partners
      const resPartnersGetId = await PARTNERS.findByPk(objData.id,{});
      if (resPartnersGetId) {
        // Verifica se usuário possui permissão geral sobre as empresas
        // if (objResAuth.resData.useKeyCompany !== 0) {
        //   // Verifica se o registro que deseja alterar pertente a empresa que possui permissão
        //   if (resPartnersGetId.comId !== objResAuth.resData.useKeyCompany) {
        //     return utils.resError(403, "API ==> Controller => usersPermission -> Forbidden byId", null, res );
        //   }
        // }
      } else {
        return utils.resError(404,`API ==> Controller => partnersPut -> partnersGetId -> Not found`, null, res);
      }

      // Check unique key => parDocCpfCnpj
      let isChangeNickname = false;
      if (objData.data.parDocCpfCnpj !== resPartnersGetId.parDocCpfCnpj) {
        // Check CPF/ CNPJ
        const resPartnersGetAllbyUnique = await PARTNERS.findAll({
          where: {
            parDocCpfCnpj: objData.data.parDocCpfCnpj
          }
        });
        utils.devLog(2, null, resPartnersGetAllbyUnique);
        if (resPartnersGetAllbyUnique.length > 0) {
          return utils.resError(409, "API ==> Controller => partnersPut -> Unique-key conflict", null, res );
        }
        // Check nickname
        isChangeNickname = true;
        const resPartnersGetAllbyUniqueNickname = await USERS.findAll({
          where: {
            useNickname: `par-${objData.data.parDocCpfCnpj}`
          }
        });
        utils.devLog(2, null, resPartnersGetAllbyUniqueNickname);
        if (resPartnersGetAllbyUniqueNickname.length > 0) {
          return utils.resError(409, "API ==> Controller => partnersPut -> Unique-key conflict [useNickname]", null, res );
        }
      }
      const bkpPartnersData = resPartnersGetId;

      // Update Partners
      utils.devLog(2, "API ==> Controller => partnersPut -> Update Partners", null);
      const resPartnersPut = await resPartnersGetId.update(objData.data);

      // Update User
      if (isChangeNickname) {
        utils.devLog(2, "API ==> Controller => partnersPut -> Update User", null);
        const resUsersPatch = await UsersController.usersPatchNickname({ 
          params: {
            id: resPartnersGetId.useId,
          },
          body: {
            useId: useId,
            useNickname: `par-${objData.data.parDocCpfCnpj}`,
          }
        });
        utils.devLog(2, "API ==> Controller => partnersPut -> resUsersPatch -> Success", resUsersPatch);
        if (resUsersPatch.resStatus !== 200) {
          utils.devLog(2, "API ==> Controller => partnersPut -> Update Partners [restore]", null);
          const resPartnersPutRestore = await resPartnersGetId.update(bkpPartnersData);
          return utils.resError(424, "API ==> Controller => partnersPut -> resUsersPatch -> Error", null, res );
        }
      }

      LogsController.logsCreate(useId, perId, logMsg, `=> [${useId}] # Parceiros: Atualizado ## [${objData.id}] ${resPartnersGetId.parName}`, objData.id);
      return utils.resSuccess('API ==> Controller => partnersPut -> Success',{parId: objData.id }, res);    

    } catch (error) {
      return utils.resError(500,`API ==> Controller => partnersPut -> Error`, error, res);
    }

    function validateParameters(parId, obj) {
      try {
        let isValid = true;

        // parId
        parId = Number(parId);
        if (
          parId === undefined ||
          parId === "" ||
          parId === null ||
          isNaN(parId) ||
          typeof(parId) !== "number"
        ) {
          isValid = false;
        } else {
          objData.id = parId;
        }
        utils.devLog(2, 'parId -> '+isValid, null);

        // useId
        // objData.data.useId = 1; // noAuth
        // utils.devLog(2, 'useId -> '+isValid, null);
  
        // parInfPerson
        if (
          obj.parInfPerson === undefined ||
          obj.parInfPerson === "" ||
          obj.parInfPerson === null ||
          typeof(obj.parInfPerson) !== "string"
        ) {
          isValid = false;
        } else {
          utils.devLog(2, 'parInfPerson [tmp] -> '+isValid, null);
          if (obj.parInfPerson !== 'CPF' && obj.parInfPerson !== 'CNPJ') {
          isValid = false;
          } else {
          objData.data.parInfPerson = obj.parInfPerson;
          }
        }
        utils.devLog(2, 'parInfPerson -> '+isValid, null);

        // parName
        if (
          obj.parName === undefined ||
          obj.parName === "" ||
          obj.parName === null ||
          typeof(obj.parName) !== "string"
        ) {
          isValid = false;
        } else {
          objData.data.parName = obj.parName;
        }
        utils.devLog(2, 'parName -> '+isValid, null);

        // parNameCompany
        if (obj.parNameCompany === undefined ||
          obj.parNameCompany === null) {
          objData.data.parNameCompany = null;
        } else {
          if (
          // obj.parNameCompany === "" ||
          typeof(obj.parNameCompany) !== "string"
          ) {
          isValid = false;
          } else {
          objData.data.parNameCompany = obj.parNameCompany;
          }
        }
        utils.devLog(2, 'parNameCompany -> '+isValid, null);

        // parDocCpfCnpj
        if (
          obj.parDocCpfCnpj === undefined ||
          obj.parDocCpfCnpj === "" ||
          obj.parDocCpfCnpj === null ||
          typeof(obj.parDocCpfCnpj) !== "string" ||
          (obj.parDocCpfCnpj.length !== 11 && obj.parDocCpfCnpj.length !== 14 )
        ) {
          isValid = false;
        } else {
          objData.data.parDocCpfCnpj = obj.parDocCpfCnpj;
        }
        utils.devLog(2, 'parDocCpfCnpj -> '+isValid, null);

        // parDocRegistrationStateIndicator
        // if (
        //   obj.parDocRegistrationStateIndicator === undefined ||
        //   obj.parDocRegistrationStateIndicator === "" ||
        //   obj.parDocRegistrationStateIndicator === null ||
        //   typeof(obj.parDocRegistrationStateIndicator) !== "string"
        // ) {
        //   isValid = false;
        // } else {
        //   utils.devLog(2, 'parDocRegistrationStateIndicator [tmp] -> '+isValid, null);
        //   if (obj.parDocRegistrationStateIndicator !== 'Não Contribuinte' && obj.parDocRegistrationStateIndicator !== 'Contribuinte' && obj.parDocRegistrationStateIndicator !== 'Contribuinte Isento') {
        //   isValid = false;
        //   } else {
        //   objData.data.parDocRegistrationStateIndicator = obj.parDocRegistrationStateIndicator;
        //   }
        // }
        utils.devLog(2, 'parDocRegistrationStateIndicator -> '+isValid, null);

        // parDocRegistrationState
        if (obj.parDocRegistrationState === undefined||
          obj.parDocRegistrationState === null) {
          objData.data.parDocRegistrationState = null;
        } else {
          if (
          obj.parDocRegistrationState === "" ||
          typeof(obj.parDocRegistrationState) !== "string"
          ) {
          isValid = false;
          } else {
          objData.data.parDocRegistrationState = obj.parDocRegistrationState;
          }
        }
        utils.devLog(2, 'parDocRegistrationState -> '+isValid, null);

        // parDocRegistrationMunicipal
        if (obj.parDocRegistrationMunicipal === undefined||
          obj.parDocRegistrationMunicipal === null) {
          objData.data.parDocRegistrationMunicipal = null;
        } else {
          if (
          obj.parDocRegistrationMunicipal === "" ||
          typeof(obj.parDocRegistrationMunicipal) !== "string"
          ) {
          isValid = false;
          } else {
          objData.data.parDocRegistrationMunicipal = obj.parDocRegistrationMunicipal;
          }
        }
        utils.devLog(2, 'parDocRegistrationMunicipal -> '+isValid, null);

        // parAddCep
        if (
          obj.parAddCep === undefined ||
          obj.parAddCep === "" ||
          obj.parAddCep === null ||
          typeof(obj.parAddCep) !== "string" ||
          obj.parAddCep.length !== 8
        ) {
          isValid = false;
        } else {
          objData.data.parAddCep = obj.parAddCep;
        }
        utils.devLog(2, 'parAddCep -> '+isValid, null);

        // parAddAddress
        if (
          obj.parAddAddress === undefined ||
          obj.parAddAddress === "" ||
          obj.parAddAddress === null ||
          typeof(obj.parAddAddress) !== "string"
        ) {
          isValid = false;
        } else {
          objData.data.parAddAddress = obj.parAddAddress;
        }
        utils.devLog(2, 'parAddAddress -> '+isValid, null);

        // parAddComplement
        if (obj.parAddComplement === undefined ||
          obj.parAddComplement === null) {
          objData.data.parAddComplement = null;
        } else {
          if (
            obj.parAddComplement === "" ||
            typeof(obj.parAddComplement) !== "string"
          ) {
            isValid = false;
          } else {
            objData.data.parAddComplement = obj.parAddComplement;
          }
        }
        utils.devLog(2, 'parAddComplement -> '+isValid, null);

        // parAddNumber
        if (obj.parAddNumber === undefined ||
          obj.parAddNumber === null) {
          objData.data.parAddNumber = null;
        } else {
          if (
            obj.parAddNumber === "" ||
            typeof(obj.parAddNumber) !== "string"
          ) {
            isValid = false;
          } else {
            objData.data.parAddNumber = obj.parAddNumber;
          }
        }
        utils.devLog(2, 'parAddNumber -> '+isValid, null);

        // parAddDistrict
        if (
          obj.parAddDistrict === undefined ||
          obj.parAddDistrict === "" ||
          obj.parAddDistrict === null ||
          typeof(obj.parAddDistrict) !== "string"
        ) {
          isValid = false;
        } else {
          objData.data.parAddDistrict = obj.parAddDistrict;
        }
        utils.devLog(2, 'parAddDistrict -> '+isValid, null);

        // parAddCouId
        obj.parAddCouId = Number(obj.parAddCouId);
        if (
          obj.parAddCouId === undefined ||
          obj.parAddCouId === "" ||
          obj.parAddCouId === null ||
          isNaN(obj.parAddCouId) ||
          typeof(obj.parAddCouId) !== "number"||
          !utils.validateNumberPositive(obj.parAddCouId)
        ) {
          isValid = false;
        } else {
          objData.data.parAddCouId = 1;// 1 = Brasil // Number(obj.parAddCouId);
        }
        utils.devLog(2, 'parAddCouId -> '+isValid, null);

        // parAddStaId
        obj.parAddStaId = Number(obj.parAddStaId);
        if (
          obj.parAddStaId === undefined ||
          obj.parAddStaId === "" ||
          obj.parAddStaId === null ||
          isNaN(obj.parAddStaId) ||
          typeof(obj.parAddStaId) !== "number" ||
          !utils.validateNumberPositive(obj.parAddStaId)
        ) {
          isValid = false;
        } else {
          objData.data.parAddStaId = Number(obj.parAddStaId);
        }
        utils.devLog(2, 'parAddStaId -> '+isValid, null);

        // parAddCitId
        obj.parAddCitId = Number(obj.parAddCitId);
        if (
          obj.parAddCitId === undefined ||
          obj.parAddCitId === "" ||
          obj.parAddCitId === null ||
          isNaN(obj.parAddCitId) ||
          typeof(obj.parAddCitId) !== "number"||
          !utils.validateNumberPositive(obj.parAddCitId)
        ) {
          isValid = false;
        } else {
          objData.data.parAddCitId = Number(obj.parAddCitId);
        }
        utils.devLog(2, 'parAddCitId -> '+isValid, null);

        // parConPhone1
        if (
          obj.parConPhone1 === undefined ||
          obj.parConPhone1 === "" ||
          obj.parConPhone1 === null ||
          typeof(obj.parConPhone1) !== "string"||
          (obj.parConPhone1.length !== 10 && obj.parConPhone1.length !== 11 )
        ) {
          isValid = false;
        } else {
          objData.data.parConPhone1 = obj.parConPhone1;
        }
        utils.devLog(2, 'parConPhone1 -> '+isValid, null);

        // parConPhone2
        if (obj.parConPhone2 === undefined ||
          obj.parConPhone2 === null) {
          objData.data.parConPhone2 = null;
        } else {
          if (
          obj.parConPhone2 === "" ||
          obj.parConPhone2 === null ||
          typeof(obj.parConPhone2) !== "string"||
          (obj.parConPhone2.length !== 10 && obj.parConPhone2.length !== 11 )
          ) {
          isValid = false;
          } else {
          objData.data.parConPhone2 = obj.parConPhone2;
          }
        }
        utils.devLog(2, 'parConPhone2 -> '+isValid, null);

        // parConEmail
        if (
          obj.parConEmail === undefined ||
          obj.parConEmail === "" ||
          obj.parConEmail === null ||
          typeof(obj.parConEmail) !== "string"
        ) {
          isValid = false;
        } else {
          objData.data.parConEmail = obj.parConEmail;
        }
        utils.devLog(2, 'parConEmail -> '+isValid, null);

        // parObservations
        if (obj.parObservations === undefined||
          obj.parObservations === null) {
          objData.data.parObservations = null;
        } else {
          if (
          obj.parObservations === "" ||
          typeof(obj.parObservations) !== "string"
          ) {
          isValid = false;
          } else {
          objData.data.parObservations = obj.parObservations;
          }
        }
        utils.devLog(2, 'parObservations -> '+isValid, null);

        // parCreated
        // objData.data.parCreated = new Date();

        // parUpdated
        // objData.data.parUpdated = new Date();

        // parDeleted
        // objData.data.parDeleted = null;

        utils.devLog(2, 'Finish -> '+isValid, null);

        return isValid;
      } catch (error) {
        return false;
      }
    }
  }

  partnersPatch = async ({body,params}, res) => {
    const objData = { idMain: undefined, id: undefined, data: {} };

    try {
      const perId = "E005";
      const logMsg = "API ==> Controller => partnersPatch -> Start";
      const { useId } = body;

      utils.devLog(0, logMsg, null);
      const objResAuth = await UsersController.usersPermission(useId,perId);
      if (!objResAuth.resData.permission) {
        utils.devLog(2, "API ==> Permission -> FALSE", null);
        return utils.resError(403, objResAuth.resMessage, { perId: objResAuth.resData.perId }, res );
      }
      utils.devLog(2, "API ==> Permission -> TRUE", null);

      // Function Controller Action
      let { parId } = params;
      utils.devLog(2, null, parId);
      utils.devLog(2, null, body);
      if (!validateParameters(parId, body)) {
        return utils.resError(400,`API ==> Controller => partnersPatch -> Invalid parameters`, null, res);
      }

      utils.devLog(2, "API ==> Controller => partnersPatch : objData", null);
      utils.devLog(2, null, objData);

      // Check Partners
      const resPartnersGetId = await PARTNERS.findByPk(objData.id,{});
      if (resPartnersGetId) {
        // Verifica se usuário possui permissão geral sobre as empresas
        // if (objResAuth.resData.useKeyCompany !== 0) {
        //   if (resPartnersGetId.comId !== objResAuth.resData.useKeyCompany) {
        //     return utils.resError(403, "API ==> Controller => usersPermission -> Forbidden byId", null, res );
        //   }
        // }
      } else {
        return utils.resError(404,`API ==> Controller => partnersPatch -> partnersGetId -> Not found`, null, res);
      }
      const bkpPartnersData = resPartnersGetId;

      // Update Partners
      const resPartnersPatch = await resPartnersGetId.update(objData.data);

      // Update User
      utils.devLog(2, "API ==> Controller => partnersPatch -> Update User", null);
      const resUsersPatch = await UsersController.usersPatchStatus({ 
        params: {
          id: resPartnersGetId.useId,
        },
        body: {
          useId: useId,
          useStatus: objData.data.parStatus,
      }});
      utils.devLog(2, "API ==> Controller => partnersPatch -> resUsersPatch -> Success", resUsersPatch);
      if (resUsersPatch.resStatus !== 200) {
        utils.devLog(2, "API ==> Controller => partnersPatch -> Update Partners [restore]", null);
        const resPartnersPutRestore = await resPartnersGetId.update(bkpPartnersData);
        return utils.resError(424, "API ==> Controller => partnersPatch -> resUsersPatch -> Error", null, res );
      }

      LogsController.logsCreate(useId, perId, logMsg, `=> [${useId}] # Parceiros: Atualizado [status] ## [${objData.id}] ${resPartnersGetId.parName}`, objData.id);
      return utils.resSuccess('API ==> Controller => partnersPatch -> Success',{parId: objData.id }, res);    

    } catch (error) {
      return utils.resError(500,`API ==> Controller => partnersPatch -> Error`, error, res);
    }

    function validateParameters(parId, obj) {
      try {
        let isValid = true;

        // parId
        parId = Number(parId);
        if (
          parId === undefined ||
          parId === "" ||
          parId === null ||
          isNaN(parId) ||
          typeof(parId) !== "number"||
          !utils.validateNumberPositive(parId)
        ) {
          isValid = false;
        } else {
          objData.id = parId;
        }
        utils.devLog(2, null, isValid);

        // parStatus
        if (
          obj.parStatus === undefined ||
          obj.parStatus === "" ||
          obj.parStatus === null ||
          typeof(obj.parStatus) !== "boolean" ||
          !utils.validateBoolean(obj.parStatus)
        ) {
          isValid = false;
        } else {
          objData.data.parStatus = obj.parStatus;
        }
        utils.devLog(2, null, isValid);

        // parCreated
        // objData.data.parCreated = new Date();

        // parUpdated
        // objData.data.parUpdated = new Date();

        // parDeleted
        // objData.data.parDeleted = null;

        // console.log(isValid)

        return isValid;
      } catch (error) {
        return false;
      }
    }
  }

  partnersDelete = async ({body,params}, res) => {
    const objData = { idMain: undefined, id: undefined, data: {} };

    try {
      const perId = "E006";
      const logMsg = "API ==> Controller => partnersDelete -> Start";
      const { useId } = body;

      utils.devLog(0, logMsg, null);
      const objResAuth = await UsersController.usersPermission(useId,perId);
      if (!objResAuth.resData.permission) {
        utils.devLog(2, "API ==> Permission -> FALSE", null);
        return utils.resError(403, objResAuth.resMessage, { perId: objResAuth.resData.perId }, res );
      }
      utils.devLog(2, "API ==> Permission -> TRUE", null);

      // Function Controller Action
      let { parId } = params;
      if (!validateParameters(parId)) {
        return utils.resError(400,`API ==> Controller => partnersDelete -> Invalid parameters`, null, res);
      }

      utils.devLog(2, "API ==> Controller => partnersDelete : objData", null);
      utils.devLog(2, null, objData);

      // Check Partners
      const resPartnersGetId = await PARTNERS.findByPk(objData.id,{});
      if (resPartnersGetId) {
        // Verifica se usuário possui permissão geral sobre as empresas
        // if (objResAuth.resData.useKeyCompany !== 0) {
        //   if (resPartnersGetId.comId !== objResAuth.resData.useKeyCompany) {
        //     return utils.resError(403, "API ==> Controller => usersPermission -> Forbidden byId", null, res );
        //   }
        // }
      } else {
        return utils.resError(404,`API ==> Controller => partnersDelete -> partnersGetId -> Not found`, null, res);
      }

      // Delete Partners
      const resPartnersDelete = await resPartnersGetId.destroy();

      LogsController.logsCreate(useId, perId, logMsg, `=> [${useId}] # Parceiros: Deletado ## [${objData.id}] ${resPartnersGetId.parName}`, objData.id);
      return utils.resSuccess('API ==> Controller => partnersDelete -> Success',{parId: objData.id }, res);    

    } catch (error) {
      return utils.resError(500,`API ==> Controller => partnersDelete -> Error`, error, res);
    }

    function validateParameters(parId) {
      try {
        let isValid = true;

        // parId
        parId = Number(parId);
        if (
          parId === undefined ||
          parId === "" ||
          parId === null ||
          isNaN(parId) ||
          typeof(parId) !== "number"||
          !utils.validateNumberPositive(parId)
        ) {
          isValid = false;
        } else {
          objData.id = parId;
        }

        return isValid;
      } catch (error) {
        return false;
      }
    }
  }
}

module.exports = new PartnersController();
