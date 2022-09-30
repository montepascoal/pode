/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// CONTROLLER USER /////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//  --------------------------------------------------------------------------------------------------------------------------------------- Modules -----

const { Op } = require("sequelize");
const utils = require("../utils/utils.js");
const differenceInYears = require('date-fns/differenceInYears')

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

//  ------------------------------------------------------------------------------------------------------------------------------------- Class API -----
class ClientsMembersController {
  constructor() {
    //   this.step1 = this.step1.bind(this);
    //   this.step2 = this.step2.bind(this);
  }

  clientsMembersPost = async ({body,params}, res) => {
    const objData = { idMain: undefined, idSecondary: undefined, idTertiary: undefined, id: undefined, data: {} };

    try {
      const perId = "F001";

      utils.devLog(0, `API ==> Controller => clientsMembersPost -> Start`, null);

      const { useId, devControl } = body;

      const objResAuth = await UsersController.usersPermission(useId,perId);
      if (!objResAuth.resData.permission) {
        utils.devLog(2, "API ==> Permission -> FALSE", null);
        return utils.resError(403, objResAuth.resMessage, { perId: objResAuth.resData.perId }, res );
      }
      utils.devLog(2, "API ==> Permission -> TRUE", null);

      // Function Controller Action
      let { cliId, empId } = params;
      utils.devLog(2, `cliId -> ${cliId}`);
      utils.devLog(2, `empId -> ${empId}`);
      utils.devLog(2, `devControl -> ${devControl}`);
      utils.devLog(2, 'body', body);
      if (!validateParameters(cliId, empId, devControl, body)) {
        return utils.resError(400,`API ==> Controller => clientsMembersPost -> Invalid parameters`, null, res);
      }

      utils.devLog(2, "API ==> Controller => clientsMembersPost : objData", objData);

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
        return utils.resError(404,`API ==> Controller => clientsMembersPost -> clientsGetId -> Not found`, null, res);
      }

      // Create Field => conStatus / conId
      objData.data.conStatus = resClientsGetId.conStatus;
      objData.data.conId = resClientsGetId.conId;

      // Check Employees
      const resEmployeesGetId = await CLIENTS_EMPLOYEES.findByPk(objData.idSecondary, {});
      if (resEmployeesGetId) {
        // Verifica colaborador corresponde o cliente pesquisado
        if (resEmployeesGetId.cliId === objData.idMain) {
          //
        } else {
          return utils.resError(400,`API ==> Controller => clientsMembersPost -> clientsEmployeesGetId -> Invalid parameters -> id main`, null, res);
        }
      } else {
        return utils.resError(404,`API ==> Controller => clientsMembersPost -> clientsEmployeesGetId -> Not found`, null, res);
      }

      // Check unique key => memDocRg
      utils.devLog(2, "API ==> Controller => clientsMembersPost -> Check unique key => memDocRg", null);
      const resMembersGetId = await CLIENTS_MEMBERS.findAll({
        where: { memDocRg: objData.data.memDocRg }
      });
      utils.devLog(2, 'Check unique key => memDocRg', resMembersGetId);
      if (resMembersGetId.length > 0) {
        return utils.resError(409, "API ==> Controller => clientsMembersPost -> Unique-key conflict", null, res );
      }

      // Check unique key => ONE "Cônjuge" by Member Main
      if (objData.data.memType === 'Cônjuge') {
        utils.devLog(2, "API ==> Controller => clientsMembersPost -> Check unique key => memType 'Cônjuge'", null);
        const resMembersCheckType = await CLIENTS_MEMBERS.findAll({
          where: {
            [Op.and]: [
              { cliId: objData.data.cliId },
              { empId: objData.data.empId },
              { memType: 'Cônjuge'}
            ]
          }
        });
        utils.devLog(2, "API ==> Controller => clientsMembersPost -> Check unique key => memType [Cônjuge]", resMembersCheckType);
        if (resMembersCheckType.length > 0) {
          return utils.resError(409, "API ==> Controller => clientsMembersPost -> Check unique key => memType [Cônjuge] -> Unique-key conflict", null, res );
        }
      }

      // Save DATA Clients Members
      utils.devLog(2, "API ==> Controller => clientsMembersPost -> Save Clients Members", null);
      const resClientsMembersPost = await CLIENTS_MEMBERS.create(objData.data);
      objData.idTertiary = resClientsMembersPost.dataValues.id;

      // Update Member ID
      utils.devLog(2, "API ==> Controller => clientsMembersPost -> Update Clients Members [memId]", null);
      const resclientsMembersGetId = await resClientsMembersPost.update({
        memId: `${objData.data.comId}.${objData.data.cliId}.${objData.data.empId}.${objData.idTertiary}`
      });

      LogsController.logsCreate(useId, perId, `API ==> Controller => clientsMembersPost -> Success`, `=> [${useId}] # Clientes: Colaboradores: Membros: Cadastrado ## [${objData.idTertiary}] ${objData.data.memName}`, objData.idTertiary);
      return utils.resSuccess('API ==> Controller => clientsMembersPost -> Success', { memId: objData.idTertiary }, res);    

    } catch (error) {
      return utils.resError(500,`API ==> Controller => clientsMembersPost -> Error`, error, res);
    }

    function validateParameters(cliId, empId, devControl, obj) {
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

        // conStatus
        objData.data.conStatus = false;
        utils.devLog(2, 'conStatus -> '+isValid, null);

        // conId
        objData.data.conId = null;
        utils.devLog(2, 'conId -> '+isValid, null);

        // memId
        objData.data.memId = `${objData.data.comId}.${objData.data.cliId}.${objData.data.empId}.0`;
        utils.devLog(2, 'memId -> '+isValid, null);

        // memIdOld
        if (obj.memIdOld === undefined||
          obj.memIdOld === null) {
          objData.data.memIdOld = null;
        } else {
          if (
            obj.memIdOld === "" ||
            typeof(obj.memIdOld) !== "string"
          ) {
            isValid = false;
          } else {
            objData.data.memIdOld = obj.memIdOld;
          }
        }
        utils.devLog(2, 'memIdOld -> '+isValid, null);

        // memStatus
        objData.data.memStatus = true;
        utils.devLog(2, 'memStatus -> '+isValid, null);

        // memType
        utils.devLog(2, 'memType [tmp] [0] -> '+isValid, null);
        if (
          obj.memType === undefined ||
          obj.memType === "" ||
          obj.memType === null ||
          typeof(obj.memType) !== "string"
        ) {
          isValid = false;
        } else {
          utils.devLog(2, 'memType [tmp] [1] -> '+isValid, null);
          if (devControl) {
            utils.devLog(2, 'memType [tmp] [2] -> '+isValid, null);
            if (
              obj.memType !== "Titular" // => Somente POST
            ) {
              isValid = false;
              utils.devLog(2, 'memType [tmp] [3] -> '+isValid, null);
            } else {
              objData.data.memType = obj.memType;
            }
          } else {
            utils.devLog(2, 'memType [tmp] [4] -> '+isValid, null);
            if (
              obj.memType !== "Filho(a)" &&
              obj.memType !== "Cônjuge"
            ) {
              isValid = false;
              utils.devLog(2, 'memType [tmp] [5] -> '+isValid, null);
            } else {
              objData.data.memType = obj.memType;
            }
          }
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
        
        // memDocCpf
        if (obj.memDocCpf === undefined||
          obj.memDocCpf === null) {
          objData.data.memDocCpf = null;
        } else {
          if (
            obj.memDocCpf === undefined ||
            obj.memDocCpf === "" ||
            obj.memDocCpf === null ||
            typeof(obj.memDocCpf) !== "string" ||
            (obj.memDocCpf.length !== 11 && obj.memDocCpf.length !== 14 )
          ) {
            isValid = false;
          } else {
            objData.data.memDocCpf = obj.memDocCpf;
          }
        }
        utils.devLog(2, 'memDocCpf -> '+isValid, null);

        // memDocRg
        if (
          obj.memDocRg === undefined ||
          obj.memDocRg === "" ||
          obj.memDocRg === null ||
          typeof(obj.memDocRg) !== "string"
        ) {
          isValid = false;
        } else {
          objData.data.memDocRg = obj.memDocRg;
        }
        utils.devLog(2, 'memDocRg -> '+isValid, null);

        // memPcD
        if (
          obj.memPcD === undefined ||
          obj.memPcD === "" ||
          obj.memPcD === null ||
          typeof(obj.memPcD) !== "boolean" ||
          !utils.validateBoolean(obj.memPcD)
        ) {
          isValid = false;
        } else {
          objData.data.memPcD = obj.memPcD;
        }
        utils.devLog(2, 'memPcD -> '+isValid, null);  

        // memAudited
        objData.data.memAudited = false;
        if (objData.data.memPcD) {
          if (objData.data.memType === 'Filho(a)') {
            objData.data.memAudited = true;
            objData.data.memStatus = false;
            utils.devLog(2, 'memStatus [audited] -> '+isValid, null);
          }
        }
        utils.devLog(2, 'memAudited -> '+isValid, null); 

        // memDocBirthDate
        utils.devLog(2, 'memDocBirthDate [tmp] [0] -> '+isValid, null);
        if (!utils.dateDateStrToDate(obj.memDocBirthDate)) {
          isValid = false;
          utils.devLog(2, 'memDocBirthDate [tmp] [1] -> '+isValid, null);
        } else {
          utils.devLog(2, 'memDocBirthDate [tmp] [2] -> '+isValid, null);
          let dateSelected = utils.dateDateStrToDate(obj.memDocBirthDate);
          let limitAge = 21;
          let date = new Date();
          let age = differenceInYears(date, dateSelected);
          utils.devLog(2, 'memDocBirthDate [tmp] [3] -> '+isValid, null);
          if (dateSelected > date) {
            isValid = false;
            utils.devLog(2, 'memDocBirthDate [tmp] [4] -> '+isValid, null);
          }
          if (age < 0) {
            isValid = false;
            utils.devLog(2, 'memDocBirthDate [tmp] [5] -> '+isValid, null);
          }
          if (age === 0) {
            if (
              dateSelected.getDate() === date.getDate() &&
              dateSelected.getMonth() === date.getMonth() &&
              dateSelected.getYear() === date.getYear()
              ) {
                isValid = false;
              utils.devLog(2, 'memDocBirthDate [tmp] [6] -> '+isValid, null);
            }
          }
          if (objData.data.memType === 'Filho(a)') {
            utils.devLog(2, 'memDocBirthDate [tmp] [7] -> '+isValid, null);
            if (age === limitAge) {
              if (!obj.memPcD) {
                isValid = false;
                utils.devLog(2, 'memDocBirthDate [tmp] [8] -> '+isValid, null);
              }
            } 
            if (age > limitAge) {
              if (!obj.memPcD) {
                isValid = false;
                utils.devLog(2, 'memDocBirthDate [tmp] [9] -> '+isValid, null);
              }
            }
          } 
        }
        objData.data.memDocBirthDate = utils.dateDateStrToDate(obj.memDocBirthDate);
        utils.devLog(2, 'memDocBirthDate -> '+isValid, null);

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

        utils.devLog(2, 'Finish -> '+isValid, null);

        return isValid;
      } catch (error) {
        return false;
      }
    }
  }

  clientsMembersGetAll = async ({body,params}, res) => {
    const objData = { idMain: undefined, idSecondary: undefined, idTertiary: undefined, id: undefined, data: {} };

    try {
      const perId = "F003";

      utils.devLog(0, 'API ==> Controller => clientsMembersGetAll -> Start', null);

      const { useId } = body;
      
      // utils.devLog(2, null, useId);
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
        return utils.resError(400,`API ==> Controller => clientsMembersGetAll -> Invalid parameters`, null, res);
      }

      utils.devLog(2, "API ==> Controller => clientsMembersGetId : objData", objData);

      // Check Clients
      const resClientsGetId = await CLIENTS.findByPk(objData.idMain, {});
      if (resClientsGetId) {
        // Verifica se usuário possui permissão geral sobre as empresas
        // if (objResAuth.resData.useKeyCompany !== 0) {
        //   // Verifica se o registro que deseja alterar pertente a empresa que possui permissão
        //   if (resClientsCheckId.comId !== objResAuth.resData.useKeyCompany) {
        //     return utils.resError(403, "API ==> Controller => usersPermission -> Forbidden byId", null, res );
        //   }
        // }
      } else {
        return utils.resError(404,`API ==> Controller => clientsMembersGetAll -> clientsGetId -> Not found`, null, res);
      }

      // Check Employees
      const resEmployeesGetId = await CLIENTS_EMPLOYEES.findByPk(objData.idSecondary, {});
      if (resEmployeesGetId) {
        // Verifica colaborador corresponde o cliente pesquisado
        if (resEmployeesGetId.cliId === objData.idMain) {
          //
        } else {
          return utils.resError(400,`API ==> Controller => clientsMembersGetAll -> clientsEmployeesGetId -> Invalid parameters -> id main`, null, res);
        }
      } else {
        return utils.resError(404,`API ==> Controller => clientsMembersGetAll -> clientsEmployeesGetId -> Not found`, null, res);
      }
      
      // Check companies permissions
      const filter = {
        cliId: objData.idMain,
        empId: objData.idSecondary,
      };
      // if (objResAuth.resData.useKeyCompany !== 0) {
      //   filter.comId = objResAuth.resData.useKeyCompany;
      // }
      const resMembersGetAll = await CLIENTS_MEMBERS.findAll({
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

      LogsController.logsCreate(useId, perId, 'API ==> Controller => clientsMembersGetAll -> Success', `=> [${useId}] # Clientes: Colaboradores: Membros: Listagem geral ## [${objData.idSecondary}] ${resEmployeesGetId.empName || 'Employee Undefined'}`, objData.idSecondary);
      return utils.resSuccess('API ==> Controller => clientsMembersGetAll -> Success', resMembersGetAll, res );
    } catch (error) {
      return utils.resError(500,`API ==> Controller => clientsMembersGetAll -> Error`, error, res);
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
          typeof(cliId) !== "number"
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
          objData.idSecondary = Number(empId);
        }
        utils.devLog(2, 'empId -> '+isValid, null);

        return isValid;
      } catch (error) {
        return false;
      }
    }
  }

  clientsMembersGetId = async ({body,params}, res) => {
    const objData = { idMain: undefined, idSecondary: undefined, idTertiary: undefined, id: undefined, data: {} };

    try {
      const perId = "F003";

      utils.devLog(0, 'API ==> Controller => clientsMembersGetId -> Start', null);

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
      if (!validateParameters(cliId, empId, memId)) {
        return utils.resError(400,`API ==> Controller => clientsMembersGetId -> Invalid parameters`, null, res);
      }

      utils.devLog(2, "API ==> Controller => clientsMembersGetId : objData", objData);

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
        return utils.resError(404,`API ==> Controller => clientsMembersGetId -> clientsGetId -> Not found`, null, res);
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
        return utils.resError(404,`API ==> Controller => clientsMembersGetId -> employeesGetId -> Not found`, null, res);
      }

      const resMembersGetId = await CLIENTS_MEMBERS.findByPk(objData.idTertiary,{
        include: [
          'COMPANIES',
          // 'USERS',
          // 'CONFIG_COUNTRIES',
          // 'CONFIG_STATES',
          // 'CONFIG_CITIES',
          // 'CLIENTS_CONTACTS',
          // 'CLIENTS_SERVICES',
          // 'CLIENTS_FILES',
          'CLIENTS_MEMBERS_FILES',
          'CLIENTS',
          'CLIENTS_EMPLOYEES',
        ],
      });

      // Validate Client / Employee
      if (resMembersGetId) {
        // Verifica membro corresponde o cliente e colaborador pesquisado
        if (resMembersGetId.cliId == objData.idMain && resMembersGetId.empId == objData.idSecondary) {
          // 
        } else {
          return utils.resError(400,`API ==> Controller => clientsMembersGetId -> membersGetId -> Invalid parameters -> id main`, null, res);
        }
      } else {
        return utils.resError(404,`API ==> Controller => clientsMembersGetId -> membersGetId -> Not found`, null, res);
      }

      LogsController.logsCreate(useId, perId, 'API ==> Controller => clientsMembersGetId -> Success', `=> [${useId}] # Clientes: Colaboradores: Membros: Consultado ## [${objData.idTertiary}] ${resMembersGetId.memName}`, objData.idTertiary);
      return utils.resSuccess('API ==> Controller => clientsMembersGetId -> Success',resMembersGetId, res); 

    } catch (error) {
      return utils.resError(500,`API ==> Controller => clientsMembersGetId -> Error`, error, res);
    }

    function validateParameters(cliId, empId, memId) {
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
          objData.idTertiary = Number(memId);
        }
        utils.devLog(2, 'memId -> '+isValid, null);

        return isValid;
      } catch (error) {
        return false;
      }
    }
  }

  clientsMembersPut = async ({body,params}, res) => {
    const objData = { idMain: undefined, idSecondary: undefined, idTertiary: undefined, id: undefined, data: {} };

    try {
      const perId = "F004";

      utils.devLog(0, `API ==> Controller => clientsMembersPut -> Start`, null);

      const { useId, devControl } = body;

      const objResAuth = await UsersController.usersPermission(useId,perId);
      if (!objResAuth.resData.permission) {
        utils.devLog(2, "API ==> Permission -> FALSE", null);
        return utils.resError(403, objResAuth.resMessage, { perId: objResAuth.resData.perId }, res );
      }
      utils.devLog(2, "API ==> Permission -> TRUE", null);

      // Function Controller Action
      let { cliId, empId, memId } = params;
      utils.devLog(2, `cliId -> ${cliId}`);
      utils.devLog(2, `empId -> ${empId}`);
      utils.devLog(2, `memId -> ${memId}`);
      utils.devLog(2, `devControl -> ${devControl}`);
      utils.devLog(2, 'body', body);
      if (!validateParameters(cliId, empId, memId, devControl, body)) {
        return utils.resError(400,`API ==> Controller => clientsMembersPut -> Invalid parameters`, null, res);
      }

      utils.devLog(2, "API ==> Controller => clientsMembersPut : objData", objData);

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
        return utils.resError(404,`API ==> Controller => clientsMembersPut -> clientsGetId -> Not found`, null, res);
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
        return utils.resError(404,`API ==> Controller => clientsMembersPut -> employeesGetId -> Not found`, null, res);
      }

      // Check Members
      const resMembersGetId = await CLIENTS_MEMBERS.findByPk(objData.idTertiary, {});
      // Validate Client / Employee
      if (resMembersGetId) {
        // Verifica membro corresponde o cliente e colaborador pesquisado
        if (resMembersGetId.cliId == objData.idMain && resMembersGetId.empId == objData.idSecondary) {
          // 
        } else {
          return utils.resError(400,`API ==> Controller => clientsMembersPut -> membersGetId -> Invalid parameters -> id main`, null, res);
        }
      } else {
        return utils.resError(404,`API ==> Controller => clientsMembersPut -> membersGetId -> Not found`, null, res);
      }

      // Check unique key => memDocRg
      if (objData.data.memDocRg !== resMembersGetId.memDocRg) {
        utils.devLog(2, "API ==> Controller => clientsMembersPut -> Check unique key => memDocRg", null);
        const resMembersCheckRg = await CLIENTS_MEMBERS.findAll({
          where: { memDocRg: objData.data.memDocRg }
        });
        utils.devLog(2, 'Check unique key => memDocRg', resMembersCheckRg);
        if (resMembersCheckRg.length > 0) {
          return utils.resError(409, "API ==> Controller => clientsMembersPut -> Unique-key conflict", null, res );
        }
      }

      // Check unique key => ONE "Cônjuge" by Member Main
      if (objData.data.memType === 'Cônjuge') {
        utils.devLog(2, "API ==> Controller => clientsMembersPut -> Check unique key => memType 'Cônjuge'", null);
        const resMembersCheckType = await CLIENTS_MEMBERS.findAll({
          where: {
            [Op.and]: [
              { cliId: objData.data.cliId },
              { empId: objData.data.empId },
              { memType: 'Cônjuge '}
            ]
          }
        });
        utils.devLog(2, "API ==> Controller => clientsMembersPut -> Check unique key => memType [Cônjuge]", resMembersCheckType);
        if (resMembersCheckType.length > 0) {
          return utils.resError(409, "API ==> Controller => clientsMembersPut -> Check unique key => memType [Cônjuge] -> Unique-key conflict", null, res );
        }
      }

      const bkpMembersData = resMembersGetId;

      // Update DATA Clients Members
      utils.devLog(2, "API ==> Controller => clientsMembersPut -> Update Clients Members", null);
      const resClientsMembersPut = await resMembersGetId.update(objData.data);

      LogsController.logsCreate(useId, perId, 'API ==> Controller => clientsMembersPut -> Success', `=> [${useId}] # Clientes: Colaboradores: Membros: Atualizado ## [${objData.idTertiary}] ${objData.data.memName}`, objData.idTertiary);
      return utils.resSuccess('API ==> Controller => clientsMembersPut -> Success',{memId: objData.idTertiary }, res);    

    } catch (error) {
      return utils.resError(500,`API ==> Controller => clientsMembersPut -> Error`, error, res);
    }

    function validateParameters(cliId, empId, memId, devControl, obj) {
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
        
        // memId
        objData.data.memId = `${objData.data.comId}.${objData.data.cliId}.${objData.data.empId}.${objData.idTertiary}`;
        utils.devLog(2, 'memId -> '+isValid, null);
        
        // memIdOld
        if (obj.memIdOld === undefined||
          obj.memIdOld === null) {
          objData.data.memIdOld = null;
        } else {
          if (
            obj.memIdOld === "" ||
            typeof(obj.memIdOld) !== "string"
          ) {
            isValid = false;
          } else {
            objData.data.memIdOld = obj.memIdOld;
          }
        }
        utils.devLog(2, 'memIdOld -> '+isValid, null);

        // memType
        utils.devLog(2, 'memType [tmp] [0] -> '+isValid, null);
        if (
          obj.memType === undefined ||
          obj.memType === "" ||
          obj.memType === null ||
          typeof(obj.memType) !== "string"
        ) {
          isValid = false;
        } else {
          utils.devLog(2, 'memType [tmp] [1] -> '+isValid, null);
          if (devControl) {
            utils.devLog(2, 'memType [tmp] [2] -> '+isValid, null);
            if (
              obj.memType !== "Titular" // => Somente POST
            ) {
              isValid = false;
              utils.devLog(2, 'memType [tmp] [3] -> '+isValid, null);
            } else {
              objData.data.memType = obj.memType;
            }
          } else {
            utils.devLog(2, 'memType [tmp] [4] -> '+isValid, null);
            if (
              obj.memType !== "Filho(a)" &&
              obj.memType !== "Cônjuge"
            ) {
              isValid = false;
              utils.devLog(2, 'memType [tmp] [5] -> '+isValid, null);
            } else {
              objData.data.memType = obj.memType;
            }
          }
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

        // memDocCpf
        if (obj.memDocCpf === undefined||
          obj.memDocCpf === null) {
          objData.data.memDocCpf = null;
        } else {
          if (
            obj.memDocCpf === undefined ||
            obj.memDocCpf === "" ||
            obj.memDocCpf === null ||
            typeof(obj.memDocCpf) !== "string" ||
            (obj.memDocCpf.length !== 11 && obj.memDocCpf.length !== 14 )
          ) {
            isValid = false;
          } else {
            objData.data.memDocCpf = obj.memDocCpf;
          }
        }
        utils.devLog(2, 'memDocCpf -> '+isValid, null);

        // memDocRg
        if (
          obj.memDocRg === undefined ||
          obj.memDocRg === "" ||
          obj.memDocRg === null ||
          typeof(obj.memDocRg) !== "string"
        ) {
          isValid = false;
        } else {
          objData.data.memDocRg = obj.memDocRg;
        }
        utils.devLog(2, 'memDocRg -> '+isValid, null);

        // memPcD
        if (obj.memPcD === undefined||
          obj.memPcD === null) {
          objData.data.memPcD = false;
        } else {
          if (
            obj.memPcD === undefined ||
            obj.memPcD === "" ||
            obj.memPcD === null ||
            typeof(obj.memPcD) !== "boolean" ||
            !utils.validateBoolean(obj.memPcD)
          ) {
            isValid = false;
          } else {
            objData.data.memPcD = obj.memPcD;
          }
        }
        utils.devLog(2, 'memPcD -> '+isValid, null);        

        // memAudited
        objData.data.memAudited = false;
        if (objData.data.memPcD) {
          if (objData.data.memType === 'Filho(a)') {
            objData.data.memAudited = true;
            objData.data.memStatus = false;
            utils.devLog(2, 'memStatus [audited] -> '+isValid, null);
          }
        }
        utils.devLog(2, 'memAudited -> '+isValid, null); 

        // memDocBirthDate
        utils.devLog(2, 'memDocBirthDate [tmp] [0] -> '+isValid, null);
        if (!utils.dateDateStrToDate(obj.memDocBirthDate)) {
          isValid = false;
          utils.devLog(2, 'memDocBirthDate [tmp] [1] -> '+isValid, null);
        } else {
          utils.devLog(2, 'memDocBirthDate [tmp] [2] -> '+isValid, null);
          let dateSelected = utils.dateDateStrToDate(obj.memDocBirthDate);
          let limitAge = 21;
          let date = new Date();
          let age = differenceInYears(date, dateSelected);
          utils.devLog(2, 'memDocBirthDate [tmp] [3] -> '+isValid, null);
          if (dateSelected > date) {
            isValid = false;
            utils.devLog(2, 'memDocBirthDate [tmp] [4] -> '+isValid, null);
          }
          if (age < 0) {
            isValid = false;
            utils.devLog(2, 'memDocBirthDate [tmp] [5] -> '+isValid, null);
          }
          if (age === 0) {
            if (
              dateSelected.getDate() === date.getDate() &&
              dateSelected.getMonth() === date.getMonth() &&
              dateSelected.getYear() === date.getYear()
              ) {
                isValid = false;
              utils.devLog(2, 'memDocBirthDate [tmp] [6] -> '+isValid, null);
            }
          }
          if (objData.data.memType === 'Filho(a)') {
            utils.devLog(2, 'memDocBirthDate [tmp] [7] -> '+isValid, null);
            if (age === limitAge) {
              if (!obj.memPcD) {
                isValid = false;
                utils.devLog(2, 'memDocBirthDate [tmp] [8] -> '+isValid, null);
              }
            } 
            if (age > limitAge) {
              if (!obj.memPcD) {
                isValid = false;
                utils.devLog(2, 'memDocBirthDate [tmp] [9] -> '+isValid, null);
              }
            }
          } 
        }
        objData.data.memDocBirthDate = utils.dateDateStrToDate(obj.memDocBirthDate);
        utils.devLog(2, 'memDocBirthDate -> '+isValid, null);

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

        utils.devLog(2, 'Finish -> '+isValid, null);

        return isValid;
      } catch (error) {
        return false;
      }
    }
  }

  clientsMembersPatch = async ({body,params}, res) => {
    const objData = { idMain: undefined, idSecondary: undefined, idTertiary: undefined, id: undefined, data: {} };

    try {
      const perId = "F005";

      utils.devLog(0, 'API ==> Controller => clientsMembersPatch -> Start', null);
      
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
        return utils.resError(400,`API ==> Controller => clientsMembersPatch -> Invalid parameters`, null, res);
      }

      utils.devLog(2, "API ==> Controller => clientsMembersPatch : objData", objData);

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
        return utils.resError(404,`API ==> Controller => clientsMembersPatch -> clientsGetId -> Not found`, null, res);
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
        return utils.resError(404,`API ==> Controller => clientsMembersPatch -> employeesGetId -> Not found`, null, res);
      }

      // Check Members
      const resMembersGetId = await CLIENTS_MEMBERS.findByPk(objData.idTertiary, {});
      // Validate Client / Employee
      if (resMembersGetId) {
        // Verifica membro corresponde o cliente e colaborador pesquisado
        if (resMembersGetId.cliId == objData.idMain && resMembersGetId.empId == objData.idSecondary) {
          // 
        } else {
          return utils.resError(400,`API ==> Controller => clientsMembersPatch -> membersGetId -> Invalid parameters -> id main`, null, res);
        }
      } else {
        return utils.resError(404,`API ==> Controller => clientsMembersPatch -> membersGetId -> Not found`, null, res);
      }

      // Validate Member Audited
      if (resMembersGetId.memAudited) {
        return utils.resError(409,`API ==> Controller => clientsMembersPatch -> memAudited -> [true]`, null, res);
      }

      // Validate PcD / Status
      if (resMembersGetId.memStatus === false && resMembersGetId.memPcD === true) {
        return utils.resError(409,`API ==> Controller => clientsMembersPatch -> memPcD -> Invalid`, null, res);
      }

      // Update DATA Clients Members
      utils.devLog(2, "API ==> Controller => clientsMembersPatch -> Update Clients Members", null);
      const resClientsMembersPatch = await resMembersGetId.update(objData.data);

      LogsController.logsCreate(useId, perId, 'API ==> Controller => clientsMembersPatch -> Success', `=> [${useId}] # Clientes: Colaboradores: Membros: Atualizado [status] ## [${objData.idTertiary}] ${resMembersGetId.memName}`, objData.idTertiary);
      return utils.resSuccess('API ==> Controller => clientsMembersPatch -> Success',{ memId: objData.idTertiary }, res);    

    } catch (error) {
      return utils.resError(500,`API ==> Controller => clientsMembersPatch -> Error`, error, res);
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

        return isValid;
      } catch (error) {
        return false;
      }
    }
  }

  clientsMembersGetAllGeneral = async ({body,params}, res) => {
    const objData = { idMain: undefined, idSecondary: undefined, idTertiary: undefined, id: undefined, data: {} };

    try {
      const perId = "F002";

      utils.devLog(0, 'API ==> Controller => clientsMembersGetAllGeneral -> Start', null);

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
        // cliId: objData.idMain,
        // empId: objData.idSecondary,
      };
      // if (objResAuth.resData.useKeyCompany !== 0) {
      //   filter.comId = objResAuth.resData.useKeyCompany;
      // }
      const resMembersGetAll = await CLIENTS_MEMBERS.findAll({
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

      LogsController.logsCreate(useId, perId, 'API ==> Controller => clientsMembersGetAllGeneral -> Success', `=> [${useId}] # Membros: Listagem geral ## [geral]`, null);
      return utils.resSuccess('API ==> Controller => clientsMembersGetAllGeneral -> Success', resMembersGetAll, res );
    } catch (error) {
      return utils.resError(500,`API ==> Controller => clientsMembersGetAllGeneral -> Error`, error, res);
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
          typeof(cliId) !== "number"
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
          objData.idSecondary = Number(empId);
        }
        utils.devLog(2, 'empId -> '+isValid, null);

        return isValid;
      } catch (error) {
        return false;
      }
    }
  }

  clientsMembersGetIdPartners = async ({body,params}, res) => {
    const objData = { idMain: undefined, idSecondary: undefined, idTertiary: undefined, id: undefined, data: {} };

    try {
      const perId = "E007";

      utils.devLog(0, 'API ==> Controller => clientsMembersGetIdPartners -> Start', null);

      const { useId } = body;
      utils.devLog(2, 'useId', useId);

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
        return utils.resError(400,`API ==> Controller => clientsMembersGetIdPartners -> Invalid parameters`, null, res);
      }

      utils.devLog(2, "API ==> Controller => clientsMembersGetIdPartners : objData", objData);

      const resMembersGetId = await CLIENTS_MEMBERS.findByPk(objData.idTertiary,{
        // include: [
        //   'COMPANIES',
        //   // 'USERS',
        //   // 'CONFIG_COUNTRIES',
        //   // 'CONFIG_STATES',
        //   // 'CONFIG_CITIES',
        //   // 'CLIENTS_CONTACTS',
        //   // 'CLIENTS_SERVICES',
        //   // 'CLIENTS_FILES',
        //   'CLIENTS_MEMBERS_FILES',
        //   'CLIENTS',
        //   'CLIENTS_EMPLOYEES',
        // ],
        // attributes: ['memName', 'memDocRg']
      });

      // Validate Client / Employee
      if (resMembersGetId) {
        //
      } else {
        return utils.resError(404,`API ==> Controller => clientsMembersGetIdPartners -> membersGetId -> Not found`, null, res);
      }

      let objResult = {
        memName: resMembersGetId.memName,
        memDocRg: resMembersGetId.memDocRg,
        status: true,
      }
      objResult.status = resMembersGetId.memStatus;

      // if (resMembersGetId.conId) {
      //   // Validate Contrate
      //   // kes-dev

      //   if (resMembersGetId.conStatus) {
      //     objResult.status = true;
      //   } else {
      //     objResult.status = false;
      //   }

      // } else {
      //   objResult.status = false;
      // }


      utils.devLog(2, "API ==> Controller => clientsMembersGetIdPartners : objResult", objResult);

      LogsController.logsCreate(useId, perId, 'API ==> Controller => clientsMembersGetIdPartners -> Success', `=> [${useId}] # Parceiros: Membros: Consultado ## [${objData.idTertiary}] ${resMembersGetId.memName}`, objData.idTertiary);
      return utils.resSuccess('API ==> Controller => clientsMembersGetIdPartners -> Success',objResult, res); 

    } catch (error) {
      return utils.resError(500,`API ==> Controller => clientsMembersGetIdPartners -> Error`, error, res);
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
          objData.idTertiary = Number(memId);
        }
        utils.devLog(2, 'memId -> '+isValid, null);

        return isValid;
      } catch (error) {
        return false;
      }
    }
  }

  // disabled
  clientsMembersDelete = async ({body,params}, res) => {
    const objData = { idMain: undefined, id: undefined, data: {} };

    try {
      const perId = "F006";
      const logMsg = "API ==> Controller => clientsMembersDelete -> Start";
      const { useId } = body;

      utils.devLog(0, logMsg, null);
      const objResAuth = await UsersController.usersPermission(useId,perId);
      if (!objResAuth.resData.permission) {
        utils.devLog(2, "API ==> Permission -> FALSE", null);
        return utils.resError(403, objResAuth.resMessage, { perId: objResAuth.resData.perId }, res );
      }
      utils.devLog(2, "API ==> Permission -> TRUE", null);

      // Function Controller Action
      let { cliId } = params;
      if (!validateParameters(cliId)) {
        return utils.resError(400,`API ==> Controller => clientsMembersDelete -> Invalid parameters`, null, res);
      }

      utils.devLog(2, "API ==> Controller => clientsMembersDelete : objData", null);
      utils.devLog(2, null, objData);

      // Check Clients
      const resClientsGetId = await CLIENTS.findByPk(objData.idTertiary,{});
      if (resClientsGetId) {
        // Verifica se usuário possui permissão geral sobre as empresas
        // if (objResAuth.resData.useKeyCompany !== 0) {
        //   if (resClientsGetId.comId !== objResAuth.resData.useKeyCompany) {
        //     return utils.resError(403, "API ==> Controller => usersPermission -> Forbidden byId", null, res );
        //   }
        // }
      } else {
        return utils.resError(404,`API ==> Controller => clientsMembersDelete -> clientsMembersGetId -> Not found`, null, res);
      }

      // Delete Clients
      const resClientsDelete = await resClientsGetId.destroy();

      LogsController.logsCreate(useId, perId, logMsg, `=> [${useId}] # Clientes: Deletado ## [${objData.idTertiary}] ${resClientsGetId.parName}`, objData.idTertiary);
      return utils.resSuccess('API ==> Controller => clientsMembersDelete -> Success',{cliId: objData.idTertiary }, res);    

    } catch (error) {
      return utils.resError(500,`API ==> Controller => clientsMembersDelete -> Error`, error, res);
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
          objData.idTertiary = cliId;
        }

        return isValid;
      } catch (error) {
        return false;
      }
    }
  }

}

module.exports = new ClientsMembersController();
