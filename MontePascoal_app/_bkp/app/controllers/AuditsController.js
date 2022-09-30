/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// CONTROLLER USER /////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//  --------------------------------------------------------------------------------------------------------------------------------------- Modules -----

const { Op } = require("sequelize");
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
  CLIENTS,
  CLIENTS_EMPLOYEES,
  CLIENTS_MEMBERS,
  CONFIG_CLIENTS_SERVICES,
} = require("../models");

const LogsController = require('./LogsController');
const UsersController = require('./UsersController');
const ClientsEmployeesController = require('./ClientsEmployeesController');

//  ------------------------------------------------------------------------------------------------------------------------------------- Class API -----
class AuditsController {
  constructor() {
    //  this.step1 = this.step1.bind(this);
    //  this.step2 = this.step2.bind(this);
  }

  auditsMembersGetAll = async ({body,params}, res) => {
    const objData = { idMain: undefined, idSecondary: undefined, idTertiary: undefined, id: undefined, data: {} };

    try {
      const perId = "F008";

      utils.devLog(0, `API ==> Controller => auditsMembersGetAll -> Start`, null);
      
      const { useId } = body;

      // utils.devLog(2, null, useId);
      const objResAuth = await UsersController.usersPermission(useId,perId);
      if (!objResAuth.resData.permission) {
        utils.devLog(2, "API ==> Permission -> FALSE", null);
        return utils.resError(403, objResAuth.resMessage, {perId: objResAuth.resData.perId}, res );
      }
      utils.devLog(2, "API ==> Permission -> TRUE", null);
           
      // Get Members General
      const filter = {
        memAudited: true,
        // empId: objData.idSecondary,
      };
      // if (objResAuth.resData.useKeyCompany !== 0) {
      //   filter.comId = objResAuth.resData.useKeyCompany;
      // }
      const resAuditsMembersGetAll = await CLIENTS_MEMBERS.findAll({
        where: filter,
        order: [
          ['id', 'ASC'],
        ],
        include: [
          'COMPANIES',
          // 'USERS',
          // 'CONFIG_COUNTRIES',
          // 'CONFIG_STATES',
          // 'CONFIG_CITIES',
          // 'CLIENTS_CONTACTS',
          // 'CLIENTS_SERVICES',
          // 'CLIENTS_FILES',
          'CLIENTS',
          'CLIENTS_EMPLOYEES',
        ],
      });

      LogsController.logsCreate(useId, perId, `API ==> Controller => auditsMembersGetAll -> Success`, `=> [${useId}] # Auditoria: Listagem geral ## [geral]`, null);
      return utils.resSuccess(`API ==> Controller => auditsMembersGetAll -> Success`, resAuditsMembersGetAll, res );
    } catch (error) {
      return utils.resError(500,`API ==> Controller => auditsMembersGetAll -> Error`, error, res);
    }
  }

  auditsMembersGetId = async ({body,params}, res) => {
    const objData = { idMain: undefined, idSecondary: undefined, idTertiary: undefined, id: undefined, data: {} };

    try {
      const perId = "F008";

      utils.devLog(0, "API ==> Controller => auditsMembersGetId -> Start", null);
      
      const { useId } = body;

      const objResAuth = await UsersController.usersPermission(useId,perId);
      if (!objResAuth.resData.permission) {
        utils.devLog(2, "API ==> Permission -> FALSE", null);
        return utils.resError(403, objResAuth.resMessage, { perId: objResAuth.resData.perId }, res );
      }
      utils.devLog(2, "API ==> Permission -> TRUE", null);

      // Function Controller Action
      let { memId } = params;
      utils.devLog(2, 'memId', memId);
      if (!validateParameters(memId)) {
        return utils.resError(400,`API ==> Controller => auditsMembersGetId -> Invalid parameters`, null, res);
      }

      const resAuditsMemberGetId = await CLIENTS_MEMBERS.findByPk(objData.idTertiary,{
        include: [
          'COMPANIES',
          // 'USERS',
          // 'CONFIG_COUNTRIES',
          // 'CONFIG_STATES',
          // 'CONFIG_CITIES',
          // 'CLIENTS_CONTACTS',
          // 'CLIENTS_SERVICES',
          // 'CLIENTS_FILES',
          'CLIENTS',
          'CLIENTS_EMPLOYEES',
          'CLIENTS_MEMBERS_FILES',
        ],
      });

      if (resAuditsMemberGetId) {
        if (!resAuditsMemberGetId.memAudited) {
          return utils.resError(409,`API ==> Controller => auditsMembersGetId -> Member not audit`, null, res);
        }
        LogsController.logsCreate(useId, perId, "API ==> Controller => auditsMembersGetId -> Success", `=> [${useId}] # Auditoria: Membros ## [${objData.idTertiary}] ${resAuditsMemberGetId.memName}`, objData.idTertiary);
        return utils.resSuccess('API ==> Controller => auditsMembersGetId -> Success',resAuditsMemberGetId, res);    
      } else {
        return utils.resError(404,`API ==> Controller => auditsMembersGetId -> Not found`, null, res);
      }
    } catch (error) {
      return utils.resError(500,`API ==> Controller => auditsMembersGetId -> Error`, error, res);
    }

    function validateParameters(memId) {
      try {
        let isValid = true;

        // memId
        memId = Number(memId);
        if (
          memId === undefined ||
          memId === "" ||
          memId === null ||
          isNaN(memId) ||
          typeof(memId) !== "number"||
          !utils.validateNumberPositive(memId)
        ) {
          isValid = false;
        } else {
          objData.idTertiary = memId;
        }

        return isValid;
      } catch (error) {
        return false;
      }
    }
  }

  auditsMembersPatch = async ({body,params}, res) => {
    const objData = { idMain: undefined, idSecondary: undefined, idTertiary: undefined, id: undefined, data: {} };

    try {
      const perId = "F008";

      utils.devLog(0, 'API ==> Controller => auditsMembersPatch -> Start', null);
      
      const { useId } = body;

      const objResAuth = await UsersController.usersPermission(useId,perId);
      if (!objResAuth.resData.permission) {
        utils.devLog(2, "API ==> Permission -> FALSE", null);
        return utils.resError(403, objResAuth.resMessage, { perId: objResAuth.resData.perId }, res );
      }
      utils.devLog(2, "API ==> Permission -> TRUE", null);

      // Function Controller Action
      let { cliId, empId, memId } = params;
      utils.devLog(2, 'cliId', cliId);
      utils.devLog(2, 'empId', empId);
      utils.devLog(2, 'memId', memId);
      utils.devLog(2, 'body', body);

      if (!validateParameters(cliId, empId, memId, body)) {
        return utils.resError(400,`API ==> Controller => auditsMembersPatch -> Invalid parameters`, null, res);
      } else {
        objData.data.auditUser = useId;
        objData.data.auditDate = new Date();
      }
      utils.devLog(2, "API ==> Controller => auditsMembersPatch : objData", objData);

      // Check Clients
      const resClientsCheckId = await CLIENTS.findByPk(objData.idMain, {});
      if (resClientsCheckId) {
        // 
      } else {
        return utils.resError(404,`API ==> Controller => auditsMembersPatch -> clientsGetId -> Not found`, null, res);
      }

      // Check Employees
      const resEmployeesCheckId = await CLIENTS_EMPLOYEES.findByPk(objData.idSecondary, {});
      if (resEmployeesCheckId) {
        // Verifica se usuário possui permissão geral sobre as empresas
        // if (objResAuth.resData.useKeyCompany !== 0) {
        //   // Verifica se o registro que deseja alterar pertente a empresa que possui permissão
        //   if (resEmployeesCheckId.comId !== objResAuth.resData.useKeyCompany) {
        //     return utils.resError(403, "API ==> Controller => usersPermission -> Forbidden byId", null, res );
        //   }
        // }
      } else {
        return utils.resError(404,`API ==> Controller => auditsMembersPatch -> employeesGetId -> Not found`, null, res);
      }

      // Check Members
      const resMembersGetId = await CLIENTS_MEMBERS.findByPk(objData.idTertiary, {});
      // Validate Client / Employee
      if (resMembersGetId) {
        // Verifica membro corresponde o cliente e colaborador pesquisado
        if (resMembersGetId.cliId == objData.idMain && resMembersGetId.empId == objData.idSecondary) {
          // 
        } else {
          return utils.resError(400,`API ==> Controller => auditsMembersPatch -> membersGetId -> Invalid parameters -> id main`, null, res);
        }
      } else {
        return utils.resError(404,`API ==> Controller => auditsMembersPatch -> membersGetId -> Not found`, null, res);
      }

      // Validate Member Autited
      if (!resMembersGetId.memAudited) {
        return utils.resError(409,`API ==> Controller => auditsMembersPatch -> memAudited -> [false]`, null, res);
      }

      // Update DATA Clients Members
      utils.devLog(2, "API ==> Controller => auditsMembersPatch -> Update Clients Members", null);
      const resauditsMembersPatch = await resMembersGetId.update(objData.data);

      LogsController.logsCreate(useId, perId, 'API ==> Controller => auditsMembersPatch -> Success', `=> [${useId}] # Auditoria: Membros: Fechamento [status] -> Result: ${objData.data.memStatus}## [${objData.idTertiary}] ${resMembersGetId.memName}`, objData.idTertiary);
      return utils.resSuccess('API ==> Controller => auditsMembersPatch -> Success', { memId: objData.idTertiary }, res);    

    } catch (error) {
      return utils.resError(500,`API ==> Controller => auditsMembersPatch -> Error`, error, res);
    }

    function validateParameters(cliId, empId, memId, obj) {
      try {
        let isValid = true;

        // cliId
        cliId = Number(cliId);
        if (
          cliId === undefined ||
          cliId === "" ||
          cliId === null ||
          isNaN(cliId) ||
          typeof(cliId) !== "number"
        ) {
          isValid = false;
        } else {
          objData.idMain = cliId;
          objData.data.cliId = cliId;
        }
        utils.devLog(2, 'cliId -> '+isValid, null);

        // empId
        empId = Number(empId);
        if (
          empId === undefined ||
          empId === "" ||
          empId === null ||
          isNaN(empId) ||
          typeof(empId) !== "number"||
          !utils.validateNumberPositive(empId)
        ) {
          isValid = false;
        } else {
          objData.idSecondary = Number(empId);
          objData.data.empId = Number(empId);
        }
        utils.devLog(2, 'empId -> '+isValid, null);

        // memId (id)
        memId = Number(memId);
        if (
          memId === undefined ||
          memId === "" ||
          memId === null ||
          isNaN(memId) ||
          typeof(memId) !== "number"||
          !utils.validateNumberPositive(memId)
        ) {
          isValid = false;
        } else {
          objData.idTertiary = Number(memId);
        }
        utils.devLog(2, 'memId (id) -> '+isValid, null);

        // auditStatus
        if (
          obj.auditStatus === undefined ||
          obj.auditStatus === "" ||
          obj.auditStatus === null ||
          typeof(obj.auditStatus) !== "boolean" ||
          !utils.validateBoolean(obj.auditStatus)
        ) {
          isValid = false;
        } else {
          objData.data.memStatus = obj.auditStatus;
          objData.data.memAudited = false;
        }
        utils.devLog(2, 'auditStatus -> '+isValid, null);
        utils.devLog(2, 'memStatus -> '+isValid, null);
        utils.devLog(2, 'memAudited -> '+isValid, null);

        return isValid;
      } catch (error) {
        return false;
      }
    }
  }

}

module.exports = new AuditsController();
