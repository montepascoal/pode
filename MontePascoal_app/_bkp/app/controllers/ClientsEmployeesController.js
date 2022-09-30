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
} = require("../models");

const LogsController = require('./LogsController');
const UsersController = require('./UsersController');
const ClientsMembersController = require('./ClientsMembersController');


//  ------------------------------------------------------------------------------------------------------------------------------------- Class API -----
class ClientsEmployeesController {
  constructor() {
    //   this.step1 = this.step1.bind(this);
    //   this.step2 = this.step2.bind(this);
  }

  clientsEmployeesPost = async ({body,params}, res) => {
    const objData = { idMain: undefined, idSecondary: undefined, idTertiary: undefined, id: undefined, data: {} };

    try {
      const perId = "F001";

      utils.devLog(0, `API ==> Controller => clientsEmployeesPost -> Start`, null);
      
      const { useId } = body;

      const objResAuth = await UsersController.usersPermission(useId,perId);
      if (!objResAuth.resData.permission) {
        utils.devLog(2, "API ==> Permission -> FALSE", null);
        return utils.resError(403, objResAuth.resMessage, { perId: objResAuth.resData.perId }, res );
      }
      utils.devLog(2, "API ==> Permission -> TRUE", null);

      // Function Controller Action
      let { cliId } = params;
      utils.devLog(2, 'cliId', cliId);
      utils.devLog(2, 'body', body);
      if (!validateParameters(cliId, body)) {
        return utils.resError(400,`API ==> Controller => clientsEmployeesPost -> Invalid parameters`, null, res);
      }

      utils.devLog(2, "API ==> Controller => clientsEmployeesPost : objData", objData);

      // Check Clients
      const resClientsGetId = await CLIENTS.findByPk(objData.idMain, {});
      if (resClientsGetId) {
        // Verifica se usuário possui permissão geral sobre as empresas
        // if (objResAuth.resData.useKeyCompany !== 0) {
        //   // Verifica se o registro que deseja alterar pertente a empresa que possui permissão
        //   if (resClientsGetId.comId !== objResAuth.resData.useKeyCompany) {
        //     return utils.resError(403, "API ==> Controller => usersPermission -> Forbidden byId", null, res );
        //   }
        // }
      } else {
        return utils.resError(404,`API ==> Controller => clientsEmployeesPost -> clientsGetId -> Not found`, null, res);
      }

      // Check unique key => empDocCpf AND empDocRg
      utils.devLog(2, "API ==> Controller => clientsEmployeesPost -> Check unique key => empDocCpf AND empDocRg", null);
      const resEmployeesGetId = await CLIENTS_EMPLOYEES.findAll({
        where: {
          [Op.or]: [
            { empDocCpf: objData.data.empDocCpf },
            { empDocRg: objData.data.empDocRg } // kesdev-cpfcnpj
          ]
        }
      });
      utils.devLog(2, 'Check unique key => empDocCpf AND empDocRg', resEmployeesGetId);
      if (resEmployeesGetId.length > 0) {
        return utils.resError(409, "API ==> Controller => clientsEmployeesPost -> Unique-key conflict", null, res );
      }

      // Check unique key => empDocCtps
      if (objData.data.empDocCtps) {
        utils.devLog(2, "API ==> Controller => clientsEmployeesPost -> Check unique key => empDocCtps", null);
        const resClientsCtpsGetId = await CLIENTS_EMPLOYEES.findAll({
          where: {
            empDocCtps: objData.data.empDocCtps
          }
        });
        utils.devLog(2, 'Check unique key => empDocCtps', resClientsCtpsGetId);
        if (resClientsCtpsGetId.length > 0) {
          return utils.resError(409, "API ==> Controller => clientsEmployeesPost -> Unique-key conflict [ctps]", null, res );
        }
      } else {
        utils.devLog(2, "API ==> Controller => clientsEmployeesPost -> Check unique key => empDocCtps -> undefined", null);
      }

      // Save DATA Clients Employees
      utils.devLog(2, "API ==> Controller => clientsEmployeesPost -> Save Clients Employees", null);
      const resClientsEmployeesPost = await CLIENTS_EMPLOYEES.create(objData.data);
      objData.idSecondary = resClientsEmployeesPost.dataValues.id;

      // Create MEMBERS
      utils.devLog(2, "API ==> Controller => clientsEmployeesPost -> Create Members", null);
      const resMembersPost = await ClientsMembersController.clientsMembersPost({ 
        params: {
          cliId: objData.idMain,
          empId: objData.idSecondary,
        },
        body: {
          devControl: true,
          useId: useId,
          comId: objData.data.comId,
          memIdOld: null,
          memStatus: true, // objData.data.memStatus,
          memType: 'Titular',
          memName: objData.data.empName,
          memDocBirthDate: body.empDocBirthDate,// objData.data.empDocBirthDate,
          memDocCpf: objData.data.empDocCpf,
          memDocRg: objData.data.empDocRg,
          memPcD: false,
          memObservations: objData.data.empObservations,
        }
      });
      utils.devLog(2, "API ==> Controller => clientsEmployeesPost -> resMembersPost -> Success", resMembersPost);
      if (resMembersPost.resStatus !== 200) {
        // Delete Employees
        const resClientsEmployeesDelete = await resClientsEmployeesPost.destroy();
        return utils.resError(424, "API ==> Controller => clientsEmployeesPost -> resMembersPost -> Error [members]", null, res );
      } else {
        // Update memId
        utils.devLog(2, "API ==> Controller => clientsEmployeesPost -> Update Employees [memId] -> Start", null);
        const resEmpoyeesPut = await resClientsEmployeesPost.update({
          memId: resMembersPost.resData.memId,
        });
        utils.devLog(2, "API ==> Controller => clientsEmployeesPost -> Update Employees [memId] -> Success", null);
      }

      LogsController.logsCreate(useId, perId, `API ==> Controller => clientsEmployeesPost -> Success`, `=> [${useId}] # Clientes: Colaboradores: Cadastrado ## [${objData.idSecondary}] ${objData.data.empName}`, objData.idSecondary);
      return utils.resSuccess('API ==> Controller => clientsEmployeesPost -> Success', { empId: objData.idSecondary }, res);    

    } catch (error) {
      return utils.resError(500,`API ==> Controller => clientsEmployeesPost -> Error`, error, res);
    }

    function validateParameters(cliId, obj) {
      try {
        let isValid = true;

        // cliId
        cliId = Number(cliId);
        if (
          cliId === undefined ||
          cliId === "" ||
          cliId === null ||
          isNaN(cliId) ||
          typeof(cliId) !== "number"||
          !utils.validateNumberPositive(cliId)
        ) {
          isValid = false;
        } else {
          objData.idMain = Number(cliId);
          objData.data.cliId = Number(cliId);
        }
        utils.devLog(2, 'cliId -> '+isValid, null);

        // comId
        obj.comId = Number(obj.comId);
        if (
          obj.comId === undefined ||
          obj.comId === "" ||
          obj.comId === null ||
          isNaN(obj.comId) ||
          typeof(obj.comId) !== "number" ||
          !utils.validateNumberPositive(obj.comId)
        ) {
          isValid = false;
        } else {
          objData.data.comId = Number(obj.comId);
        }
        utils.devLog(2, 'comId -> '+isValid, null);

        // empStatus
        objData.data.empStatus = true;
        utils.devLog(2, 'empStatus -> '+isValid, null);

        // empName
        if (
          obj.empName === undefined ||
          obj.empName === "" ||
          obj.empName === null ||
          typeof(obj.empName) !== "string"
        ) {
          isValid = false;
        } else {
          objData.data.empName = obj.empName;
        }
        utils.devLog(2, 'empName -> '+isValid, null);
        
        // empDocBirthDate
        if (!utils.dateDateStrToDate(obj.empDocBirthDate)) {
          isValid = false;
        } else {
          objData.data.empDocBirthDate = utils.dateDateStrToDate(obj.empDocBirthDate);
        }
        utils.devLog(2, 'empDocBirthDate -> '+isValid, null);

        // empInfMaritalStatus
        if (obj.empInfMaritalStatus === undefined ||
          obj.empInfMaritalStatus === null) {
          objData.data.empInfMaritalStatus = null;
        } else {
          if (
            obj.empInfMaritalStatus !== "Solteiro" &&
            obj.empInfMaritalStatus !== "Casado" &&
            obj.empInfMaritalStatus !== "Viúvo" &&
            obj.empInfMaritalStatus !== "Divorciado"
          ) {
            isValid = false;
          } else {
            objData.data.empInfMaritalStatus = obj.empInfMaritalStatus;
          }
        }
        utils.devLog(2, 'empInfMaritalStatus -> '+isValid, null);

        // empDocCpf
        if (
          obj.empDocCpf === undefined ||
          obj.empDocCpf === "" ||
          obj.empDocCpf === null ||
          typeof(obj.empDocCpf) !== "string" ||
          (obj.empDocCpf.length !== 11 && obj.empDocCpf.length !== 14 )
        ) {
          isValid = false;
        } else {
          objData.data.empDocCpf = obj.empDocCpf;
        }
        utils.devLog(2, 'empDocCpf -> '+isValid, null);

        // empDocRg
        if (
          obj.empDocRg === undefined ||
          obj.empDocRg === "" ||
          obj.empDocRg === null ||
          typeof(obj.empDocRg) !== "string"
        ) {
          isValid = false;
        } else {
          objData.data.empDocRg = obj.empDocRg;
        }
        utils.devLog(2, 'empDocRg -> '+isValid, null);

        // empDocCtps
        if (obj.empDocCtps === undefined ||
          obj.empDocCtps === null) {
          objData.data.empDocCtps = null;
        } else {
          if (
            obj.empDocCtps === undefined ||
            obj.empDocCtps === "" ||
            obj.empDocCtps === null ||
            typeof(obj.empDocCtps) !== "string"
          ) {
            isValid = false;
          } else {
            objData.data.empDocCtps = obj.empDocCtps;
          }
        }
        utils.devLog(2, 'empDocCtps -> '+isValid, null);

        // empJobOccupation
        if (obj.empJobOccupation === undefined ||
          obj.empJobOccupation === null) {
          objData.data.empJobOccupation = null;
        } else {
          if (
            obj.empJobOccupation === undefined ||
            obj.empJobOccupation === "" ||
            obj.empJobOccupation === null ||
            typeof(obj.empJobOccupation) !== "string"
          ) {
            isValid = false;
          } else {
            objData.data.empJobOccupation = obj.empJobOccupation;
          }
        }
        utils.devLog(2, 'empJobOccupation -> '+isValid, null);

        // empJobDate
        if (obj.empJobDate === undefined||
          obj.empJobDate === null) {
          objData.data.empJobDate = null;
        } else {
          if (!utils.dateDateStrToDate(obj.empJobDate)) {
            isValid = false;
          } else {
            objData.data.empJobDate = utils.dateDateStrToDate(obj.empJobDate);
          }
        }
        utils.devLog(2, 'empJobDate -> '+isValid, null);

        // empConPhone1
        if (
          obj.empConPhone1 === undefined ||
          obj.empConPhone1 === "" ||
          obj.empConPhone1 === null ||
          typeof(obj.empConPhone1) !== "string"||
          (obj.empConPhone1.length !== 10 && obj.empConPhone1.length !== 11 )
        ) {
          isValid = false;
        } else {
          objData.data.empConPhone1 = obj.empConPhone1;
        }
        utils.devLog(2, 'empConPhone1 -> '+isValid, null);

        // empConPhone2
        if (obj.empConPhone2 === undefined ||
          obj.empConPhone2 === null) {
          objData.data.empConPhone2 = null;
        } else {
          if (
            obj.empConPhone2 === "" ||
            obj.empConPhone2 === null ||
            typeof(obj.empConPhone2) !== "string"||
            (obj.empConPhone2.length !== 10 && obj.empConPhone2.length !== 11 )
          ) {
            isValid = false;
          } else {
            objData.data.empConPhone2 = obj.empConPhone2;
          }
        }
        utils.devLog(2, 'empConPhone2 -> '+isValid, null);

        // empConEmail
        if (
          obj.empConEmail === undefined ||
          obj.empConEmail === "" ||
          obj.empConEmail === null ||
          typeof(obj.empConEmail) !== "string"
        ) {
          isValid = false;
        } else {
          objData.data.empConEmail = obj.empConEmail;
        }
        utils.devLog(2, 'empConEmail -> '+isValid, null);

        // empObservations
        if (obj.empObservations === undefined||
          obj.empObservations === null) {
          objData.data.empObservations = null;
        } else {
          if (
            obj.empObservations === "" ||
            typeof(obj.empObservations) !== "string"
          ) {
            isValid = false;
          } else {
            objData.data.empObservations = obj.empObservations;
          }
        }
        utils.devLog(2, 'empObservations -> '+isValid, null);

        // empCreated
        // objData.data.empCreated = new Date();

        // empUpdated
        // objData.data.empUpdated = new Date();

        // empDeleted
        // objData.data.empDeleted = null;

        utils.devLog(2, 'Finish -> '+isValid, null);

        return isValid;
      } catch (error) {
        return false;
      }
    }
  }

  clientsEmployeesGetAll = async ({body,params}, res) => {
    const objData = { idMain: undefined, idSecondary: undefined, idTertiary: undefined, id: undefined, data: {} };

    try {
      const perId = "F003";

      utils.devLog(0, `API ==> Controller => clientsEmployeesGetAll -> Start`, null);

      const { useId } = body;      

      const objResAuth = await UsersController.usersPermission(useId,perId);
      if (!objResAuth.resData.permission) {
        utils.devLog(2, "API ==> Permission -> FALSE", null);
        return utils.resError(403, objResAuth.resMessage, {perId: objResAuth.resData.perId}, res );
      }
      utils.devLog(2, "API ==> Permission -> TRUE", null);
      
      // Function Controller Action
      let { cliId } = params;
      utils.devLog(2, 'cliId', cliId);
      if (!validateParameters(cliId)) {
        return utils.resError(400,`API ==> Controller => clientsEmployeesGetAll -> Invalid parameters`, null, res);
      }

      // Check Clients
      const resClientsCheckId = await CLIENTS.findByPk(objData.idMain, {});
      if (resClientsCheckId) {
        // Verifica se usuário possui permissão geral sobre as empresas
        // if (objResAuth.resData.useKeyCompany !== 0) {
        //   // Verifica se o registro que deseja alterar pertente a empresa que possui permissão
        //   if (resClientsCheckId.comId !== objResAuth.resData.useKeyCompany) {
        //     return utils.resError(403, "API ==> Controller => usersPermission -> Forbidden byId", null, res );
        //   }
        // }
      } else {
        return utils.resError(404,`API ==> Controller => clientsEmployeesGetAll -> clientsGetId -> Not found`, null, res);
      }

      // Check companies permissions
      const filter = {
        cliId: objData.idMain,
      };
      const resClientsGetAll = await CLIENTS_EMPLOYEES.findAll({
        where: filter,
        order: [
          ['empName', 'ASC'],
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
        ],
      });

      LogsController.logsCreate(useId, perId, `API ==> Controller => clientsEmployeesGetAll -> Success`, `=> [${useId}] # Clientes: Colaboradores: Listagem geral ## [${objData.idMain}] ${resClientsCheckId.cliName || 'Client Undefined'}`, objData.idMain);
      return utils.resSuccess('API ==> Controller => clientsEmployeesGetAll -> Success', resClientsGetAll, res );
    } catch (error) {
      return utils.resError(500,`API ==> Controller => clientsEmployeesGetAll -> Error`, error, res);
    }

    function validateParameters(cliId) {
      try {
        let isValid = true;

        // cliId
        cliId = Number(cliId);
        if (
          cliId === undefined ||
          cliId === "" ||
          cliId === null ||
          isNaN(cliId) ||
          typeof(cliId) !== "number"||
          !utils.validateNumberPositive(cliId)
        ) {
          isValid = false;
        } else {
          objData.idMain = Number(cliId);
          objData.data.cliId = Number(cliId);
        }
        utils.devLog(2, 'cliId -> '+isValid, null);

        utils.devLog(2, 'Finish -> '+isValid, null);

        return isValid;
      } catch (error) {
        return false;
      }
    }
  }

  clientsEmployeesGetId = async ({body,params}, res) => {
    const objData = { idMain: undefined, idSecondary: undefined, idTertiary: undefined, id: undefined, data: {} };

    try {
      const perId = "F003";

      utils.devLog(0, `API ==> Controller => clientsEmployeesGetId -> Start`, null);

      const { useId } = body;      

      const objResAuth = await UsersController.usersPermission(useId,perId);
      if (!objResAuth.resData.permission) {
        utils.devLog(2, "API ==> Permission -> FALSE", null);
        return utils.resError(403, objResAuth.resMessage, {perId: objResAuth.resData.perId}, res );
      }
      utils.devLog(2, "API ==> Permission -> TRUE", null);
      
      // Function Controller Action
      let { cliId, empId } = params;
      utils.devLog(2, 'cliId', cliId);
      utils.devLog(2, 'empId', empId);
      if (!validateParameters(cliId, empId)) {
        return utils.resError(400,`API ==> Controller => clientsEmployeesGetId -> Invalid parameters`, null, res);
      }

      // Check Clients
      const resClientsGetId = await CLIENTS.findByPk(objData.idMain, {});
      if (resClientsGetId) {
        //
      } else {
        return utils.resError(404,`API ==> Controller => clientsEmployeesGetId -> clientsGetId -> Not found`, null, res);
      }

      // Check Employees
      const resClientsEmployeesGetId = await CLIENTS_EMPLOYEES.findByPk(objData.idSecondary, {
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
          'CLIENTS_MEMBERS',
        ],
      });
      if (resClientsEmployeesGetId) {
        // Verifica colaborador corresponde o cliente pesquisado
        if (resClientsEmployeesGetId.cliId === objData.idMain) {
          //
        } else {
          return utils.resError(400,`API ==> Controller => clientsEmployeesGetId -> Invalid parameters -> id main`, null, res);
        }
      } else {
        return utils.resError(404,`API ==> Controller => clientsEmployeesGetId -> clientsEmployeesGetId -> Not found`, null, res);
      }

      LogsController.logsCreate(useId, perId, `API ==> Controller => clientsEmployeesGetId -> Success`, `=> [${useId}] # Clientes: Colaboradores: Consultado ## [${objData.idSecondary}] ${resClientsEmployeesGetId.empName}`, objData.idSecondary);
      return utils.resSuccess('API ==> Controller => clientsEmployeesGetId -> Success', resClientsEmployeesGetId, res );
    } catch (error) {
      return utils.resError(500,`API ==> Controller => clientsEmployeesGetId -> Error`, error, res);
    }

    function validateParameters(cliId, empId) {
      try {
        let isValid = true;

        // cliId
        cliId = Number(cliId);
        if (
          cliId === undefined ||
          cliId === "" ||
          cliId === null ||
          isNaN(cliId) ||
          typeof(cliId) !== "number"||
          !utils.validateNumberPositive(cliId)
        ) {
          isValid = false;
        } else {
          objData.idMain = Number(cliId);
          objData.data.cliId = Number(cliId);
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

        utils.devLog(2, 'Finish -> '+isValid, null);

        return isValid;
      } catch (error) {
        return false;
      }
    }
  }

  clientsEmployeesPut = async ({body,params}, res) => {
    const objData = { idMain: undefined, idSecondary: undefined, idTertiary: undefined, id: undefined, data: {} };

    try {
      const perId = "F004";

      utils.devLog(0, `API ==> Controller => clientsEmployeesPut -> Start`, null);

      const { useId } = body;

      const objResAuth = await UsersController.usersPermission(useId,perId);
      if (!objResAuth.resData.permission) {
        utils.devLog(2, "API ==> Permission -> FALSE", null);
        return utils.resError(403, objResAuth.resMessage, { perId: objResAuth.resData.perId }, res );
      }
      utils.devLog(2, "API ==> Permission -> TRUE", null);

      // Function Controller Action
      let { cliId, empId } = params;
      utils.devLog(2, 'cliId', cliId);
      utils.devLog(2, 'empId', empId);
      utils.devLog(2, 'body', body);
      if (!validateParameters(cliId, empId, body)) {
        return utils.resError(400,`API ==> Controller => clientsEmployeesPut -> Invalid parameters`, null, res);
      }

      utils.devLog(2, "API ==> Controller => clientsEmployeesPut : objData", objData);

      // Check Clients
      const resClientsCheckId = await CLIENTS.findByPk(objData.idMain, {});
      if (resClientsCheckId) {
        // Verifica se usuário possui permissão geral sobre as empresas
        // if (objResAuth.resData.useKeyCompany !== 0) {
        //   // Verifica se o registro que deseja alterar pertente a empresa que possui permissão
        //   if (resClientsCheckId.comId !== objResAuth.resData.useKeyCompany) {
        //     return utils.resError(403, "API ==> Controller => usersPermission -> Forbidden byId", null, res );
        //   }
        // }
      } else {
        return utils.resError(404,`API ==> Controller => clientsEmployeesPut -> clientsGetId -> Not found`, null, res);
      }

      // Check Employees
      const resEmployeesGetId = await CLIENTS_EMPLOYEES.findByPk(objData.idSecondary, {});
      if (resEmployeesGetId) {
        // Verifica colaborador corresponde o cliente pesquisado
        if (resEmployeesGetId.cliId === objData.idMain) {
          //
        } else {
          return utils.resError(400,`API ==> Controller => clientsEmployeesPut -> clientsEmployeesGetId -> Invalid parameters -> id main`, null, res);
        }
      } else {
        return utils.resError(404,`API ==> Controller => clientsEmployeesPut -> clientsEmployeesGetId -> Not found`, null, res);
      }

      // Check unique key => empDocCpf
      if (objData.data.empDocCpf !== resEmployeesGetId.empDocCpf) {
        const resClientsCheckCpfCnpj = await CLIENTS_EMPLOYEES.findAll({
          where: {
            empDocCpf: objData.data.empDocCpf, // kesdev-cpfcnpj
          }
        });
        utils.devLog(2, 'Check unique key => empDocCpf', resClientsCheckCpfCnpj);
        if (resClientsCheckCpfCnpj.length > 0) {
          return utils.resError( 409, "API ==> Controller => clientsPut -> Unique-key conflict [empDocCpf]", null, res );
        }
      }

      // Check unique key => empDocRg
      if (objData.data.empDocRg !== resEmployeesGetId.empDocRg) {
        const resClientsCheckRg = await CLIENTS_EMPLOYEES.findAll({
          where: {
            empDocRg: objData.data.empDocRg, // kesdev-cpfcnpj
          }
        });
        utils.devLog(2, 'Check unique key => empDocRg', resClientsCheckRg);
        if (resClientsCheckRg.length > 0) {
          return utils.resError( 409, "API ==> Controller => clientsPut -> Unique-key conflict [empDocRg]", null, res );
        }
      }

      // Check unique key => empDocCtps
      if (objData.data.empDocCtps) {
        // CTPS Informado
        if (objData.data.empDocCtps !== resEmployeesGetId.empDocCtps) {
          const resClientsCheckCtps = await CLIENTS_EMPLOYEES.findAll({
            where: {
              empDocCtps: objData.data.empDocCtps, // kesdev-cpfcnpj
            }
          });
          utils.devLog(2, 'Check unique key => empDocCtps', resClientsCheckCtps);
          if (resClientsCheckCtps.length > 0) {
            return utils.resError( 409, "API ==> Controller => clientsPut -> Unique-key conflict [empDocCtps]", null, res );
          }
        }
      }

      const bkpEmployeesData = resEmployeesGetId;

      // Update DATA Clients Employees
      utils.devLog(2, "API ==> Controller => clientsEmployeesPut -> Update Clients Employees", null);
      const resClientsEmployeesPut = await resEmployeesGetId.update(objData.data);

      // Update MEMBERS
      utils.devLog(2, "API ==> Controller => clientsEmployeesPut -> Update Members", null);
      const resMembersPut = await ClientsMembersController.clientsMembersPut({ 
        params: {
          cliId: objData.idMain,
          empId: objData.idSecondary,
          memId: resEmployeesGetId.memId,
        },
        body: {
          devControl: true,
          useId: useId,
          comId: objData.data.comId,
          memName: objData.data.empName,
          memType: 'Titular',
          memDocBirthDate: body.empDocBirthDate,// objData.data.empDocBirthDate,
          memDocCpf: objData.data.empDocCpf,
          memDocRg: objData.data.empDocRg,
          memObservations: objData.data.empObservations,
        }
      });
      utils.devLog(2, "API ==> Controller => clientsEmployeesPut -> resMembersPut -> Success", resMembersPut);
      if (resMembersPut.resStatus !== 200) {
        // Restore Employees
        utils.devLog(2, "API ==> Controller => clientsEmployeesPut -> Update Clients Employees [restore] -> Employees", null);
        const resClientsEmployeesPutRestore = await resEmployeesGetId.update(bkpEmployeesData);
        return utils.resError(424, "API ==> Controller => clientsEmployeesPut -> resMembersPut -> Error [members]", null, res );
      }

      LogsController.logsCreate(useId, perId, 'API ==> Controller => clientsEmployeesPut ->', `=> [${useId}] # Clientes: Colaboradores: Atualizado ## [${objData.idSecondary}] ${resEmployeesGetId.empName}`, objData.idSecondary);
      return utils.resSuccess('API ==> Controller => clientsEmployeesPut -> Success',{empId: objData.idSecondary }, res);    

    } catch (error) {
      return utils.resError(500,`API ==> Controller => clientsEmployeesPut -> Error`, error, res);
    }

    function validateParameters(cliId, empId, obj) {
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
          typeof(empId) !== "number"
        ) {
          isValid = false;
        } else {
          objData.idSecondary = empId;
          objData.data.empId = empId;
        }
        utils.devLog(2, 'empId -> '+isValid, null);

        // comId
        console.log(obj.comId);
        obj.comId = Number(obj.comId);
        if (
          obj.comId === undefined ||
          obj.comId === "" ||
          obj.comId === null ||
          isNaN(obj.comId) ||
          typeof(obj.comId) !== "number" ||
          !utils.validateNumberPositive(obj.comId)
        ) {
          isValid = false;
        } else {
          objData.data.comId = Number(obj.comId);
        }
        utils.devLog(2, 'comId -> '+isValid, null);

        // empName
        if (
          obj.empName === undefined ||
          obj.empName === "" ||
          obj.empName === null ||
          typeof(obj.empName) !== "string"
        ) {
          isValid = false;
        } else {
          objData.data.empName = obj.empName;
        }
        utils.devLog(2, 'empName -> '+isValid, null);
        
        // empDocBirthDate
        if (!utils.dateDateStrToDate(obj.empDocBirthDate)) {
          isValid = false;
        } else {
          objData.data.empDocBirthDate = utils.dateDateStrToDate(obj.empDocBirthDate);
        }
        utils.devLog(2, 'empDocBirthDate -> '+isValid, null);

        // empInfMaritalStatus
        if (obj.empInfMaritalStatus === undefined ||
          obj.empInfMaritalStatus === null) {
          objData.data.empInfMaritalStatus = null;
        } else {
          if (
            obj.empInfMaritalStatus !== "Solteiro" &&
            obj.empInfMaritalStatus !== "Casado" &&
            obj.empInfMaritalStatus !== "Viúvo" &&
            obj.empInfMaritalStatus !== "Divorciado"
          ) {
            isValid = false;
          } else {
            objData.data.empInfMaritalStatus = obj.empInfMaritalStatus;
          }
        }
        utils.devLog(2, 'empInfMaritalStatus -> '+isValid, null);

        // empDocCpf
        if (
          obj.empDocCpf === undefined ||
          obj.empDocCpf === "" ||
          obj.empDocCpf === null ||
          typeof(obj.empDocCpf) !== "string" ||
          (obj.empDocCpf.length !== 11 && obj.empDocCpf.length !== 14 )
        ) {
          isValid = false;
        } else {
          objData.data.empDocCpf = obj.empDocCpf;
        }
        utils.devLog(2, 'empDocCpf -> '+isValid, null);

        // empDocRg
        if (
          obj.empDocRg === undefined ||
          obj.empDocRg === "" ||
          obj.empDocRg === null ||
          typeof(obj.empDocRg) !== "string"
        ) {
          isValid = false;
        } else {
          objData.data.empDocRg = obj.empDocRg;
        }
        utils.devLog(2, 'empDocRg -> '+isValid, null);

        // empDocCtps
        if (obj.empDocCtps === undefined ||
          obj.empDocCtps === null) {
          objData.data.empDocCtps = null;
        } else {
          if (
            obj.empDocCtps === undefined ||
            obj.empDocCtps === "" ||
            obj.empDocCtps === null ||
            typeof(obj.empDocCtps) !== "string"
          ) {
            isValid = false;
          } else {
            objData.data.empDocCtps = obj.empDocCtps;
          }
        }
        utils.devLog(2, 'empDocCtps -> '+isValid, null);

        // empJobOccupation
        if (obj.empJobOccupation === undefined ||
          obj.empJobOccupation === null) {
          objData.data.empJobOccupation = null;
        } else {
          if (
            obj.empJobOccupation === undefined ||
            obj.empJobOccupation === "" ||
            obj.empJobOccupation === null ||
            typeof(obj.empJobOccupation) !== "string"
          ) {
            isValid = false;
          } else {
            objData.data.empJobOccupation = obj.empJobOccupation;
          }
        }
        utils.devLog(2, 'empJobOccupation -> '+isValid, null);

        // empJobDate
        if (obj.empJobDate === undefined||
          obj.empJobDate === null) {
          objData.data.empJobDate = null;
        } else {
          if (!utils.dateDateStrToDate(obj.empJobDate)) {
            isValid = false;
          } else {
            objData.data.empJobDate = utils.dateDateStrToDate(obj.empJobDate);
          }
        }
        utils.devLog(2, 'empJobDate -> '+isValid, null);

        // empConPhone1
        if (
          obj.empConPhone1 === undefined ||
          obj.empConPhone1 === "" ||
          obj.empConPhone1 === null ||
          typeof(obj.empConPhone1) !== "string"||
          (obj.empConPhone1.length !== 10 && obj.empConPhone1.length !== 11 )
        ) {
          isValid = false;
        } else {
          objData.data.empConPhone1 = obj.empConPhone1;
        }
        utils.devLog(2, 'empConPhone1 -> '+isValid, null);

        // empConPhone2
        if (obj.empConPhone2 === undefined ||
          obj.empConPhone2 === null) {
          objData.data.empConPhone2 = null;
        } else {
          if (
            obj.empConPhone2 === "" ||
            obj.empConPhone2 === null ||
            typeof(obj.empConPhone2) !== "string"||
            (obj.empConPhone2.length !== 10 && obj.empConPhone2.length !== 11 )
          ) {
            isValid = false;
          } else {
            objData.data.empConPhone2 = obj.empConPhone2;
          }
        }
        utils.devLog(2, 'empConPhone2 -> '+isValid, null);

        // empConEmail
        if (
          obj.empConEmail === undefined ||
          obj.empConEmail === "" ||
          obj.empConEmail === null ||
          typeof(obj.empConEmail) !== "string"
        ) {
          isValid = false;
        } else {
          objData.data.empConEmail = obj.empConEmail;
        }
        utils.devLog(2, 'empConEmail -> '+isValid, null);

        // empObservations
        if (obj.empObservations === undefined||
          obj.empObservations === null) {
          objData.data.empObservations = null;
        } else {
          if (
            obj.empObservations === "" ||
            typeof(obj.empObservations) !== "string"
          ) {
            isValid = false;
          } else {
            objData.data.empObservations = obj.empObservations;
          }
        }
        utils.devLog(2, 'empObservations -> '+isValid, null);

        // empCreated
        // objData.data.empCreated = new Date();

        // empUpdated
        // objData.data.empUpdated = new Date();

        // empDeleted
        // objData.data.empDeleted = null;

        utils.devLog(2, 'Finish -> '+isValid, null);

        return isValid;
      } catch (error) {
        return false;
      }
    }
  }

  clientsEmployeesPatch = async ({body,params}, res) => {
    const objData = { idMain: undefined, idSecondary: undefined, idTertiary: undefined, id: undefined, data: {} };

    try {
      const perId = "F005";

      utils.devLog(0, `API ==> Controller => clientsEmployeesPatch -> Start`, null);

      const { useId } = body;

      const objResAuth = await UsersController.usersPermission(useId,perId);
      if (!objResAuth.resData.permission) {
        utils.devLog(2, "API ==> Permission -> FALSE", null);
        return utils.resError(403, objResAuth.resMessage, { perId: objResAuth.resData.perId }, res );
      }
      utils.devLog(2, "API ==> Permission -> TRUE", null);

      // Function Controller Action
      let { cliId, empId } = params;
      utils.devLog(2, 'cliId', cliId);
      utils.devLog(2, 'empId', empId);
      utils.devLog(2, 'body', body);
      if (!validateParameters(cliId, empId, body)) {
        return utils.resError(400,`API ==> Controller => clientsEmployeesPatch -> Invalid parameters`, null, res);
      }

      utils.devLog(2, "API ==> Controller => clientsEmployeesPatch : objData", objData);

      // Check Clients
      const resClientsGetId = await CLIENTS.findByPk(objData.idMain,{});
      if (resClientsGetId) {
        //
      } else {
        return utils.resError(404,`API ==> Controller => clientsEmployeesPatch -> clientsGetId -> Not found`, null, res);
      }
      const bkpClientsData = resClientsGetId;

      // Check Clients Employees
      const resClientsEmployeesGetId = await CLIENTS_EMPLOYEES.findByPk(objData.idSecondary,{});
      if (resClientsEmployeesGetId) {
        // Verifica colaborador corresponde o cliente pesquisado
        if (resClientsEmployeesGetId.cliId === objData.idMain) {
          //
        } else {
          return utils.resError(400,`API ==> Controller => clientsEmployeesPatch -> clientsEmployeesGetId -> Invalid parameters -> id main`, null, res);
        }
      } else {
        return utils.resError(404,`API ==> Controller => clientsEmployeesPatch -> clientsEmployeesGetId -> Not found`, null, res);
      }
      const bkpClientsEmployeesData = resClientsEmployeesGetId;

      // Update Clients Employees
      const resClientsEmployeesPatch = await resClientsEmployeesGetId.update(objData.data);

      // Update User
      // Not user for employees

      // Update ALL Members by Employees
      utils.devLog(2, "API ==> Controller => clientsEmployeesPatch -> Change Status", null);

      const sqlWhere = { where: { empId: objData.idSecondary }};
      // Disabled Members
        utils.devLog(2, "API ==> Controller => clientsEmployeesPatch -> Patch Clients Members", null);
        await CLIENTS_MEMBERS.update({ memStatus: objData.data.empStatus }, sqlWhere);
        utils.devLog(2, "API ==> Controller => clientsEmployeesPatch -> Patch Clients Members -> Success", null);

      LogsController.logsCreate(useId, perId, `API ==> Controller => clientsEmployeesPatch -> Success`, `=> [${useId}] # Clientes: Colaboradores: Atualizado [status] ## [${objData.idSecondary}] ${resClientsEmployeesGetId.empName}`, objData.idSecondary);
      return utils.resSuccess('API ==> Controller => clientsEmployeesPatch -> Success',{empId: objData.idSecondary }, res);    

    } catch (error) {
      return utils.resError(500,`API ==> Controller => clientsEmployeesPatch -> Error`, error, res);
    }

    function validateParameters(cliId, empId, obj) {
      try {
        let isValid = true;

        // cliId
        cliId = Number(cliId);
        if (
          cliId === undefined ||
          cliId === "" ||
          cliId === null ||
          isNaN(cliId) ||
          typeof(cliId) !== "number"||
          !utils.validateNumberPositive(cliId)
        ) {
          isValid = false;
        } else {
          objData.idMain = cliId;
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
          objData.idSecondary = empId;
        }
        utils.devLog(2, 'empId -> '+isValid, null);


        // empStatus
        if (
          obj.empStatus === undefined ||
          obj.empStatus === "" ||
          obj.empStatus === null ||
          typeof(obj.empStatus) !== "boolean" ||
          !utils.validateBoolean(obj.empStatus)
        ) {
          isValid = false;
        } else {
          objData.data.empStatus = obj.empStatus;
        }
        utils.devLog(2, 'empStatus -> '+isValid, null);

        // empCreated
        // objData.data.empCreated = new Date();

        // empUpdated
        // objData.data.empUpdated = new Date();

        // empDeleted
        // objData.data.empDeleted = null;

        // console.log(isValid)

        return isValid;
      } catch (error) {
        return false;
      }
    }
  }

  // Disabled
  clientsEmployeesDelete = async ({body,params}, res) => {
    const objData = { idMain: undefined, idSecondary: undefined, idTertiary: undefined, id: undefined, data: {} };

    try {
      const perId = "F006";
      const logMsg = "API ==> Controller => clientsEmployeesDelete -> Start";
      const { useId } = body;

      utils.devLog(0, logMsg, null);
      const objResAuth = await UsersController.usersPermission(useId,perId);
      if (!objResAuth.resData.permission) {
        utils.devLog(2, "API ==> Permission -> FALSE", null);
        return utils.resError(403, objResAuth.resMessage, { perId: objResAuth.resData.perId }, res );
      }
      utils.devLog(2, "API ==> Permission -> TRUE", null);

      // Function Controller Action
      let { cliId, empId } = params;
      utils.devLog(2, 'cliId', cliId);
      utils.devLog(2, 'empId', empId);
      if (!validateParameters(cliId, empId)) {
        return utils.resError(400,`API ==> Controller => clientsEmployeesDelete -> Invalid parameters`, null, res);
      }

      utils.devLog(2, "API ==> Controller => clientsEmployeesDelete : objData", objData);

      // Check Clients
      const resClientsGetId = await CLIENTS.findByPk(objData.idMain,{});
      if (resClientsGetId) {
        //
      } else {
        return utils.resError(404,`API ==> Controller => clientsEmployeesDelete -> clientsGetId -> Not found`, null, res);
      }
      const bkpClientsData = resClientsGetId;

      // Check Clients Employees
      const resClientsEmployeesGetId = await CLIENTS_EMPLOYEES.findByPk(objData.idSecondary,{});
      if (resClientsEmployeesGetId) {
        //
      } else {
        return utils.resError(404,`API ==> Controller => clientsEmployeesDelete -> clientsEmployeesGetId -> Not found`, null, res);
      }
      const bkpClientsEmployeesData = resClientsEmployeesGetId;

      // Update Clients Employees
      const resClientsEmployeesDelete = await resClientsEmployeesGetId.destroy({truncate: true});

      // Update User
      // Not user for employees

      // Update ALL Members by Employees
      utils.devLog(2, "API ==> Controller => clientsEmployeesDelete -> Delete", null);

      const sqlWhere = { where: { empId: objData.idSecondary }, truncate: true};
      // Disabled Members
        utils.devLog(2, "API ==> Controller => clientsEmployeesDelete -> Destroy Clients Members", null);
        await CLIENTS_MEMBERS.destroy({}, sqlWhere);
        utils.devLog(2, "API ==> Controller => clientsEmployeesDelete -> Destroy Clients Members -> Success", null);

      LogsController.logsCreate(useId, perId, `${logMsg} Success`, `=> [${useId}] # Clientes: Colaboradores: Deletado ## [${objData.idSecondary}] ${resClientsEmployeesGetId.empName}`, objData.idSecondary);
      return utils.resSuccess('API ==> Controller => clientsEmployeesDelete -> Success',{empId: objData.idSecondary }, res);    

    } catch (error) {
      return utils.resError(500,`API ==> Controller => clientsEmployeesDelete -> Error`, error, res);
    }

    function validateParameters(cliId, empId) {
      try {
        let isValid = true;

        // cliId
        cliId = Number(cliId);
        if (
          cliId === undefined ||
          cliId === "" ||
          cliId === null ||
          isNaN(cliId) ||
          typeof(cliId) !== "number"||
          !utils.validateNumberPositive(cliId)
        ) {
          isValid = false;
        } else {
          objData.idMain = cliId;
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
          objData.idSecondary = empId;
        }
        utils.devLog(2, 'empId -> '+isValid, null);

        return isValid;
      } catch (error) {
        return false;
      }
    }
  }
}

module.exports = new ClientsEmployeesController();
