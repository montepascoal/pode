/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// CONTROLLER USER /////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//  --------------------------------------------------------------------------------------------------------------------------------------- Modules -----

const path = require('path');
const utils = require("../utils/utils.js");
const { Op } = require("sequelize");

const {
  EMPLOYEES,
  EMPLOYEES_MEMBERS,
  EMPLOYEES_FILES,
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
  
  employeesFilesGetAll = async ({body,params}, res) => {
    const objData = { idMain: undefined, id: undefined, data: {} };

    try {
      const perId = "B003";
      const logMsg = "API ==> Controller => employeesFilesGetAll -> Start";
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
        return utils.resError(400,`API ==> Controller => employeesFilesGetId -> Invalid parameters`, null, res);
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
        return utils.resError(404,`API ==> Controller => employeesFilesGetAll -> employeesGetId -> Not found`, null, res);
      }

      // Check filters
      const filters = [];
        filters.push({empId: objData.idMain});
        // filters.push({filStatus: false});
      const objFilter = {
        [Op.and]: filters
      };
      const resEmployeesFilesGetAll = await EMPLOYEES_FILES.findAll({
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

      LogsController.logsCreate(useId, perId, logMsg, `=> [${useId}] # Colaborador (Arquivos): Listagem geral ## [geral]`, null);
      return utils.resSuccess('API ==> Controller => employeesFilesGetAll -> Success', resEmployeesFilesGetAll, res );
    } catch (error) {
      return utils.resError(500,`API ==> Controller => employeesFilesGetAll -> Error`, error, res);
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
  
  employeesFilesPatch = async ({body,params}, res) => {
    const objData = { idMain: undefined, id: undefined, data: {} };

    try {
      const perId = "B005";
      const logMsg = "API ==> Controller => employeesFilesPatch -> Start";
      const { useId } = body;

      utils.devLog(0, logMsg, null);
      const objResAuth = await UsersController.usersPermission(useId,perId);
      if (!objResAuth.resData.permission) {
        utils.devLog(2, "API ==> Permission -> FALSE", null);
        return utils.resError(403, objResAuth.resMessage, { perId: objResAuth.resData.perId }, res );
      }
      utils.devLog(2, "API ==> Permission -> TRUE", null);

      // Function Controller Action
      let { empId, filId } = params;
      utils.devLog(2, null, empId);
      utils.devLog(2, null, filId);
      utils.devLog(2, null, body);
      if (!validateParameters(empId, filId, body)) {
        return utils.resError(400,`API ==> Controller => employeesFilesPatch -> Invalid parameters`, null, res);
      }

      utils.devLog(2, "API ==> Controller => employeesFilesPatch : objData", null);
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
        return utils.resError(404,`API ==> Controller => employeesFilesPatch -> employeesGetId -> Not found`, null, res);
      }

      // Check Files
      const resEmployeesFilesGetId = await EMPLOYEES_FILES.findByPk(objData.id, {});
      if (resEmployeesFilesGetId) {
        // Verifica membro corresponde ao colaborador enviado
        if (resEmployeesFilesGetId.empId === objData.idMain) {
        } else {
          return utils.resError(400,`API ==> Controller => employeesFilesPatch -> Invalid parameters -> id main`, null, res);
        }
      } else {
        return utils.resError(404,`API ==> Controller => employeesFilesPatch -> employeesFilesGetId -> Not found`, null, res);
      }

      // Update Employees
      const resEmployeesPatch = await resEmployeesFilesGetId.update(objData.data);

      LogsController.logsCreate(useId, perId, logMsg, `=> [${useId}] # Colaborador (Arquivos): Atualizado [habilitado/desabilitado] ## [${objData.id}] ${resEmployeesFilesGetId.filTitle}`, objData.id);
      return utils.resSuccess('API ==> Controller => employeesFilesPatch -> Success',{filId: objData.id }, res);    

    } catch (error) {
      return utils.resError(500,`API ==> Controller => employeesFilesPatch -> Error`, error, res);
    }

    function validateParameters(empId, filId, obj) {
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

        // memCreated
        // objData.data.memCreated = new Date();

        // memUpdated
        // objData.data.memUpdated = new Date();

        // memDeleted
        // objData.data.memDeleted = null;

        // console.log(isValid)

        return isValid;
      } catch (error) {
        return false;
      }
    }
  }

  employeesFilesDelete = async ({body,params}, res) => {
    const objData = { idMain: undefined, id: undefined, data: {} };

    try {
      const perId = "B006";
      const logMsg = "API ==> Controller => employeesFilesDelete -> Start";
      const { useId } = body;

      utils.devLog(0, logMsg, null);
      const objResAuth = await UsersController.usersPermission(useId,perId);
      if (!objResAuth.resData.permission) {
        utils.devLog(2, "API ==> Permission -> FALSE", null);
        return utils.resError(403, objResAuth.resMessage, { perId: objResAuth.resData.perId }, res );
      }
      utils.devLog(2, "API ==> Permission -> TRUE", null);

      // Function Controller Action
      let { empId, filId } = params;
      utils.devLog(2, null, empId);
      utils.devLog(2, null, filId);
      utils.devLog(2, null, body);
      if (!validateParameters(empId, filId, body)) {
        return utils.resError(400,`API ==> Controller => employeesFilesDelete -> Invalid parameters`, null, res);
      }

      utils.devLog(2, "API ==> Controller => employeesFilesDelete : objData", null);
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
        return utils.resError(404,`API ==> Controller => employeesFilesDelete -> employeesGetId -> Not found`, null, res);
      }

      // Check File
      const resEmployeesFilesGetId = await EMPLOYEES_FILES.findByPk(objData.id, {});
      if (resEmployeesFilesGetId) {
        // Verifica membro corresponde ao colaborador enviado
        if (resEmployeesFilesGetId.empId === objData.idMain) {
        } else {
          return utils.resError(400,`API ==> Controller => employeesFilesDelete -> Invalid parameters -> id main`, null, res);
        }
      } else {
        return utils.resError(404,`API ==> Controller => employeesFilesDelete -> employeesFilesGetId -> Not found`, null, res);
      }

      // Update Employees
      const resEmployeesFilesDelete = await resEmployeesFilesGetId.destroy();

      LogsController.logsCreate(useId, perId, logMsg, `=> [${useId}] # Colaborador (Arquivos): Deletado ## [${objData.id}] ${resEmployeesFilesGetId.filTitle}`, objData.id);
      return utils.resSuccess('API ==> Controller => employeesFilesDelete -> Success',{filId: objData.id }, res);    

    } catch (error) {
      return utils.resError(500,`API ==> Controller => employeesFilesDelete -> Error`, error, res);
    }

    function validateParameters(empId, filId, obj) {
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

  employeesFilesUpload = async ({ headers: { useId }, body, params, query, file }, res) => {

    const objData = { idMain: undefined, idSec: undefined, id: undefined, data: {} };

    try {
      const perId = "B004";
      const logMsg = "API ==> Controller => employeesFilesUpload -> Start";

      const { title } = body;
      const { empId, memId } = params;

      utils.devLog(2, "==================================", null);
      utils.devLog(2, `useId => ${useId}`, null);
      utils.devLog(2, `empId => ${empId}`, null);
      utils.devLog(2, `memId => ${memId}`, null);
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

      if (!validateParameters(useId, empId, memId, title, file)) {
        return utils.resError(400,`API ==> Controller => employeesFilesUpload -> Invalid parameters`, null, res);
      }

      utils.devLog(2, "API ==> Controller => employeesFilesUpload : objData", null);
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
        return utils.resError(404,`API ==> Controller => employeesFilesUpload -> employeesGetId -> Not found`, null, res);
      }

      // Check Members
      let resEmployeesMembersGetId;
      if (objData.idSec != 0) {
        resEmployeesMembersGetId = await EMPLOYEES_MEMBERS.findByPk(objData.idSec, {});
        if (resEmployeesMembersGetId) {
          // Verifica membro corresponde ao colaborador enviado
          if (resEmployeesMembersGetId.empId === objData.idMain) {
          } else {
            return utils.resError(400,`API ==> Controller => employeesFilesUpload -> Invalid parameters -> id main`, null, res);
          }
        } else {
          return utils.resError(404,`API ==> Controller => employeesFilesUpload -> employeesMembersGetId -> Not found`, null, res);
        }
      } else {
        resEmployeesMembersGetId = { id: 0 }
      }

      // Save DATA
      const resEmployeesFilesPost = await EMPLOYEES_FILES.create(objData.data);
      objData.id = resEmployeesFilesPost.dataValues.id;

      LogsController.logsCreate(useId, perId, logMsg, `=> [${useId}] # Colaborador (Arquivos): Upload ## [${objData.id}] ${objData.data.filTitle}`, objData.id);
      return utils.resSuccess('API ==> Controller => employeesFilesUpload -> Success', { filId: objData.id }, res);  

    } catch (error) {
      return utils.resError(500,`API ==> Controller => employeesFilesUpload -> Error`, error, res);
    }

    function validateParameters(useId, empId, memId, filTitle, file) {
      try {
        let isValid = true;

        utils.devLog(2, 'FILE =>', null);
        utils.devLog(2, null, file);

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
          !utils.validateNumberPositiveZero(memId)
        ) {
          isValid = false;
        } else {
          objData.idSec = Number(memId);
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

  employeesFilesDownload = async ({ body, params, query, file }, res) => {

    const objData = { idMain: undefined, id: undefined, data: {} };

    try {
      const perId = "B003";
      const logMsg = "API ==> Controller => employeesFilesDownload -> Start";

      const { useId } = body;
      const { empId, memId, filId } = params;

      utils.devLog(2, "==================================", null);
      utils.devLog(2, `useId => ${useId}`, null);
      utils.devLog(2, `empId => ${empId}`, null);
      utils.devLog(2, `memId => ${memId}`, null);
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

      if (!validateParameters(empId, memId, filId)) {
        return utils.resError(400,`API ==> Controller => employeesFilesDownload -> Invalid parameters`, null, res);
      }

      utils.devLog(2, "API ==> Controller => employeesFilesDownload : objData", null);
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
        return utils.resError(404,`API ==> Controller => employeesFilesDownload -> employeesGetId -> Not found`, null, res);
      }

      // Check Members
      let resEmployeesMembersGetId;
      if (objData.id != 0) {
        resEmployeesMembersGetId = await EMPLOYEES_MEMBERS.findByPk(objData.id, {});
        if (resEmployeesMembersGetId) {
          // Verifica membro corresponde ao colaborador enviado
          if (resEmployeesMembersGetId.empId === objData.idMain) {
          } else {
            return utils.resError(400,`API ==> Controller => employeesFilesDownload -> Invalid parameters -> id main`, null, res);
          }
        } else {
          return utils.resError(404,`API ==> Controller => employeesFilesDownload -> employeesMembersGetId -> Not found`, null, res);
        }
      } else {
        resEmployeesMembersGetId = {id:0}
      }

      // Check File
      const resEmployeesFilesGetId = await EMPLOYEES_FILES.findByPk(objData.data.filId,{});
      if (resEmployeesFilesGetId) {
        if (resEmployeesFilesGetId.empId === resEmployeesGetId.id && (resEmployeesFilesGetId.memId === resEmployeesMembersGetId.id)) {
          if (resEmployeesFilesGetId.filStatus) {
          } else {
            return utils.resError(403,`API ==> Controller => usersPermission -> Forbidden byStatus`, null, res);
          }
        } else {
          return utils.resError(400,`API ==> Controller => employeesFilesDownload -> resEmployeesFilesGetId -> Invalid parameters -> id main`, null, res);
        }
      } else {
        return utils.resError(404,`API ==> Controller => employeesFilesDownload -> resEmployeesFilesGetId -> Not found`, null, res);
      }

      // GET Key the FILE
      const filePATH    = path.resolve(__dirname,'..','..', 'files', 'uploads');
      const fileKEY     = resEmployeesFilesGetId.filKey;
      const fileTITLE   = resEmployeesFilesGetId.filTitle;

      res.download(`${filePATH}/${fileKEY}`, `${fileTITLE}${path.extname(resEmployeesFilesGetId.filKey)}`, (err) => {
        if (err) {
          utils.devLog(2, null, err);
          return utils.resError(500, 'API ==> Controller => employeesFilesDownload -> Download -> Error', utils.devDebugError(err), res);   
        } else {
          LogsController.logsCreate(useId, perId, logMsg, `=> [${useId}] # Colaborador (Arquivos): Download ## [${objData.id}] ${resEmployeesFilesGetId.filTitle}`, objData.id);
          return utils.resSuccess('API ==> Controller => employeesFilesDownload -> Success', { status: true });    
        }
      });

    } catch (error) {
      return utils.resError(500,`API ==> Controller => employeesFilesDownload -> Error`, error, res);
    }

    function validateParameters(empId, memId, filId) {
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
          // objData.data.empId = Number(empId);
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
          !utils.validateNumberPositiveZero(memId)
        ) {
          isValid = false;
        } else {
          objData.id = Number(memId);
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
