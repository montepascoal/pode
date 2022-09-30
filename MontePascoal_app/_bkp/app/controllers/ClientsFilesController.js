/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// CONTROLLER USER /////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//  --------------------------------------------------------------------------------------------------------------------------------------- Modules -----

const path = require('path');
const utils = require("../utils/utils.js");
const { Op } = require("sequelize");

const {
  CLIENTS,
  EMPLOYEES_MEMBERS,
  CLIENTS_FILES,
  CONFIG_COUNTRIES,
  CONFIG_STATES,
  CONFIG_CITIES,
  CONFIG_EMPLOYEES_DEPARTMENTS,
  CONFIG_EMPLOYEES_OCCUPATIONS,
} = require("../models");

const LogsController = require('./LogsController');
const UsersController = require('./UsersController');

//  ------------------------------------------------------------------------------------------------------------------------------------- Class API -----
class ClientsFilesController {
  constructor() {
    // this.step1 = this.step1.bind(this);
    // this.step2 = this.step2.bind(this);
  }
  
  clientsFilesGetAll = async ({body,params}, res) => {
    const objData = { idMain: undefined, idSecondary: undefined, idTertiary: undefined, id: undefined, data: {} };

    try {
      const perId = "F003";
      const logMsg = "API ==> Controller => clientsFilesGetAll ->";
      const { useId } = body;
      
      utils.devLog(0, `${logMsg} Start`, null);
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
        return utils.resError(400,`API ==> Controller => clientsFilesGetId -> Invalid parameters`, null, res);
      }

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
        return utils.resError(404,`API ==> Controller => clientsFilesGetAll -> clientsGetId -> Not found`, null, res);
      }

      // Check filters
      const filters = [];
        filters.push({cliId: objData.idMain});
        // filters.push({filStatus: false});
      const objFilter = {
        [Op.and]: filters
      };
      const resClientsFilesGetAll = await CLIENTS_FILES.findAll({
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

      LogsController.logsCreate(useId, perId, `${logMsg} Success`, `=> [${useId}] # Cliente (Arquivos): Listagem geral ## [geral]`, null);
      return utils.resSuccess('API ==> Controller => clientsFilesGetAll -> Success', resClientsFilesGetAll, res );
    } catch (error) {
      return utils.resError(500,`API ==> Controller => clientsFilesGetAll -> Error`, error, res);
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
        }

        return isValid;
      } catch (error) {
        return false;
      }
    }
  }
  
  clientsFilesPatch = async ({body,params}, res) => {
    const objData = { idMain: undefined, idSecondary: undefined, idTertiary: undefined, id: undefined, data: {} };

    try {
      const perId = "F005";
      const logMsg = "API ==> Controller => clientsFilesPatch ->";
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
        return utils.resError(400,`API ==> Controller => clientsFilesPatch -> Invalid parameters`, null, res);
      }

      utils.devLog(2, "API ==> Controller => clientsFilesPatch : objData", objData);

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
        return utils.resError(404,`API ==> Controller => clientsFilesPatch -> clientsGetId -> Not found`, null, res);
      }

      // Check Files
      const resClientsFilesGetId = await CLIENTS_FILES.findByPk(objData.id, {});
      if (resClientsFilesGetId) {
        // Verifica membro corresponde ao colaborador enviado
        if (resClientsFilesGetId.cliId === objData.idMain) {
        } else {
          return utils.resError(400,`API ==> Controller => clientsFilesPatch -> Invalid parameters -> id main`, null, res);
        }
      } else {
        return utils.resError(404,`API ==> Controller => clientsFilesPatch -> clientsFilesGetId -> Not found`, null, res);
      }

      // Update Clients
      const resClientsPatch = await resClientsFilesGetId.update(objData.data);

      LogsController.logsCreate(useId, perId, `${logMsg} Success`, `=> [${useId}] # Cliente (Arquivos): Atualizado [habilitado/desabilitado] ## [${objData.id}] ${resClientsFilesGetId.filTitle}`, objData.id);
      return utils.resSuccess('API ==> Controller => clientsFilesPatch -> Success',{filId: objData.id }, res);    

    } catch (error) {
      return utils.resError(500,`API ==> Controller => clientsFilesPatch -> Error`, error, res);
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

        // cliCreated
        // objData.data.cliCreated = new Date();

        // cliUpdated
        // objData.data.cliUpdated = new Date();

        // cliDeleted
        // objData.data.cliDeleted = null;

        // console.log(isValid)

        return isValid;
      } catch (error) {
        return false;
      }
    }
  }

  clientsFilesDelete = async ({body,params}, res) => {
    const objData = { idMain: undefined, idSecondary: undefined, idTertiary: undefined, id: undefined, data: {} };

    try {
      const perId = "F006";
      const logMsg = "API ==> Controller => clientsFilesDelete ->";
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
        return utils.resError(400,`API ==> Controller => clientsFilesDelete -> Invalid parameters`, null, res);
      }

      utils.devLog(2, "API ==> Controller => clientsFilesDelete : objData", objData);

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
        return utils.resError(404,`API ==> Controller => clientsFilesDelete -> clientsGetId -> Not found`, null, res);
      }

      // Check File
      const resClientsFilesGetId = await CLIENTS_FILES.findByPk(objData.id, {});
      if (resClientsFilesGetId) {
        // Verifica membro corresponde ao colaborador enviado
        if (resClientsFilesGetId.cliId === objData.idMain) {
        } else {
          return utils.resError(400,`API ==> Controller => clientsFilesDelete -> Invalid parameters -> id main`, null, res);
        }
      } else {
        return utils.resError(404,`API ==> Controller => clientsFilesDelete -> clientsFilesGetId -> Not found`, null, res);
      }

      // Update Clients
      const resClientsFilesDelete = await resClientsFilesGetId.destroy();

      LogsController.logsCreate(useId, perId, `${logMsg} Success`, `=> [${useId}] # Cliente (Arquivos): Deletado ## [${objData.id}] ${resClientsFilesGetId.filTitle}`, objData.id);
      return utils.resSuccess('API ==> Controller => clientsFilesDelete -> Success',{filId: objData.id }, res);    

    } catch (error) {
      return utils.resError(500,`API ==> Controller => clientsFilesDelete -> Error`, error, res);
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

  clientsFilesUpload = async ({ headers: { useId }, body, params, query, file }, res) => {

    const objData = { idMain: undefined, idSec: undefined, id: undefined, data: {} };

    try {
      const perId = "F004";
      const logMsg = "API ==> Controller => clientsFilesUpload ->";
      utils.devLog(0, `${logMsg} Start`, null);

      const { title } = body;
      // const { cliId, memId } = params;
      const { cliId } = params;

      utils.devLog(2, "==================================", null);
      utils.devLog(2, `useId => ${useId}`, null);
      utils.devLog(2, `cliId => ${cliId}`, null);
      // utils.devLog(2, `memId => ${memId}`, null);
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

      // if (!validateParameters(useId, cliId, memId, title, file)) {
      if (!validateParameters(useId, cliId, title, file)) {  
        return utils.resError(400,`API ==> Controller => clientsFilesUpload -> Invalid parameters`, null, res);
      }

      utils.devLog(2, "API ==> Controller => clientsFilesUpload : objData", objData);

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
        return utils.resError(404,`API ==> Controller => clientsFilesUpload -> clientsGetId -> Not found`, null, res);
      }

      // // Check Members
      // let resClientsMembersGetId;
      // if (objData.idSec != 0) {
      //   resClientsMembersGetId = await CLIENTS_MEMBERS.findByPk(objData.idSec, {});
      //   if (resClientsMembersGetId) {
      //     // Verifica membro corresponde ao colaborador enviado
      //     if (resClientsMembersGetId.cliId === objData.idMain) {
      //     } else {
      //       return utils.resError(400,`API ==> Controller => clientsFilesUpload -> Invalid parameters -> id main`, null, res);
      //     }
      //   } else {
      //     return utils.resError(404,`API ==> Controller => clientsFilesUpload -> employeesMembersGetId -> Not found`, null, res);
      //   }
      // } else {
      //   resClientsMembersGetId = { id: 0 }
      // }

      // Save DATA
      const resClientsFilesPost = await CLIENTS_FILES.create(objData.data);
      objData.id = resClientsFilesPost.dataValues.id;

      LogsController.logsCreate(useId, perId, `${logMsg} Success`, `=> [${useId}] # Cliente (Arquivos): Upload ## [${objData.id}] ${objData.data.filTitle}`, objData.id);
      return utils.resSuccess('API ==> Controller => clientsFilesUpload -> Success', { filId: objData.id }, res);  

    } catch (error) {
      return utils.resError(500,`API ==> Controller => clientsFilesUpload -> Error`, error, res);
    }

    // function validateParameters(useId, cliId, memId, filTitle, file) {
    function validateParameters(useId, cliId, filTitle, file) {
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
          objData.data.cliId = Number(cliId);
        }
        utils.devLog(2, 'cliId -> '+isValid, null);

        // // memId
        // memId = Number(memId);
        // if (
        //   memId === undefined ||
        //   memId === "" ||
        //   memId === null ||
        //   isNaN(memId) ||
        //   typeof(memId) !== "number"||
        //   !utils.validateNumberPositiveZero(memId)
        // ) {
        //   isValid = false;
        // } else {
        //   objData.idSec = Number(memId);
        //   objData.data.memId = Number(memId);
        // }
        // utils.devLog(2, 'memId -> '+isValid, null);

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
        if (file.mimetype !== 'application/pdf' && file.mimetype !== 'image/jpeg' && file.mimetype !== 'image/png' && file.mimetype !== 'audio/mpeg') {
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

  clientsFilesDownload = async ({ body, params, query, file }, res) => {

    const objData = { idMain: undefined, idSecondary: undefined, idTertiary: undefined, id: undefined, data: {} };

    try {
      const perId = "F003";
      const logMsg = "API ==> Controller => clientsFilesDownload ->";
      utils.devLog(0, `${logMsg} Start`, null);

      const { useId } = body;
      const { cliId, filId } = params;
      // const { cliId, memId, filId } = params;

      utils.devLog(2, "==================================", null);
      utils.devLog(2, `useId => ${useId}`, null);
      utils.devLog(2, `cliId => ${cliId}`, null);
      // utils.devLog(2, `memId => ${memId}`, null);
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

      // if (!validateParameters(cliId, memId, filId)) {
      if (!validateParameters(cliId, filId)) {
        return utils.resError(400,`API ==> Controller => clientsFilesDownload -> Invalid parameters`, null, res);
      }

      utils.devLog(2, "API ==> Controller => clientsFilesDownload : objData", objData);

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
        return utils.resError(404,`API ==> Controller => clientsFilesDownload -> clientsGetId -> Not found`, null, res);
      }

      // // Check Members
      // let resClientsMembersGetId;
      // if (objData.id != 0) {
      //   resClientsMembersGetId = await EMPLOYEES_MEMBERS.findByPk(objData.id, {});
      //   if (resClientsMembersGetId) {
      //     // Verifica membro corresponde ao colaborador enviado
      //     if (resClientsMembersGetId.cliId === objData.idMain) {
      //     } else {
      //       return utils.resError(400,`API ==> Controller => clientsFilesDownload -> Invalid parameters -> id main`, null, res);
      //     }
      //   } else {
      //     return utils.resError(404,`API ==> Controller => clientsFilesDownload -> employeesMembersGetId -> Not found`, null, res);
      //   }
      // } else {
      //   resClientsMembersGetId = {id:0}
      // }

      // Check File
      const resClientsFilesGetId = await CLIENTS_FILES.findByPk(objData.data.filId,{});
      if (resClientsFilesGetId) {
        if (resClientsFilesGetId.cliId === resClientsGetId.id) {
        // if (resClientsFilesGetId.cliId === resClientsGetId.id && (resClientsFilesGetId.memId === resClientsMembersGetId.id)) {
          if (resClientsFilesGetId.filStatus) {
          } else {
            return utils.resError(403,`API ==> Controller => usersPermission -> Forbidden byStatus`, null, res);
          }
        } else {
          return utils.resError(400,`API ==> Controller => clientsFilesDownload -> resClientsFilesGetId -> Invalid parameters -> id main`, null, res);
        }
      } else {
        return utils.resError(404,`API ==> Controller => clientsFilesDownload -> resClientsFilesGetId -> Not found`, null, res);
      }

      // GET Key the FILE
      const filePATH    = path.resolve(__dirname,'..','..', 'files', 'uploads');
      const fileKEY     = resClientsFilesGetId.filKey;
      const fileTITLE   = resClientsFilesGetId.filTitle;

      res.download(`${filePATH}/${fileKEY}`, `${fileTITLE}${path.extname(resClientsFilesGetId.filKey)}`, (err) => {
        if (err) {
          utils.devLog(2, null, err);
          return utils.resError(500, 'API ==> Controller => clientsFilesDownload -> Download -> Error', utils.devDebugError(err), res);   
        } else {
          LogsController.logsCreate(useId, perId, `${logMsg} Success`, `=> [${useId}] # Cliente (Arquivos): Download ## [${objData.idMain}] ${resClientsFilesGetId.filTitle}`, objData.id);
          return utils.resSuccess('API ==> Controller => clientsFilesDownload -> Success', { status: true });    
        }
      });

    } catch (error) {
      return utils.resError(500,`API ==> Controller => clientsFilesDownload -> Error`, error, res);
    }

    // function validateParameters(cliId, memId, filId) {
    function validateParameters(cliId, filId) {
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
          // objData.data.cliId = Number(cliId);
        }
        utils.devLog(2, 'cliId -> '+isValid, null);

        // // memId
        // memId = Number(memId);
        // if (
        //   memId === undefined ||
        //   memId === "" ||
        //   memId === null ||
        //   isNaN(memId) ||
        //   typeof(memId) !== "number"||
        //   !utils.validateNumberPositiveZero(memId)
        // ) {
        //   isValid = false;
        // } else {
        //   objData.id = Number(memId);
        // }
        // utils.devLog(2, 'memId -> '+isValid, null);

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

module.exports = new ClientsFilesController();
