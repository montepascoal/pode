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
} = require("../models");

const LogsController = require('./LogsController');
const UsersController = require('./UsersController');

//  ------------------------------------------------------------------------------------------------------------------------------------- Class API -----
class EmployeesMembersController {
  constructor() {
    //   this.step1 = this.step1.bind(this);
    //   this.step2 = this.step2.bind(this);
  }

  employeesMembersPost = async ({body,params}, res) => {
    const objData = { idMain: undefined, id: undefined, data: {} };

    try {
      const perId = "B001";
      const logMsg = "API ==> Controller => employeesMembersPost -> Start";
      const { useId } = body;

      utils.devLog(0, logMsg, null);
      const objResAuth = await UsersController.usersPermission(useId,perId);
      if (!objResAuth.resData.permission) {
        utils.devLog(2, "API ==> Permission -> FALSE", null);
        return utils.resError(403, objResAuth.resMessage, { perId: objResAuth.resData.perId }, res );
      }
      utils.devLog(2, "API ==> Permission -> TRUE", null);

      // Function Controller Action
      let { empId } = params;
      utils.devLog(2, null, empId);
      utils.devLog(2, null, body);
      if (!validateParameters(empId, body)) {
        return utils.resError(400,`API ==> Controller => employeesMembersPost -> Invalid parameters`, null, res);
      }

      utils.devLog(2, "API ==> Controller => employeesMembersPost : objData", null);
      utils.devLog(2, null, objData);

      // Check Employees
      const resEmployeesGetId = await EMPLOYEES.findByPk(objData.idMain, {});
      if (resEmployeesGetId) {
        // Verifica se usuário possui permissão geral sobre as empresas
        if (objResAuth.resData.useKeyCompany !== 0) {
          // Verifica se o registro que deseja alterar pertente a empresa que possui permissão
          if (resEmployeesGetId.comId !== objResAuth.resData.useKeyCompany) {
            return utils.resError(403, "API ==> Controller => usersPermission -> Forbidden byId", null, res );
          }
        }
      } else {
        return utils.resError(404,`API ==> Controller => employeesMembersPost -> employeesGetId -> Not found`, null, res);
      }

      // Check unique key => empDocCpf
      const resEmployeesMembersGetId = await EMPLOYEES_MEMBERS.findAll({
        where: {
          memRg: objData.data.memRg
        }
      });
      utils.devLog(2, null, resEmployeesMembersGetId);
      if (resEmployeesMembersGetId.length > 0) {
        return utils.resError(409, "API ==> Controller => employeesPost -> Unique-key conflict", null, res );
      }

      // Save DATA
      const resEmployeesMembersPost = await EMPLOYEES_MEMBERS.create(objData.data);
      objData.id = resEmployeesMembersPost.dataValues.id;

      LogsController.logsCreate(useId, perId, logMsg, `=> [${useId}] # Colaborador (Família): Cadastrado ## [${objData.id}] ${objData.data.memName}`, objData.id);
      return utils.resSuccess('API ==> Controller => employeesMembersPost -> Success',{memId: objData.id }, res);    

    } catch (error) {
      return utils.resError(500,`API ==> Controller => employeesMembersPost -> Error`, error, res);
    }

    function validateParameters(empId, obj) {
      try {
        let isValid = true;
        
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
          objData.idMain = Number(empId);
          objData.data.empId = Number(empId);
        }
        utils.devLog(2, 'empId -> '+isValid, null);

        // memStatus
        objData.data.memStatus = true;
        utils.devLog(2, 'memStatus -> '+isValid, null);

        // memType
        if (
          obj.memType === undefined ||
          obj.memType === "" ||
          obj.memType === null ||
          typeof(obj.memType) !== "string"
        ) {
          isValid = false;
        } else {
          objData.data.memType = obj.memType;
        }
        utils.devLog(2, 'memType -> '+isValid, null);

        // memName
        if (
          obj.memName === undefined ||
          obj.memName === "" ||
          obj.memName === null ||
          typeof(obj.memName) !== "string"
        ) {
          isValid = false;
        } else {
          objData.data.memName = obj.memName;
        }
        utils.devLog(2, 'memName -> '+isValid, null);

        // memRg
        if (
          obj.memRg === undefined ||
          obj.memRg === "" ||
          obj.memRg === null ||
          typeof(obj.memRg) !== "string"
        ) {
          isValid = false;
        } else {
          objData.data.memRg = obj.memRg;
        }
        utils.devLog(2, 'memRg -> '+isValid, null);

        // memDateBirth
        if (!utils.dateDateStrToDate(obj.memDateBirth)) {
          isValid = false;
        } else {
          objData.data.memDateBirth = utils.dateDateStrToDate(obj.memDateBirth);
        }
        utils.devLog(2, 'memDateBirth -> '+isValid, null);

        // memObservations
        if (obj.memObservations === undefined||
          obj.memObservations === null) {
          objData.data.memObservations = null;
        } else {
          if (
            obj.memObservations === "" ||
            typeof(obj.memObservations) !== "string"
          ) {
            isValid = false;
          } else {
            objData.data.memObservations = obj.memObservations;
          }
        }
        utils.devLog(2, 'memObservations -> '+isValid, null);

        // empCreated
        // objData.data.empCreated = new Date();

        // empUpdated
        // objData.data.empUpdated = new Date();

        // empDeleted
        // objData.data.empDeleted = null;

        utils.devLog(2, 'Finish -> '+isValid, null);

        return isValid;
      } catch (error) {
        console.error(error);
        return false;
      }
    }
  }
  
  employeesMembersGetAll = async ({body,params}, res) => {
    const objData = { idMain: undefined, id: undefined, data: {} };

    try {
      const perId = "B003";
      const logMsg = "API ==> Controller => employeesMembersGetAll -> Start";
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
      let { empId } = params;
      if (!validateParameters(empId)) {
        return utils.resError(400,`API ==> Controller => employeesMembersGetId -> Invalid parameters`, null, res);
      }

      // Check Employees
      const resEmployeesGetId = await EMPLOYEES.findByPk(objData.idMain, {});
      if (resEmployeesGetId) {
        // Verifica se usuário possui permissão geral sobre as empresas
        if (objResAuth.resData.useKeyCompany !== 0) {
          // Verifica se o registro que deseja alterar pertente a empresa que possui permissão
          if (resEmployeesGetId.comId !== objResAuth.resData.useKeyCompany) {
            return utils.resError(403, "API ==> Controller => usersPermission -> Forbidden byId", null, res );
          }
        }
      } else {
        return utils.resError(404,`API ==> Controller => employeesMembersGetAll -> employeesGetId -> Not found`, null, res);
      }

      // Check filters
      const filters = [];
        filters.push({empId: objData.idMain});
        // filters.push({memStatus: false});
      const objFilter = {
        [Op.and]: filters
      };
      const resEmployeesMembersGetAll = await EMPLOYEES_MEMBERS.findAll({
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

      LogsController.logsCreate(useId, perId, logMsg, `=> [${useId}] # Colaborador (Família): Listagem geral ## [geral]`, null);
      return utils.resSuccess('API ==> Controller => employeesMembersGetAll -> Success', resEmployeesMembersGetAll, res );
    } catch (error) {
      return utils.resError(500,`API ==> Controller => employeesMembersGetAll -> Error`, error, res);
    }

    function validateParameters(empId) {
      try {
        let isValid = true;

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
          objData.idMain = Number(empId);
        }

        return isValid;
      } catch (error) {
        return false;
      }
    }
  }

  employeesMembersPut = async ({body,params}, res) => {
    const objData = { idMain: undefined, id: undefined, data: {} };

    try {
      const perId = "B004";
      const logMsg = "API ==> Controller => employeesMembersPut -> Start";
      const { useId } = body;

      utils.devLog(0, logMsg, null);
      const objResAuth = await UsersController.usersPermission(useId,perId);
      if (!objResAuth.resData.permission) {
        utils.devLog(2, "API ==> Permission -> FALSE", null);
        return utils.resError(403, objResAuth.resMessage, { perId: objResAuth.resData.perId }, res );
      }
      utils.devLog(2, "API ==> Permission -> TRUE", null);

      // Function Controller Action
      let { empId, memId } = params;
      utils.devLog(2, null, empId);
      utils.devLog(2, null, memId);
      utils.devLog(2, null, body);
      if (!validateParameters(empId, memId, body)) {
        return utils.resError(400,`API ==> Controller => employeesMembersPut -> Invalid parameters`, null, res);
      }

      utils.devLog(2, "API ==> Controller => employeesMembersPut : objData", null);
      utils.devLog(2, null, objData);

      // Check Employees
      const resEmployeesGetId = await EMPLOYEES.findByPk(objData.idMain, {});
      if (resEmployeesGetId) {
        // Verifica se usuário possui permissão geral sobre as empresas
        if (objResAuth.resData.useKeyCompany !== 0) {
          // Verifica se o registro que deseja alterar pertente a empresa que possui permissão
          if (resEmployeesGetId.comId !== objResAuth.resData.useKeyCompany) {
            return utils.resError(403, "API ==> Controller => usersPermission -> Forbidden byId", null, res );
          }
        }
      } else {
        return utils.resError(404,`API ==> Controller => employeesMembersPut -> employeesGetId -> Not found`, null, res);
      }

      // Check Members
      const resEmployeesMembersGetId = await EMPLOYEES_MEMBERS.findByPk(objData.id, {});
      if (resEmployeesMembersGetId) {
        // Verifica membro corresponde ao colaborador enviado
        if (resEmployeesMembersGetId.empId === objData.idMain) {
        } else {
          return utils.resError(400,`API ==> Controller => employeesMembersPut -> Invalid parameters -> id main`, null, res);
        }
      } else {
        return utils.resError(404,`API ==> Controller => employeesMembersPut -> employeesMembersGetId -> Not found`, null, res);
      }

      // Check unique key => memRg
      if (objData.data.memRg !== resEmployeesMembersGetId.memRg) {
        const resEmployeesGetAllbyUnique = await EMPLOYEES_MEMBERS.findAll({
          where: {
            memRg: objData.data.memRg
          }
        });
        utils.devLog(2, null, resEmployeesGetAllbyUnique);
        if (resEmployeesGetAllbyUnique.length > 0) {
          return utils.resError(409, "API ==> Controller => employeesMembersPut -> Unique-key conflict", null, res );
        }
      }

      // Update EmployeesMembers
      const resEmployeesMembersPut = await resEmployeesMembersGetId.update(objData.data);

      LogsController.logsCreate(useId, perId, logMsg, `=> [${useId}] # Colaborador (Família): Consultado ## [${objData.id}] ${resEmployeesMembersGetId.memName}`, objData.id);
      return utils.resSuccess('API ==> Controller => employeesMembersPut -> Success',{empId: objData.id }, res);    

    } catch (error) {

      return utils.resError(500,`API ==> Controller => employeesMembersPut -> Error`, error, res);
    }

    function validateParameters(empId, memId, obj) {
      try {
        let isValid = true;

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
          objData.idMain = Number(empId);
          objData.data.empId = Number(empId);
        }
        utils.devLog(2, 'empId -> '+isValid, null);

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
          objData.id = Number(memId);
        }
        utils.devLog(2, 'memId -> '+isValid, null);

        // memType
        if (
          obj.memType === undefined ||
          obj.memType === "" ||
          obj.memType === null ||
          typeof(obj.memType) !== "string"
        ) {
          isValid = false;
        } else {
          objData.data.memType = obj.memType;
        }
        utils.devLog(2, 'memType -> '+isValid, null);

        // memName
        if (
          obj.memName === undefined ||
          obj.memName === "" ||
          obj.memName === null ||
          typeof(obj.memName) !== "string"
        ) {
          isValid = false;
        } else {
          objData.data.memName = obj.memName;
        }
        utils.devLog(2, 'memName -> '+isValid, null);

        // memRg
        if (
          obj.memRg === undefined ||
          obj.memRg === "" ||
          obj.memRg === null ||
          typeof(obj.memRg) !== "string"
        ) {
          isValid = false;
        } else {
          objData.data.memRg = obj.memRg;
        }
        utils.devLog(2, 'memRg -> '+isValid, null);

        // memDateBirth
        if (!utils.dateDateStrToDate(obj.memDateBirth)) {
          isValid = false;
        } else {
          objData.data.memDateBirth = utils.dateDateStrToDate(obj.memDateBirth);
        }
        utils.devLog(2, 'memDateBirth -> '+isValid, null);

        // memObservations
        if (obj.memObservations === undefined||
          obj.memObservations === null) {
          objData.data.memObservations = null;
        } else {
          if (
            obj.memObservations === "" ||
            typeof(obj.memObservations) !== "string"
          ) {
            isValid = false;
          } else {
            objData.data.memObservations = obj.memObservations;
          }
        }
        utils.devLog(2, 'memObservations -> '+isValid, null);

        // memCreated
        // objData.data.memCreated = new Date();

        // memUpdated
        // objData.data.memUpdated = new Date();

        // memDeleted
        // objData.data.memDeleted = null;

        // console.log(isValid);

        return isValid;
      } catch (error) {
        return false;
      }
    }
  }
  
  employeesMembersPatch = async ({body,params}, res) => {
    const objData = { idMain: undefined, id: undefined, data: {} };

    try {
      const perId = "B005";
      const logMsg = "API ==> Controller => employeesMembersPatch -> Start";
      const { useId } = body;

      utils.devLog(0, logMsg, null);
      const objResAuth = await UsersController.usersPermission(useId,perId);
      if (!objResAuth.resData.permission) {
        utils.devLog(2, "API ==> Permission -> FALSE", null);
        return utils.resError(403, objResAuth.resMessage, { perId: objResAuth.resData.perId }, res );
      }
      utils.devLog(2, "API ==> Permission -> TRUE", null);

      // Function Controller Action
      let { empId, memId } = params;
      utils.devLog(2, null, empId);
      utils.devLog(2, null, memId);
      utils.devLog(2, null, body);
      if (!validateParameters(empId, memId, body)) {
        return utils.resError(400,`API ==> Controller => employeesMembersPatch -> Invalid parameters`, null, res);
      }

      utils.devLog(2, "API ==> Controller => employeesMembersPatch : objData", null);
      utils.devLog(2, null, objData);

      // Check Employees
      const resEmployeesGetId = await EMPLOYEES.findByPk(objData.idMain, {});
      if (resEmployeesGetId) {
        // Verifica se usuário possui permissão geral sobre as empresas
        if (objResAuth.resData.useKeyCompany !== 0) {
          // Verifica se o registro que deseja alterar pertente a empresa que possui permissão
          if (resEmployeesGetId.comId !== objResAuth.resData.useKeyCompany) {
            return utils.resError(403, "API ==> Controller => usersPermission -> Forbidden byId", null, res );
          }
        }
      } else {
        return utils.resError(404,`API ==> Controller => employeesMembersPatch -> employeesGetId -> Not found`, null, res);
      }

      // Check Members
      const resEmployeesMembersGetId = await EMPLOYEES_MEMBERS.findByPk(objData.id, {});
      if (resEmployeesMembersGetId) {
        // Verifica membro corresponde ao colaborador enviado
        if (resEmployeesMembersGetId.empId === objData.idMain) {
        } else {
          return utils.resError(400,`API ==> Controller => employeesMembersPatch -> Invalid parameters -> id main`, null, res);
        }
      } else {
        return utils.resError(404,`API ==> Controller => employeesMembersPatch -> employeesMembersGetId -> Not found`, null, res);
      }

      // Update Employees
      const resEmployeesPatch = await resEmployeesMembersGetId.update(objData.data);

      LogsController.logsCreate(useId, perId, logMsg, `=> [${useId}] # Colaborador (Família): Atualizado [desabilitado] ## [${objData.id}] ${resEmployeesMembersGetId.memName}`, objData.id);
      return utils.resSuccess('API ==> Controller => employeesMembersPatch -> Success',{memId: objData.id }, res);    

    } catch (error) {
      return utils.resError(500,`API ==> Controller => employeesMembersPatch -> Error`, error, res);
    }

    function validateParameters(empId, memId, obj) {
      try {
        let isValid = true;

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
          objData.idMain = Number(empId);
        }
        utils.devLog(2, 'empId -> '+isValid, null);

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
          objData.id = Number(memId);
        }
        utils.devLog(2, 'memId -> '+isValid, null);

        // memStatus
        if (
          obj.memStatus === undefined ||
          obj.memStatus === "" ||
          obj.memStatus === null ||
          typeof(obj.memStatus) !== "boolean" ||
          !utils.validateBoolean(obj.memStatus)
        ) {
          isValid = false;
        } else {
          objData.data.memStatus = obj.memStatus;
        }
        utils.devLog(2, 'memStatus -> '+isValid, null);

        // memCreated
        // objData.data.memCreated = new Date();

        // memUpdated
        // objData.data.memUpdated = new Date();

        // memDeleted
        // objData.data.memDeleted = null;

        // console.log(isValid);

        return isValid;
      } catch (error) {
        return false;
      }
    }
  }

  employeesMembersDelete = async ({body,params}, res) => {
    const objData = { idMain: undefined, id: undefined, data: {} };

    try {
      const perId = "B006";
      const logMsg = "API ==> Controller => employeesMembersDelete -> Start";
      const { useId } = body;

      utils.devLog(0, logMsg, null);
      const objResAuth = await UsersController.usersPermission(useId,perId);
      if (!objResAuth.resData.permission) {
        utils.devLog(2, "API ==> Permission -> FALSE", null);
        return utils.resError(403, objResAuth.resMessage, { perId: objResAuth.resData.perId }, res );
      }
      utils.devLog(2, "API ==> Permission -> TRUE", null);

      // Function Controller Action
      let { empId, memId } = params;
      utils.devLog(2, null, empId);
      utils.devLog(2, null, memId);
      utils.devLog(2, null, body);
      if (!validateParameters(empId, memId, body)) {
        return utils.resError(400,`API ==> Controller => employeesMembersDelete -> Invalid parameters`, null, res);
      }

      utils.devLog(2, "API ==> Controller => employeesMembersDelete : objData", null);
      utils.devLog(2, null, objData);

      // Check Employees
      const resEmployeesGetId = await EMPLOYEES.findByPk(objData.idMain, {});
      if (resEmployeesGetId) {
        // Verifica se usuário possui permissão geral sobre as empresas
        if (objResAuth.resData.useKeyCompany !== 0) {
          // Verifica se o registro que deseja alterar pertente a empresa que possui permissão
          if (resEmployeesGetId.comId !== objResAuth.resData.useKeyCompany) {
            return utils.resError(403, "API ==> Controller => usersPermission -> Forbidden byId", null, res );
          }
        }
      } else {
        return utils.resError(404,`API ==> Controller => employeesMembersDelete -> employeesGetId -> Not found`, null, res);
      }

      // Check Members
      const resEmployeesMembersGetId = await EMPLOYEES_MEMBERS.findByPk(objData.id, {});
      if (resEmployeesMembersGetId) {
        // Verifica membro corresponde ao colaborador enviado
        if (resEmployeesMembersGetId.empId === objData.idMain) {
        } else {
          return utils.resError(400,`API ==> Controller => employeesMembersDelete -> Invalid parameters -> id main`, null, res);
        }
      } else {
        return utils.resError(404,`API ==> Controller => employeesMembersDelete -> employeesMembersGetId -> Not found`, null, res);
      }

      // Update Employees
      const resEmployeesMembersDelete = await resEmployeesMembersGetId.destroy();

      LogsController.logsCreate(useId, perId, logMsg, `=> [${useId}] # Colaborador (Família): Deletado ## [${objData.id}] ${resEmployeesMembersGetId.memName}`, objData.id);
      return utils.resSuccess('API ==> Controller => employeesMembersDelete -> Success',{memId: objData.id }, res);    

    } catch (error) {
      return utils.resError(500,`API ==> Controller => employeesMembersDelete -> Error`, error, res);
    }

    function validateParameters(empId, memId, obj) {
      try {
        let isValid = true;

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
          objData.idMain = Number(empId);
        }
        utils.devLog(2, 'empId -> '+isValid, null);

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
          objData.id = Number(memId);
        }
        utils.devLog(2, 'memId -> '+isValid, null);

        // memCreated
        // objData.data.memCreated = new Date();

        // memUpdated
        // objData.data.memUpdated = new Date();

        // memDeleted
        // objData.data.memDeleted = null;

        // console.log(isValid);

        return isValid;
      } catch (error) {
        return false;
      }
    }
  }
}

module.exports = new EmployeesMembersController();
