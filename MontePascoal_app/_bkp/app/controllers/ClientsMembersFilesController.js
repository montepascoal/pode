/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// CONTROLLER USER /////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//  --------------------------------------------------------------------------------------------------------------------------------------- Modules -----

const path = require('path');
const utils = require("../utils/utils.js");
const { Op } = require("sequelize");

const {
  CLIENTS,
  CLIENTS_EMPLOYEES,
  CLIENTS_MEMBERS,
  EMPLOYEES_MEMBERS,
  CLIENTS_MEMBERS_FILES,
  CONFIG_COUNTRIES,
  CONFIG_STATES,
  CONFIG_CITIES,
  CONFIG_EMPLOYEES_DEPARTMENTS,
  CONFIG_EMPLOYEES_OCCUPATIONS,
} = require("../models");

const LogsController = require('./LogsController');
const UsersController = require('./UsersController');

//  ------------------------------------------------------------------------------------------------------------------------------------- Class API -----
class ClientsEmployeesFilesController {
  constructor() {
    // this.step1 = this.step1.bind(this);
    // this.step2 = this.step2.bind(this);
  }
  
  clientsMembersFilesGetAll = async ({body,params}, res) => {
    const objData = { idMain: undefined, idSecondary: undefined, idTertiary: undefined, id: undefined, data: {} };

    try {
      const perId = "F003";

      utils.devLog(0, `API ==> Controller => clientsMembersFilesGetAll -> Start`, null);

      const { useId } = body;
      
      const objResAuth = await UsersController.usersPermission(useId,perId);
      if (!objResAuth.resData.permission) {
        utils.devLog(2, "API ==> Permission -> FALSE", null);
        return utils.resError(403, objResAuth.resMessage, {perId: objResAuth.resData.perId}, res );
      }
      utils.devLog(2, "API ==> Permission -> TRUE", null);
      
      // Function Controller Action
      let { cliId, empId, memId } = params;
      utils.devLog(2, 'cliId', cliId);
      utils.devLog(2, 'empId', empId);
      utils.devLog(2, 'memId', memId);

      if (!validateParameters(cliId, empId, memId)) {
        return utils.resError(400,`API ==> Controller => clientsMembersFilesGetAll -> Invalid parameters`, null, res);
      }

      // Check Clients
      const resClientsGetId = await CLIENTS.findByPk(objData.idMain,{});
      if (resClientsGetId) {
        //
      } else {
        return utils.resError(404,`API ==> Controller => clientsMembersFilesGetAll -> clientsGetId -> Not found`, null, res);
      }

      // Check Clients Employees
      const resClientsEmployeesGetId = await CLIENTS_EMPLOYEES.findByPk(objData.idSecondary,{});
      if (resClientsEmployeesGetId) {
        // Verifica colaborador corresponde o cliente pesquisado
        if (resClientsEmployeesGetId.cliId === objData.idMain) {
          //
        } else {
          return utils.resError(400,`API ==> Controller => clientsMembersFilesGetAll -> clientsEmployeesGetId -> Invalid parameters -> id main`, null, res);
        }
      } else {
        return utils.resError(404,`API ==> Controller => clientsMembersFilesGetAll -> clientsEmployeesGetId -> Not found`, null, res);
      }

      // Check Clients Members
      const resClientsMembersGetId = await CLIENTS_MEMBERS.findByPk(objData.idTertiary,{});
      if (resClientsMembersGetId) {
        // Verifica colaborador corresponde o cliente pesquisado
        if (resClientsMembersGetId.empId === objData.idSecondary) {
          //
        } else {
          return utils.resError(400,`API ==> Controller => clientsMembersFilesGetAll -> clientsMembersGetId -> Invalid parameters -> id main`, null, res);
        }
      } else {
        return utils.resError(404,`API ==> Controller => clientsMembersFilesGetAll -> clientsMembersGetId -> Not found`, null, res);
      }

      // Check filters
      const filters = [];
        filters.push({memId: objData.idTertiary});
        // filters.push({filStatus: false});
      const objFilter = {
        [Op.and]: filters
      };
      const resclientsMembersFilesGetAll = await CLIENTS_MEMBERS_FILES.findAll({
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
        attributes: { exclude: ['filKey','filUseId'] },
      });

      LogsController.logsCreate(useId, perId, `API ==> Controller => clientsMembersFilesGetAll -> Success`, `=> [${useId}] # Clientes: Colaboradores: Membros: Arquivos: Consultado (todos arquivos) ## [${objData.idTertiary}] ${resClientsMembersGetId.memName || 'Member Undefined'}`, objData.idTertiary);
      return utils.resSuccess('API ==> Controller => clientsMembersFilesGetAll -> Success', resclientsMembersFilesGetAll, res );
    } catch (error) {
      return utils.resError(500,`API ==> Controller => clientsMembersFilesGetAll -> Error`, error, res);
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
          objData.data.memId = Number(memId);
        }
        utils.devLog(2, 'memId -> '+isValid, null);

        return isValid;
      } catch (error) {
        return false;
      }
    }
  }
  
  clientsMembersFilesPatch = async ({body,params}, res) => {
    const objData = { idMain: undefined, idSecondary: undefined, idTertiary: undefined, id: undefined, data: {} };

    try {
      const perId = "F005";

      utils.devLog(0, `API ==> Controller => clientsMembersFilesPatch -> Start`, null);

      const { useId } = body;

      const objResAuth = await UsersController.usersPermission(useId,perId);
      if (!objResAuth.resData.permission) {
        utils.devLog(2, "API ==> Permission -> FALSE", null);
        return utils.resError(403, objResAuth.resMessage, { perId: objResAuth.resData.perId }, res );
      }
      utils.devLog(2, "API ==> Permission -> TRUE", null);

      // Function Controller Action
      let { cliId, empId, memId, filId } = params;
      utils.devLog(2, 'cliId', cliId);
      utils.devLog(2, 'empId', empId);
      utils.devLog(2, 'memId', memId);
      utils.devLog(2, 'filId', filId);
      utils.devLog(2, 'body', body);
  
      if (!validateParameters(cliId, empId, memId, filId, body)) {
        return utils.resError(400,`API ==> Controller => clientsMembersFilesPatch -> Invalid parameters`, null, res);
      }

      utils.devLog(2, "API ==> Controller => clientsMembersFilesPatch : objData", objData);

      // Check Clients
      const resClientsGetId = await CLIENTS.findByPk(objData.idMain,{});
      if (resClientsGetId) {
        //
      } else {
        return utils.resError(404,`API ==> Controller => clientsMembersFilesPatch -> clientsGetId -> Not found`, null, res);
      }

      // Check Clients Employees
      const resClientsEmployeesGetId = await CLIENTS_EMPLOYEES.findByPk(objData.idSecondary,{});
      if (resClientsEmployeesGetId) {
        // Verifica colaborador corresponde o cliente pesquisado
        if (resClientsEmployeesGetId.cliId === objData.idMain) {
          //
        } else {
          return utils.resError(400,`API ==> Controller => clientsMembersFilesPatch -> clientsEmployeesGetId -> Invalid parameters -> id main`, null, res);
        }
      } else {
        return utils.resError(404,`API ==> Controller => clientsMembersFilesPatch -> clientsEmployeesGetId -> Not found`, null, res);
      }

      // Check Clients Members
      const resClientsMembersGetId = await CLIENTS_MEMBERS.findByPk(objData.idTertiary, {});
      // Validate Client / Employee
      if (resClientsMembersGetId) {
        // Verifica membro corresponde o cliente e colaborador pesquisado
        if (resClientsMembersGetId.cliId == objData.idMain && resClientsMembersGetId.empId == objData.idSecondary) {
          // 
        } else {
          return utils.resError(400,`API ==> Controller => clientsMembersFilesPatch -> membersGetId -> Invalid parameters -> id main`, null, res);
        }
      } else {
        return utils.resError(404,`API ==> Controller => clientsMembersFilesPatch -> membersGetId -> Not found`, null, res);
      }

      // Check Files
      const resClientsMembersFilesGetId = await CLIENTS_MEMBERS_FILES.findByPk(objData.id, {});
      if (resClientsMembersFilesGetId) {
        // Verifica membro corresponde ao membro enviado
        if (resClientsMembersFilesGetId.memId === objData.idTertiary) {
          //
        } else {
          return utils.resError(400,`API ==> Controller => clientsMembersFilesPatch -> clientsMembersFilesGetId -> Invalid parameters -> id main`, null, res);
        }
      } else {
        return utils.resError(404,`API ==> Controller => clientsMembersFilesPatch -> clientsMembersFilesGetId -> Not found`, null, res);
      }

      // Update Members Files
      const resClientsMembersFilesPatch = await resClientsMembersFilesGetId.update(objData.data);

      LogsController.logsCreate(useId, perId, `API ==> Controller => clientsMembersFilesPatch -> Success`, `=> [${useId}] # Clientes: Colaboradores: Membros: Arquivos: Atualizado [habilitado/desabilitado] ## [${objData.id}] ${resClientsMembersFilesGetId.filTitle}`, objData.id);
      return utils.resSuccess('API ==> Controller => clientsMembersFilesPatch -> Success',{filId: objData.id }, res);    

    } catch (error) {
      return utils.resError(500,`API ==> Controller => clientsMembersFilesPatch -> Error`, error, res);
    }

    function validateParameters(cliId, empId, memId, filId, obj) {
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

        // filId
        filId = Number(filId);
        if (
          filId === undefined ||
          filId === "" ||
          filId === null ||
          isNaN(filId) ||
          typeof(filId) !== "number"||
          !utils.validateNumberPositive(filId)
        ) {
          isValid = false;
        } else {
          objData.id = Number(filId);
        }
        utils.devLog(2, 'filId -> '+isValid, null);

        // filStatus
        if (
          obj.filStatus === undefined ||
          obj.filStatus === "" ||
          obj.filStatus === null ||
          typeof(obj.filStatus) !== "boolean" ||
          !utils.validateBoolean(obj.filStatus)
        ) {
          // isValid = false;
          objData.data.filStatus = false;
        } else {
          objData.data.filStatus = obj.filStatus;
        }
        utils.devLog(2, 'filStatus -> '+isValid, null);

        return isValid;
      } catch (error) {
        return false;
      }
    }
  }

  // disabled
  clientsMembersFilesDelete = async ({body,params}, res) => {
    const objData = { idMain: undefined, idSecondary: undefined, idTertiary: undefined, id: undefined, data: {} };

    try {
      const perId = "F006";
      const logMsg = "API ==> Controller => clientsMembersFilesDelete ->";
      const { useId } = body;

      utils.devLog(0, `${logMsg} Start`, null);
      const objResAuth = await UsersController.usersPermission(useId,perId);
      if (!objResAuth.resData.permission) {
        utils.devLog(2, "API ==> Permission -> FALSE", null);
        return utils.resError(403, objResAuth.resMessage, { perId: objResAuth.resData.perId }, res );
      }
      utils.devLog(2, "API ==> Permission -> TRUE", null);

      // Function Controller Action
      let { cliId, filId } = params;
      utils.devLog(2, 'cliId', cliId);
      utils.devLog(2, 'filId', filId);
      utils.devLog(2, 'body', body);
      if (!validateParameters(cliId, filId, body)) {
        return utils.resError(400,`API ==> Controller => clientsMembersFilesDelete -> Invalid parameters`, null, res);
      }

      utils.devLog(2, "API ==> Controller => clientsMembersFilesDelete : objData", objData);

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
        return utils.resError(404,`API ==> Controller => clientsMembersFilesDelete -> clientsGetId -> Not found`, null, res);
      }

      // Check File
      const resClientsMembersFilesGetId = await CLIENTS_MEMBERS_FILES.findByPk(objData.id, {});
      if (resClientsMembersFilesGetId) {
        // Verifica membro corresponde ao colaborador enviado
        if (resClientsMembersFilesGetId.cliId === objData.idMain) {
        } else {
          return utils.resError(400,`API ==> Controller => clientsMembersFilesDelete -> Invalid parameters -> id main`, null, res);
        }
      } else {
        return utils.resError(404,`API ==> Controller => clientsMembersFilesDelete -> clientsFilesGetId -> Not found`, null, res);
      }

      // Update Clients
      const resClientsFilesDelete = await resClientsMembersFilesGetId.destroy();

      LogsController.logsCreate(useId, perId, `${logMsg} Success`, `=> [${useId}] # Cliente (Arquivos): Deletado ## [${objData.id}] ${resClientsMembersFilesGetId.filTitle}`, objData.id);
      return utils.resSuccess('API ==> Controller => clientsMembersFilesDelete -> Success',{filId: objData.id }, res);    

    } catch (error) {
      return utils.resError(500,`API ==> Controller => clientsMembersFilesDelete -> Error`, error, res);
    }

    function validateParameters(cliId, filId, obj) {
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
        }
        utils.devLog(2, 'cliId -> '+isValid, null);

        // filId
        filId = Number(filId);
        if (
          filId === undefined ||
          filId === "" ||
          filId === null ||
          isNaN(filId) ||
          typeof(filId) !== "number"||
          !utils.validateNumberPositive(filId)
        ) {
          isValid = false;
        } else {
          objData.id = Number(filId);
        }
        utils.devLog(2, 'filId -> '+isValid, null);

        // cliCreated
        // objData.data.cliCreated = new Date();

        // cliUpdated
        // objData.data.cliUpdated = new Date();

        // cliDeleted
        // objData.data.cliDeleted = null;

        // console.log(isValid);

        return isValid;
      } catch (error) {
        return false;
      }
    }
  }

  clientsMembersFilesUpload = async ({ headers: { useId }, body, params, query, file }, res) => {

    const objData = { idMain: undefined, idSecondary: undefined, idTertiary: undefined, id: undefined, data: {} };

    try {
      const perId = "F004";

      utils.devLog(0, `API ==> Controller => clientsMembersFilesUpload -> Start`, null);

      const { title } = body;

      const { cliId, empId, memId } = params;

      utils.devLog(2, "==================================", null);
      utils.devLog(2, `useId => ${useId}`, null);
      utils.devLog(2, `cliId => ${cliId}`, null);
      utils.devLog(2, `empId => ${empId}`, null);
      utils.devLog(2, `memId => ${memId}`, null);
      utils.devLog(2, `query =>`, null);
      utils.devLog(2, null, query);
      utils.devLog(2, `file => `, null);
      utils.devLog(2, `title => ${title}`, null);
      utils.devLog(2, null, file);
      utils.devLog(2, "==================================", null);

      const objResAuth = await UsersController.usersPermission(useId,perId);
      if (!objResAuth.resData.permission) {
        utils.devLog(2, "API ==> Permission -> FALSE", null);
        return utils.resError(403, objResAuth.resMessage, { perId: objResAuth.resData.perId }, res );
      }
      utils.devLog(2, "API ==> Permission -> TRUE", null);

      if (!validateParameters(useId, cliId, empId, memId, title, file)) {  
        return utils.resError(400,`API ==> Controller => clientsMembersFilesUpload -> Invalid parameters`, null, res);
      }

      utils.devLog(2, "API ==> Controller => clientsMembersFilesUpload : objData", objData);

      // Check Clients
      const resClientsGetId = await CLIENTS.findByPk(objData.idMain,{});
      if (resClientsGetId) {
        //
      } else {
        return utils.resError(404,`API ==> Controller => clientsMembersFilesUpload -> clientsGetId -> Not found`, null, res);
      }

      // Check Clients Employees
      const resClientsEmployeesGetId = await CLIENTS_EMPLOYEES.findByPk(objData.idSecondary,{});
      if (resClientsEmployeesGetId) {
        // Verifica colaborador corresponde o cliente pesquisado
        if (resClientsEmployeesGetId.cliId === objData.idMain) {
          //
        } else {
          return utils.resError(400,`API ==> Controller => clientsMembersFilesUpload -> clientsEmployeesGetId -> Invalid parameters -> id main`, null, res);
        }
      } else {
        return utils.resError(404,`API ==> Controller => clientsMembersFilesUpload -> clientsEmployeesGetId -> Not found`, null, res);
      }

      // Check Clients Members
      const resClientsMembersGetId = await CLIENTS_MEMBERS.findByPk(objData.idTertiary, {});
      // Validate Client / Employee
      if (resClientsMembersGetId) {
        // Verifica membro corresponde o cliente e colaborador pesquisado
        if (resClientsMembersGetId.cliId == objData.idMain && resClientsMembersGetId.empId == objData.idSecondary) {
          // 
        } else {
          return utils.resError(400,`API ==> Controller => clientsMembersFilesUpload -> membersGetId -> Invalid parameters -> id main`, null, res);
        }
      } else {
        return utils.resError(404,`API ==> Controller => clientsMembersFilesUpload -> membersGetId -> Not found`, null, res);
      }

      // Save DATA
      const resClientsMembersFilesPost = await CLIENTS_MEMBERS_FILES.create(objData.data);
      objData.id = resClientsMembersFilesPost.dataValues.id;

      LogsController.logsCreate(useId, perId, `API ==> Controller => clientsMembersFilesUpload -> Success`, `=> [${useId}] # Clientes: Colaboradores: Membros: Arquivos: Upload ## [${objData.id}] ${objData.data.filTitle}`, objData.id);
      return utils.resSuccess('API ==> Controller => clientsMembersFilesUpload -> Success', { filId: objData.id }, res);  

    } catch (error) {
      return utils.resError(500,`API ==> Controller => clientsMembersFilesUpload -> Error`, error, res);
    }

    // function validateParameters(useId, cliId, memId, filTitle, file) {
    function validateParameters(useId, cliId, empId, memId, filTitle, file) {
      try {
        let isValid = true;

        utils.devLog(2, 'FILE =>', null);
        utils.devLog(2, null, file);

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
          objData.data.memId = Number(memId);
        }
        utils.devLog(2, 'memId -> '+isValid, null);

        // filStatus
        objData.data.filStatus = true;
        utils.devLog(2, 'filStatus -> '+isValid, null);

        // filTitle
        if (
          filTitle === undefined ||
          filTitle === "" ||
          filTitle === null ||
          typeof(filTitle) !== "string"
        ) {
          isValid = false;
        } else {
          objData.data.filTitle = filTitle;
        }
        utils.devLog(2, 'filTitle -> '+isValid, null);

        // filType
        if (file.mimetype !== 'application/pdf' && file.mimetype !== 'image/jpeg' && file.mimetype !== 'image/png') {
          isValid = false;
        } else {
          objData.data.filType = path.extname(file.originalname);
        }
        utils.devLog(2, 'filType -> '+isValid, null);

        // filKey
        if (file.key) {
          objData.data.filKey = file.key;
        } else {
          isValid = false;
        }
        utils.devLog(2, 'filKey -> '+isValid, null);

        // filUseId
        objData.data.filUseId = useId;
        utils.devLog(2, 'filUseId -> '+isValid, null);

        return isValid;
      } catch (error) {
        return false;
      }
    }

  }

  clientsMembersFilesDownload = async ({ body, params, query, file }, res) => {

    const objData = { idMain: undefined, idSecondary: undefined, idTertiary: undefined, id: undefined, data: {} };

    try {
      const perId = "F003";

      utils.devLog(0, `API ==> Controller => clientsMembersFilesDownload -> Start`, null);

      const { useId } = body;
      const { cliId, empId, memId, filId } = params;

      utils.devLog(2, "==================================", null);
      utils.devLog(2, `useId => ${useId}`, null);
      utils.devLog(2, `cliId => ${cliId}`, null);
      utils.devLog(2, `empId => ${empId}`, null);
      utils.devLog(2, `memId => ${memId}`, null);
      utils.devLog(2, `filId => ${filId}`, null);
      utils.devLog(2, `query =>`, null);
      utils.devLog(2, null, query);
      utils.devLog(2, "==================================", null);

      const objResAuth = await UsersController.usersPermission(useId,perId);
      if (!objResAuth.resData.permission) {
        utils.devLog(2, "API ==> Permission -> FALSE", null);
        return utils.resError(403, objResAuth.resMessage, { perId: objResAuth.resData.perId }, res );
      }
      utils.devLog(2, "API ==> Permission -> TRUE", null);

      if (!validateParameters(cliId, empId, memId, filId)) {
        return utils.resError(400,`API ==> Controller => clientsMembersFilesDownload -> Invalid parameters`, null, res);
      }

      utils.devLog(2, "API ==> Controller => clientsMembersFilesDownload : objData", objData);

      // Check Clients
      const resClientsGetId = await CLIENTS.findByPk(objData.idMain,{});
      if (resClientsGetId) {
        //
      } else {
        return utils.resError(404,`API ==> Controller => clientsMembersFilesDownload -> clientsGetId -> Not found`, null, res);
      }

      // Check Clients Employees
      const resClientsEmployeesGetId = await CLIENTS_EMPLOYEES.findByPk(objData.idSecondary,{});
      if (resClientsEmployeesGetId) {
        // Verifica colaborador corresponde o cliente pesquisado
        if (resClientsEmployeesGetId.cliId === objData.idMain) {
          //
        } else {
          return utils.resError(400,`API ==> Controller => clientsMembersFilesDownload -> clientsEmployeesGetId -> Invalid parameters -> id main`, null, res);
        }
      } else {
        return utils.resError(404,`API ==> Controller => clientsMembersFilesDownload -> clientsEmployeesGetId -> Not found`, null, res);
      }

      // Check Clients Members
      const resClientsMembersGetId = await CLIENTS_MEMBERS.findByPk(objData.idTertiary, {});
      // Validate Client / Employee
      if (resClientsMembersGetId) {
        // Verifica membro corresponde o cliente e colaborador pesquisado
        if (resClientsMembersGetId.cliId == objData.idMain && resClientsMembersGetId.empId == objData.idSecondary) {
          // 
        } else {
          return utils.resError(400,`API ==> Controller => clientsMembersFilesDownload -> membersGetId -> Invalid parameters -> id main`, null, res);
        }
      } else {
        return utils.resError(404,`API ==> Controller => clientsMembersFilesDownload -> membersGetId -> Not found`, null, res);
      }

      // Check File
      const resClientsMembersFilesGetId = await CLIENTS_MEMBERS_FILES.findByPk(objData.data.filId,{});
      if (resClientsMembersFilesGetId) {
        if (resClientsMembersFilesGetId.memId === objData.idTertiary) {
          if (resClientsMembersFilesGetId.filStatus) {
            //
          } else {
            return utils.resError(403,`API ==> Controller => clientsMembersFilesDownload -> usersPermission -> Forbidden byStatus`, null, res);
          }
        } else {
          return utils.resError(400,`API ==> Controller => clientsMembersFilesDownload -> resClientsMembersFilesGetId -> Invalid parameters -> id main`, null, res);
        }
      } else {
        return utils.resError(404,`API ==> Controller => clientsMembersFilesDownload -> resClientsMembersFilesGetId -> Not found`, null, res);
      }

      // GET Key the FILE
      const filePATH    = path.resolve(__dirname,'..','..', 'files', 'uploads');
      const fileKEY     = resClientsMembersFilesGetId.filKey;
      const fileTITLE   = resClientsMembersFilesGetId.filTitle;

      res.download(`${filePATH}/${fileKEY}`, `${fileTITLE}${path.extname(resClientsMembersFilesGetId.filKey)}`, (err) => {
        if (err) {
          utils.devLog(2, null, err);
          return utils.resError(500, 'API ==> Controller => clientsMembersFilesDownload -> Download -> Error', utils.devDebugError(err), res);   
        } else {
          LogsController.logsCreate(useId, perId, `API ==> Controller => clientsMembersFilesDownload -> Success`, `=> [${useId}] # Clientes: Colaboradores: Membros: Arquivos: Download ## [${objData.id}] ${resClientsMembersFilesGetId.filTitle}`, objData.id);
          return utils.resSuccess('API ==> Controller => clientsMembersFilesDownload -> Success', { status: true });    
        }
      });

    } catch (error) {
      return utils.resError(500,`API ==> Controller => clientsMembersFilesDownload -> Error`, error, res);
    }

    function validateParameters(cliId, empId, memId, filId) {
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
          objData.data.memId = Number(memId);
        }
        utils.devLog(2, 'memId -> '+isValid, null);

        // filId
        filId = Number(filId);
        if (
          filId === undefined ||
          filId === "" ||
          filId === null ||
          isNaN(filId) ||
          typeof(filId) !== "number" ||
          !utils.validateNumberPositive(filId)
        ) {
          isValid = false;
        } else {
          objData.data.filId = Number(filId);
          objData.id = Number(filId);
        }
        utils.devLog(2, 'filId -> '+isValid, null);

        return isValid;
      } catch (error) {
        return false;
      }
    }

  }
}

module.exports = new ClientsEmployeesFilesController();
