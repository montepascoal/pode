/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// CONTROLLER USER /////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//  --------------------------------------------------------------------------------------------------------------------------------------- Modules -----

const { Op } = require("sequelize");
const utils = require("../utils/utils.js");

const {
  EMPLOYEES,
  EMPLOYEES_MEMBERS,
  CONFIG_COUNTRIES,
  CONFIG_STATES,
  CONFIG_CITIES,
  CONFIG_EMPLOYEES_DEPARTMENTS,
  CONFIG_EMPLOYEES_OCCUPATIONS,
  PROVIDERS,
  CONFIG_PROVIDERS_SERVICES,
  PROVIDERS_CONTACTS,
  REL_PROVIDERS_SERVICES,
} = require("../models");

const LogsController = require('./LogsController');
const UsersController = require('./UsersController');

//  ------------------------------------------------------------------------------------------------------------------------------------- Class API -----
class ProvidersServicesController {

  constructor() {
    //   this.step1 = this.step1.bind(this);
    //   this.step2 = this.step2.bind(this);
  }

  providersServicesPatch = async ({body,params}, res) => {
    const objData = { idMain: undefined, id: undefined, data: {} };

    try {
      const perId = "D004";
      const logMsg = "API ==> Controller => providersServicesPatch -> Start";
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
      let { lstServices } = body;
      utils.devLog(2, null, proId);
      utils.devLog(2, null, body);
      if (!validateParameters(proId, lstServices)) {
        return utils.resError(400,`API ==> Controller => providersServicesPatch -> Invalid parameters`, null, res);
      }

      utils.devLog(2, "API ==> Controller => providersServicesPatch : objData", null);
      utils.devLog(2, null, objData);

      // Check Employees
      const resProvidersGetId = await PROVIDERS.findByPk(objData.idMain, {});
      if (resProvidersGetId) {
        // Verifica se usuário possui permissão geral sobre as empresas
        // if (objResAuth.resData.useKeyCompany !== 0) {
        //   // Verifica se o registro que deseja alterar pertente a empresa que possui permissão
        //   if (resProvidersGetId.comId !== objResAuth.resData.useKeyCompany) {
        //     return utils.resError(403, "API ==> Controller => usersPermission -> Forbidden byId", null, res );
        //   }
        // }
      } else {
        return utils.resError(404,`API ==> Controller => providersServicesPatch -> providersGetId -> Not found`, null, res);
      }

      // Check Providers Services
      let lstPromiseCheckProvidersServices = [];
      objData.data.lstServices.map( (item,i) => {
        lstPromiseCheckProvidersServices.push(CONFIG_PROVIDERS_SERVICES.findByPk(item, {}));
      });

      let resCheckProvidersServicesOK = true;
      const resProvidersServicesGetIdAll = await Promise.all(lstPromiseCheckProvidersServices);
      resProvidersServicesGetIdAll.map((item,i) => {
        if (item) {
          if (!item.serStatus) {
            resCheckProvidersServicesOK = false;
          }
        } else {
          resCheckProvidersServicesOK = false;
        }
      })
      if (!resCheckProvidersServicesOK) {
        return utils.resError(404,`API ==> Controller => providersServicesPatch -> providersServicesGetId -> Not found`, null, res);
      }

      // Update DATA
      const resProvidersServicesPatch = await resProvidersGetId.setPROVIDERS_SERVICES(objData.data.lstServices);

      LogsController.logsCreate(useId, perId, logMsg, `=> [${useId}] # Fornecedor (Serviços): Cadastrado ## [${objData.idMain}] ${resProvidersGetId.conName}`, objData.idMain);
      return utils.resSuccess('API ==> Controller => providersServicesPatch -> Success', { proId: objData.idMain }, res);    

    } catch (error) {
      return utils.resError(500,`API ==> Controller => providersServicesPatch -> Error`, error, res);
    }

    function validateParameters(proId, lstServices) {
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
          objData.idMain = Number(proId);
          objData.data.proId = Number(proId);
        }
        utils.devLog(2, 'proId -> '+isValid, null);

        // lstServices
        lstServices.map( (item,i) => {
          utils.devLog(2, 'lstServices [tmp] 1 -> '+isValid, null);
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
        if (lstServices.length > 0) {
          utils.devLog(2, 'lstServices [tmp] 2 -> '+isValid, null);
          objData.data.lstServices = lstServices;
        } else {
          isValid = false;
          // objData.data.lstServices = [];
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
        console.error(error);
        return false;
      }
    }
  }

  providersServicesGetAll = async ({body,params}, res) => {
    const objData = { idMain: undefined, id: undefined, data: {} };

    try {
      const perId = "D003";
      const logMsg = "API ==> Controller => providersServicesGetAll -> Start";
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
      let { proId } = params;
      if (!validateParameters(proId)) {
        return utils.resError(400,`API ==> Controller => providersServicesGetId -> Invalid parameters`, null, res);
      }

      // Check Providers
      const resProvidersGetId = await PROVIDERS.findByPk(objData.idMain, {});
      if (resProvidersGetId) {
        // Verifica se usuário possui permissão geral sobre as empresas
        // if (objResAuth.resData.useKeyCompany !== 0) {
        //   // Verifica se o registro que deseja alterar pertente a empresa que possui permissão
        //   if (resProvidersGetId.comId !== objResAuth.resData.useKeyCompany) {
        //     return utils.resError(403, "API ==> Controller => usersPermission -> Forbidden byId", null, res );
        //   }
        // }
      } else {
        return utils.resError(404,`API ==> Controller => providersServicesGetAll -> providersGetId -> Not found`, null, res);
      }

      // Check filters
      const filters = [];
        filters.push({proId: objData.idMain});
        // filters.push({conStatus: false});
      const objFilter = {
        [Op.and]: filters
      };
      const resProvidersServicesGetAll = await REL_PROVIDERS_SERVICES.findAll({
        where: objFilter,
        order: [
          ['id', 'ASC'],
        ],
        include: [
          'PROVIDERS_SERVICES',
        ],
        // attributes: ['id', 'proId', 'serId']
      });

      LogsController.logsCreate(useId, perId, logMsg, `=> [${useId}] # Fornecedor (Serviços): Listagem geral ## [geral]`, null);
      return utils.resSuccess('API ==> Controller => providersServicesGetAll -> Success', resProvidersServicesGetAll, res );
    } catch (error) {
      return utils.resError(500,`API ==> Controller => providersServicesGetAll -> Error`, error, res);
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
          objData.idMain = Number(proId);
        }

        return isValid;
      } catch (error) {
        return false;
      }
    }
  }

}

module.exports = new ProvidersServicesController();
