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
  PROVIDERS_CONTACTS
} = require("../models");

const LogsController = require('./LogsController');
const UsersController = require('./UsersController');

//  ------------------------------------------------------------------------------------------------------------------------------------- Class API -----
class ProvidersContactsController {

  constructor() {
    //   this.step1 = this.step1.bind(this);
    //   this.step2 = this.step2.bind(this);
  }

  providersContactsPost = async ({body,params}, res) => {
    const objData = { idMain: undefined, id: undefined, data: {} };

    try {
      const perId = "D001";
      const logMsg = "API ==> Controller => providersContactsPost -> Start";
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
        return utils.resError(400,`API ==> Controller => providersContactsPost -> Invalid parameters`, null, res);
      }

      utils.devLog(2, "API ==> Controller => providersContactsPost : objData", null);
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
        return utils.resError(404,`API ==> Controller => providersContactsPost -> providersGetId -> Not found`, null, res);
      }

      // Check unique key => empDocCpf
      // const resEmployeesMembersGetId = await PROVIDERS_CONTACTS.findAll({
      //   where: {
      //     memRg: objData.data.memRg
      //   }
      // });
      // utils.devLog(2, null, resEmployeesMembersGetId);
      // if (resEmployeesMembersGetId.length > 0) {
      //   return utils.resError(409, "API ==> Controller => employeesPost -> Unique-key conflict", null, res );
      // }

      // Save DATA
      const resProvidersContactsPost = await PROVIDERS_CONTACTS.create(objData.data);
      objData.id = resProvidersContactsPost.dataValues.id;

      LogsController.logsCreate(useId, perId, logMsg, `=> [${useId}] # Fornecedor (Contatos): Cadastrado ## [${objData.id}] ${objData.data.conName}`, objData.id);
      return utils.resSuccess('API ==> Controller => providersContactsPost -> Success',{conId: objData.id }, res);    

    } catch (error) {
      return utils.resError(500,`API ==> Controller => providersContactsPost -> Error`, error, res);
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
          objData.idMain = Number(proId);
          objData.data.proId = Number(proId);
        }
        utils.devLog(2, 'proId -> '+isValid, null);

        // conStatus
        objData.data.conStatus = true;
        utils.devLog(2, 'conStatus -> '+isValid, null);

        // conName
        if (
          obj.conName === undefined ||
          obj.conName === "" ||
          obj.conName === null ||
          typeof(obj.conName) !== "string"
        ) {
          isValid = false;
        } else {
          objData.data.conName = obj.conName;
        }
        utils.devLog(2, 'conName -> '+isValid, null);

        // conPhone1
        if (
          obj.conPhone1 === undefined ||
          obj.conPhone1 === "" ||
          obj.conPhone1 === null ||
          typeof(obj.conPhone1) !== "string"||
          (obj.conPhone1.length !== 10 && obj.conPhone1.length !== 11 )
        ) {
          isValid = false;
        } else {
          objData.data.conPhone1 = obj.conPhone1;
        }
        utils.devLog(2, 'conPhone1 -> '+isValid, null);

        // conPhone2
        if (obj.conPhone2 === undefined ||
          obj.conPhone2 === null) {
          objData.data.conPhone2 = null;
        } else {
          if (
            obj.conPhone2 === "" ||
            obj.conPhone2 === null ||
            typeof(obj.conPhone2) !== "string"||
            (obj.conPhone2.length !== 10 && obj.conPhone2.length !== 11 )
          ) {
            isValid = false;
          } else {
            objData.data.conPhone2 = obj.conPhone2;
          }
        }
        utils.devLog(2, 'conPhone2 -> '+isValid, null);

        // conEmail
        if (
          obj.conEmail === undefined ||
          obj.conEmail === "" ||
          obj.conEmail === null ||
          typeof(obj.conEmail) !== "string"
        ) {
          isValid = false;
        } else {
          objData.data.conEmail = obj.conEmail;
        }
        utils.devLog(2, 'conEmail -> '+isValid, null);

        // conObservations
        if (obj.conObservations === undefined||
          obj.conObservations === null) {
          objData.data.conObservations = null;
        } else {
          if (
            obj.conObservations === "" ||
            typeof(obj.conObservations) !== "string"
          ) {
            isValid = false;
          } else {
            objData.data.conObservations = obj.conObservations;
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
        console.error(error);
        return false;
      }
    }
  }

  providersContactsGetAll = async ({body,params}, res) => {
    const objData = { idMain: undefined, id: undefined, data: {} };

    try {
      const perId = "D003";
      const logMsg = "API ==> Controller => providersContactsGetAll -> Start";
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
        return utils.resError(400,`API ==> Controller => providersContactsGetId -> Invalid parameters`, null, res);
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
        return utils.resError(404,`API ==> Controller => providersContactsGetAll -> providersGetId -> Not found`, null, res);
      }

      // Check filters
      const filters = [];
        filters.push({proId: objData.idMain});
        // filters.push({conStatus: false});
      const objFilter = {
        [Op.and]: filters
      };
      const resProvidersContactsGetAll = await PROVIDERS_CONTACTS.findAll({
        where: objFilter,
        order: [
          ['id', 'ASC'],
        ],
        include: [
          // { model: CONFIG_COUNTRIES, as: "CONFIG_COUNTRIES_inf" },
          // { model: CONFIG_STATES, as: "CONFIG_STATES_inf" },
          // { model: CONFIG_CITIES, as: "CONFIG_CITIES_inf" },
          // { model: CONFIG_COUNTRIES, as: "CONFIG_COUNTRIES_add" },
          // { model: CONFIG_STATES, as: "CONFIG_STATES_add" },
          // { model: CONFIG_CITIES, as: "CONFIG_CITIES_add" },
          // { model: CONFIG_EMPLOYEES_DEPARTMENTS, as: "CONFIG_EMPLOYEES_DEPARTMENTS" },
          // { model: CONFIG_EMPLOYEES_OCCUPATIONS, as: "CONFIG_EMPLOYEES_OCCUPATIONS" },
        ],
      });

      LogsController.logsCreate(useId, perId, logMsg, `=> [${useId}] # Fornecedor (Contatos): Listagem geral ## [geral]`, null);
      return utils.resSuccess('API ==> Controller => providersContactsGetAll -> Success', resProvidersContactsGetAll, res );
    } catch (error) {
      return utils.resError(500,`API ==> Controller => providersContactsGetAll -> Error`, error, res);
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

  providersContactsPatch = async ({body,params}, res) => {
    const objData = { idMain: undefined, id: undefined, data: {} };

    try {
      const perId = "D004";
      const logMsg = "API ==> Controller => providersContactsPatch -> Start";
      const { useId } = body;

      utils.devLog(0, logMsg, null);
      const objResAuth = await UsersController.usersPermission(useId,perId);
      if (!objResAuth.resData.permission) {
        utils.devLog(2, "API ==> Permission -> FALSE", null);
        return utils.resError(403, objResAuth.resMessage, { perId: objResAuth.resData.perId }, res );
      }
      utils.devLog(2, "API ==> Permission -> TRUE", null);

      // Function Controller Action
      let { proId, conId } = params;
      utils.devLog(2, null, proId);
      utils.devLog(2, null, conId);
      utils.devLog(2, null, body);
      if (!validateParameters(proId, conId, body)) {
        return utils.resError(400,`API ==> Controller => providersContactsPatch -> Invalid parameters`, null, res);
      }

      utils.devLog(2, "API ==> Controller => providersContactsPatch : objData", null);
      utils.devLog(2, null, objData);

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
        return utils.resError(404,`API ==> Controller => providersContactsPatch -> providersGetId -> Not found`, null, res);
      }

      // Check Contacts
      const resProvidersContactsGetId = await PROVIDERS_CONTACTS.findByPk(objData.id, {});
      if (resProvidersContactsGetId) {
        // Verifica membro corresponde ao colaborador enviado
        if (resProvidersContactsGetId.proId === objData.idMain) {
        } else {
          return utils.resError(400,`API ==> Controller => providersContactsPatch -> Invalid parameters -> id main`, null, res);
        }
      } else {
        return utils.resError(404,`API ==> Controller => providersContactsPatch -> ProvidersContactsGetId -> Not found`, null, res);
      }

      // Update Providers
      const resProvidersPatch = await resProvidersContactsGetId.update(objData.data);

      LogsController.logsCreate(useId, perId, logMsg, `=> [${useId}] # Fornecedor (Contatos): Atualizado [desabilitado] ## [${objData.id}] ${resProvidersContactsGetId.conName}`, objData.id);
      return utils.resSuccess('API ==> Controller => providersContactsPatch -> Success',{conId: objData.id }, res);    

    } catch (error) {
      return utils.resError(500,`API ==> Controller => providersContactsPatch -> Error`, error, res);
    }

    function validateParameters(proId, conId, obj) {
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
        utils.devLog(2, 'proId -> '+isValid, null);

        // conId
        conId = Number(conId);
        if (
          conId === undefined ||
          conId === "" ||
          conId === null ||
          isNaN(conId) ||
          typeof(conId) !== "number"||
          !utils.validateNumberPositive(conId)
        ) {
          isValid = false;
        } else {
          objData.id = Number(conId);
        }
        utils.devLog(2, 'conId -> '+isValid, null);

        // conStatus
        if (
          obj.conStatus === undefined ||
          obj.conStatus === "" ||
          obj.conStatus === null ||
          typeof(obj.conStatus) !== "boolean" ||
          !utils.validateBoolean(obj.conStatus)
        ) {
          isValid = false;
        } else {
          objData.data.conStatus = obj.conStatus;
        }
        utils.devLog(2, 'conStatus -> '+isValid, null);

        // conCreated
        // objData.data.conCreated = new Date();

        // conUpdated
        // objData.data.conUpdated = new Date();

        // conDeleted
        // objData.data.conDeleted = null;

        // console.log(isValid);

        return isValid;
      } catch (error) {
        return false;
      }
    }
  }

  providersContactsDelete = async ({body,params}, res) => {
    const objData = { idMain: undefined, id: undefined, data: {} };

    try {
      const perId = "D006";
      const logMsg = "API ==> Controller => providersContactsDelete -> Start";
      const { useId } = body;

      utils.devLog(0, logMsg, null);
      const objResAuth = await UsersController.usersPermission(useId,perId);
      if (!objResAuth.resData.permission) {
        utils.devLog(2, "API ==> Permission -> FALSE", null);
        return utils.resError(403, objResAuth.resMessage, { perId: objResAuth.resData.perId }, res );
      }
      utils.devLog(2, "API ==> Permission -> TRUE", null);

      // Function Controller Action
      let { proId, conId } = params;
      utils.devLog(2, null, proId);
      utils.devLog(2, null, conId);
      utils.devLog(2, null, body);
      if (!validateParameters(proId, conId, body)) {
        return utils.resError(400,`API ==> Controller => providersContactsDelete -> Invalid parameters`, null, res);
      }

      utils.devLog(2, "API ==> Controller => providersContactsDelete : objData", null);
      utils.devLog(2, null, objData);

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
        return utils.resError(404,`API ==> Controller => providersContactsDelete -> ProvidersGetId -> Not found`, null, res);
      }

      // Check Members
      const resProvidersContactsGetId = await PROVIDERS_CONTACTS.findByPk(objData.id, {});
      if (resProvidersContactsGetId) {
        // Verifica membro corresponde ao colaborador enviado
        if (resProvidersContactsGetId.proId === objData.idMain) {
        } else {
          return utils.resError(400,`API ==> Controller => providersContactsDelete -> Invalid parameters -> id main`, null, res);
        }
      } else {
        return utils.resError(404,`API ==> Controller => providersContactsDelete -> providersContactsGetId -> Not found`, null, res);
      }

      // Update Providers
      const resProvidersContactsDelete = await resProvidersContactsGetId.destroy();

      LogsController.logsCreate(useId, perId, logMsg, `=> [${useId}] # Fornecedor (Contatos): Deletado ## [${objData.id}] ${resProvidersContactsGetId.conName}`, objData.id);
      return utils.resSuccess('API ==> Controller => providersContactsDelete -> Success',{conId: objData.id }, res);    

    } catch (error) {
      return utils.resError(500,`API ==> Controller => providersContactsDelete -> Error`, error, res);
    }

    function validateParameters(proId, conId, obj) {
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
        utils.devLog(2, 'proId -> '+isValid, null);

        // conId
        conId = Number(conId);
        if (
          conId === undefined ||
          conId === "" ||
          conId === null ||
          isNaN(conId) ||
          typeof(conId) !== "number"||
          !utils.validateNumberPositive(conId)
        ) {
          isValid = false;
        } else {
          objData.id = Number(conId);
        }
        utils.devLog(2, 'conId -> '+isValid, null);

        // conCreated
        // objData.data.conCreated = new Date();

        // conUpdated
        // objData.data.conUpdated = new Date();

        // conDeleted
        // objData.data.conDeleted = null;

        // console.log(isValid);

        return isValid;
      } catch (error) {
        return false;
      }
    }
  }

}

module.exports = new ProvidersContactsController();
