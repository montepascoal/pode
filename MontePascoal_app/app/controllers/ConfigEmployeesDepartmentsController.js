const utils = require('../utils/utils.js');

const { CONFIG_EMPLOYEES_DEPARTMENTS } = require('../models');

const LogsController = require('./LogsController');
const UsersController = require('./UsersController');

class ConfigEmployeesDepartmentsController {
  post = async ({ body, params }, res) => {
    const objData = {
      idMain: undefined,
      idSecondary: undefined,
      idTertiary: undefined,
      id: undefined,
      data: {},
    };

    try {
      const perId = 'Z001';

      utils.devLog(0, `API ==> Controller => departmentsPost -> Start`, null);

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

      utils.devLog(2, 'body', body);
      if (!validateParameters(body)) {
        return utils.resError(
          400,
          `API ==> Controller => departmentsPost -> Invalid parameters`,
          null,
          res
        );
      }

      utils.devLog(
        2,
        'API ==> Controller => departmentsPost : objData',
        objData
      );

      utils.devLog(
        2,
        'API ==> Controller => departmentsPost -> Update Departments',
        null
      );

      const resDepartmentsPost = await CONFIG_EMPLOYEES_DEPARTMENTS.create(
        objData.data
      );
      objData.idMain = resDepartmentsPost.dataValues.id;

      LogsController.logsCreate(
        useId,
        perId,
        `API ==> Controller => departmentsPost -> Success`,
        `=> [${useId}] # Config: Colaboradores: Departamentos: Cadastrado ## [${objData.idMain}] ${objData.data.depName}`,
        objData.idMain
      );
      return utils.resSuccess(
        'API ==> Controller => departmentsPost -> Success',
        { depId: objData.idMain },
        res
      );
    } catch (error) {
      return utils.resError(
        500,
        `API ==> Controller => departmentsPost -> Error`,
        error,
        res
      );
    }

    function validateParameters(obj) {
      try {
        let isValid = true;

        if (
          obj.depName === undefined ||
          obj.depName === '' ||
          obj.depName === null ||
          typeof obj.depName !== 'string'
        ) {
          isValid = false;
        } else {
          objData.data.depName = obj.depName;
        }
        utils.devLog(2, 'depName -> ' + isValid, null);

        if (
          obj.depDescription === undefined ||
          obj.depDescription === '' ||
          obj.depDescription === null ||
          typeof obj.depDescription !== 'string'
        ) {
          isValid = false;
        } else {
          objData.data.depDescription = obj.depDescription;
        }
        utils.devLog(2, 'depDescription -> ' + isValid, null);

        objData.data.depStatus = true;
        utils.devLog(2, 'depStatus -> ' + isValid, null);

        return isValid;
      } catch (error) {
        return false;
      }
    }
  };

  getAll = async ({ body, params }, res) => {
    try {
      const perId = 'Z001';

      utils.devLog(0, `API ==> Controller => departmentsGetAll -> Start`, null);

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

      const resDepartmentsGetAll = await CONFIG_EMPLOYEES_DEPARTMENTS.findAll({
        order: [['id', 'ASC']],
      });

      LogsController.logsCreate(
        useId,
        perId,
        'API ==> Controller => departmentsGetAll -> Success',
        `=> [${useId}] # Config: Colaboradores: Departamentos: Listagem geral ## [geral]`,
        null
      );
      return utils.resSuccess(
        'API ==> Controller => departmentsGetAll -> Success',
        resDepartmentsGetAll,
        res
      );
    } catch (error) {
      return utils.resError(
        500,
        `API ==> Controller => departmentsGetAll -> Error`,
        error,
        res
      );
    }
  };

  get = async ({ body, params }, res) => {
    const objData = {
      idMain: undefined,
      idSecondary: undefined,
      idTertiary: undefined,
      id: undefined,
      data: {},
    };

    try {
      const perId = 'Z001';

      utils.devLog(0, 'API ==> Controller => departmentsGetId -> Start', null);

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

      let { depId } = params;

      utils.devLog(2, 'depId', depId);
      if (!validateParameters(depId)) {
        return utils.resError(
          400,
          `API ==> Controller => departmentsGetId -> Invalid parameters`,
          null,
          res
        );
      }

      const resDepartmentsGetId = await CONFIG_EMPLOYEES_DEPARTMENTS.findByPk(
        objData.idMain
      );

      if (resDepartmentsGetId) {
        LogsController.logsCreate(
          useId,
          perId,
          'API ==> Controller => departmentsGetId -> Success',
          `=> [${useId}] # Config: Colaboradores: Departamentos: Consultado ## [${objData.idMain}] ${resDepartmentsGetId.depName}`,
          objData.idMain
        );
        return utils.resSuccess(
          'API ==> Controller => departmentsGetId -> Success',
          resDepartmentsGetId,
          res
        );
      } else {
        return utils.resError(
          404,
          `API ==> Controller => departmentsGetId -> Error`,
          null,
          res
        );
      }
    } catch (error) {
      return utils.resError(
        500,
        `API ==> Controller => departmentsGetId -> Error`,
        error,
        res
      );
    }

    function validateParameters(depId) {
      try {
        let isValid = true;

        depId = Number(depId);
        if (
          depId === undefined ||
          depId === '' ||
          depId === null ||
          isNaN(depId) ||
          typeof depId !== 'number' ||
          !utils.validateNumberPositive(depId)
        ) {
          isValid = false;
        } else {
          objData.idMain = depId;
        }
        utils.devLog(2, 'depId -> ' + isValid, null);

        return isValid;
      } catch (error) {
        return false;
      }
    }
  };

  put = async ({ body, params }, res) => {
    const objData = {
      idMain: undefined,
      idSecondary: undefined,
      idTertiary: undefined,
      id: undefined,
      data: {},
    };

    try {
      const perId = 'Z001';

      utils.devLog(0, `API ==> Controller => departmentsPut -> Start`, null);

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

      let { depId } = params;

      utils.devLog(2, 'depId', depId);
      utils.devLog(2, 'body', body);
      if (!validateParameters(depId, body)) {
        return utils.resError(
          400,
          `API ==> Controller => departmentsPut -> Invalid parameters`,
          null,
          res
        );
      }

      utils.devLog(
        2,
        'API ==> Controller => departmentsPut : objData',
        objData
      );

      const resDepartmentsGetId = await CONFIG_EMPLOYEES_DEPARTMENTS.findByPk(
        objData.idMain
      );

      utils.devLog(
        2,
        'API ==> Controller => resDepartmentsGetId',
        resDepartmentsGetId
      );
      if (!resDepartmentsGetId) {
        return utils.resError(
          404,
          `API ==> Controller => departmentsPut -> departmentsGetId -> Not found`,
          null,
          res
        );
      }

      utils.devLog(
        2,
        'API ==> Controller => departmentsPut -> Update Departments',
        null
      );

      await resDepartmentsGetId.update(objData.data);

      LogsController.logsCreate(
        useId,
        perId,
        `API ==> Controller => departmentsPut -> Success`,
        `=> [${useId}] # Config: Colaboradores: Departamentos: Atualizado ## [${objData.idMain}] ${resDepartmentsGetId.depName}`,
        objData.idMain
      );

      return utils.resSuccess(
        'API ==> Controller => departmentsPut -> Success',
        { depId: objData.idMain },
        res
      );
    } catch (error) {
      return utils.resError(
        500,
        `API ==> Controller => departmentsPut -> Error`,
        error,
        res
      );
    }

    function validateParameters(depId, obj) {
      try {
        let isValid = true;

        depId = Number(depId);
        if (
          depId === undefined ||
          depId === '' ||
          depId === null ||
          isNaN(depId) ||
          typeof depId !== 'number'
        ) {
          isValid = false;
        } else {
          objData.idMain = depId;
          objData.id = depId;
        }
        utils.devLog(2, 'depId -> ' + isValid, null);

        if (
          obj.depName === undefined ||
          obj.depName === '' ||
          obj.depName === null ||
          typeof obj.depName !== 'string'
        ) {
          isValid = false;
        } else {
          objData.data.depName = obj.depName;
        }
        utils.devLog(2, 'depName -> ' + isValid, null);

        if (
          obj.depDescription === undefined ||
          obj.depDescription === '' ||
          obj.depDescription === null ||
          typeof obj.depDescription !== 'string'
        ) {
          isValid = false;
        } else {
          objData.data.depDescription = obj.depDescription;
        }
        utils.devLog(2, 'depDescription -> ' + isValid, null);

        if (
          obj.depStatus === undefined ||
          obj.depStatus === '' ||
          obj.depStatus === null ||
          typeof obj.depStatus !== 'boolean' ||
          !utils.validateBoolean(obj.depStatus)
        ) {
          isValid = false;
        } else {
          objData.data.depStatus = obj.depStatus;
        }
        utils.devLog(2, 'depStatus -> ' + isValid, null);

        return isValid;
      } catch (error) {
        return false;
      }
    }
  };
}

module.exports = new ConfigEmployeesDepartmentsController();
