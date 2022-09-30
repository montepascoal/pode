/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// CONTROLLER USER /////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//  --------------------------------------------------------------------------------------------------------------------------------------- Modules -----

const path = require('path');
const utils = require("../utils/utils.js");
const { Op } = require("sequelize");

const {
  PROVIDERS,
  EMPLOYEES_MEMBERS,
  PROVIDERS_FILES,
  CONFIG_COUNTRIES,
  CONFIG_STATES,
  CONFIG_CITIES,
  CONFIG_EMPLOYEES_DEPARTMENTS,
  CONFIG_EMPLOYEES_OCCUPATIONS,
} = require("../models");

const LogsController = require('./LogsController');
const UsersController = require('./UsersController');

//  ------------------------------------------------------------------------------------------------------------------------------------- Class API -----
class EmployeesFilesController {
  constructor() {
    // this.step1 = this.step1.bind(this);
    // this.step2 = this.step2.bind(this);
  }
  
  providersFilesGetAll = async ({body,params}, res) => {
    const objData = { idMain: undefined, id: undefined, data: {} };

    try {
      const perId = "D003";
      const logMsg = "API ==> Controller => providersFilesGetAll -> Start";
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
        return utils.resError(400,`API ==> Controller => providersFilesGetId -> Invalid parameters`, null, res);
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
        return utils.resError(404,`API ==> Controller => providersFilesGetAll -> employeesGetId -> Not found`, null, res);
      }

      // Check filters
      const filters = [];
        filters.push({proId: objData.idMain});
        // filters.push({filStatus: false});
      const objFilter = {
        [Op.and]: filters
      };
      const resProvidersFilesGetAll = await PROVIDERS_FILES.findAll({
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

      LogsController.logsCreate(useId, perId, logMsg, `=> [${useId}] # Fornecedor (Arquivos): Listagem geral ## [geral]`, null);
      return utils.resSuccess('API ==> Controller => providersFilesGetAll -> Success', resProvidersFilesGetAll, res );
    } catch (error) {
      return utils.resError(500,`API ==> Controller => providersFilesGetAll -> Error`, error, res);
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
  
  providersFilesPatch = async ({body,params}, res) => {
    const objData = { idMain: undefined, id: undefined, data: {} };

    try {
      const perId = "D005";
      const logMsg = "API ==> Controller => providersFilesPatch -> Start";
      const { useId } = body;

      utils.devLog(0, logMsg, null);
      const objResAuth = await UsersController.usersPermission(useId,perId);
      if (!objResAuth.resData.permission) {
        utils.devLog(2, "API ==> Permission -> FALSE", null);
        return utils.resError(403, objResAuth.resMessage, { perId: objResAuth.resData.perId }, res );
      }
      utils.devLog(2, "API ==> Permission -> TRUE", null);

      // Function Controller Action
      let { proId, filId } = params;
      utils.devLog(2, null, proId);
      utils.devLog(2, null, filId);
      utils.devLog(2, null, body);
      if (!validateParameters(proId, filId, body)) {
        return utils.resError(400,`API ==> Controller => providersFilesPatch -> Invalid parameters`, null, res);
      }

      utils.devLog(2, "API ==> Controller => providersFilesPatch : objData", null);
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
        return utils.resError(404,`API ==> Controller => providersFilesPatch -> providersGetId -> Not found`, null, res);
      }

      // Check Files
      const resProvidersFilesGetId = await PROVIDERS_FILES.findByPk(objData.id, {});
      if (resProvidersFilesGetId) {
        // Verifica membro corresponde ao colaborador enviado
        if (resProvidersFilesGetId.proId === objData.idMain) {
        } else {
          return utils.resError(400,`API ==> Controller => providersFilesPatch -> Invalid parameters -> id main`, null, res);
        }
      } else {
        return utils.resError(404,`API ==> Controller => providersFilesPatch -> providersFilesGetId -> Not found`, null, res);
      }

      // Update Providers
      const resProvidersPatch = await resProvidersFilesGetId.update(objData.data);

      LogsController.logsCreate(useId, perId, logMsg, `=> [${useId}] # Fornecedor (Arquivos): Atualizado [habilitado/desabilitado] ## [${objData.id}] ${resProvidersFilesGetId.filTitle}`, objData.id);
      return utils.resSuccess('API ==> Controller => providersFilesPatch -> Success',{filId: objData.id }, res);    

    } catch (error) {
      return utils.resError(500,`API ==> Controller => providersFilesPatch -> Error`, error, res);
    }

    function validateParameters(proId, filId, obj) {
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

        // proCreated
        // objData.data.proCreated = new Date();

        // proUpdated
        // objData.data.proUpdated = new Date();

        // proDeleted
        // objData.data.proDeleted = null;

        // console.log(isValid)

        return isValid;
      } catch (error) {
        return false;
      }
    }
  }

  providersFilesDelete = async ({body,params}, res) => {
    const objData = { idMain: undefined, id: undefined, data: {} };

    try {
      const perId = "D006";
      const logMsg = "API ==> Controller => providersFilesDelete -> Start";
      const { useId } = body;

      utils.devLog(0, logMsg, null);
      const objResAuth = await UsersController.usersPermission(useId,perId);
      if (!objResAuth.resData.permission) {
        utils.devLog(2, "API ==> Permission -> FALSE", null);
        return utils.resError(403, objResAuth.resMessage, { perId: objResAuth.resData.perId }, res );
      }
      utils.devLog(2, "API ==> Permission -> TRUE", null);

      // Function Controller Action
      let { proId, filId } = params;
      utils.devLog(2, null, proId);
      utils.devLog(2, null, filId);
      utils.devLog(2, null, body);
      if (!validateParameters(proId, filId, body)) {
        return utils.resError(400,`API ==> Controller => providersFilesDelete -> Invalid parameters`, null, res);
      }

      utils.devLog(2, "API ==> Controller => providersFilesDelete : objData", null);
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
        return utils.resError(404,`API ==> Controller => providersFilesDelete -> providersGetId -> Not found`, null, res);
      }

      // Check File
      const resProvidersFilesGetId = await PROVIDERS_FILES.findByPk(objData.id, {});
      if (resProvidersFilesGetId) {
        // Verifica membro corresponde ao colaborador enviado
        if (resProvidersFilesGetId.proId === objData.idMain) {
        } else {
          return utils.resError(400,`API ==> Controller => providersFilesDelete -> Invalid parameters -> id main`, null, res);
        }
      } else {
        return utils.resError(404,`API ==> Controller => providersFilesDelete -> providersFilesGetId -> Not found`, null, res);
      }

      // Update Providers
      const resProvidersFilesDelete = await resProvidersFilesGetId.destroy();

      LogsController.logsCreate(useId, perId, logMsg, `=> [${useId}] # Fornecedor (Arquivos): Deletado ## [${objData.id}] ${resProvidersFilesGetId.filTitle}`, objData.id);
      return utils.resSuccess('API ==> Controller => providersFilesDelete -> Success',{filId: objData.id }, res);    

    } catch (error) {
      return utils.resError(500,`API ==> Controller => providersFilesDelete -> Error`, error, res);
    }

    function validateParameters(proId, filId, obj) {
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

        // proCreated
        // objData.data.proCreated = new Date();

        // proUpdated
        // objData.data.proUpdated = new Date();

        // proDeleted
        // objData.data.proDeleted = null;

        // console.log(isValid);

        return isValid;
      } catch (error) {
        return false;
      }
    }
  }

  providersFilesUpload = async ({ headers: { useId }, body, params, query, file }, res) => {

    const objData = { idMain: undefined, idSec: undefined, id: undefined, data: {} };

    try {
      const perId = "D004";
      const logMsg = "API ==> Controller => providersFilesUpload -> Start";

      const { title } = body;
      // const { proId, memId } = params;
      const { proId } = params;

      utils.devLog(2, "==================================", null);
      utils.devLog(2, `useId => ${useId}`, null);
      utils.devLog(2, `proId => ${proId}`, null);
      // utils.devLog(2, `memId => ${memId}`, null);
      utils.devLog(2, `query =>`, null);
      utils.devLog(2, null, query);
      utils.devLog(2, `file => `, null);
      utils.devLog(2, `title => ${title}`, null);
      utils.devLog(2, null, file);
      utils.devLog(2, "==================================", null);

      utils.devLog(0, logMsg, null);
      const objResAuth = await UsersController.usersPermission(useId,perId);
      if (!objResAuth.resData.permission) {
        utils.devLog(2, "API ==> Permission -> FALSE", null);
        return utils.resError(403, objResAuth.resMessage, { perId: objResAuth.resData.perId }, res );
      }
      utils.devLog(2, "API ==> Permission -> TRUE", null);

      // if (!validateParameters(useId, proId, memId, title, file)) {
      if (!validateParameters(useId, proId, title, file)) {  
        return utils.resError(400,`API ==> Controller => providersFilesUpload -> Invalid parameters`, null, res);
      }

      utils.devLog(2, "API ==> Controller => providersFilesUpload : objData", null);
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
        return utils.resError(404,`API ==> Controller => providersFilesUpload -> providersGetId -> Not found`, null, res);
      }

      // // Check Members
      // let resEmployeesMembersGetId;
      // if (objData.idSec != 0) {
      //   resEmployeesMembersGetId = await PROVIDERS_MEMBERS.findByPk(objData.idSec, {});
      //   if (resEmployeesMembersGetId) {
      //     // Verifica membro corresponde ao colaborador enviado
      //     if (resEmployeesMembersGetId.proId === objData.idMain) {
      //     } else {
      //       return utils.resError(400,`API ==> Controller => providersFilesUpload -> Invalid parameters -> id main`, null, res);
      //     }
      //   } else {
      //     return utils.resError(404,`API ==> Controller => providersFilesUpload -> employeesMembersGetId -> Not found`, null, res);
      //   }
      // } else {
      //   resEmployeesMembersGetId = { id: 0 }
      // }

      // Save DATA
      const resProvidersFilesPost = await PROVIDERS_FILES.create(objData.data);
      objData.id = resProvidersFilesPost.dataValues.id;

      LogsController.logsCreate(useId, perId, logMsg, `=> [${useId}] # Fornecedor (Arquivos): Upload ## [${objData.id}] ${objData.data.filTitle}`, objData.id);
      return utils.resSuccess('API ==> Controller => providersFilesUpload -> Success', { filId: objData.id }, res);  

    } catch (error) {
      return utils.resError(500,`API ==> Controller => providersFilesUpload -> Error`, error, res);
    }

    // function validateParameters(useId, proId, memId, filTitle, file) {
    function validateParameters(useId, proId, filTitle, file) {
      try {
        let isValid = true;

        utils.devLog(2, 'FILE =>', null);
        utils.devLog(2, null, file);

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

  providersFilesDownload = async ({ body, params, query, file }, res) => {

    const objData = { idMain: undefined, id: undefined, data: {} };

    try {
      const perId = "D003";
      const logMsg = "API ==> Controller => providersFilesDownload -> Start";

      const { useId } = body;
      const { proId, filId } = params;
      // const { proId, memId, filId } = params;

      utils.devLog(2, "==================================", null);
      utils.devLog(2, `useId => ${useId}`, null);
      utils.devLog(2, `proId => ${proId}`, null);
      // utils.devLog(2, `memId => ${memId}`, null);
      utils.devLog(2, `filId => ${filId}`, null);
      utils.devLog(2, `query =>`, null);
      utils.devLog(2, null, query);
      utils.devLog(2, "==================================", null);

      utils.devLog(0, logMsg, null);
      const objResAuth = await UsersController.usersPermission(useId,perId);
      if (!objResAuth.resData.permission) {
        utils.devLog(2, "API ==> Permission -> FALSE", null);
        return utils.resError(403, objResAuth.resMessage, { perId: objResAuth.resData.perId }, res );
      }
      utils.devLog(2, "API ==> Permission -> TRUE", null);

      // if (!validateParameters(proId, memId, filId)) {
      if (!validateParameters(proId, filId)) {
        return utils.resError(400,`API ==> Controller => providersFilesDownload -> Invalid parameters`, null, res);
      }

      utils.devLog(2, "API ==> Controller => providersFilesDownload : objData", null);
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
        return utils.resError(404,`API ==> Controller => providersFilesDownload -> providersGetId -> Not found`, null, res);
      }

      // // Check Members
      // let resEmployeesMembersGetId;
      // if (objData.id != 0) {
      //   resEmployeesMembersGetId = await EMPLOYEES_MEMBERS.findByPk(objData.id, {});
      //   if (resEmployeesMembersGetId) {
      //     // Verifica membro corresponde ao colaborador enviado
      //     if (resEmployeesMembersGetId.proId === objData.idMain) {
      //     } else {
      //       return utils.resError(400,`API ==> Controller => providersFilesDownload -> Invalid parameters -> id main`, null, res);
      //     }
      //   } else {
      //     return utils.resError(404,`API ==> Controller => providersFilesDownload -> employeesMembersGetId -> Not found`, null, res);
      //   }
      // } else {
      //   resEmployeesMembersGetId = {id:0}
      // }

      // Check File
      const resProvidersFilesGetId = await PROVIDERS_FILES.findByPk(objData.data.filId,{});
      if (resProvidersFilesGetId) {
        if (resProvidersFilesGetId.proId === resProvidersGetId.id) {
        // if (resProvidersFilesGetId.proId === resProvidersGetId.id && (resProvidersFilesGetId.memId === resEmployeesMembersGetId.id)) {
          if (resProvidersFilesGetId.filStatus) {
          } else {
            return utils.resError(403,`API ==> Controller => usersPermission -> Forbidden byStatus`, null, res);
          }
        } else {
          return utils.resError(400,`API ==> Controller => providersFilesDownload -> resProvidersFilesGetId -> Invalid parameters -> id main`, null, res);
        }
      } else {
        return utils.resError(404,`API ==> Controller => providersFilesDownload -> resProvidersFilesGetId -> Not found`, null, res);
      }

      // GET Key the FILE
      const filePATH    = path.resolve(__dirname,'..','..', 'files', 'uploads');
      const fileKEY     = resProvidersFilesGetId.filKey;
      const fileTITLE   = resProvidersFilesGetId.filTitle;

      res.download(`${filePATH}/${fileKEY}`, `${fileTITLE}${path.extname(resProvidersFilesGetId.filKey)}`, (err) => {
        if (err) {
          utils.devLog(2, null, err);
          return utils.resError(500, 'API ==> Controller => providersFilesDownload -> Download -> Error', utils.devDebugError(err), res);   
        } else {
          LogsController.logsCreate(useId, perId, logMsg, `=> [${useId}] # Fornecedor (Arquivos): Download ## [${objData.idMain}] ${resProvidersFilesGetId.filTitle}`, objData.id);
          return utils.resSuccess('API ==> Controller => providersFilesDownload -> Success', { status: true });    
        }
      });

    } catch (error) {
      return utils.resError(500,`API ==> Controller => providersFilesDownload -> Error`, error, res);
    }

    // function validateParameters(proId, memId, filId) {
    function validateParameters(proId, filId) {
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
          // objData.data.proId = Number(proId);
        }
        utils.devLog(2, 'proId -> '+isValid, null);

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

module.exports = new EmployeesFilesController();
