/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// CONTROLLER USER /////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//  --------------------------------------------------------------------------------------------------------------------------------------- Modules -----

const { Op } = require("sequelize");
const utils = require('../utils/utils.js');

const { CONFIG_PARTNERS_SERVICES } = require('../models');

const LogsController = require('./LogsController');
const UsersController = require('./UsersController');

//  ------------------------------------------------------------------------------------------------------------------------------------- Class API -----
class ConfigPartnersServicesController {

  constructor(){
  //   this.step1 = this.step1.bind(this);
  //   this.step2 = this.step2.bind(this);
  }

  servicesPost = async ({body,params}, res) => {
    const objData = { idMain: undefined, idSecondary: undefined, idTertiary: undefined, id: undefined, data: {} };

    try {
      const perId = "Z004";

      utils.devLog(0, `API ==> Controller => servicesPost -> Start`, null);
      
      const { useId } = body;


      const objResAuth = await UsersController.usersPermission(useId,perId);
      if (!objResAuth.resData.permission) {
        utils.devLog(2, "API ==> Permission -> FALSE", null);
        return utils.resError(403, objResAuth.resMessage, { perId: objResAuth.resData.perId }, res );
      }
      utils.devLog(2, "API ==> Permission -> TRUE", null);

      // Function Controller Action
      // let { serId } = params;
      // utils.devLog(2, 'serId', serId);
      utils.devLog(2, 'body', body);
      if (!validateParameters(body)) {
        return utils.resError(400,`API ==> Controller => servicesPost -> Invalid parameters`, null, res);
      }

      utils.devLog(2, 'API ==> Controller => servicesPost : objData', objData);

      // Create Services
      utils.devLog(2, "API ==> Controller => servicesPost -> Update Services", null);
      const resServicesPost = await CONFIG_PARTNERS_SERVICES.create(objData.data);
      objData.idMain = resServicesPost.dataValues.id;

      LogsController.logsCreate(useId, perId, `API ==> Controller => servicesPost -> Success`, `=> [${useId}] # Config: Colaboradores: Departamentos: Cadastrado ## [${objData.idMain}] ${objData.data.serName}`, objData.idMain);
      return utils.resSuccess('API ==> Controller => servicesPost -> Success',{serId: objData.idMain }, res);    

    } catch (error) {
      return utils.resError(500,`API ==> Controller => servicesPost -> Error`, error, res);
    }

    function validateParameters(obj) {
      try {
        let isValid = true;

        // serName
        if (
          obj.serName === undefined ||
          obj.serName === "" ||
          obj.serName === null ||
          typeof(obj.serName) !== "string"
        ) {
          isValid = false;
        } else {
          objData.data.serName = obj.serName;
        }
        utils.devLog(2, 'serName -> '+isValid, null);

        // serDescription
        if (
          obj.serDescription === undefined ||
          obj.serDescription === "" ||
          obj.serDescription === null ||
          typeof(obj.serDescription) !== "string"
        ) {
          isValid = false;
        } else {
          objData.data.serDescription = obj.serDescription;
        }
        utils.devLog(2, 'serDescription -> '+isValid, null);

        // serStatus
        objData.data.serStatus = true;
        utils.devLog(2, 'serStatus -> '+isValid, null);

        return isValid;
      } catch (error) {
        return false;
      }
    }
  }

  servicesGetAll = async ({body,params}, res) => {
    const objData = { idMain: undefined, idSecondary: undefined, idTertiary: undefined, id: undefined, data: {} };
    
    try {
      const perId = "Z004";

      utils.devLog(0, `API ==> Controller => servicesGetAll -> Start`, null);
      
      const { useId } = body;

      // utils.devLog(2, null, useId);
      const objResAuth = await UsersController.usersPermission(useId,perId);
      if (!objResAuth.resData.permission) {
        utils.devLog(2, "API ==> Permission -> FALSE", null);
        return utils.resError(403, objResAuth.resMessage, {perId: objResAuth.resData.perId}, res );
      }
      utils.devLog(2, "API ==> Permission -> TRUE", null);

      // Check companies permissions
      const filter = {};
      // if (objResAuth.resData.useKeyCompany !== 0) {
      //   filter.comId = objResAuth.resData.useKeyCompany;
      // }
      const resServicesGetAll = await CONFIG_PARTNERS_SERVICES.findAll({
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
          // 'CLIENTS_CONTACTS',
          // 'CLIENTS_SERVICES',
          // 'CLIENTS_FILES',
        ],
      });

      LogsController.logsCreate(useId, perId, 'API ==> Controller => servicesGetAll -> Success', `=> [${useId}] # Config: Colaboradores: Departamentos: Listagem geral ## [geral]`, null);
      return utils.resSuccess('API ==> Controller => servicesGetAll -> Success', resServicesGetAll, res );
    } catch (error) {
      return utils.resError(500,`API ==> Controller => servicesGetAll -> Error`, error, res);
    }
  }

  servicesGetId = async ({body,params}, res) => {
    const objData = { idMain: undefined, idSecondary: undefined, idTertiary: undefined, id: undefined, data: {} };

    try {
      const perId = "Z004";

      utils.devLog(0, "API ==> Controller => servicesGetId -> Start", null);
      
      const { useId } = body;

      const objResAuth = await UsersController.usersPermission(useId,perId);
      if (!objResAuth.resData.permission) {
        utils.devLog(2, "API ==> Permission -> FALSE", null);
        return utils.resError(403, objResAuth.resMessage, { perId: objResAuth.resData.perId }, res );
      }
      utils.devLog(2, "API ==> Permission -> TRUE", null);

      // Function Controller Action
      let { serId } = params;
      utils.devLog(2, 'serId', serId);
      if (!validateParameters(serId)) {
        return utils.resError(400,`API ==> Controller => servicesGetId -> Invalid parameters`, null, res);
      }

      const resServicesGetId = await CONFIG_PARTNERS_SERVICES.findByPk(objData.idMain,{
        // include: [
          // 'COMPANIES',
          // 'CONFIG_COUNTRIES',
          // 'CONFIG_STATES',
          // 'CONFIG_CITIES',          
          // 'CLIENTS_FILES',
          // 'CLIENTS_EMPLOYEES',
          // 'CLIENTS_MEMBERS',
          // { 
          //   model: USERS,
          //   as: "USERS",
          //   attributes: ['id','useNickname'], 
          // }
        // ],
      });

      if (resServicesGetId) {
        LogsController.logsCreate(useId, perId, "API ==> Controller => servicesGetId -> Success", `=> [${useId}] # Config: Colaboradores: Departamentos: Consultado ## [${objData.idMain}] ${resServicesGetId.serName}`, objData.idMain);
        return utils.resSuccess('API ==> Controller => servicesGetId -> Success', resServicesGetId, res);
      } else {
        return utils.resError(404,`API ==> Controller => servicesGetId -> Error`, null, res);
      }
    
    } catch (error) {
      return utils.resError(500,`API ==> Controller => servicesGetId -> Error`, error, res);
    }

    function validateParameters(serId) {
      try {
        let isValid = true;

        // serId
        serId = Number(serId);
        if (
          serId === undefined ||
          serId === "" ||
          serId === null ||
          isNaN(serId) ||
          typeof(serId) !== "number"||
          !utils.validateNumberPositive(serId)
        ) {
          isValid = false;
        } else {
          objData.idMain = serId;
        }

        return isValid;
      } catch (error) {
        return false;
      }
    }
  }

  servicesPut = async ({body,params}, res) => {
    const objData = { idMain: undefined, idSecondary: undefined, idTertiary: undefined, id: undefined, data: {} };

    try {
      const perId = "Z004";

      utils.devLog(0, `API ==> Controller => servicesPut -> Start`, null);
      
      const { useId } = body;


      const objResAuth = await UsersController.usersPermission(useId,perId);
      if (!objResAuth.resData.permission) {
        utils.devLog(2, "API ==> Permission -> FALSE", null);
        return utils.resError(403, objResAuth.resMessage, { perId: objResAuth.resData.perId }, res );
      }
      utils.devLog(2, "API ==> Permission -> TRUE", null);

      // Function Controller Action
      let { serId } = params;
      utils.devLog(2, 'serId', serId);
      utils.devLog(2, 'body', body);
      if (!validateParameters(serId, body)) {
        return utils.resError(400,`API ==> Controller => servicesPut -> Invalid parameters`, null, res);
      }

      utils.devLog(2, 'API ==> Controller => servicesPut : objData', objData);

      // Check Department
      const resServicesGetId = await CONFIG_PARTNERS_SERVICES.findByPk(objData.idMain,{});
      utils.devLog(2, 'API ==> Controller => resServicesGetId', resServicesGetId);
      if (resServicesGetId) {
        // Verifica se usuário possui permissão geral sobre as empresas
        // if (objResAuth.resData.useKeyCompany !== 0) {
        //   // Verifica se o registro que deseja alterar pertente a empresa que possui permissão
        //   if (resServicesGetId.comId !== objResAuth.resData.useKeyCompany) {
        //     return utils.resError(403, "API ==> Controller => usersPermission -> Forbidden byId", null, res );
        //   }
        // }
      } else {
        return utils.resError(404,`API ==> Controller => servicesPut -> servicesGetId -> Not found`, null, res);
      }

      // Update Services
      utils.devLog(2, "API ==> Controller => servicesPut -> Update Services", null);
      const resServicesPut = await resServicesGetId.update(objData.data);

      LogsController.logsCreate(useId, perId, `API ==> Controller => servicesPut -> Success`, `=> [${useId}] # Config: Colaboradores: Departamentos: Atualizado ## [${objData.idMain}] ${resServicesGetId.serName}`, objData.idMain);
      return utils.resSuccess('API ==> Controller => servicesPut -> Success',{serId: objData.idMain }, res);    

    } catch (error) {
      return utils.resError(500,`API ==> Controller => servicesPut -> Error`, error, res);
    }

    function validateParameters(serId, obj) {
      try {
        let isValid = true;

        // serId
        serId = Number(serId);
        if (
          serId === undefined ||
          serId === "" ||
          serId === null ||
          isNaN(serId) ||
          typeof(serId) !== "number"
        ) {
          isValid = false;
        } else {
          objData.idMain = serId;
          objData.id = serId;
        }
        utils.devLog(2, 'serId -> '+isValid, null);

        // serName
        if (
          obj.serName === undefined ||
          obj.serName === "" ||
          obj.serName === null ||
          typeof(obj.serName) !== "string"
        ) {
          isValid = false;
        } else {
          objData.data.serName = obj.serName;
        }
        utils.devLog(2, 'serName -> '+isValid, null);

        // serDescription
        if (
          obj.serDescription === undefined ||
          obj.serDescription === "" ||
          obj.serDescription === null ||
          typeof(obj.serDescription) !== "string"
        ) {
          isValid = false;
        } else {
          objData.data.serDescription = obj.serDescription;
        }
        utils.devLog(2, 'serDescription -> '+isValid, null);

        // serStatus
        if (
          obj.serStatus === undefined ||
          obj.serStatus === "" ||
          obj.serStatus === null ||
          typeof(obj.serStatus) !== "boolean" ||
          !utils.validateBoolean(obj.serStatus)
        ) {
          isValid = false;
        } else {
          objData.data.serStatus = obj.serStatus;
        }
        utils.devLog(2, 'serStatus -> '+isValid, null);

        return isValid;
      } catch (error) {
        return false;
      }
    }
  }

}

module.exports = new ConfigPartnersServicesController(); 