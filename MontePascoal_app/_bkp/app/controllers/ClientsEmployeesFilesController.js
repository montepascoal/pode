/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// CONTROLLER USER /////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//  --------------------------------------------------------------------------------------------------------------------------------------- Modules -----

const path = require('path');
const utils = require('../utils/utils.js');
const { Op } = require('sequelize');

const {
  CLIENTS,
  CLIENTS_EMPLOYEES,
  EMPLOYEES_MEMBERS,
  CLIENTS_EMPLOYEES_FILES,
  CONFIG_COUNTRIES,
  CONFIG_STATES,
  CONFIG_CITIES,
  CONFIG_EMPLOYEES_DEPARTMENTS,
  CONFIG_EMPLOYEES_OCCUPATIONS,
} = require('../models');

const LogsController = require('./LogsController');
const UsersController = require('./UsersController');

//  ------------------------------------------------------------------------------------------------------------------------------------- Class API -----
class ClientsEmployeesFilesController {
  constructor() {
    // this.step1 = this.step1.bind(this);
    // this.step2 = this.step2.bind(this);
  }

  clientsEmployeesFilesGetAll = async ({ body, params }, res) => {
    const objData = {
      idMain: undefined,
      idSecondary: undefined,
      idTertiary: undefined,
      id: undefined,
      data: {},
    };

    try {
      const perId = 'F003';

      utils.devLog(
        0,
        `API ==> Controller => clientsEmployeesFilesGetAll -> Start`,
        null
      );

      const { useId } = body;

      const objResAuth = await UsersController.usersPermission(useId, perId);
      if (!objResAuth.resData.permission) {
        utils.devLog(2, 'API ==> Permission -> FALSE', null);
        return utils.resError(
          403,
          objResAuth.resMessage,
          { perId: objResAuth.resData.perId },
          res
        );
      }
      utils.devLog(2, 'API ==> Permission -> TRUE', null);

      // Function Controller Action
      let { cliId, empId } = params;
      utils.devLog(2, 'cliId', cliId);
      utils.devLog(2, 'empId', empId);

      if (!validateParameters(cliId, empId)) {
        return utils.resError(
          400,
          `API ==> Controller => clientsEmployeesFilesGetAll -> Invalid parameters`,
          null,
          res
        );
      }

      // Check Clients
      const resClientsGetId = await CLIENTS.findByPk(objData.idMain, {});
      if (resClientsGetId) {
        //
      } else {
        return utils.resError(
          404,
          `API ==> Controller => clientsEmployeesFilesGetAll -> clientsGetId -> Not found`,
          null,
          res
        );
      }

      // Check Clients Employees
      const resClientsEmployeesGetId = await CLIENTS_EMPLOYEES.findByPk(
        objData.idSecondary,
        {}
      );
      if (resClientsEmployeesGetId) {
        // Verifica colaborador corresponde o cliente pesquisado
        if (resClientsEmployeesGetId.cliId === objData.idMain) {
          //
        } else {
          return utils.resError(
            400,
            `API ==> Controller => clientsEmployeesFilesGetAll -> clientsEmployeesGetId -> Invalid parameters -> id main`,
            null,
            res
          );
        }
      } else {
        return utils.resError(
          404,
          `API ==> Controller => clientsEmployeesFilesGetAll -> clientsEmployeesGetId -> Not found`,
          null,
          res
        );
      }

      // Check filters
      const filters = [];
      filters.push({ empId: objData.idSecondary });
      // filters.push({filStatus: false});
      const objFilter = {
        [Op.and]: filters,
      };
      const resClientsEmployeesFilesGetAll =
        await CLIENTS_EMPLOYEES_FILES.findAll({
          where: objFilter,
          order: [['id', 'ASC']],
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
          attributes: { exclude: ['filKey', 'filUseId'] },
        });

      LogsController.logsCreate(
        useId,
        perId,
        `API ==> Controller => clientsEmployeesFilesGetAll -> Success`,
        `=> [${useId}] # Clientes: Colaboradores: Arquivos: Consultado (todos arquivos) ## [${
          objData.idSecondary
        }] ${resClientsEmployeesGetId.empName || 'Employee Undefined'}`,
        objData.idSecondary
      );
      return utils.resSuccess(
        'API ==> Controller => clientsEmployeesFilesGetAll -> Success',
        resClientsEmployeesFilesGetAll,
        res
      );
    } catch (error) {
      return utils.resError(
        500,
        `API ==> Controller => clientsEmployeesFilesGetAll -> Error`,
        error,
        res
      );
    }

    function validateParameters(cliId, empId) {
      try {
        let isValid = true;

        // cliId
        cliId = Number(cliId);
        if (
          cliId === undefined ||
          cliId === '' ||
          cliId === null ||
          isNaN(cliId) ||
          typeof cliId !== 'number' ||
          !utils.validateNumberPositive(cliId)
        ) {
          isValid = false;
        } else {
          objData.idMain = Number(cliId);
          objData.data.cliId = Number(cliId);
        }
        utils.devLog(2, 'cliId -> ' + isValid, null);

        // empId
        empId = Number(empId);
        if (
          empId === undefined ||
          empId === '' ||
          empId === null ||
          isNaN(empId) ||
          typeof empId !== 'number' ||
          !utils.validateNumberPositive(empId)
        ) {
          isValid = false;
        } else {
          objData.idSecondary = Number(empId);
          objData.data.empId = Number(empId);
        }
        utils.devLog(2, 'empId -> ' + isValid, null);

        return isValid;
      } catch (error) {
        return false;
      }
    }
  };

  clientsEmployeesFilesPatch = async ({ body, params }, res) => {
    const objData = {
      idMain: undefined,
      idSecondary: undefined,
      idTertiary: undefined,
      id: undefined,
      data: {},
    };

    try {
      const perId = 'F005';
      const logMsg = 'API ==> Controller => clientsEmployeesFilesPatch ->';
      const { useId } = body;

      utils.devLog(0, `${logMsg} Start`, null);
      const objResAuth = await UsersController.usersPermission(useId, perId);
      if (!objResAuth.resData.permission) {
        utils.devLog(2, 'API ==> Permission -> FALSE', null);
        return utils.resError(
          403,
          objResAuth.resMessage,
          { perId: objResAuth.resData.perId },
          res
        );
      }
      utils.devLog(2, 'API ==> Permission -> TRUE', null);

      // Function Controller Action
      let { cliId, empId, filId } = params;
      utils.devLog(2, 'cliId', cliId);
      utils.devLog(2, 'empId', empId);
      utils.devLog(2, 'filId', filId);
      utils.devLog(2, 'body', body);

      if (!validateParameters(cliId, empId, filId, body)) {
        return utils.resError(
          400,
          `API ==> Controller => clientsEmployeesFilesPatch -> Invalid parameters`,
          null,
          res
        );
      }

      utils.devLog(
        2,
        'API ==> Controller => clientsEmployeesFilesPatch : objData',
        objData
      );

      // Check Clients
      const resClientsGetId = await CLIENTS.findByPk(objData.idMain, {});
      if (resClientsGetId) {
        //
      } else {
        return utils.resError(
          404,
          `API ==> Controller => clientsEmployeesFilesPatch -> clientsGetId -> Not found`,
          null,
          res
        );
      }

      // Check Clients Employees
      const resClientsEmployeesGetId = await CLIENTS_EMPLOYEES.findByPk(
        objData.idSecondary,
        {}
      );
      if (resClientsEmployeesGetId) {
        // Verifica colaborador corresponde o cliente pesquisado
        if (resClientsEmployeesGetId.cliId === objData.idMain) {
          //
        } else {
          return utils.resError(
            400,
            `API ==> Controller => clientsEmployeesFilesPatch -> clientsEmployeesGetId -> Invalid parameters -> id main`,
            null,
            res
          );
        }
      } else {
        return utils.resError(
          404,
          `API ==> Controller => clientsEmployeesFilesPatch -> clientsEmployeesGetId -> Not found`,
          null,
          res
        );
      }

      // Check Files
      const resClientsEmployeesFilesGetId =
        await CLIENTS_EMPLOYEES_FILES.findByPk(objData.id, {});
      if (resClientsEmployeesFilesGetId) {
        // Verifica membro corresponde ao colaborador enviado
        if (resClientsEmployeesFilesGetId.empId === objData.idSecondary) {
          //
        } else {
          return utils.resError(
            400,
            `API ==> Controller => clientsEmployeesFilesPatch -> clientsFilesGetId -> Invalid parameters -> id main`,
            null,
            res
          );
        }
      } else {
        return utils.resError(
          404,
          `API ==> Controller => clientsEmployeesFilesPatch -> clientsFilesGetId -> Not found`,
          null,
          res
        );
      }

      // Update Clients
      const resClientsEmployeesFilesPatch =
        await resClientsEmployeesFilesGetId.update(objData.data);

      LogsController.logsCreate(
        useId,
        perId,
        `API ==> Controller => clientsEmployeesFilesPatch -> Success`,
        `=> [${useId}] # Clientes: Colaboradores: Arquivos: Atualizado [habilitado/desabilitado] ## [${objData.id}] ${resClientsEmployeesFilesGetId.filTitle}`,
        objData.id
      );
      return utils.resSuccess(
        'API ==> Controller => clientsEmployeesFilesPatch -> Success',
        { filId: objData.id },
        res
      );
    } catch (error) {
      return utils.resError(
        500,
        `API ==> Controller => clientsEmployeesFilesPatch -> Error`,
        error,
        res
      );
    }

    function validateParameters(cliId, empId, filId, obj) {
      try {
        let isValid = true;

        // cliId
        cliId = Number(cliId);
        if (
          cliId === undefined ||
          cliId === '' ||
          cliId === null ||
          isNaN(cliId) ||
          typeof cliId !== 'number' ||
          !utils.validateNumberPositive(cliId)
        ) {
          isValid = false;
        } else {
          objData.idMain = Number(cliId);
        }
        utils.devLog(2, 'cliId -> ' + isValid, null);

        // empId
        empId = Number(empId);
        if (
          empId === undefined ||
          empId === '' ||
          empId === null ||
          isNaN(empId) ||
          typeof empId !== 'number' ||
          !utils.validateNumberPositive(empId)
        ) {
          isValid = false;
        } else {
          objData.idSecondary = Number(empId);
        }
        utils.devLog(2, 'empId -> ' + isValid, null);

        // filId
        filId = Number(filId);
        if (
          filId === undefined ||
          filId === '' ||
          filId === null ||
          isNaN(filId) ||
          typeof filId !== 'number' ||
          !utils.validateNumberPositive(filId)
        ) {
          isValid = false;
        } else {
          objData.id = Number(filId);
        }
        utils.devLog(2, 'filId -> ' + isValid, null);

        // filStatus
        if (
          obj.filStatus === undefined ||
          obj.filStatus === '' ||
          obj.filStatus === null ||
          typeof obj.filStatus !== 'boolean' ||
          !utils.validateBoolean(obj.filStatus)
        ) {
          // isValid = false;
          objData.data.filStatus = false;
        } else {
          objData.data.filStatus = obj.filStatus;
        }
        utils.devLog(2, 'filStatus -> ' + isValid, null);

        return isValid;
      } catch (error) {
        return false;
      }
    }
  };

  // disabled
  clientsEmployeesFilesDelete = async ({ body, params }, res) => {
    const objData = {
      idMain: undefined,
      idSecondary: undefined,
      idTertiary: undefined,
      id: undefined,
      data: {},
    };

    try {
      const perId = 'F006';
      const logMsg = 'API ==> Controller => clientsEmployeesFilesDelete ->';
      const { useId } = body;

      utils.devLog(0, `${logMsg} Start`, null);
      const objResAuth = await UsersController.usersPermission(useId, perId);
      if (!objResAuth.resData.permission) {
        utils.devLog(2, 'API ==> Permission -> FALSE', null);
        return utils.resError(
          403,
          objResAuth.resMessage,
          { perId: objResAuth.resData.perId },
          res
        );
      }
      utils.devLog(2, 'API ==> Permission -> TRUE', null);

      // Function Controller Action
      let { cliId, filId } = params;
      utils.devLog(2, 'cliId', cliId);
      utils.devLog(2, 'filId', filId);
      utils.devLog(2, 'body', body);
      if (!validateParameters(cliId, filId, body)) {
        return utils.resError(
          400,
          `API ==> Controller => clientsEmployeesFilesDelete -> Invalid parameters`,
          null,
          res
        );
      }

      utils.devLog(
        2,
        'API ==> Controller => clientsEmployeesFilesDelete : objData',
        objData
      );

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
        return utils.resError(
          404,
          `API ==> Controller => clientsEmployeesFilesDelete -> clientsGetId -> Not found`,
          null,
          res
        );
      }

      // Check File
      const resClientsEmployeesFilesGetId =
        await CLIENTS_EMPLOYEES_FILES.findByPk(objData.id, {});
      if (resClientsEmployeesFilesGetId) {
        // Verifica membro corresponde ao colaborador enviado
        if (resClientsEmployeesFilesGetId.cliId === objData.idMain) {
        } else {
          return utils.resError(
            400,
            `API ==> Controller => clientsEmployeesFilesDelete -> Invalid parameters -> id main`,
            null,
            res
          );
        }
      } else {
        return utils.resError(
          404,
          `API ==> Controller => clientsEmployeesFilesDelete -> clientsFilesGetId -> Not found`,
          null,
          res
        );
      }

      // Update Clients
      const resClientsFilesDelete =
        await resClientsEmployeesFilesGetId.destroy();

      LogsController.logsCreate(
        useId,
        perId,
        `${logMsg} Success`,
        `=> [${useId}] # Cliente (Arquivos): Deletado ## [${objData.id}] ${resClientsEmployeesFilesGetId.filTitle}`,
        objData.id
      );
      return utils.resSuccess(
        'API ==> Controller => clientsEmployeesFilesDelete -> Success',
        { filId: objData.id },
        res
      );
    } catch (error) {
      return utils.resError(
        500,
        `API ==> Controller => clientsEmployeesFilesDelete -> Error`,
        error,
        res
      );
    }

    function validateParameters(cliId, filId, obj) {
      try {
        let isValid = true;

        // cliId
        cliId = Number(cliId);
        if (
          cliId === undefined ||
          cliId === '' ||
          cliId === null ||
          isNaN(cliId) ||
          typeof cliId !== 'number' ||
          !utils.validateNumberPositive(cliId)
        ) {
          isValid = false;
        } else {
          objData.idMain = Number(cliId);
        }
        utils.devLog(2, 'cliId -> ' + isValid, null);

        // filId
        filId = Number(filId);
        if (
          filId === undefined ||
          filId === '' ||
          filId === null ||
          isNaN(filId) ||
          typeof filId !== 'number' ||
          !utils.validateNumberPositive(filId)
        ) {
          isValid = false;
        } else {
          objData.id = Number(filId);
        }
        utils.devLog(2, 'filId -> ' + isValid, null);

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
  };

  clientsEmployeesFilesUpload = async (
    { headers: { useId }, body, params, query, file },
    res
  ) => {
    const objData = {
      idMain: undefined,
      idSecondary: undefined,
      idTertiary: undefined,
      id: undefined,
      data: {},
    };

    try {
      const perId = 'F004';

      utils.devLog(
        0,
        `API ==> Controller => clientsEmployeesFilesUpload -> Start`,
        null
      );

      const { title } = body;

      const { cliId, empId } = params;

      utils.devLog(2, '==================================', null);
      utils.devLog(2, `useId => ${useId}`, null);
      utils.devLog(2, `cliId => ${cliId}`, null);
      utils.devLog(2, `empId => ${empId}`, null);
      utils.devLog(2, `query =>`, null);
      utils.devLog(2, null, query);
      utils.devLog(2, `file => `, null);
      utils.devLog(2, `title => ${title}`, null);
      utils.devLog(2, null, file);
      utils.devLog(2, '==================================', null);

      const objResAuth = await UsersController.usersPermission(useId, perId);
      if (!objResAuth.resData.permission) {
        utils.devLog(2, 'API ==> Permission -> FALSE', null);
        return utils.resError(
          403,
          objResAuth.resMessage,
          { perId: objResAuth.resData.perId },
          res
        );
      }
      utils.devLog(2, 'API ==> Permission -> TRUE', null);

      if (!validateParameters(useId, cliId, empId, title, file)) {
        return utils.resError(
          400,
          `API ==> Controller => clientsEmployeesFilesUpload -> Invalid parameters`,
          null,
          res
        );
      }

      utils.devLog(
        2,
        'API ==> Controller => clientsEmployeesFilesUpload : objData',
        objData
      );

      // Check Clients
      const resClientsGetId = await CLIENTS.findByPk(objData.idMain, {});
      if (resClientsGetId) {
        //
      } else {
        return utils.resError(
          404,
          `API ==> Controller => clientsEmployeesFilesUpload -> clientsGetId -> Not found`,
          null,
          res
        );
      }

      // Check Clients Employees
      const resClientsEmployeesGetId = await CLIENTS_EMPLOYEES.findByPk(
        objData.idSecondary,
        {}
      );
      if (resClientsEmployeesGetId) {
        // Verifica colaborador corresponde o cliente pesquisado
        if (resClientsEmployeesGetId.cliId === objData.idMain) {
          //
        } else {
          return utils.resError(
            400,
            `API ==> Controller => clientsEmployeesFilesUpload -> clientsEmployeesGetId -> Invalid parameters -> id main`,
            null,
            res
          );
        }
      } else {
        return utils.resError(
          404,
          `API ==> Controller => clientsEmployeesFilesUpload -> clientsEmployeesGetId -> Not found`,
          null,
          res
        );
      }

      // Save DATA
      const resClientsEmployeesFilesPost = await CLIENTS_EMPLOYEES_FILES.create(
        objData.data
      );
      objData.id = resClientsEmployeesFilesPost.dataValues.id;

      LogsController.logsCreate(
        useId,
        perId,
        `API ==> Controller => clientsEmployeesFilesUpload -> Success`,
        `=> [${useId}] # Clientes: Colaboradores: Arquivos: Upload ## [${objData.id}] ${objData.data.filTitle}`,
        objData.id
      );
      return utils.resSuccess(
        'API ==> Controller => clientsEmployeesFilesUpload -> Success',
        { filId: objData.id },
        res
      );
    } catch (error) {
      return utils.resError(
        500,
        `API ==> Controller => clientsEmployeesFilesUpload -> Error`,
        error,
        res
      );
    }

    // function validateParameters(useId, cliId, memId, filTitle, file) {
    function validateParameters(useId, cliId, empId, filTitle, file) {
      try {
        let isValid = true;

        utils.devLog(2, 'FILE =>', null);
        utils.devLog(2, null, file);

        // cliId
        cliId = Number(cliId);
        if (
          cliId === undefined ||
          cliId === '' ||
          cliId === null ||
          isNaN(cliId) ||
          typeof cliId !== 'number' ||
          !utils.validateNumberPositive(cliId)
        ) {
          isValid = false;
        } else {
          objData.idMain = Number(cliId);
        }
        utils.devLog(2, 'cliId -> ' + isValid, null);

        // empId
        empId = Number(empId);
        if (
          empId === undefined ||
          empId === '' ||
          empId === null ||
          isNaN(empId) ||
          typeof empId !== 'number' ||
          !utils.validateNumberPositive(empId)
        ) {
          isValid = false;
        } else {
          objData.idSecondary = Number(empId);
          objData.data.empId = Number(empId);
        }
        utils.devLog(2, 'empId -> ' + isValid, null);

        // filStatus
        objData.data.filStatus = true;
        utils.devLog(2, 'filStatus -> ' + isValid, null);

        // filTitle
        if (
          filTitle === undefined ||
          filTitle === '' ||
          filTitle === null ||
          typeof filTitle !== 'string'
        ) {
          isValid = false;
        } else {
          objData.data.filTitle = filTitle;
        }
        utils.devLog(2, 'filTitle -> ' + isValid, null);

        // filType
        if (
          file.mimetype !== 'application/pdf' &&
          file.mimetype !== 'image/jpeg' &&
          file.mimetype !== 'image/png'
        ) {
          isValid = false;
        } else {
          objData.data.filType = path.extname(file.originalname);
        }
        utils.devLog(2, 'filType -> ' + isValid, null);

        // filKey
        if (file.key) {
          objData.data.filKey = file.key;
        } else {
          isValid = false;
        }
        utils.devLog(2, 'filKey -> ' + isValid, null);

        // filUseId
        objData.data.filUseId = useId;
        utils.devLog(2, 'filUseId -> ' + isValid, null);

        return isValid;
      } catch (error) {
        return false;
      }
    }
  };

  clientsEmployeesFilesDownload = async (
    { body, params, query, file },
    res
  ) => {
    const objData = {
      idMain: undefined,
      idSecondary: undefined,
      idTertiary: undefined,
      id: undefined,
      data: {},
    };

    try {
      const perId = 'F003';

      utils.devLog(
        0,
        `API ==> Controller => clientsEmployeesFilesDownload -> Start`,
        null
      );

      const { useId } = body;
      const { cliId, empId, filId } = params;

      utils.devLog(2, '==================================', null);
      utils.devLog(2, `useId => ${useId}`, null);
      utils.devLog(2, `cliId => ${cliId}`, null);
      utils.devLog(2, `empId => ${empId}`, null);
      utils.devLog(2, `filId => ${filId}`, null);
      utils.devLog(2, `query =>`, null);
      utils.devLog(2, null, query);
      utils.devLog(2, '==================================', null);

      const objResAuth = await UsersController.usersPermission(useId, perId);
      if (!objResAuth.resData.permission) {
        utils.devLog(2, 'API ==> Permission -> FALSE', null);
        return utils.resError(
          403,
          objResAuth.resMessage,
          { perId: objResAuth.resData.perId },
          res
        );
      }
      utils.devLog(2, 'API ==> Permission -> TRUE', null);

      if (!validateParameters(cliId, empId, filId)) {
        return utils.resError(
          400,
          `API ==> Controller => clientsEmployeesFilesDownload -> Invalid parameters`,
          null,
          res
        );
      }

      utils.devLog(
        2,
        'API ==> Controller => clientsEmployeesFilesDownload : objData',
        objData
      );

      // Check Clients
      const resClientsGetId = await CLIENTS.findByPk(objData.idMain, {});
      if (resClientsGetId) {
        //
      } else {
        return utils.resError(
          404,
          `API ==> Controller => clientsEmployeesFilesDownload -> clientsGetId -> Not found`,
          null,
          res
        );
      }

      // Check Clients Employees
      const resClientsEmployeesGetId = await CLIENTS_EMPLOYEES.findByPk(
        objData.idSecondary,
        {}
      );
      if (resClientsEmployeesGetId) {
        // Verifica colaborador corresponde o cliente pesquisado
        if (resClientsEmployeesGetId.cliId === objData.idMain) {
          //
        } else {
          return utils.resError(
            400,
            `API ==> Controller => clientsEmployeesFilesDownload -> clientsEmployeesGetId -> Invalid parameters -> id main`,
            null,
            res
          );
        }
      } else {
        return utils.resError(
          404,
          `API ==> Controller => clientsEmployeesFilesDownload -> clientsEmployeesGetId -> Not found`,
          null,
          res
        );
      }

      // Check File
      const resClientsEmployeesFilesGetId =
        await CLIENTS_EMPLOYEES_FILES.findByPk(objData.data.filId, {});
      if (resClientsEmployeesFilesGetId) {
        if (resClientsEmployeesFilesGetId.empId === objData.idSecondary) {
          if (resClientsEmployeesFilesGetId.filStatus) {
            //
          } else {
            return utils.resError(
              403,
              `API ==> Controller => clientsEmployeesFilesDownload -> usersPermission -> Forbidden byStatus`,
              null,
              res
            );
          }
        } else {
          return utils.resError(
            400,
            `API ==> Controller => clientsEmployeesFilesDownload -> resClientsEmployeesFilesGetId -> Invalid parameters -> id main`,
            null,
            res
          );
        }
      } else {
        return utils.resError(
          404,
          `API ==> Controller => clientsEmployeesFilesDownload -> resClientsEmployeesFilesGetId -> Not found`,
          null,
          res
        );
      }

      // GET Key the FILE
      const filePATH = path.resolve(__dirname, '..', '..', 'files', 'uploads');
      const fileKEY = resClientsEmployeesFilesGetId.filKey;
      const fileTITLE = resClientsEmployeesFilesGetId.filTitle;

      res.download(
        `${filePATH}/${fileKEY}`,
        `${fileTITLE}${path.extname(resClientsEmployeesFilesGetId.filKey)}`,
        (err) => {
          if (err) {
            utils.devLog(2, null, err);
            return utils.resError(
              500,
              'API ==> Controller => clientsEmployeesFilesDownload -> Download -> Error',
              utils.devDebugError(err),
              res
            );
          } else {
            LogsController.logsCreate(
              useId,
              perId,
              `API ==> Controller => clientsEmployeesFilesDownload -> Success`,
              `=> [${useId}] # Clientes: Colaboradores: Arquivos: Download ## [${objData.id}] ${resClientsEmployeesFilesGetId.filTitle}`,
              objData.id
            );
            return utils.resSuccess(
              'API ==> Controller => clientsEmployeesFilesDownload -> Success',
              { status: true }
            );
          }
        }
      );
    } catch (error) {
      return utils.resError(
        500,
        `API ==> Controller => clientsEmployeesFilesDownload -> Error`,
        error,
        res
      );
    }

    function validateParameters(cliId, empId, filId) {
      try {
        let isValid = true;

        // cliId
        cliId = Number(cliId);
        if (
          cliId === undefined ||
          cliId === '' ||
          cliId === null ||
          isNaN(cliId) ||
          typeof cliId !== 'number' ||
          !utils.validateNumberPositive(cliId)
        ) {
          isValid = false;
        } else {
          objData.idMain = Number(cliId);
        }
        utils.devLog(2, 'cliId -> ' + isValid, null);

        // empId
        empId = Number(empId);
        if (
          empId === undefined ||
          empId === '' ||
          empId === null ||
          isNaN(empId) ||
          typeof empId !== 'number' ||
          !utils.validateNumberPositive(empId)
        ) {
          isValid = false;
        } else {
          objData.idSecondary = Number(empId);
          objData.data.empId = Number(empId);
        }
        utils.devLog(2, 'empId -> ' + isValid, null);

        // filId
        filId = Number(filId);
        if (
          filId === undefined ||
          filId === '' ||
          filId === null ||
          isNaN(filId) ||
          typeof filId !== 'number' ||
          !utils.validateNumberPositive(filId)
        ) {
          isValid = false;
        } else {
          objData.data.filId = Number(filId);
          objData.id = Number(filId);
        }
        utils.devLog(2, 'filId -> ' + isValid, null);

        return isValid;
      } catch (error) {
        return false;
      }
    }
  };
}

module.exports = new ClientsEmployeesFilesController();
