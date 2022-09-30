/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// CONTROLLER USER /////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//  --------------------------------------------------------------------------------------------------------------------------------------- Modules -----

const path = require('path');
const utils = require("../utils/utils.js");
const { Op } = require("sequelize");

const {
  PARTNERS,
  EMPLOYEES_MEMBERS,
  PARTNERS_FILES,
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
  
  partnersFilesGetAll = async ({body,params}, res) => {
    const objData = { idMain: undefined, id: undefined, data: {} };

    try {
      const perId = "D003";
      const logMsg = "API ==> Controller => partnersFilesGetAll -> Start";
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
      let { parId } = params;
      if (!validateParameters(parId)) {
        return utils.resError(400,`API ==> Controller => partnersFilesGetId -> Invalid parameters`, null, res);
      }

      // Check Partners
      const resPartnersGetId = await PARTNERS.findByPk(objData.idMain, {});
      if (resPartnersGetId) {
        // Verifica se usuário possui permissão geral sobre as empresas
        // if (objResAuth.resData.useKeyCompany !== 0) {
        //   // Verifica se o registro que deseja alterar pertente a empresa que possui permissão
        //   if (resPartnersGetId.comId !== objResAuth.resData.useKeyCompany) {
        //     return utils.resError(403, "API ==> Controller => usersPermission -> Forbidden byId", null, res );
        //   }
        // }
      } else {
        return utils.resError(404,`API ==> Controller => partnersFilesGetAll -> employeesGetId -> Not found`, null, res);
      }

      // Check filters
      const filters = [];
        filters.push({parId: objData.idMain});
        // filters.push({filStatus: false});
      const objFilter = {
        [Op.and]: filters
      };
      const resPartnersFilesGetAll = await PARTNERS_FILES.findAll({
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
      return utils.resSuccess('API ==> Controller => partnersFilesGetAll -> Success', resPartnersFilesGetAll, res );
    } catch (error) {
      return utils.resError(500,`API ==> Controller => partnersFilesGetAll -> Error`, error, res);
    }

    function validateParameters(parId) {
      try {
        let isValid = true;

        // parId
        parId = Number(parId);
        if (
          parId === undefined ||
          parId === "" ||
          parId === null ||
          isNaN(parId) ||
          typeof(parId) !== "number"||
          !utils.validateNumberPositive(parId)
        ) {
          isValid = false;
        } else {
          objData.idMain = Number(parId);
        }

        return isValid;
      } catch (error) {
        return false;
      }
    }
  }
  
  partnersFilesPatch = async ({body,params}, res) => {
    const objData = { idMain: undefined, id: undefined, data: {} };

    try {
      const perId = "D005";
      const logMsg = "API ==> Controller => partnersFilesPatch -> Start";
      const { useId } = body;

      utils.devLog(0, logMsg, null);
      const objResAuth = await UsersController.usersPermission(useId,perId);
      if (!objResAuth.resData.permission) {
        utils.devLog(2, "API ==> Permission -> FALSE", null);
        return utils.resError(403, objResAuth.resMessage, { perId: objResAuth.resData.perId }, res );
      }
      utils.devLog(2, "API ==> Permission -> TRUE", null);

      // Function Controller Action
      let { parId, filId } = params;
      utils.devLog(2, null, parId);
      utils.devLog(2, null, filId);
      utils.devLog(2, null, body);
      if (!validateParameters(parId, filId, body)) {
        return utils.resError(400,`API ==> Controller => partnersFilesPatch -> Invalid parameters`, null, res);
      }

      utils.devLog(2, "API ==> Controller => partnersFilesPatch : objData", null);
      utils.devLog(2, null, objData);

      // Check Partners
      const resPartnersGetId = await PARTNERS.findByPk(objData.idMain, {});
      if (resPartnersGetId) {
        // Verifica se usuário possui permissão geral sobre as empresas
        // if (objResAuth.resData.useKeyCompany !== 0) {
        //   // Verifica se o registro que deseja alterar pertente a empresa que possui permissão
        //   if (resPartnersGetId.comId !== objResAuth.resData.useKeyCompany) {
        //     return utils.resError(403, "API ==> Controller => usersPermission -> Forbidden byId", null, res );
        //   }
        // }
      } else {
        return utils.resError(404,`API ==> Controller => partnersFilesPatch -> partnersGetId -> Not found`, null, res);
      }

      // Check Files
      const resPartnersFilesGetId = await PARTNERS_FILES.findByPk(objData.id, {});
      if (resPartnersFilesGetId) {
        // Verifica membro corresponde ao colaborador enviado
        if (resPartnersFilesGetId.parId === objData.idMain) {
        } else {
          return utils.resError(400,`API ==> Controller => partnersFilesPatch -> Invalid parameters -> id main`, null, res);
        }
      } else {
        return utils.resError(404,`API ==> Controller => partnersFilesPatch -> partnersFilesGetId -> Not found`, null, res);
      }

      // Update Partners
      const resPartnersPatch = await resPartnersFilesGetId.update(objData.data);

      LogsController.logsCreate(useId, perId, logMsg, `=> [${useId}] # Fornecedor (Arquivos): Atualizado [habilitado/desabilitado] ## [${objData.id}] ${resPartnersFilesGetId.filTitle}`, objData.id);
      return utils.resSuccess('API ==> Controller => partnersFilesPatch -> Success',{filId: objData.id }, res);    

    } catch (error) {
      return utils.resError(500,`API ==> Controller => partnersFilesPatch -> Error`, error, res);
    }

    function validateParameters(parId, filId, obj) {
      try {
        let isValid = true;

        // parId
        parId = Number(parId);
        if (
          parId === undefined ||
          parId === "" ||
          parId === null ||
          isNaN(parId) ||
          typeof(parId) !== "number"||
          !utils.validateNumberPositive(parId)
        ) {
          isValid = false;
        } else {
          objData.idMain = Number(parId);
        }
        utils.devLog(2, 'parId -> '+isValid, null);

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

        // parCreated
        // objData.data.parCreated = new Date();

        // parUpdated
        // objData.data.parUpdated = new Date();

        // parDeleted
        // objData.data.parDeleted = null;

        // console.log(isValid)

        return isValid;
      } catch (error) {
        return false;
      }
    }
  }

  partnersFilesDelete = async ({body,params}, res) => {
    const objData = { idMain: undefined, id: undefined, data: {} };

    try {
      const perId = "D006";
      const logMsg = "API ==> Controller => partnersFilesDelete -> Start";
      const { useId } = body;

      utils.devLog(0, logMsg, null);
      const objResAuth = await UsersController.usersPermission(useId,perId);
      if (!objResAuth.resData.permission) {
        utils.devLog(2, "API ==> Permission -> FALSE", null);
        return utils.resError(403, objResAuth.resMessage, { perId: objResAuth.resData.perId }, res );
      }
      utils.devLog(2, "API ==> Permission -> TRUE", null);

      // Function Controller Action
      let { parId, filId } = params;
      utils.devLog(2, null, parId);
      utils.devLog(2, null, filId);
      utils.devLog(2, null, body);
      if (!validateParameters(parId, filId, body)) {
        return utils.resError(400,`API ==> Controller => partnersFilesDelete -> Invalid parameters`, null, res);
      }

      utils.devLog(2, "API ==> Controller => partnersFilesDelete : objData", null);
      utils.devLog(2, null, objData);

      // Check Partners
      const resPartnersGetId = await PARTNERS.findByPk(objData.idMain, {});
      if (resPartnersGetId) {
        // Verifica se usuário possui permissão geral sobre as empresas
        // if (objResAuth.resData.useKeyCompany !== 0) {
        //   // Verifica se o registro que deseja alterar pertente a empresa que possui permissão
        //   if (resPartnersGetId.comId !== objResAuth.resData.useKeyCompany) {
        //     return utils.resError(403, "API ==> Controller => usersPermission -> Forbidden byId", null, res );
        //   }
        // }
      } else {
        return utils.resError(404,`API ==> Controller => partnersFilesDelete -> partnersGetId -> Not found`, null, res);
      }

      // Check File
      const resPartnersFilesGetId = await PARTNERS_FILES.findByPk(objData.id, {});
      if (resPartnersFilesGetId) {
        // Verifica membro corresponde ao colaborador enviado
        if (resPartnersFilesGetId.parId === objData.idMain) {
        } else {
          return utils.resError(400,`API ==> Controller => partnersFilesDelete -> Invalid parameters -> id main`, null, res);
        }
      } else {
        return utils.resError(404,`API ==> Controller => partnersFilesDelete -> partnersFilesGetId -> Not found`, null, res);
      }

      // Update Partners
      const resPartnersFilesDelete = await resPartnersFilesGetId.destroy();

      LogsController.logsCreate(useId, perId, logMsg, `=> [${useId}] # Fornecedor (Arquivos): Deletado ## [${objData.id}] ${resPartnersFilesGetId.filTitle}`, objData.id);
      return utils.resSuccess('API ==> Controller => partnersFilesDelete -> Success',{filId: objData.id }, res);    

    } catch (error) {
      return utils.resError(500,`API ==> Controller => partnersFilesDelete -> Error`, error, res);
    }

    function validateParameters(parId, filId, obj) {
      try {
        let isValid = true;

        // parId
        parId = Number(parId);
        if (
          parId === undefined ||
          parId === "" ||
          parId === null ||
          isNaN(parId) ||
          typeof(parId) !== "number"||
          !utils.validateNumberPositive(parId)
        ) {
          isValid = false;
        } else {
          objData.idMain = Number(parId);
        }
        utils.devLog(2, 'parId -> '+isValid, null);

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

        // parCreated
        // objData.data.parCreated = new Date();

        // parUpdated
        // objData.data.parUpdated = new Date();

        // parDeleted
        // objData.data.parDeleted = null;

        // console.log(isValid);

        return isValid;
      } catch (error) {
        return false;
      }
    }
  }

  partnersFilesUpload = async ({ headers: { useId }, body, params, query, file }, res) => {

    const objData = { idMain: undefined, idSec: undefined, id: undefined, data: {} };

    try {
      const perId = "D004";
      const logMsg = "API ==> Controller => partnersFilesUpload -> Start";

      const { title } = body;
      // const { parId, memId } = params;
      const { parId } = params;

      utils.devLog(2, "==================================", null);
      utils.devLog(2, `useId => ${useId}`, null);
      utils.devLog(2, `parId => ${parId}`, null);
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

      // if (!validateParameters(useId, parId, memId, title, file)) {
      if (!validateParameters(useId, parId, title, file)) {  
        return utils.resError(400,`API ==> Controller => partnersFilesUpload -> Invalid parameters`, null, res);
      }

      utils.devLog(2, "API ==> Controller => partnersFilesUpload : objData", null);
      utils.devLog(2, null, objData);

      // Check Partners
      const resPartnersGetId = await PARTNERS.findByPk(objData.idMain, {});
      if (resPartnersGetId) {
        // Verifica se usuário possui permissão geral sobre as empresas
        // if (objResAuth.resData.useKeyCompany !== 0) {
        //   // Verifica se o registro que deseja alterar pertente a empresa que possui permissão
        //   if (resPartnersGetId.comId !== objResAuth.resData.useKeyCompany) {
        //     return utils.resError(403, "API ==> Controller => usersPermission -> Forbidden byId", null, res );
        //   }
        // }
      } else {
        return utils.resError(404,`API ==> Controller => partnersFilesUpload -> partnersGetId -> Not found`, null, res);
      }

      // // Check Members
      // let resEmployeesMembersGetId;
      // if (objData.idSec != 0) {
      //   resEmployeesMembersGetId = await PARTNERS_MEMBERS.findByPk(objData.idSec, {});
      //   if (resEmployeesMembersGetId) {
      //     // Verifica membro corresponde ao colaborador enviado
      //     if (resEmployeesMembersGetId.parId === objData.idMain) {
      //     } else {
      //       return utils.resError(400,`API ==> Controller => partnersFilesUpload -> Invalid parameters -> id main`, null, res);
      //     }
      //   } else {
      //     return utils.resError(404,`API ==> Controller => partnersFilesUpload -> employeesMembersGetId -> Not found`, null, res);
      //   }
      // } else {
      //   resEmployeesMembersGetId = { id: 0 }
      // }

      // Save DATA
      const resPartnersFilesPost = await PARTNERS_FILES.create(objData.data);
      objData.id = resPartnersFilesPost.dataValues.id;

      LogsController.logsCreate(useId, perId, logMsg, `=> [${useId}] # Fornecedor (Arquivos): Upload ## [${objData.id}] ${objData.data.filTitle}`, objData.id);
      return utils.resSuccess('API ==> Controller => partnersFilesUpload -> Success', { filId: objData.id }, res);  

    } catch (error) {
      return utils.resError(500,`API ==> Controller => partnersFilesUpload -> Error`, error, res);
    }

    // function validateParameters(useId, parId, memId, filTitle, file) {
    function validateParameters(useId, parId, filTitle, file) {
      try {
        let isValid = true;

        utils.devLog(2, 'FILE =>', null);
        utils.devLog(2, null, file);

        // parId
        parId = Number(parId);
        if (
          parId === undefined ||
          parId === "" ||
          parId === null ||
          isNaN(parId) ||
          typeof(parId) !== "number"||
          !utils.validateNumberPositive(parId)
        ) {
          isValid = false;
        } else {
          objData.idMain = Number(parId);
          objData.data.parId = Number(parId);
        }
        utils.devLog(2, 'parId -> '+isValid, null);

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

  partnersFilesDownload = async ({ body, params, query, file }, res) => {

    const objData = { idMain: undefined, id: undefined, data: {} };

    try {
      const perId = "D003";
      const logMsg = "API ==> Controller => partnersFilesDownload -> Start";

      const { useId } = body;
      const { parId, filId } = params;
      // const { parId, memId, filId } = params;

      utils.devLog(2, "==================================", null);
      utils.devLog(2, `useId => ${useId}`, null);
      utils.devLog(2, `parId => ${parId}`, null);
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

      // if (!validateParameters(parId, memId, filId)) {
      if (!validateParameters(parId, filId)) {
        return utils.resError(400,`API ==> Controller => partnersFilesDownload -> Invalid parameters`, null, res);
      }

      utils.devLog(2, "API ==> Controller => partnersFilesDownload : objData", null);
      utils.devLog(2, null, objData);

      // Check Partners
      const resPartnersGetId = await PARTNERS.findByPk(objData.idMain, {});
      if (resPartnersGetId) {
        // Verifica se usuário possui permissão geral sobre as empresas
        // if (objResAuth.resData.useKeyCompany !== 0) {
        //   // Verifica se o registro que deseja alterar pertente a empresa que possui permissão
        //   if (resPartnersGetId.comId !== objResAuth.resData.useKeyCompany) {
        //     return utils.resError(403, "API ==> Controller => usersPermission -> Forbidden byId", null, res );
        //   }
        // }
      } else {
        return utils.resError(404,`API ==> Controller => partnersFilesDownload -> partnersGetId -> Not found`, null, res);
      }

      // // Check Members
      // let resEmployeesMembersGetId;
      // if (objData.id != 0) {
      //   resEmployeesMembersGetId = await EMPLOYEES_MEMBERS.findByPk(objData.id, {});
      //   if (resEmployeesMembersGetId) {
      //     // Verifica membro corresponde ao colaborador enviado
      //     if (resEmployeesMembersGetId.parId === objData.idMain) {
      //     } else {
      //       return utils.resError(400,`API ==> Controller => partnersFilesDownload -> Invalid parameters -> id main`, null, res);
      //     }
      //   } else {
      //     return utils.resError(404,`API ==> Controller => partnersFilesDownload -> employeesMembersGetId -> Not found`, null, res);
      //   }
      // } else {
      //   resEmployeesMembersGetId = {id:0}
      // }

      // Check File
      const resPartnersFilesGetId = await PARTNERS_FILES.findByPk(objData.data.filId,{});
      if (resPartnersFilesGetId) {
        if (resPartnersFilesGetId.parId === resPartnersGetId.id) {
        // if (resPartnersFilesGetId.parId === resPartnersGetId.id && (resPartnersFilesGetId.memId === resEmployeesMembersGetId.id)) {
          if (resPartnersFilesGetId.filStatus) {
          } else {
            return utils.resError(403,`API ==> Controller => usersPermission -> Forbidden byStatus`, null, res);
          }
        } else {
          return utils.resError(400,`API ==> Controller => partnersFilesDownload -> resPartnersFilesGetId -> Invalid parameters -> id main`, null, res);
        }
      } else {
        return utils.resError(404,`API ==> Controller => partnersFilesDownload -> resPartnersFilesGetId -> Not found`, null, res);
      }

      // GET Key the FILE
      const filePATH    = path.resolve(__dirname,'..','..', 'files', 'uploads');
      const fileKEY     = resPartnersFilesGetId.filKey;
      const fileTITLE   = resPartnersFilesGetId.filTitle;

      res.download(`${filePATH}/${fileKEY}`, `${fileTITLE}${path.extname(resPartnersFilesGetId.filKey)}`, (err) => {
        if (err) {
          utils.devLog(2, null, err);
          return utils.resError(500, 'API ==> Controller => partnersFilesDownload -> Download -> Error', utils.devDebugError(err), res);   
        } else {
          LogsController.logsCreate(useId, perId, logMsg, `=> [${useId}] # Fornecedor (Arquivos): Download ## [${objData.idMain}] ${resPartnersFilesGetId.filTitle}`, objData.id);
          return utils.resSuccess('API ==> Controller => partnersFilesDownload -> Success', { status: true });    
        }
      });

    } catch (error) {
      return utils.resError(500,`API ==> Controller => partnersFilesDownload -> Error`, error, res);
    }

    // function validateParameters(parId, memId, filId) {
    function validateParameters(parId, filId) {
      try {
        let isValid = true;

        // parId
        parId = Number(parId);
        if (
          parId === undefined ||
          parId === "" ||
          parId === null ||
          isNaN(parId) ||
          typeof(parId) !== "number"||
          !utils.validateNumberPositive(parId)
        ) {
          isValid = false;
        } else {
          objData.idMain = Number(parId);
          // objData.data.parId = Number(parId);
        }
        utils.devLog(2, 'parId -> '+isValid, null);

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
