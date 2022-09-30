/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// CONTROLLER USER /////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//  --------------------------------------------------------------------------------------------------------------------------------------- Modules -----

const utils = require('../utils/utils.js');

const { COMPANIES, CONFIG_COUNTRIES, CONFIG_STATES, CONFIG_CITIES } = require('../models');

const LogsController = require('./LogsController');
const UsersController = require('./UsersController');

//  ------------------------------------------------------------------------------------------------------------------------------------- Class API -----
class CompaniesController {

  constructor(){
  //   this.step1 = this.step1.bind(this);
  //   this.step2 = this.step2.bind(this);
  }

  companiesPost = async ({body,params}, res) => {
    const objData = { idMain: undefined, id: undefined, data: {} };

    try {
      const perId = "A001";
      const logMsg = "API ==> Controller => companiesPost -> Start";
      const { useId } = body;

      utils.devLog(0, logMsg, null);
      const objResAuth = await UsersController.usersPermission(useId,perId);
      if (!objResAuth.resData.permission) {
        utils.devLog(2, "API ==> Permission -> FALSE", null);
        return utils.resError(403, objResAuth.resMessage, { perId: objResAuth.resData.perId }, res );
      }
      utils.devLog(2, "API ==> Permission -> TRUE", null);

      // Function Controller Action
      // let { comId } = params;
      utils.devLog(2, null, body);
      if (!validateParameters(body)) {
        return utils.resError(400,`API ==> Controller => companiesPost -> Invalid parameters`, null, res);
      }
      
      utils.devLog(2, "API ==> Controller => companiesPost : objData", null);
      utils.devLog(2, null, objData);

      // Verifica se usuário possui permissão geral sobre as empresas
      if (objResAuth.resData.useKeyCompany !== 0) {
        return utils.resError(403, "API ==> Controller => usersPermission -> Forbidden byId", null, res );
      }

      // Check unique key => comCnpj
      const resCompaniesGetId = await COMPANIES.findAll({
        where: {
          comCnpj: objData.data.comCnpj
        }
      });
      utils.devLog(2, null, resCompaniesGetId);
      if (resCompaniesGetId.length > 0) {
        return utils.resError(409, "API ==> Controller => companiesPost -> Unique-key conflict", null, res );
      }

      // Save DATA
      const resCompaniesPost = await COMPANIES.create(objData.data);
      objData.id = resCompaniesPost.dataValues.id;

      LogsController.logsCreate(useId, perId, logMsg, `=> [${useId}] # Empresa: Cadastrada ## [${objData.id}] ${objData.data.comName}`, objData.id);
      return utils.resSuccess('API ==> Controller => companiesPost -> Success',{comId: objData.id }, res);    

    } catch (error) {
      if (error.original) {
        if (error.name === 'SequelizeUniqueConstraintError') {
          error = {errMessage: 'Error system', errType: 'SequelizeUniqueConstraintError'};
          return utils.resError(500,`API ==> Controller => companiesPost -> Error`, error, res);
        }
      }
      return utils.resError(500,`API ==> Controller => companiesPost -> Error`, error, res);
    }

    function validateParameters(obj) {
      try {
        let isValid = true;

        // comStatus
        objData.data.comStatus = true;
        utils.devLog(2, 'comStatus -> '+isValid, null);

        // comName
        if (
          obj.comName === undefined ||
          obj.comName === "" ||
          obj.comName === null ||
          typeof(obj.comName) !== "string"
        ) {
          isValid = false;
        } else {
          objData.data.comName = obj.comName;
        }
        utils.devLog(2, 'comName -> '+isValid, null);

        // comNameCompany
        if (
          obj.comNameCompany === undefined ||
          obj.comNameCompany === "" ||
          obj.comNameCompany === null ||
          typeof(obj.comNameCompany) !== "string"
        ) {
          isValid = false;
        } else {
          objData.data.comNameCompany = obj.comNameCompany;
        }
        utils.devLog(2, 'comNameCompany -> '+isValid, null);

        // comCnpj
        if (
          obj.comCnpj === undefined ||
          obj.comCnpj === "" ||
          obj.comCnpj === null ||
          typeof(obj.comCnpj) !== "string"||
          obj.comCnpj.length !== 14 ||
          !utils.validateCnpj(obj.comCnpj)
        ) {
          isValid = false;
        } else {
          objData.data.comCnpj = obj.comCnpj;
        }
        utils.devLog(2, 'comCnpj -> '+isValid, null);

        // comRegistrationState
        if (obj.comRegistrationState === undefined ||
            obj.comRegistrationState === null) {
          objData.data.comRegistrationState = null;
        } else {
          if (
            obj.comRegistrationState === "" ||
            typeof(obj.comRegistrationState) !== "string"
          ) {
            isValid = false;
          } else {
            objData.data.comRegistrationState = obj.comRegistrationState;
          }
        }
        utils.devLog(2, 'comRegistrationState -> '+isValid, null);

        // comRegistrationMunicipal
        if (obj.comRegistrationMunicipal === undefined ||
          obj.comRegistrationMunicipal === null) {
          objData.data.comRegistrationMunicipal = null;
        } else {
          if (
            obj.comRegistrationMunicipal === "" ||
            typeof(obj.comRegistrationMunicipal) !== "string"
          ) {
            isValid = false;
          } else {
            objData.data.comRegistrationMunicipal = obj.comRegistrationMunicipal;
          }
        }
        utils.devLog(2, 'comRegistrationMunicipal -> '+isValid, null);

        // comAddCep
        if (
          obj.comAddCep === undefined ||
          obj.comAddCep === "" ||
          obj.comAddCep === null ||
          typeof(obj.comAddCep) !== "string" ||
          obj.comAddCep.length !== 8
        ) {
          isValid = false;
        } else {
          objData.data.comAddCep = obj.comAddCep;
        }
        utils.devLog(2, 'comAddCep -> '+isValid, null);

        // comAddAddress
        if (
          obj.comAddAddress === undefined ||
          obj.comAddAddress === "" ||
          obj.comAddAddress === null ||
          typeof(obj.comAddAddress) !== "string"
        ) {
          isValid = false;
        } else {
          objData.data.comAddAddress = obj.comAddAddress;
        }
        utils.devLog(2, 'comAddAddress -> '+isValid, null);

        // comAddComplement
        if (obj.comAddComplement === undefined ||
          obj.comAddComplement === null) {
          objData.data.comAddComplement = null;
        } else {
          if (
            obj.comAddComplement === "" ||
            typeof(obj.comAddComplement) !== "string"
          ) {
            isValid = false;
          } else {
            objData.data.comAddComplement = obj.comAddComplement;
          }
        }
        utils.devLog(2, 'comAddComplement -> '+isValid, null);

        // comAddNumber
        if (obj.comAddNumber === undefined ||
          obj.comAddNumber === null) {
          objData.data.comAddNumber = null;
        } else {
          if (
            obj.comAddNumber === "" ||
            typeof(obj.comAddNumber) !== "string"
          ) {
            isValid = false;
          } else {
            objData.data.comAddNumber = obj.comAddNumber;
          }
        }
        utils.devLog(2, 'comAddNumber -> '+isValid, null);

        if (obj.comConPhone2 === undefined ||
          obj.comConPhone2 === null) {
          objData.data.comConPhone2 = null;
        } else {
          if (
            obj.comConPhone2 === "" ||
            obj.comConPhone2 === null ||
            typeof(obj.comConPhone2) !== "string"||
            (obj.comConPhone2.length !== 10 && obj.comConPhone2.length !== 11 )
          ) {
            isValid = false;
          } else {
            objData.data.comConPhone2 = obj.comConPhone2;
          }
        }





        // comAddDistrict
        if (
          obj.comAddDistrict === undefined ||
          obj.comAddDistrict === "" ||
          obj.comAddDistrict === null ||
          typeof(obj.comAddDistrict) !== "string"
        ) {
          isValid = false;
        } else {
          objData.data.comAddDistrict = obj.comAddDistrict;
        }
        utils.devLog(2, 'comAddDistrict -> '+isValid, null);

        // comAddCouId
        obj.comAddCouId = Number(obj.comAddCouId);
        if (
          obj.comAddCouId === undefined ||
          obj.comAddCouId === "" ||
          obj.comAddCouId === null ||
          isNaN(obj.comAddCouId) ||
          typeof(obj.comAddCouId) !== "number"
        ) {
          isValid = false;
        } else {
          objData.data.comAddCouId = 1;// 1 = Brasil // Number(obj.comAddCouId);
        }
        utils.devLog(2, 'comAddCouId -> '+isValid, null);

        // comAddStaId
        obj.comAddStaId = Number(obj.comAddStaId);
        if (
          obj.comAddStaId === undefined ||
          obj.comAddStaId === "" ||
          obj.comAddStaId === null ||
          isNaN(obj.comAddStaId) ||
          typeof(obj.comAddStaId) !== "number"
        ) {
          isValid = false;
        } else {
          objData.data.comAddStaId = Number(obj.comAddStaId);
        }
        utils.devLog(2, 'comAddStaId -> '+isValid, null);

        // comAddCitId
        obj.comAddCitId = Number(obj.comAddCitId);
        if (
          obj.comAddCitId === undefined ||
          obj.comAddCitId === "" ||
          obj.comAddCitId === null ||
          isNaN(obj.comAddCitId) ||
          typeof(obj.comAddCitId) !== "number"
        ) {
          isValid = false;
        } else {
          objData.data.comAddCitId = Number(obj.comAddCitId);
        }
        utils.devLog(2, 'comAddCitId -> '+isValid, null);

        // comConPhone1
        if (
          obj.comConPhone1 === undefined ||
          obj.comConPhone1 === "" ||
          obj.comConPhone1 === null ||
          typeof(obj.comConPhone1) !== "string"||
          (obj.comConPhone1.length !== 10 && obj.comConPhone1.length !== 11 )
        ) {
          isValid = false;
        } else {
          objData.data.comConPhone1 = obj.comConPhone1;
        }
        utils.devLog(2, 'comConPhone1 -> '+isValid, null);

        // comConPhone2
        if (obj.comConPhone2 === undefined ||
          obj.comConPhone2 === null) {
          objData.data.comConPhone2 = null;
        } else {
          if (
            obj.comConPhone2 === "" ||
            obj.comConPhone2 === null ||
            typeof(obj.comConPhone2) !== "string"||
            (obj.comConPhone2.length !== 10 && obj.comConPhone2.length !== 11 )
          ) {
            isValid = false;
          } else {
            objData.data.comConPhone2 = obj.comConPhone2;
          }
        }
        utils.devLog(2, 'comConPhone2 -> '+isValid, null);

        // comConEmail
        if (
          obj.comConEmail === undefined ||
          obj.comConEmail === "" ||
          obj.comConEmail === null ||
          typeof(obj.comConEmail) !== "string"
        ) {
          isValid = false;
        } else {
          objData.data.comConEmail = obj.comConEmail;
        }
        utils.devLog(2, 'comConEmail -> '+isValid, null);

        // comObservations
        if (obj.comObservations === undefined||
          obj.comObservations === null) {
          objData.data.comObservations = null;
        } else {
          if (
            obj.comObservations === "" ||
            obj.comObservations === null ||
            typeof(obj.comObservations) !== "string"
          ) {
            isValid = false;
          } else {
            objData.data.comObservations = obj.comObservations;
          }
        }
        utils.devLog(2, 'comObservations -> '+isValid, null);

        // comCreated
        // objData.data.comCreated = new Date();

        // comUpdated
        // objData.data.comUpdated = new Date();

        // comDeleted
        // objData.data.comDeleted = null;

        utils.devLog(2, 'Finish -> '+isValid, null);

        return isValid;
      } catch (error) {
        return false;
      }
    }
  }

  companiesGetAll = async ({body,params}, res) => {
    try {
      const perId = "A002";
      const logMsg = "API ==> Controller => companiesGetAll -> Start";
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
      if (objResAuth.resData.useKeyCompany !== 0) {
        filter.id = objResAuth.resData.useKeyCompany;
      }
      const resCompaniesGetAll = await COMPANIES.findAll({
        where: filter,
        order: [
          ['id', 'ASC'],
        ],
        // include: [ { model: CONFIG_COUNTRIES, as: 'CONFIG_COUNTRIES' },{ model: CONFIG_STATES, as: 'CONFIG_STATES' },{ model: CONFIG_CITIES, as: 'CONFIG_CITIES' }]
      });

      LogsController.logsCreate(useId, perId, logMsg, `=> [${useId}] # Empresa: Listagem geral ## [geral]`, null);
      return utils.resSuccess('API ==> Controller => companiesGetAll -> Success', resCompaniesGetAll, res );
    } catch (error) {
      return utils.resError(500,`API ==> Controller => companiesGetAll -> Error`, error, res);
    }
  }

  companiesGetId = async ({body,params}, res) => {
    const objData = { idMain: undefined, id: undefined, data: {} };

    try {
      const perId = "A003";
      const logMsg = "API ==> Controller => companiesGetId -> Start";
      const { useId } = body;

      utils.devLog(0, logMsg, null);
      const objResAuth = await UsersController.usersPermission(useId,perId);
      if (!objResAuth.resData.permission) {
        utils.devLog(2, "API ==> Permission -> FALSE", null);
        return utils.resError(403, objResAuth.resMessage, { perId: objResAuth.resData.perId }, res );
      }
      utils.devLog(2, "API ==> Permission -> TRUE", null);

      // Function Controller Action
      let { comId } = params;
      if (!validateParameters(comId)) {
        return utils.resError(400,`API ==> Controller => companiesGetId -> Invalid parameters`, null, res);
      }
      
      const resCompaniesGetId = await COMPANIES.findByPk(objData.id,{
        include: [ { model: CONFIG_COUNTRIES, as: 'CONFIG_COUNTRIES' },{ model: CONFIG_STATES, as: 'CONFIG_STATES' },{ model: CONFIG_CITIES, as: 'CONFIG_CITIES' }]
      });

      if (resCompaniesGetId) {
        if (objResAuth.resData.useKeyCompany !== 0) {
          if (resCompaniesGetId.id !== objResAuth.resData.useKeyCompany) {
            return utils.resError(403, "API ==> Controller => usersPermission -> Forbidden byId", null, res );
          }
        }
        LogsController.logsCreate(useId, perId, logMsg, `=> [${useId}] # Empresa: Consultada ## [${objData.id}] ${resCompaniesGetId.comName}`, objData.id);
        return utils.resSuccess('API ==> Controller => companiesGetId -> Success',resCompaniesGetId, res);    
      } else {
        return utils.resError(404,`API ==> Controller => companiesGetId -> Not found`, null, res);
      }
    } catch (error) {
      return utils.resError(500,`API ==> Controller => companiesGetId -> Error`, error, res);
    }

    function validateParameters(comId) {
      try {
        let isValid = true;

        // comId
        comId = Number(comId);
        if (
          comId === undefined ||
          comId === "" ||
          comId === null ||
          isNaN(comId) ||
          typeof(comId) !== "number"
        ) {
          isValid = false;
        } else {
          objData.id = comId;
        }

        return isValid;
      } catch (error) {
        return false;
      }
    }
  }

  companiesPut = async ({body,params}, res) => {
    const objData = { idMain: undefined, id: undefined, data: {} };

    try {
      const perId = "A004";
      const logMsg = "API ==> Controller => companiesPut -> Start";
      const { useId } = body;

      utils.devLog(0, logMsg, null);
      const objResAuth = await UsersController.usersPermission(useId,perId);
      if (!objResAuth.resData.permission) {
        utils.devLog(2, "API ==> Permission -> FALSE", null);
        return utils.resError(403, objResAuth.resMessage, { perId: objResAuth.resData.perId }, res );
      }
      utils.devLog(2, "API ==> Permission -> TRUE", null);

      // Function Controller Action
      let { comId } = params;
      utils.devLog(2, null, comId);
      utils.devLog(2, null, body);
      if (!validateParameters(comId, body)) {
        return utils.resError(400,`API ==> Controller => companiesPut -> Invalid parameters`, null, res);
      }
      
      utils.devLog(2, "API ==> Controller => companiesPut : objData", null);
      utils.devLog(2, null, objData);

      // Check Companies
      const resCompaniesGetId = await COMPANIES.findByPk(objData.id,{});
      if (resCompaniesGetId) {
        // Verifica se usuário possui permissão geral sobre as empresas
        if (objResAuth.resData.useKeyCompany !== 0) {
          if (resCompaniesGetId.id !== objResAuth.resData.useKeyCompany) {
            return utils.resError(403, "API ==> Controller => usersPermission -> Forbidden byId", null, res );
          }
        }
      } else {
        return utils.resError(404,`API ==> Controller => companiesPut -> companiesGetId -> Not found`, null, res);
      }

      // Check unique key => comCnpj
      if (objData.data.comCnpj !== resCompaniesGetId.comCnpj) {
        const resCompaniesGetAllbyUnique = await COMPANIES.findAll({
          where: {
            comCnpj: objData.data.comCnpj
          }
        });
        utils.devLog(2, null, resCompaniesGetAllbyUnique);
        if (resCompaniesGetAllbyUnique.length > 0) {
          return utils.resError(409, "API ==> Controller => companiesPost -> Unique-key conflict", null, res );
        }
      }

      // Update Companies
      const resCompaniesPut = await resCompaniesGetId.update(objData.data);

      LogsController.logsCreate(useId, perId, logMsg, `=> [${useId}] # Empresa: Atualizada ## [${objData.id}] ${resCompaniesGetId.comName}`, objData.id);
      return utils.resSuccess('API ==> Controller => companiesPut -> Success',{comId: objData.id }, res);    

    } catch (error) {
      return utils.resError(500,`API ==> Controller => companiesPut -> Error`, error, res);
    }

    function validateParameters(comId, obj) {
      try {
        let isValid = true;

        // comId
        comId = Number(comId);
        if (
          comId === undefined ||
          comId === "" ||
          comId === null ||
          isNaN(comId) ||
          typeof(comId) !== "number"
        ) {
          isValid = false;
        } else {
          objData.id = comId;
        }
        utils.devLog(2, 'comId -> '+isValid, null);

        // comName
        if (
          obj.comName === undefined ||
          obj.comName === "" ||
          obj.comName === null ||
          typeof(obj.comName) !== "string"
        ) {
          isValid = false;
        } else {
          objData.data.comName = obj.comName;
        }
        utils.devLog(2, 'comName -> '+isValid, null);

        // comNameCompany
        if (
          obj.comNameCompany === undefined ||
          obj.comNameCompany === "" ||
          obj.comNameCompany === null ||
          typeof(obj.comNameCompany) !== "string"
        ) {
          isValid = false;
        } else {
          objData.data.comNameCompany = obj.comNameCompany;
        }
        utils.devLog(2, 'comNameCompany -> '+isValid, null);

        // comCnpj
        if (
          obj.comCnpj === undefined ||
          obj.comCnpj === "" ||
          obj.comCnpj === null ||
          typeof(obj.comCnpj) !== "string"||
          obj.comCnpj.length !== 14 ||
          !utils.validateCnpj(obj.comCnpj)
        ) {
          isValid = false;
        } else {
          objData.data.comCnpj = obj.comCnpj;
        }
        utils.devLog(2, 'comCnpj -> '+isValid, null);

        // comRegistrationState
        if (obj.comRegistrationState === undefined ||
            obj.comRegistrationState === null) {
          objData.data.comRegistrationState = null;
        } else {
          if (
            obj.comRegistrationState === "" ||
            typeof(obj.comRegistrationState) !== "string"
          ) {
            isValid = false;
          } else {
            objData.data.comRegistrationState = obj.comRegistrationState;
          }
        }
        utils.devLog(2, 'comRegistrationState -> '+isValid, null);

        // comRegistrationMunicipal
        if (obj.comRegistrationMunicipal === undefined ||
          obj.comRegistrationMunicipal === null) {
          objData.data.comRegistrationMunicipal = null;
        } else {
          if (
            obj.comRegistrationMunicipal === "" ||
            typeof(obj.comRegistrationMunicipal) !== "string"
          ) {
            isValid = false;
          } else {
            objData.data.comRegistrationMunicipal = obj.comRegistrationMunicipal;
          }
        }
        utils.devLog(2, 'comRegistrationMunicipal -> '+isValid, null);

        // comAddCep
        if (
          obj.comAddCep === undefined ||
          obj.comAddCep === "" ||
          obj.comAddCep === null ||
          typeof(obj.comAddCep) !== "string" ||
          obj.comAddCep.length !== 8
        ) {
          isValid = false;
        } else {
          objData.data.comAddCep = obj.comAddCep;
        }
        utils.devLog(2, 'comAddCep -> '+isValid, null);

        // comAddAddress
        if (
          obj.comAddAddress === undefined ||
          obj.comAddAddress === "" ||
          obj.comAddAddress === null ||
          typeof(obj.comAddAddress) !== "string"
        ) {
          isValid = false;
        } else {
          objData.data.comAddAddress = obj.comAddAddress;
        }
        utils.devLog(2, 'comAddAddress -> '+isValid, null);

        // comAddComplement
        if (obj.comAddComplement === undefined ||
          obj.comAddComplement === null) {
          objData.data.comAddComplement = null;
        } else {
          if (
            obj.comAddComplement === "" ||
            typeof(obj.comAddComplement) !== "string"
          ) {
            isValid = false;
          } else {
            objData.data.comAddComplement = obj.comAddComplement;
          }
        }
        utils.devLog(2, 'comAddComplement -> '+isValid, null);

        // comAddNumber
        if (obj.comAddNumber === undefined ||
          obj.comAddNumber === null) {
          objData.data.comAddNumber = null;
        } else {
          if (
            obj.comAddNumber === "" ||
            typeof(obj.comAddNumber) !== "string"
          ) {
            isValid = false;
          } else {
            objData.data.comAddNumber = obj.comAddNumber;
          }
        }
        utils.devLog(2, 'comAddNumber -> '+isValid, null);

        // comAddDistrict
        if (
          obj.comAddDistrict === undefined ||
          obj.comAddDistrict === "" ||
          obj.comAddDistrict === null ||
          typeof(obj.comAddDistrict) !== "string"
        ) {
          isValid = false;
        } else {
          objData.data.comAddDistrict = obj.comAddDistrict;
        }
        utils.devLog(2, 'comAddDistrict -> '+isValid, null);

        // comAddCouId
        obj.comAddCouId = Number(obj.comAddCouId);
        if (
          obj.comAddCouId === undefined ||
          obj.comAddCouId === "" ||
          obj.comAddCouId === null ||
          isNaN(obj.comAddCouId) ||
          typeof(obj.comAddCouId) !== "number"
        ) {
          isValid = false;
        } else {
          objData.data.comAddCouId = 1;// 1 = Brasil // Number(obj.comAddCouId);
        }
        utils.devLog(2, 'comAddCouId -> '+isValid, null);

        // comAddStaId
        obj.comAddStaId = Number(obj.comAddStaId);
        if (
          obj.comAddStaId === undefined ||
          obj.comAddStaId === "" ||
          obj.comAddStaId === null ||
          isNaN(obj.comAddStaId) ||
          typeof(obj.comAddStaId) !== "number"
        ) {
          isValid = false;
        } else {
          objData.data.comAddStaId = Number(obj.comAddStaId);
        }
        utils.devLog(2, 'comAddStaId -> '+isValid, null);

        // comAddCitId
        obj.comAddCitId = Number(obj.comAddCitId);
        if (
          obj.comAddCitId === undefined ||
          obj.comAddCitId === "" ||
          obj.comAddCitId === null ||
          isNaN(obj.comAddCitId) ||
          typeof(obj.comAddCitId) !== "number"
        ) {
          isValid = false;
        } else {
          objData.data.comAddCitId = Number(obj.comAddCitId);
        }
        utils.devLog(2, 'comAddCitId -> '+isValid, null);

        // comConPhone1
        if (
          obj.comConPhone1 === undefined ||
          obj.comConPhone1 === "" ||
          obj.comConPhone1 === null ||
          typeof(obj.comConPhone1) !== "string"||
          (obj.comConPhone1.length !== 10 && obj.comConPhone1.length !== 11 )
        ) {
          isValid = false;
        } else {
          objData.data.comConPhone1 = obj.comConPhone1;
        }
        utils.devLog(2, 'comConPhone1 -> '+isValid, null);

        // comConPhone2
        if (obj.comConPhone2 === undefined ||
          obj.comConPhone2 === null) {
          objData.data.comConPhone2 = null;
        } else {
          if (
            obj.comConPhone2 === "" ||
            obj.comConPhone2 === null ||
            typeof(obj.comConPhone2) !== "string"||
            (obj.comConPhone2.length !== 10 && obj.comConPhone2.length !== 11 )
          ) {
            isValid = false;
          } else {
            objData.data.comConPhone2 = obj.comConPhone2;
          }
        }
        utils.devLog(2, 'comConPhone2 -> '+isValid, null);

        // comConEmail
        if (
          obj.comConEmail === undefined ||
          obj.comConEmail === "" ||
          obj.comConEmail === null ||
          typeof(obj.comConEmail) !== "string"
        ) {
          isValid = false;
        } else {
          objData.data.comConEmail = obj.comConEmail;
        }
        utils.devLog(2, 'comConEmail -> '+isValid, null);

        // comObservations
        if (obj.comObservations === undefined||
          obj.comObservations === null) {
          objData.data.comObservations = null;
        } else {
          if (
            obj.comObservations === "" ||
            obj.comObservations === null ||
            typeof(obj.comObservations) !== "string"
          ) {
            isValid = false;
          } else {
            objData.data.comObservations = obj.comObservations;
          }
        }
        utils.devLog(2, 'comObservations -> '+isValid, null);

        // comCreated
        // objData.data.comCreated = new Date();

        // comUpdated
        // objData.data.comUpdated = new Date();

        // comDeleted
        // objData.data.comDeleted = null;

        // console.log(isValid);

        return isValid;
      } catch (error) {
        return false;
      }
    }
  }

  companiesPatch = async ({body,params}, res) => {
    const objData = { idMain: undefined, id: undefined, data: {} };

    try {
      const perId = "A005";
      const logMsg = "API ==> Controller => companiesPatch -> Start";
      const { useId } = body;

      utils.devLog(0, logMsg, null);
      const objResAuth = await UsersController.usersPermission(useId,perId);
      if (!objResAuth.resData.permission) {
        utils.devLog(2, "API ==> Permission -> FALSE", null);
        return utils.resError(403, objResAuth.resMessage, { perId: objResAuth.resData.perId }, res );
      }
      utils.devLog(2, "API ==> Permission -> TRUE", null);

      // Function Controller Action
      let { comId } = params;
      utils.devLog(2, null, comId);
      utils.devLog(2, null, body);
      if (!validateParameters(comId, body)) {
        return utils.resError(400,`API ==> Controller => companiesPatch -> Invalid parameters`, null, res);
      }
      
      utils.devLog(2, "API ==> Controller => companiesPatch : objData", null);
      utils.devLog(2, null, objData);

      // Check Companies
      const resCompaniesGetId = await COMPANIES.findByPk(objData.id,{});
      if (resCompaniesGetId) {
        // Verifica se usuário possui permissão geral sobre as empresas
        if (objResAuth.resData.useKeyCompany !== 0) {
          if (resCompaniesGetId.id !== objResAuth.resData.useKeyCompany) {
            return utils.resError(403, "API ==> Controller => usersPermission -> Forbidden byId", null, res );
          }
        }
      } else {
        return utils.resError(404,`API ==> Controller => companiesPatch -> companiesGetId -> Not found`, null, res);
      }

      // Update Companies
      const resCompaniesPatch = await resCompaniesGetId.update(objData.data);

      LogsController.logsCreate(useId, perId, logMsg, `=> [${useId}] # Empresa: Atualizada [status] ## [${objData.id}] ${resCompaniesGetId.comName}`, objData.id);
      return utils.resSuccess('API ==> Controller => companiesPatch -> Success',{comId: objData.id }, res);    

    } catch (error) {
      return utils.resError(500,`API ==> Controller => companiesPatch -> Error`, error, res);
    }

    function validateParameters(comId, obj) {
      try {
        let isValid = true;

        // comId
        comId = Number(comId);
        if (
          comId === undefined ||
          comId === "" ||
          comId === null ||
          isNaN(comId) ||
          typeof(comId) !== "number"
        ) {
          isValid = false;
        } else {
          objData.id = comId;
        }
        utils.devLog(2, null, isValid);

        // comStatus
        if (
          obj.comStatus === undefined ||
          obj.comStatus === "" ||
          obj.comStatus === null ||
          typeof(obj.comStatus) !== "boolean"
        ) {
          isValid = false;
        } else {
          objData.data.comStatus = obj.comStatus;
        }
        utils.devLog(2, null, isValid);

        // comCreated
        // objData.data.comCreated = new Date();

        // comUpdated
        // objData.data.comUpdated = new Date();

        // comDeleted
        // objData.data.comDeleted = null;

        // console.log(isValid);

        return isValid;
      } catch (error) {
        return false;
      }
    }
  }

  companiesDelete = async ({body,params}, res) => {
    const objData = { idMain: undefined, id: undefined, data: {} };

    try {
      const perId = "A006";
      const logMsg = "API ==> Controller => companiesDelete -> Start";
      const { useId } = body;

      utils.devLog(0, logMsg, null);
      const objResAuth = await UsersController.usersPermission(useId,perId);
      if (!objResAuth.resData.permission) {
        utils.devLog(2, "API ==> Permission -> FALSE", null);
        return utils.resError(403, objResAuth.resMessage, { perId: objResAuth.resData.perId }, res );
      }
      utils.devLog(2, "API ==> Permission -> TRUE", null);

      // Function Controller Action
      let { comId } = params;
      if (!validateParameters(comId)) {
        return utils.resError(400,`API ==> Controller => companiesDelete -> Invalid parameters`, null, res);
      }
      
      utils.devLog(2, "API ==> Controller => companiesDelete : objData", null);
      utils.devLog(2, null, objData);

      // Check Companies
      const resCompaniesGetId = await COMPANIES.findByPk(objData.id,{});
      if (resCompaniesGetId) {
        // Verifica se usuário possui permissão geral sobre as empresas
        if (objResAuth.resData.useKeyCompany !== 0) {
          if (resCompaniesGetId.id !== objResAuth.resData.useKeyCompany) {
            return utils.resError(403, "API ==> Controller => usersPermission -> Forbidden byId", null, res );
          }
        }
      } else {
        return utils.resError(404,`API ==> Controller => companiesDelete -> companiesGetId -> Not found`, null, res);
      }

      const resCompaniesDelete = await resCompaniesGetId.destroy();

      LogsController.logsCreate(useId, perId, logMsg, `=> [${useId}] # Empresa: Deletada ## [${objData.id}] ${resCompaniesGetId.comName}`, objData.id);
      return utils.resSuccess('API ==> Controller => companiesDelete -> Success',{comId: objData.id }, res);    

    } catch (error) {
      return utils.resError(500,`API ==> Controller => companiesDelete -> Error`, error, res);
    }

    function validateParameters(comId) {
      try {
        let isValid = true;

        // comId
        comId = Number(comId);
        if (
          comId === undefined ||
          comId === "" ||
          comId === null ||
          isNaN(comId) ||
          typeof(comId) !== "number"
        ) {
          isValid = false;
        } else {
          objData.id = comId;
        }

        return isValid;
      } catch (error) {
        return false;
      }
    }
  }

}

module.exports = new CompaniesController(); 