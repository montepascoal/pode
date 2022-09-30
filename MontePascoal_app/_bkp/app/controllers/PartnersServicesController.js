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
  PARTNERS,
  CONFIG_PARTNERS_SERVICES,
  PARTNERS_CONTACTS,
  REL_PARTNERS_SERVICES,
} = require("../models");

const LogsController = require('./LogsController');
const UsersController = require('./UsersController');

//  ------------------------------------------------------------------------------------------------------------------------------------- Class API -----
class PartnersServicesController {

  constructor() {
    //   this.step1 = this.step1.bind(this);
    //   this.step2 = this.step2.bind(this);
  }

  partnersServicesPatch = async ({body,params}, res) => {
    const objData = { idMain: undefined, id: undefined, data: {} };

    try {
      const perId = "D004";
      const logMsg = "API ==> Controller => partnersServicesPatch -> Start";
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
      let { lstServices } = body;
      utils.devLog(2, null, parId);
      utils.devLog(2, null, body);
      if (!validateParameters(parId, lstServices)) {
        return utils.resError(400,`API ==> Controller => partnersServicesPatch -> Invalid parameters`, null, res);
      }

      utils.devLog(2, "API ==> Controller => partnersServicesPatch : objData", null);
      utils.devLog(2, null, objData);

      // Check Employees
      const resPartnersGetId = await PARTNERS.findByPk(objData.idMain, {});
      if (resPartnersGetId) {
        // Verifica se usuário possui permissão geral sobre as empresas
        // if (objResAuth.resData.useKeyCompany !== 0) {
        //   // Verifica se o registro que deseja alterar pertente a empresa que possui permissão
        //   if (resPartnersGetId.comId !== objResAuth.resData.useKeyCompany) {
        //     return utils.resError(403, "API ==> Controller => usersPermission -> Forbidden byId", null, res );
        //   }
        // }
      } else {
        return utils.resError(404,`API ==> Controller => partnersServicesPatch -> partnersGetId -> Not found`, null, res);
      }

      // Check Partners Services
      let lstPromiseCheckPartnersServices = [];
      objData.data.lstServices.map( (item,i) => {
        lstPromiseCheckPartnersServices.push(CONFIG_PARTNERS_SERVICES.findByPk(item, {}));
      });

      let resCheckPartnersServicesOK = true;
      const resPartnersServicesGetIdAll = await Promise.all(lstPromiseCheckPartnersServices);
      resPartnersServicesGetIdAll.map((item,i) => {
        if (item) {
          if (!item.serStatus) {
            resCheckPartnersServicesOK = false;
          }
        } else {
          resCheckPartnersServicesOK = false;
        }
      })
      if (!resCheckPartnersServicesOK) {
        return utils.resError(404,`API ==> Controller => partnersServicesPatch -> partnersServicesGetId -> Not found`, null, res);
      }

      // Update DATA
      const resPartnersServicesPatch = await resPartnersGetId.setPARTNERS_SERVICES(objData.data.lstServices);

      LogsController.logsCreate(useId, perId, logMsg, `=> [${useId}] # Fornecedor (Serviços): Cadastrado ## [${objData.idMain}] ${resPartnersGetId.conName}`, objData.idMain);
      return utils.resSuccess('API ==> Controller => partnersServicesPatch -> Success', { parId: objData.idMain }, res);    

    } catch (error) {
      return utils.resError(500,`API ==> Controller => partnersServicesPatch -> Error`, error, res);
    }

    function validateParameters(parId, lstServices) {
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
          objData.idMain = Number(parId);
          objData.data.parId = Number(parId);
        }
        utils.devLog(2, 'parId -> '+isValid, null);

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

        // parCreated
        // objData.data.parCreated = new Date();

        // parUpdated
        // objData.data.parUpdated = new Date();

        // parDeleted
        // objData.data.parDeleted = null;

        utils.devLog(2, 'Finish -> '+isValid, null);

        return isValid;
      } catch (error) {
        console.error(error);
        return false;
      }
    }
  }

  partnersServicesGetAll = async ({body,params}, res) => {
    const objData = { idMain: undefined, id: undefined, data: {} };

    try {
      const perId = "D003";
      const logMsg = "API ==> Controller => partnersServicesGetAll -> Start";
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
      let { parId } = params;
      if (!validateParameters(parId)) {
        return utils.resError(400,`API ==> Controller => partnersServicesGetId -> Invalid parameters`, null, res);
      }

      // Check Partners
      const resPartnersGetId = await PARTNERS.findByPk(objData.idMain, {});
      if (resPartnersGetId) {
        // Verifica se usuário possui permissão geral sobre as empresas
        // if (objResAuth.resData.useKeyCompany !== 0) {
        //   // Verifica se o registro que deseja alterar pertente a empresa que possui permissão
        //   if (resPartnersGetId.comId !== objResAuth.resData.useKeyCompany) {
        //     return utils.resError(403, "API ==> Controller => usersPermission -> Forbidden byId", null, res );
        //   }
        // }
      } else {
        return utils.resError(404,`API ==> Controller => partnersServicesGetAll -> partnersGetId -> Not found`, null, res);
      }

      // Check filters
      const filters = [];
        filters.push({parId: objData.idMain});
        // filters.push({conStatus: false});
      const objFilter = {
        [Op.and]: filters
      };
      const resPartnersServicesGetAll = await REL_PARTNERS_SERVICES.findAll({
        where: objFilter,
        order: [
          ['id', 'ASC'],
        ],
        include: [
          'PARTNERS_SERVICES',
        ],
        // attributes: ['id', 'parId', 'parId']
      });

      LogsController.logsCreate(useId, perId, logMsg, `=> [${useId}] # Fornecedor (Serviços): Listagem geral ## [geral]`, null);
      return utils.resSuccess('API ==> Controller => partnersServicesGetAll -> Success', resPartnersServicesGetAll, res );
    } catch (error) {
      return utils.resError(500,`API ==> Controller => partnersServicesGetAll -> Error`, error, res);
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
          objData.idMain = Number(parId);
        }

        return isValid;
      } catch (error) {
        return false;
      }
    }
  }

}

module.exports = new PartnersServicesController();
