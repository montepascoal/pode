/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// CONTROLLER USER /////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//  --------------------------------------------------------------------------------------------------------------------------------------- Modules -----

const utils = require('../utils/utils.js');
const md5 = require('md5');

const { EMPLOYEES, LOGS, COMPANIES, CONFIG_COUNTRIES, CONFIG_STATES, CONFIG_CITIES, USERS, PARTNERS, CLIENTS } = require('../models');

const LogsController = require('./LogsController');

//  ------------------------------------------------------------------------------------------------------------------------------------- Class API -----
class UsersController {

  constructor(){
    // this.usersPermission = this.usersPermission.bind(this);
  }

  usersPost = async ({body,params}, res) => {
    const objData = { idMain: undefined, id: undefined, data: {} };

    try {
      const perId = "C001";
      const logMsg = "API ==> Controller => usersPost -> Start";
      const { useId } = body;

      utils.devLog(0, logMsg, null);
      const objResAuth = await this.usersPermission(useId,perId);
      if (!objResAuth.resData.permission) {
        utils.devLog(2, "API ==> Permission -> FALSE", null);
        return utils.resError(403, objResAuth.resMessage, { perId: objResAuth.resData.perId }, res );
      }
      utils.devLog(2, "API ==> Permission -> TRUE", null);

      // Function Controller Action
      // let { empId } = params;
      utils.devLog(2, null, body);
      if (!validateParameters(body)) {
        return utils.resError(400,`API ==> Controller => usersPost -> Invalid parameters`, null, res);
      }

      utils.devLog(2, "API ==> Controller => usersPost : objData", null);
      utils.devLog(2, null, objData);

      // Verifica se usu??rio possui permiss??o geral sobre as empresas
      if (objResAuth.resData.useKeyCompany !== 0) {
        // Verifica se o usu??rio pertente a empresa que possui permiss??o
        if (objData.data.comId !== objResAuth.resData.useKeyCompany) {
          return utils.resError(403, "API ==> Controller => usersPermission -> Forbidden byId", null, res );
        }
      }

      // Check Type Data
      utils.devLog(2, "API ==> Controller => usersPost -> Check Type Data -> Start", null);
      let resTypeGetId = null;
      switch (objData.data.useKeyType) {
        case 'Employees':
          resTypeGetId = await EMPLOYEES.findByPk(objData.data.useKeyId,{});
        break;
        // case 'Providers':
        //   resTypeGetId = await USERS.findByPk(objData.data.useKeyId,{});
        // break;
        case 'Partners':
          resTypeGetId = await PARTNERS.findByPk(objData.data.useKeyId,{});
        break;
        case 'Clients':
          resTypeGetId = await CLIENTS.findByPk(objData.data.useKeyId,{});
        break;
      }
      utils.devLog(2, null, resTypeGetId);
      if (!resTypeGetId) {
        return utils.resError(404,`API ==> Controller => resTypeGetId -> Not found`, null, res);
      }
      if (resTypeGetId.useId !== 1) {
        return utils.resError(409, "API ==> Controller => usersPost -> User already exists", null, res );
      }
      if (objData.data.useKeyType === 'Employees') {
        if (resTypeGetId.comId) {
          if (resTypeGetId.comId !== objData.data.comId) {
            return utils.resError(409, "API ==> Controller => usersPost -> Invalid parameter [comId]", null, res );
          }
        }
      }

      // Check Companies
      if (objData.data.useKeyType === 'Employees') {
        utils.devLog(2, "API ==> Controller => usersPost -> Check Companies -> Start", null);
        const resCompaniesGetId = await COMPANIES.findByPk(resTypeGetId.comId,{});
        utils.devLog(2, null, resCompaniesGetId);
        if (!resCompaniesGetId) {
          return utils.resError(404,`API ==> Controller => usersPost -> Check Companies -> Not Found`, null, res);
        } else {
          if (!resCompaniesGetId.comStatus) {
            return utils.resError(409, "API ==> Controller => usersPost -> Check Companies -> Company disabled", null, res );
          }
        }
      }

      // Check unique key => useNickname
      utils.devLog(2, "API ==> Controller => usersPost -> Check Unique Nickname -> Start", null);
      const resUsersGetId = await USERS.findAll({
        where: {
          useNickname: objData.data.useNickname
        }
      });
      utils.devLog(2, null, resUsersGetId);
      if (resUsersGetId.length > 0) {
        return utils.resError(409, "API ==> Controller => usersPost -> Unique-key conflict [useNickname]", null, res );
      }

      // Save DATA
      utils.devLog(2, "API ==> Controller => usersPost -> Save -> Start", null);
      const resUsersPost = await USERS.create(objData.data);
      objData.id = resUsersPost.dataValues.id;

      // Save Data Type
      utils.devLog(2, "API ==> Controller => usersPost -> Save Data Type -> Start", null);
      const resTypePatch = await resTypeGetId.update({
        useId: objData.id,
      });
      utils.devLog(2, null, resTypePatch);

      LogsController.logsCreate(useId, perId, logMsg, `=> [${useId}] # Usu??rio: Cadastrado ## [${objData.id}] ${objData.data.useNickname}`, objData.id);
      return utils.resSuccess('API ==> Controller => usersPost -> Success',{useId: objData.id }, res);    

    } catch (error) {
      return utils.resError(500,`API ==> Controller => usersPost -> Error`, error, res);
    }

    function validateParameters(obj) {
      try {
        let isValid = true;

        // useStatus
        objData.data.useStatus = true;
        utils.devLog(2, 'useStatus -> '+isValid, null);

        // comId
        obj.comId = Number(obj.comId);
        if (
          obj.comId === undefined ||
          obj.comId === "" ||
          obj.comId === null ||
          isNaN(obj.comId) ||
          typeof(obj.comId) !== "number"||
          !utils.validateNumberPositive(obj.comId)
        ) {
          isValid = false;
        } else {
          objData.data.comId = Number(obj.comId);
        }
        utils.devLog(2, 'comId -> '+isValid, null);

        // useKeyCompany
        obj.useKeyCompany = Number(obj.useKeyCompany);
        if (
          obj.useKeyCompany === undefined ||
          obj.useKeyCompany === "" ||
          obj.useKeyCompany === null ||
          isNaN(obj.useKeyCompany) ||
          typeof(obj.useKeyCompany) !== "number"||
          !utils.validateNumberPositiveZero(obj.useKeyCompany)
        ) {
          isValid = false;
        } else {
          utils.devLog(2, '[tmp] useKeyCompany -> ' + isValid, null);
          if (obj.useKeyCompany === 0 || obj.useKeyCompany === objData.data.comId) {
            objData.data.useKeyCompany = Number(obj.useKeyCompany);
          } else {
            isValid = false;
          }
        }
        utils.devLog(2, 'useKeyCompany -> '+isValid, null);

        // useKeyType
        if (
          obj.useKeyType === undefined ||
          obj.useKeyType === "" ||
          obj.useKeyType === null ||
          typeof(obj.useKeyType) !== "string"
        ) {
          isValid = false;
        } else {
          if (
            obj.useKeyType !== "Employees" &&
            obj.useKeyType !== "Providers" &&
            obj.useKeyType !== "Partners" &&
            obj.useKeyType !== "Clients"
          ) {
            isValid = false;
          } else {
            objData.data.useKeyType = obj.useKeyType;
          }
        }
        utils.devLog(2, 'useKeyType -> '+isValid, null);

        // useKeyId
        obj.useKeyId = Number(obj.useKeyId);
        if (
          obj.useKeyId === undefined ||
          obj.useKeyId === "" ||
          obj.useKeyId === null ||
          isNaN(obj.useKeyId) ||
          typeof(obj.useKeyId) !== "number"||
          !utils.validateNumberPositive(obj.useKeyId)
        ) {
          isValid = false;
        } else {
          objData.data.useKeyId = Number(obj.useKeyId);
        }
        utils.devLog(2, 'useKeyId -> '+isValid, null);

        // useNickname
        if (
          obj.useNickname === undefined ||
          obj.useNickname === "" ||
          obj.useNickname === null ||
          typeof(obj.useNickname) !== "string"
        ) {
          isValid = false;
        } else {
          objData.data.useNickname = obj.useNickname;
        }
        utils.devLog(2, 'useNickname -> '+isValid, null);

        // usePassword
        objData.data.usePassword = 'e10adc3949ba59abbe56e057f20f883e'; // 123456
        utils.devLog(2, 'usePassword -> '+isValid, null);

        // usePasswordReset
        objData.data.usePasswordReset = true;
        utils.devLog(2, 'usePasswordReset -> '+isValid, null);

        // PERMISSIONS
        objData.data.usePer0000 = true;
        objData.data.usePerA001 = false;
        objData.data.usePerA002 = false;
        objData.data.usePerA003 = false;
        objData.data.usePerA004 = false;
        objData.data.usePerA005 = false;
        objData.data.usePerA006 = false;
        objData.data.usePerB001 = false;
        objData.data.usePerB002 = false;
        objData.data.usePerB003 = false;
        objData.data.usePerB004 = false;
        objData.data.usePerB005 = false;
        objData.data.usePerB006 = false;
        objData.data.usePerC001 = false;
        objData.data.usePerC002 = false;
        objData.data.usePerC003 = false;
        objData.data.usePerC004 = false;
        objData.data.usePerC005 = false;
        objData.data.usePerC006 = false;
        objData.data.usePerC007 = false;
        objData.data.usePerD001 = false;
        objData.data.usePerD002 = false;
        objData.data.usePerD003 = false;
        objData.data.usePerD004 = false;
        objData.data.usePerD005 = false;
        objData.data.usePerD006 = false;
        objData.data.usePerE001 = false;
        objData.data.usePerE002 = false;
        objData.data.usePerE003 = false;
        objData.data.usePerE004 = false;
        objData.data.usePerE005 = false;
        objData.data.usePerE006 = false;
        objData.data.usePerE007 = objData.data.useKeyType === 'Partners' ? true : false;
        objData.data.usePerF001 = false;
        objData.data.usePerF002 = false;
        objData.data.usePerF003 = false;
        objData.data.usePerF004 = false;
        objData.data.usePerF005 = false;
        objData.data.usePerF006 = false;
        objData.data.usePerF007 = objData.data.useKeyType === 'Clients' ? true : false;
        objData.data.usePerF008 = false;
        objData.data.usePerZ001 = false;
        objData.data.usePerZ002 = false;
        objData.data.usePerZ003 = false;
        objData.data.usePerZ004 = false;
        objData.data.usePerZ005 = false;
        objData.data.usePerZ006 = false;
        objData.data.usePerZ007 = false;
        objData.data.usePerZ008 = false;
        utils.devLog(2, 'PERMISSIONS -> ' + isValid , null);

        // useCreated
        // objData.data.useCreated = new Date();

        // useUpdated
        // objData.data.useUpdated = new Date();

        // useDeleted
        // objData.data.useDeleted = null;

        utils.devLog(2, 'Finish -> '+isValid, null);

        return isValid;
      } catch (error) {
        return false;
      }
    }
  }

  usersGetAll = async ({body, params}, res) => {
    try {
      const perId = "C002";
      const logMsg = "API ==> Controller => usersGetAll -> Start";
      const { useId } = body;

      utils.devLog(0, logMsg, null);
      // utils.devLog(2, null, useId);
      const objResAuth = await this.usersPermission(useId,perId);
      if (!objResAuth.resData.permission) {
        utils.devLog(2, "API ==> Permission -> FALSE", null);
        return utils.resError(403, objResAuth.resMessage, {perId: objResAuth.resData.perId}, res );
      }
      utils.devLog(2, "API ==> Permission -> TRUE", null);
      
      // Check companies permissions
      const filter = {};
      if (objResAuth.resData.useKeyCompany !== 0) {
        filter.useKeyCompany = objResAuth.resData.useKeyCompany;
      }
      const resUsersGetAll = await USERS.findAll({
        where: filter,
        order: [
          ['id', 'ASC'],
        ],
        include: [
          { model: COMPANIES, as: "COMPANIES" },
        ],
        attributes: { exclude: ['usePassword'] }
      });

      LogsController.logsCreate(useId, perId, logMsg, `=> [${useId}] # Usu??rio: Listagem geral ## [geral]`, null);
      return utils.resSuccess('API ==> Controller => usersGetAll -> Success', resUsersGetAll, res );
    } catch (error) {
      return utils.resError(500,`API ==> Controller => usersGetAll -> Error`, error, res);
    }
  }

  usersGetId = async ({body,params}, res) => {
    const objData = { idMain: undefined, id: undefined, data: {} };

    try {
      const perId = "C003";
      const logMsg = "API ==> Controller => usersGetId -> Start";
      const { useId } = body;

      utils.devLog(0, logMsg, null);
      const objResAuth = await this.usersPermission(useId,perId);
      if (!objResAuth.resData.permission) {
        utils.devLog(2, "API ==> Permission -> FALSE", null);
        return utils.resError(403, objResAuth.resMessage, { perId: objResAuth.resData.perId }, res );
      }
      utils.devLog(2, "API ==> Permission -> TRUE", null);

      // Function Controller Action
      let { id } = params;
      if (!validateParameters(id)) {
        return utils.resError(400,`API ==> Controller => usersGetId -> Invalid parameters`, null, res);
      }

      const resUsersGetId = await USERS.findByPk(objData.id,{
        attributes: { exclude: ['usePassword'] }
      });

      if (resUsersGetId) {
        if (objResAuth.resData.useKeyCompany !== 0) {
          if (resUsersGetId.useKeyCompany !== objResAuth.resData.useKeyCompany) {
            return utils.resError(403, "API ==> Controller => usersPermission -> Forbidden byId", null, res );
          }
        }
        LogsController.logsCreate(useId, perId, logMsg, `=> [${useId}] # Usu??rio: Consultado ## [${objData.id}] ${resUsersGetId.useNickname}`, objData.id);
        return utils.resSuccess('API ==> Controller => usersGetId -> Success',resUsersGetId, res);    
      } else {
        return utils.resError(404,`API ==> Controller => usersGetId -> Not found`, null, res);
      }
    } catch (error) {
      return utils.resError(500,`API ==> Controller => usersGetId -> Error`, error, res);
    }

    function validateParameters(id) {
      try {
        let isValid = true;

        // id = useId search
        id = Number(id);
        if (
          id === undefined ||
          id === "" ||
          id === null ||
          isNaN(id) ||
          typeof(id) !== "number"||
          !utils.validateNumberPositive(id)
        ) {
          isValid = false;
        } else {
          objData.id = id;
        }
        utils.devLog(2, 'useId -> '+isValid, null);

        return isValid;
      } catch (error) {
        return false;
      }
    }
  }

  usersGetLogs = async ({body,params}, res) => {
    const objData = { idMain: undefined, id: undefined, data: {} };

    try {
      const perId = "C004";
      const logMsg = "API ==> Controller => usersGetLogs -> Start";
      const { useId } = body;

      utils.devLog(0, logMsg, null);
      const objResAuth = await this.usersPermission(useId,perId);
      if (!objResAuth.resData.permission) {
        utils.devLog(2, "API ==> Permission -> FALSE", null);
        return utils.resError(403, objResAuth.resMessage, { perId: objResAuth.resData.perId }, res );
      }
      utils.devLog(2, "API ==> Permission -> TRUE", null);

      // Function Controller Action
      let { id } = params;
      if (!validateParameters(id)) {
        return utils.resError(400,`API ==> Controller => usersGetLogs -> Invalid parameters`, null, res);
      }

      // GET User
      utils.devLog(2, 'API ==> Controller => usersGetLogs -> usersGetId -> Start', null);
      const resUsersGetId = await USERS.findByPk(objData.id,{
        attributes: { exclude: ['usePassword'] }
      });
      if (resUsersGetId) {
        if (objResAuth.resData.useKeyCompany !== 0) {
          if (resUsersGetId.useKeyCompany !== objResAuth.resData.useKeyCompany) {
            return utils.resError(403, "API ==> Controller => usersPermission -> Forbidden byId", null, res );
          }
        }
        utils.devLog(2, 'API ==> Controller => usersGetLogs -> usersGetId -> Success', resUsersGetId);
      } else {
        return utils.resError(404,`API ==> Controller => usersGetLogs -> usersGetId -> Not found`, null, res);
      }

      // GET LOGs
      utils.devLog(2, 'API ==> Controller => usersGetLogs -> usersGetLogs -> Start', null);
      const resUsersGetLogs = await LOGS.findAll({
        where: {
          useId: objData.id
        },
        order: [
          ['id', 'DESC'],
        ],
      });
      // utils.devLog(2, null, resUsersGetLogs);
      if (resUsersGetLogs.length > 0) {
        LogsController.logsCreate(useId, perId, logMsg, `=> [${useId}] # Usu??rio (Logs): Listagem geral ## [${objData.id}] ${resUsersGetId.useNickname}`, objData.id);
        return utils.resSuccess('API ==> Controller => usersGetLogs -> Success', resUsersGetLogs, res);    
      } else {
        LogsController.logsCreate(useId, perId, logMsg, `=> [${useId}] # Usu??rio (Logs): Listagem geral ## [${objData.id}] ${resUsersGetId.useNickname}`, objData.id);
        return utils.resSuccess('API ==> Controller => usersGetLogs -> Success', [], res);    
        // return utils.resError(404,`API ==> Controller => usersGetLogs -> Not found`, null, res);
      }
    } catch (error) {
      return utils.resError(500,`API ==> Controller => usersGetLogs -> Error`, error, res);
    }

    function validateParameters(id) {
      try {
        let isValid = true;

        // id = useId search
        id = Number(id);
        if (
          id === undefined ||
          id === "" ||
          id === null ||
          isNaN(id) ||
          typeof(id) !== "number"||
          !utils.validateNumberPositive(id)
        ) {
          isValid = false;
        } else {
          objData.id = id;
        }
        utils.devLog(2, 'useId -> '+isValid, null);

        return isValid;
      } catch (error) {
        return false;
      }
    }
  }

  usersPatchCompanies = async ({body,params}, res) => {
    const objData = { idMain: undefined, id: undefined, data: {} };

    try {
      const perId = "C005";
      const logMsg = "API ==> Controller => usersPatchCompanies -> Start";
      const { useId } = body;

      utils.devLog(0, logMsg, null);
      const objResAuth = await this.usersPermission(useId,perId);
      if (!objResAuth.resData.permission) {
        utils.devLog(2, "API ==> Permission -> FALSE", null);
        return utils.resError(403, objResAuth.resMessage, { perId: objResAuth.resData.perId }, res );
      }
      utils.devLog(2, "API ==> Permission -> TRUE", null);

      // Function Controller Action
      let { id } = params;
      utils.devLog(2, null, id);
      utils.devLog(2, null, body);
      if (!validateParameters(id, body)) {
        return utils.resError(400,`API ==> Controller => usersPatchCompanies -> Invalid parameters`, null, res);
      }

      utils.devLog(2, "API ==> Controller => usersPatchCompanies : objData", null);
      utils.devLog(2, null, objData);

      // Check User
      const resUsersGetId = await USERS.findByPk(objData.id,{});
      if (resUsersGetId) {
        // Verifica se usu??rio possui permiss??o geral sobre as empresas
        if (objResAuth.resData.useKeyCompany !== 0) {
          return utils.resError(403, "API ==> Controller => usersPermission -> Forbidden byId", null, res );
        }
        if (resUsersGetId.useKeyCompany === 0) {
          objData.data.useKeyCompany = resUsersGetId.comId;
        } else {
          objData.data.useKeyCompany = 0;
        }
      } else {
        return utils.resError(404,`API ==> Controller => usersPatchCompanies -> usersGetId -> Not found`, null, res);
      }

      // Update User
      const resUsersPatchCompanies = await resUsersGetId.update(objData.data);

      LogsController.logsCreate(useId, perId, logMsg, `=> [${useId}] # Usu??rio: Atualizado [Empresa] ## [${objData.id}] ${resUsersGetId.useNickname}`, objData.id);
      return utils.resSuccess('API ==> Controller => usersPatchCompanies -> Success',{useId: objData.id }, res);    

    } catch (error) {
      return utils.resError(500,`API ==> Controller => usersPatchCompanies -> Error`, error, res);
    }

    function validateParameters(id, obj) {
      try {
        let isValid = true;

        // id = useId parameter
        id = Number(id);
        if (
          id === undefined ||
          id === "" ||
          id === null ||
          isNaN(id) ||
          typeof(id) !== "number"||
          !utils.validateNumberPositive(id)
        ) {
          isValid = false;
        } else {
          // if (id === 1 || id === 2 || id === 3) { // users => noAuth / dev-master / dev-simple
          if (id === 1 || id === 2 || id === 3) {
            isValid = false;
          } else {
            objData.id = id;
          }
        }
        utils.devLog(2, 'useId -> '+isValid, null);

        // empCreated
        // objData.data.empCreated = new Date();

        // empUpdated
        // objData.data.empUpdated = new Date();

        // empDeleted
        // objData.data.empDeleted = null;

        // console.log(isValid);

        return isValid;
      } catch (error) {
        return false;
      }
    }
  }

  usersPatchPassword = async ({body,params}, res) => {
    const objData = { idMain: undefined, id: undefined, data: {} };

    try {
      const perId = "C005";
      const logMsg = "API ==> Controller => usersPatchPassword -> Start";
      const { useId } = body;

      utils.devLog(0, logMsg, null);
      const objResAuth = await this.usersPermission(useId,perId);
      if (!objResAuth.resData.permission) {
        utils.devLog(2, "API ==> Permission -> FALSE", null);
        return utils.resError(403, objResAuth.resMessage, { perId: objResAuth.resData.perId }, res );
      }
      utils.devLog(2, "API ==> Permission -> TRUE", null);

      // Function Controller Action
      let { id } = params;
      utils.devLog(2, null, id);
      utils.devLog(2, null, body);
      if (!validateParameters(id, body)) {
        return utils.resError(400,`API ==> Controller => usersPatchPassword -> Invalid parameters`, null, res);
      }
      
      utils.devLog(2, "API ==> Controller => usersPatchPassword : objData", null);
      utils.devLog(2, null, objData);

      // Check User
      const resUsersGetId = await USERS.findByPk(objData.id,{});
      if (resUsersGetId) {
        // Verifica se usu??rio possui permiss??o geral sobre as empresas
        if (objResAuth.resData.useKeyCompany !== 0) {
          if (resUsersGetId.useKeyCompany !== objResAuth.resData.useKeyCompany) {
            return utils.resError(403, "API ==> Controller => usersPermission -> Forbidden byId", null, res );
          }
        }
      } else {
        return utils.resError(404,`API ==> Controller => usersPatchPassword -> usersGetId -> Not found`, null, res);
      }

      // Convert MD5
      objData.data.usePassword = md5(objData.data.usePassword);

      // Update User
      const resUsersPatchPassword = await resUsersGetId.update(objData.data);

      LogsController.logsCreate(useId, perId, logMsg, `=> [${useId}] # Usu??rio: Atualizado [Password] ## [${objData.id}] ${resUsersGetId.useNickname}`, objData.id);
      return utils.resSuccess('API ==> Controller => usersPatchPassword -> Success',{useId: objData.id }, res);    

    } catch (error) {
      return utils.resError(500,`API ==> Controller => usersPatchPassword -> Error`, error, res);
    }

    function validateParameters(id, obj) {
      try {
        let isValid = true;

        // id = useId parameter
        id = Number(id);
        if (
          id === undefined ||
          id === "" ||
          id === null ||
          isNaN(id) ||
          typeof(id) !== "number"||
          !utils.validateNumberPositive(id)
        ) {
          isValid = false;
        } else {
          // if (id === 1 || id === 2 || id === 3) { // users => noAuth / dev-master / dev-simple
          if (id === 1 || id === 2 || id === 3) {
            isValid = false;
          } else {
            objData.id = id;
          }
        }
        utils.devLog(2, 'useId -> '+isValid, null);

        // usePassword
        if (
          obj.usePassword === undefined ||
          obj.usePassword === "" ||
          obj.usePassword === null ||
          typeof(obj.usePassword) !== "string"
        ) {
          isValid = false;
        } else {
          objData.data.usePassword = obj.usePassword;
        }
        utils.devLog(2, 'usePassword -> '+isValid, null);

        // empCreated
        // objData.data.empCreated = new Date();

        // empUpdated
        // objData.data.empUpdated = new Date();

        // empDeleted
        // objData.data.empDeleted = null;

        // console.log(isValid);

        return isValid;
      } catch (error) {
        return false;
      }
    }
  }

  usersPatchPasswordReset = async ({body,params}, res) => {
    const objData = { idMain: undefined, id: undefined, data: {} };

    try {
      const perId = "0000";
      const logMsg = "API ==> Controller => usersPatchPasswordReset -> Start";
      const { useId } = body;

      utils.devLog(0, logMsg, null);
      const objResAuth = await this.usersPermission(useId,perId);
      if (!objResAuth.resData.permission) {
        utils.devLog(2, "API ==> Permission -> FALSE", null);
        return utils.resError(403, objResAuth.resMessage, { perId: objResAuth.resData.perId }, res );
      }
      utils.devLog(2, "API ==> Permission -> TRUE", null);

      // Function Controller Action
      // let { id } = params;
      // utils.devLog(2, null, useId);
      utils.devLog(2, null, body);
      if (!validateParameters(useId, body)) {
        return utils.resError(400,`API ==> Controller => usersPatchPasswordReset -> Invalid parameters`, null, res);
      }
      
      utils.devLog(2, "API ==> Controller => usersPatchPasswordReset : objData", null);
      utils.devLog(2, null, objData);

      // Check User
      const resUsersGetId = await USERS.findByPk(objData.id,{});
      if (resUsersGetId) {
        // Verifica se usu??rio possui permiss??o geral sobre as empresas
        if (objResAuth.resData.useKeyCompany !== 0) {
          if (resUsersGetId.useKeyCompany !== objResAuth.resData.useKeyCompany) {
            return utils.resError(403, "API ==> Controller => usersPermission -> Forbidden byId", null, res );
          }
        }
        utils.devLog(2, 'usePasswordReset -> ' + resUsersGetId.usePasswordReset, null);
        if (!resUsersGetId.usePasswordReset) {
          return utils.resError(409, "API ==> Controller => usersPermission -> Atualiza????o n??o autorizada", null, res );
        }
      } else {
        return utils.resError(404,`API ==> Controller => usersPatchPasswordReset -> usersGetId -> Not found`, null, res);
      }

      // Convert MD5
      objData.data.usePassword = md5(objData.data.usePassword);

      // Update User
      utils.devLog(2, "API ==> Controller => usersPatchPasswordReset -> putUser", null);
      const resUsersPatchPasswordReset = await resUsersGetId.update(objData.data);

      LogsController.logsCreate(useId, perId, logMsg, `=> [${useId}] # Usu??rio: Atualizado [Password Reset] ## [${objData.id}] ${resUsersGetId.useNickname}`, objData.id);
      return utils.resSuccess('API ==> Controller => usersPatchPasswordReset -> Success',{useId: objData.id }, res);    

    } catch (error) {
      return utils.resError(500,`API ==> Controller => usersPatchPasswordReset -> Error`, error, res);
    }

    function validateParameters(id, obj) {
      try {
        let isValid = true;

        // id = useId parameter
        id = Number(id);
        if (
          id === undefined ||
          id === "" ||
          id === null ||
          isNaN(id) ||
          typeof(id) !== "number"||
          !utils.validateNumberPositive(id)
        ) {
          isValid = false;
        } else {
          // if (id === 1 || id === 2 || id === 3) { // users => noAuth / dev-master / dev-simple
          if (id === 1 || id === 2 || id === 3) {
            isValid = false;
          } else {
            objData.id = id;
          }
        }
        utils.devLog(2, 'useId -> '+isValid, null);

        // usePassword
        if (
          obj.usePassword === undefined ||
          obj.usePassword === "" ||
          obj.usePassword === null ||
          obj.usePassword === "123456" ||
          typeof(obj.usePassword) !== "string"
        ) {
          isValid = false;
        } else {
          objData.data.usePassword = obj.usePassword;
        }
        utils.devLog(2, 'usePassword -> '+isValid, null);

        // // usePasswordReset
        objData.data.usePasswordReset = false;
        utils.devLog(2, 'usePasswordReset -> '+isValid, null);

        // empCreated
        // objData.data.empCreated = new Date();

        // empUpdated
        // objData.data.empUpdated = new Date();

        // empDeleted
        // objData.data.empDeleted = null;

        // console.log(isValid);

        return isValid;
      } catch (error) {
        return false;
      }
    }
  }

  usersPatchPasswordGenerate = async ({body,params}, res) => {
    const objData = { idMain: undefined, id: undefined, data: {} };

    try {
      const perId = "C005";
      const logMsg = "API ==> Controller => usersPatchPasswordGenerate -> Start";
      const { useId } = body;

      utils.devLog(0, logMsg, null);
      const objResAuth = await this.usersPermission(useId,perId);
      if (!objResAuth.resData.permission) {
        utils.devLog(2, "API ==> Permission -> FALSE", null);
        return utils.resError(403, objResAuth.resMessage, { perId: objResAuth.resData.perId }, res );
      }
      utils.devLog(2, "API ==> Permission -> TRUE", null);

      // Function Controller Action
      let { id } = params;
      utils.devLog(2, null, id);
      utils.devLog(2, null, body);
      if (!validateParameters(id, body)) {
        return utils.resError(400,`API ==> Controller => usersPatchPasswordGenerate -> Invalid parameters`, null, res);
      }
      
      utils.devLog(2, "API ==> Controller => usersPatchPasswordGenerate : objData", null);
      utils.devLog(2, null, objData);

      // Check User
      const resUsersGetId = await USERS.findByPk(objData.id,{});
      if (resUsersGetId) {
        // Verifica se usu??rio possui permiss??o geral sobre as empresas
        if (objResAuth.resData.useKeyCompany !== 0) {
          if (resUsersGetId.useKeyCompany !== objResAuth.resData.useKeyCompany) {
            return utils.resError(403, "API ==> Controller => usersPermission -> Forbidden byId", null, res );
          }
        }
      } else {
        return utils.resError(404,`API ==> Controller => usersPatchPasswordGenerate -> usersGetId -> Not found`, null, res);
      }

      // Convert MD5
      objData.data.usePassword = md5(objData.data.usePassword);

      // Update User
      const resUsersPatchPasswordGenerate = await resUsersGetId.update(objData.data);

      LogsController.logsCreate(useId, perId, logMsg, `=> [${useId}] # Usu??rio: Atualizado [Password Generate] ## [${objData.id}] ${resUsersGetId.useNickname}`, objData.id);
      return utils.resSuccess('API ==> Controller => usersPatchPasswordGenerate -> Success',{useId: objData.id }, res);    

    } catch (error) {
      return utils.resError(500,`API ==> Controller => usersPatchPasswordGenerate -> Error`, error, res);
    }

    function validateParameters(id, obj) {
      try {
        let isValid = true;

        // id = useId parameter
        id = Number(id);
        if (
          id === undefined ||
          id === "" ||
          id === null ||
          isNaN(id) ||
          typeof(id) !== "number"||
          !utils.validateNumberPositive(id)
        ) {
          isValid = false;
        } else {
          // if (id === 1 || id === 2 || id === 3) { // users => noAuth / dev-master / dev-simple
          if (id === 1 || id === 2 || id === 3) {
            isValid = false;
          } else {
            objData.id = id;
          }
        }
        utils.devLog(2, 'useId -> '+isValid, null);

        // usePassword
        // if (
        //   obj.usePassword === undefined ||
        //   obj.usePassword === "" ||
        //   obj.usePassword === null ||
        //   typeof(obj.usePassword) !== "string"
        // ) {
        //   isValid = false;
        // } else {
          objData.data.usePassword = '123456';
        // }
        utils.devLog(2, 'usePassword -> '+isValid, null);

        // usePasswordReset
        objData.data.usePasswordReset = true;
        utils.devLog(2, 'usePasswordReset -> '+isValid, null);

        // empCreated
        // objData.data.empCreated = new Date();

        // empUpdated
        // objData.data.empUpdated = new Date();

        // empDeleted
        // objData.data.empDeleted = null;

        // console.log(isValid);

        return isValid;
      } catch (error) {
        return false;
      }
    }
  }

  usersPatchPermission = async ({body,params}, res) => {
    const objData = { idMain: undefined, id: undefined, data: {} };

    try {
      const perId = "C005";
      const logMsg = "API ==> Controller => usersPatchPermission -> Start";
      const { useId } = body;

      utils.devLog(0, logMsg, null);
      const objResAuth = await this.usersPermission(useId,perId);
      if (!objResAuth.resData.permission) {
        utils.devLog(2, "API ==> Permission -> FALSE", null);
        return utils.resError(403, objResAuth.resMessage, { perId: objResAuth.resData.perId }, res );
      }
      utils.devLog(2, "API ==> Permission -> TRUE", null);

      // Function Controller Action
      let { id } = params;
      utils.devLog(2, null, id);
      utils.devLog(2, null, body);
      if (!validateParameters(id, body)) {
        return utils.resError(400,`API ==> Controller => usersPatchPermission -> Invalid parameters`, null, res);
      }

      utils.devLog(2, "API ==> Controller => usersPatchPermission : objData", null);
      utils.devLog(2, null, objData);

      // Check User
      const resUsersGetId = await USERS.findByPk(objData.id,{});
      if (resUsersGetId) {
        // Verifica se usu??rio possui permiss??o geral sobre as empresas
        if (objResAuth.resData.useKeyCompany !== 0) {
          if (resUsersGetId.useKeyCompany !== objResAuth.resData.useKeyCompany) {
            return utils.resError(403, "API ==> Controller => usersPermission -> Forbidden byId", null, res );
          }
        }
      } else {
        return utils.resError(404,`API ==> Controller => usersPatchPermission -> usersGetId -> Not found`, null, res);
      }

      // Update User
      const resUsersPatchPermission = await resUsersGetId.update(objData.data);

      LogsController.logsCreate(useId, perId, logMsg, `=> [${useId}] # Usu??rio: Atualizado [Permission] [${body.usePermission}] ## [${objData.id}] ${resUsersGetId.useNickname}`, objData.id);
      return utils.resSuccess('API ==> Controller => usersPatchPermission -> Success',{useId: objData.id }, res);    

    } catch (error) {
      return utils.resError(500,`API ==> Controller => usersPatchPermission -> Error`, error, res);
    }

    function validateParameters(id, obj) {
      try {
        let isValid = true;

        // id = useId parameter
        id = Number(id);
        if (
          id === undefined ||
          id === "" ||
          id === null ||
          isNaN(id) ||
          typeof(id) !== "number"||
          !utils.validateNumberPositive(id)
        ) {
          isValid = false;
        } else {
          // if (id === 1 || id === 2 || id === 3) { // users => noAuth / dev-master / dev-simple
          if (id === 1 || id === 2 || id === 3) {
            isValid = false;
          } else {
            objData.id = id;
          }
        }
        utils.devLog(2, 'useId -> '+isValid, null);

        // usePermissionStatus
        let usePermissionStatus = false;
        if (
          obj.usePermissionStatus === undefined ||
          obj.usePermissionStatus === "" ||
          obj.usePermissionStatus === null ||
          typeof(obj.usePermissionStatus) !== "boolean" ||
          !utils.validateBoolean(obj.usePermissionStatus)
        ) {
          isValid = false;
        } else {
          usePermissionStatus = obj.usePermissionStatus;
        }
        utils.devLog(2, 'usePermissionStatus -> '+isValid, null);

        // usePermission
        if (
          obj.usePermission === undefined ||
          obj.usePermission === "" ||
          obj.usePermission === null ||
          typeof(obj.usePermission) !== "string"||
          obj.usePermission.length !== 4
        ) {
          isValid = false;
        } else {
          utils.devLog(2, '[tmp] usePermission -> ' + isValid, null);
          if (
            obj.usePermission === 'A001' ||
            obj.usePermission === 'A002' ||
            obj.usePermission === 'A003' ||
            obj.usePermission === 'A004' ||
            obj.usePermission === 'A005' ||
            obj.usePermission === 'B001' ||
            obj.usePermission === 'B002' ||
            obj.usePermission === 'B003' ||
            obj.usePermission === 'B004' ||
            obj.usePermission === 'B005' ||
            obj.usePermission === 'C001' ||
            obj.usePermission === 'C002' ||
            obj.usePermission === 'C003' ||
            obj.usePermission === 'C004' ||
            obj.usePermission === 'C005' ||
            obj.usePermission === 'C006' ||
            obj.usePermission === 'D001' ||
            obj.usePermission === 'D002' ||
            obj.usePermission === 'D003' ||
            obj.usePermission === 'D004' ||
            obj.usePermission === 'D005' ||
            obj.usePermission === 'E001' ||
            obj.usePermission === 'E002' ||
            obj.usePermission === 'E003' ||
            obj.usePermission === 'E004' ||
            obj.usePermission === 'E005' ||
            obj.usePermission === 'F001' ||
            obj.usePermission === 'F002' ||
            obj.usePermission === 'F003' ||
            obj.usePermission === 'F004' ||
            obj.usePermission === 'F005' ||
            obj.usePermission === 'F008' ||
            obj.usePermission === 'Z001' ||
            obj.usePermission === 'Z002' ||
            obj.usePermission === 'Z003' ||
            obj.usePermission === 'Z004' ||
            obj.usePermission === 'Z005' ||
            obj.usePermission === 'Z006' ||
            obj.usePermission === 'Z007' ||
            obj.usePermission === 'Z008'
          ) {
            objData.data[`usePer${obj.usePermission}`] = usePermissionStatus;
          } else {
            isValid = false;
          }
        }
        utils.devLog(2, 'usePermission -> '+isValid, null);

        // empCreated
        // objData.data.empCreated = new Date();

        // empUpdated
        // objData.data.empUpdated = new Date();

        // empDeleted
        // objData.data.empDeleted = null;

        // console.log(isValid);

        return isValid;
      } catch (error) {
        return false;
      }
    }
  }

  usersPatchNickname = async ({body,params}, res) => {
    const objData = { idMain: undefined, id: undefined, data: {} };

    try {
      const perId = "C005";
      const logMsg = "API ==> Controller => usersPatchNickname -> Start";
      const { useId } = body;

      utils.devLog(0, logMsg, null);
      const objResAuth = await this.usersPermission(useId,perId);
      if (!objResAuth.resData.permission) {
        utils.devLog(2, "API ==> Permission -> FALSE", null);
        return utils.resError(403, objResAuth.resMessage, { perId: objResAuth.resData.perId }, res );
      }
      utils.devLog(2, "API ==> Permission -> TRUE", null);

      // Function Controller Action
      let { id } = params;
      utils.devLog(2, null, id);
      utils.devLog(2, null, body);
      if (!validateParameters(id, body)) {
        return utils.resError(400,`API ==> Controller => usersPatchNickname -> Invalid parameters`, null, res);
      }

      utils.devLog(2, "API ==> Controller => usersPatchNickname : objData", null);
      utils.devLog(2, null, objData);

      // Check User
      const resUsersGetId = await USERS.findByPk(objData.id,{});
      if (resUsersGetId) {
        // Verifica se usu??rio possui permiss??o geral sobre as empresas
        if (objResAuth.resData.useKeyCompany !== 0) {
          if (resUsersGetId.useKeyCompany !== objResAuth.resData.useKeyCompany) {
            return utils.resError(403, "API ==> Controller => usersPermission -> Forbidden byId", null, res );
          }
        }
      } else {
        return utils.resError(404,`API ==> Controller => usersPatchNickname -> usersGetId -> Not found`, null, res);
      }

      // Check change nickname
      if (resUsersGetId.useNickname !== objData.data.useNickname) {
        // Check unique key => useNickname
        const resUsersGetAllbyUnique = await USERS.findAll({
          where: {
            useNickname: objData.data.useNickname
          }
        });
        utils.devLog(2, null, resUsersGetAllbyUnique);
        if (resUsersGetAllbyUnique.length > 0) {
          return utils.resError(409, "API ==> Controller => usersPut -> Unique-key conflict", null, res );
        }
      }

      // Update User
      const resUsersPatchNickname = await resUsersGetId.update(objData.data);

      LogsController.logsCreate(useId, perId, logMsg, `=> [${useId}] # Usu??rio: Atualizado [Nickname] [${resUsersGetId.useNickname}] ## [${objData.id}] ${objData.data.useNickname}`, objData.id);
      return utils.resSuccess('API ==> Controller => usersPatchNickname -> Success',{useId: objData.id }, res);    

    } catch (error) {
      return utils.resError(500,`API ==> Controller => usersPatchNickname -> Error`, error, res);
    }

    function validateParameters(id, obj) {
      try {
        let isValid = true;

        // id = useId parameter
        id = Number(id);
        if (
          id === undefined ||
          id === "" ||
          id === null ||
          isNaN(id) ||
          typeof(id) !== "number"||
          !utils.validateNumberPositive(id)
        ) {
          isValid = false;
        } else {
          // if (id === 1 || id === 2 || id === 3) { // users => noAuth / dev-master / dev-simple
          if (id === 1 || id === 2 || id === 3) {
            isValid = false;
          } else {
            objData.id = id;
          }
        }
        utils.devLog(2, 'useId -> '+isValid, null);

        // useNickname
        if (
          obj.useNickname === undefined ||
          obj.useNickname === "" ||
          obj.useNickname === null ||
          typeof(obj.useNickname) !== "string" ||
          !utils.validateAlphaNumeric(obj.useNickname)
        ) {
          isValid = false;
        } else {
          objData.data.useNickname = obj.useNickname.toLowerCase();
        }
        utils.devLog(2, 'useNickname -> '+isValid, null);

        // empCreated
        // objData.data.empCreated = new Date();

        // empUpdated
        // objData.data.empUpdated = new Date();

        // empDeleted
        // objData.data.empDeleted = null;

        // console.log(isValid);

        return isValid;
      } catch (error) {
        return false;
      }
    }
  }

  usersPatchStatus = async ({body,params}, res) => {
    const objData = { idMain: undefined, id: undefined, data: {} };

    try {
      const perId = "C006";
      const logMsg = "API ==> Controller => usersPatchStatus -> Start";
      const { useId } = body;

      utils.devLog(0, logMsg, null);
      const objResAuth = await this.usersPermission(useId,perId);
      if (!objResAuth.resData.permission) {
        utils.devLog(2, "API ==> Permission -> FALSE", null);
        return utils.resError(403, objResAuth.resMessage, { perId: objResAuth.resData.perId }, res );
      }
      utils.devLog(2, "API ==> Permission -> TRUE", null);

      // Function Controller Action
      let { id } = params;
      utils.devLog(2, null, id);
      utils.devLog(2, null, body);
      if (!validateParameters(id, body)) {
        return utils.resError(400,`API ==> Controller => usersPatchStatus -> Invalid parameters`, null, res);
      }
      
      utils.devLog(2, "API ==> Controller => usersPatchStatus : objData", null);
      utils.devLog(2, null, objData);

      // Check User
      const resUsersGetId = await USERS.findByPk(objData.id,{});
      if (resUsersGetId) {
        // Verifica se usu??rio possui permiss??o geral sobre as empresas
        if (objResAuth.resData.useKeyCompany !== 0) {
          if (resUsersGetId.useKeyCompany !== objResAuth.resData.useKeyCompany) {
            return utils.resError(403, "API ==> Controller => usersPermission -> Forbidden byId", null, res );
          }
        }
      } else {
        return utils.resError(404,`API ==> Controller => usersPatchStatus -> usersGetId -> Not found`, null, res);
      }

      // Update User
      const resUsersPatchStatus = await resUsersGetId.update(objData.data);

      LogsController.logsCreate(useId, perId, logMsg, `=> [${useId}] # Usu??rio: Atualizado [status] ## [${objData.id}] ${resUsersGetId.useNickname}`, objData.id);
      return utils.resSuccess('API ==> Controller => usersPatchStatus -> Success',{useId: objData.id, objUser: resUsersPatchStatus }, res);    

    } catch (error) {
      return utils.resError(500,`API ==> Controller => usersPatchStatus -> Error`, error, res);
    }

    function validateParameters(id, obj) {
      try {
        let isValid = true;

        // id = useId parameter
        id = Number(id);
        if (
          id === undefined ||
          id === "" ||
          id === null ||
          isNaN(id) ||
          typeof(id) !== "number"||
          !utils.validateNumberPositive(id)
        ) {
          isValid = false;
        } else {
          // if (id === 1 || id === 2 || id === 3) { // users => noAuth / dev-master / dev-simple
          if (id === 1 || id === 2 || id === 3) {
            isValid = false;
          } else {
            objData.id = id;
          }
        }
        utils.devLog(2, 'useId -> '+isValid, null);

        // useStatus
        if (
          obj.useStatus === undefined ||
          obj.useStatus === "" ||
          obj.useStatus === null ||
          typeof(obj.useStatus) !== "boolean" ||
          !utils.validateBoolean(obj.useStatus)
        ) {
          isValid = false;
        } else {
          objData.data.useStatus = obj.useStatus;
        }
        utils.devLog(2, 'useStatus -> ', isValid);

        // empCreated
        // objData.data.empCreated = new Date();

        // empUpdated
        // objData.data.empUpdated = new Date();

        // empDeleted
        // objData.data.empDeleted = null;

        // console.log(isValid);

        return isValid;
      } catch (error) {
        return false;
      }
    }
  }

  usersPutClients = async ({body,params}, res) => {
    const objData = { idMain: undefined, id: undefined, data: {} };

    try {
      const perId = "C005";
      const logMsg = "API ==> Controller => usersPutClients -> Start";
      const { useId } = body;

      utils.devLog(0, logMsg, null);
      const objResAuth = await this.usersPermission(useId,perId);
      if (!objResAuth.resData.permission) {
        utils.devLog(2, "API ==> Permission -> FALSE", null);
        return utils.resError(403, objResAuth.resMessage, { perId: objResAuth.resData.perId }, res );
      }
      utils.devLog(2, "API ==> Permission -> TRUE", null);

      // Function Controller Action
      let { id } = params;
      utils.devLog(2, 'id', id);
      utils.devLog(2, 'body', body);
      if (!validateParameters(id, body)) {
        return utils.resError(400,`API ==> Controller => usersPutClients -> Invalid parameters`, null, res);
      }

      utils.devLog(2, "API ==> Controller => usersPutClients : objData", objData);

      // Check User
      const resUsersGetId = await USERS.findByPk(objData.id,{});
      if (resUsersGetId) {
        // Verifica se usu??rio possui permiss??o geral sobre as empresas
        // if (objResAuth.resData.useKeyCompany !== 0) {
        //   if (resUsersGetId.useKeyCompany !== objResAuth.resData.useKeyCompany) {
        //     return utils.resError(403, "API ==> Controller => usersPermission -> Forbidden byId", null, res );
        //   }
        // }
      } else {
        return utils.resError(404,`API ==> Controller => usersPutClients -> usersGetId -> Not found`, null, res);
      }

      // Check change nickname and RG
      if (resUsersGetId.useNickname !== objData.data.useNickname) {
        // Check unique key => useNickname
        const resUsersGetAllbyUnique = await USERS.findAll({
          where: {
            useNickname: objData.data.useNickname
          }
        });
        utils.devLog(2, null, resUsersGetAllbyUnique);
        if (resUsersGetAllbyUnique.length > 0) {
          return utils.resError(409, "API ==> Controller => usersPut -> Unique-key conflict", null, res );
        }
      }

      // Update User
      const resUsersPutClients = await resUsersGetId.update(objData.data);

      LogsController.logsCreate(useId, perId, logMsg, `=> [${useId}] # Usu??rio: Atualizado [Nickname/Empresa] [${resUsersGetId.useNickname}] ## [${objData.id}] ${objData.data.useNickname}`, objData.id);
      return utils.resSuccess('API ==> Controller => usersPutClients -> Success',{useId: objData.id, objUser: resUsersPutClients }, res);    

    } catch (error) {
      return utils.resError(500,`API ==> Controller => usersPutClients -> Error`, error, res);
    }

    function validateParameters(id, obj) {
      try {
        let isValid = true;

        // id = useId parameter
        id = Number(id);
        if (
          id === undefined ||
          id === "" ||
          id === null ||
          isNaN(id) ||
          typeof(id) !== "number"||
          !utils.validateNumberPositive(id)
        ) {
          isValid = false;
        } else {
          // if (id === 1 || id === 2 || id === 3) { // users => noAuth / dev-master / dev-simple
          if (id === 1 || id === 2 || id === 3) {
            isValid = false;
          } else {
            objData.id = id;
          }
        }
        utils.devLog(2, 'useId -> '+isValid, null);

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

        // useNickname
        if (
          obj.useNickname === undefined ||
          obj.useNickname === "" ||
          obj.useNickname === null ||
          typeof(obj.useNickname) !== "string" ||
          !utils.validateAlphaNumeric(obj.useNickname)
        ) {
          isValid = false;
        } else {
          objData.data.useNickname = obj.useNickname.toLowerCase();
        }
        utils.devLog(2, 'useNickname -> '+isValid, null);
        
        // empCreated
        // objData.data.empCreated = new Date();

        // empUpdated
        // objData.data.empUpdated = new Date();

        // empDeleted
        // objData.data.empDeleted = null;

        // console.log(isValid);

        return isValid;
      } catch (error) {
        return false;
      }
    }
  }

  // /api/auth
  usersValidate = async ({body,params}, res) => {
    const objData = { idMain: undefined, id: undefined, data: {} };

    try {
      const perId = "0000";
      const logMsg = "API ==> Controller => usersValidate -> Start";
      const { useId } = body;

      utils.devLog(0, logMsg, null);
      const objResAuth = await this.usersPermission(useId,perId);
      if (!objResAuth.resData.permission) {
        utils.devLog(2, "API ==> Permission -> FALSE", null);
        return utils.resError(403, objResAuth.resMessage, { perId: objResAuth.resData.perId }, res );
      }
      utils.devLog(2, "API ==> Permission -> TRUE", null);

      // Function Controller Action
      // utils.devLog(2, null, useId);
      if (!validateParameters(useId)) {
        return utils.resError(400,`API ==> Controller => usersValidate -> Invalid parameters`, null, res);
      }

      const resUsersGetId = await USERS.findByPk(objData.id,{
        attributes: { exclude: ['usePassword'] }
      });

      if (resUsersGetId) {
        // if (objResAuth.resData.useKeyCompany !== 0) {
        //   // if (resUsersGetId.id !== objResAuth.resData.useKeyCompany) {
        //   // return utils.resError(403, "API ==> Controller => usersPermission -> Forbidden byId", null, res );
        //   // }
        // }
        if (!resUsersGetId.useStatus) {
          return utils.resError(401,`API ==> Controller => sessionsLogin -> Users Disabled`, null, res);
        }

        if (resUsersGetId.usePasswordReset) {
          return utils.resError(409,`API ==> Controller => sessionsLogin -> Password reset required`, { errMessage: 'Password reset required' }, res);
        }

        LogsController.logsCreate(useId, perId, logMsg, `=> [${useId}] # Usu??rio: Valida????o ## [${objData.id}] ${resUsersGetId.useNickname}`, objData.id);
        return utils.resSuccess('API ==> Controller => usersValidate -> Success',resUsersGetId, res);    
      } else {
        return utils.resError(404,`API ==> Controller => usersValidate -> Not found`, null, res);
      }
    } catch (error) {
      return utils.resError(500,`API ==> Controller => usersValidate -> Error`, error, res);
    }

    function validateParameters(useId) {
      try {
        let isValid = true;

        // useId
        useId = Number(useId);
        if (
          useId === undefined ||
          useId === "" ||
          useId === null ||
          isNaN(useId) ||
          typeof(useId) !== "number"
        ) {
          isValid = false;
        } else {
          objData.id = useId;
        }

        return isValid;
      } catch (error) {
        return false;
      }
    }
  }

  // /users/permission/:usePerId
  usersValidatePermission = async ({body,params}, res) => {
    const objData = { idMain: undefined, id: undefined, data: {} };

    try {
      const perId = "0000";
      const logMsg = "API ==> Controller => usersValidatePermission -> Start";
      const { useId } = body;

      utils.devLog(0, logMsg, null);
      const objResAuth = await this.usersPermission(useId,perId);
      if (!objResAuth.resData.permission) {
        utils.devLog(2, "API ==> Permission -> FALSE", null);
        return utils.resError(403, objResAuth.resMessage, { perId: objResAuth.resData.perId }, res );
      }
      utils.devLog(2, "API ==> Permission -> TRUE", null);

      // Function Controller Action
      // utils.devLog(2, null, useId);
      let { usePerId } = params;
      if (!validateParameters(useId, usePerId)) {
        return utils.resError(400,`API ==> Controller => usersValidatePermission -> Invalid parameters`, null, res);
      }

      const resUsersGetId = await USERS.findByPk(objData.id,{
        attributes: { exclude: ['usePassword'] }
      });

      if (resUsersGetId) {
        if (objResAuth.resData.useKeyCompany !== 0) {
          // if (resUsersGetId.id !== objResAuth.resData.useKeyCompany) {
          // return utils.resError(403, "API ==> Controller => usersPermission -> Forbidden byId", null, res );
          // }
        }
        LogsController.logsCreate(useId, perId, logMsg, `=> [${useId}] # Usu??rio: Valida????o [Permission] [${objData.data.usePerId}] ## [${objData.id}] ${resUsersGetId.useNickname}`, objData.id);
        return utils.resSuccess('API ==> Controller => usersValidatePermission -> Success',{isPermission: resUsersGetId[`usePer${objData.data.usePerId}`] || false}, res);    
      } else {
        return utils.resError(404,`API ==> Controller => usersValidatePermission -> Not found`, null, res);
      }
    } catch (error) {
      return utils.resError(500,`API ==> Controller => usersValidatePermission -> Error`, error, res);
    }

    function validateParameters(useId, usePerId) {
      try {
        let isValid = true;

        // useId
        useId = Number(useId);
        if (
          useId === undefined ||
          useId === "" ||
          useId === null ||
          isNaN(useId) ||
          typeof(useId) !== "number"
        ) {
          isValid = false;
        } else {
          objData.id = useId;
        }
        utils.devLog(2, 'useId -> '+isValid, null);

        // usePerId
        if (
          usePerId === undefined ||
          usePerId === "" ||
          usePerId === null ||
          typeof(usePerId) !== "string" ||
          usePerId.length !== 4
        ) {
          isValid = false;
        } else {
          objData.data.usePerId = usePerId;
        }
        utils.devLog(2, 'usePerId -> '+isValid, null);

        return isValid;
      } catch (error) {
        return false;
      }
    }
  }

//  ------------------------------------------------------------------------------------------------------------------------------------- Class API -----
//  USE internal system
//  ------------------------------------------------------------------------------------------------------------------------------------- Class API -----

  usersPermission = async( useId, perId ) =>{
    try {
        utils.devLog(2, 'API ==> Controller => usersPermission -> Start', null);

        const resUsersGetId = await USERS.findByPk(useId,{});

        if (resUsersGetId) {
          // console.log(resUsersGetId);
          // utils.devLog(2, null, useId);
          utils.devLog(2, null, perId);
          utils.devLog(2, 'useStatus: ' + resUsersGetId[`useStatus`], null);
          utils.devLog(2, 'usePerStatus: ' + resUsersGetId[`usePer${perId}`], null);
          utils.devLog(2, 'useKeyCompany: ' + resUsersGetId.useKeyCompany, null); 
          // 0 - Acesso a todas | 1 - Acesso a company id=1 | etc

          if (!resUsersGetId[`useStatus`]) {
            return utils.resSuccess("API ==> Controller => usersPermission -> User disabled", {
              permission: false,
              perId,
            });
          }
          // if (!resUsersGetId[`useKeyType`] === 'Employees') {
          //   return utils.resSuccess("API ==> Controller => usersPermission -> Non-system user", {
          //     permission: false,
          //     perId,
          //   });
          // }
          if (resUsersGetId[`usePer${perId}`]) {
            return utils.resSuccess("API ==> Controller => usersPermission -> Success", {
              permission: true,
              useKeyCompany: resUsersGetId[`useKeyCompany`]
            });
          } else {
            return utils.resSuccess("API ==> Controller => usersPermission -> Forbidden", {
              permission: false,
              perId,
            });
          }
        } else {
          return utils.resSuccess("API ==> Controller => usersPermission -> 404 User not found", {
            permission: false,
            perId,
          });
        }
    
    } catch (error) {
      return utils.resSuccess("API ==> Controller => usersPermission -> Error -> 500 Error server", {
        permission: false
      });
    }
  }

}

module.exports = new UsersController(); 