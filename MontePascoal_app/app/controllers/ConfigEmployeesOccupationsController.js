const utils = require('../utils/utils.js');

const {
  CONFIG_EMPLOYEES_DEPARTMENTS,
  CONFIG_EMPLOYEES_OCCUPATIONS,
} = require('../models');

const LogsController = require('./LogsController');
const UsersController = require('./UsersController');

class ConfigEmployeesOccupationsController {
  post = async ({ body, params }, res) => {
    const objData = {
      idMain: undefined,
      idSecondary: undefined,
      idTertiary: undefined,
      id: undefined,
      data: {},
    };

    try {
      const perId = 'Z002';

      utils.devLog(0, `API ==> Controller => occupationsPost -> Start`, null);

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
          `API ==> Controller => occupationsPost -> Invalid parameters`,
          null,
          res
        );
      }

      utils.devLog(
        2,
        'API ==> Controller => occupationsPost : objData',
        objData
      );

      const resDepartmentsGetId = await CONFIG_EMPLOYEES_DEPARTMENTS.findByPk(
        objData.idMain
      );
      if (!resDepartmentsGetId) {
        return utils.resError(
          404,
          `API ==> Controller => occupationsPost -> departmentsGetId -> Not found`,
          null,
          res
        );
      }

      utils.devLog(
        2,
        'API ==> Controller => occupationsPost -> Create Occupations',
        null
      );

      const resOccupationsPost = await CONFIG_EMPLOYEES_OCCUPATIONS.create(
        objData.data
      );
      objData.idSecondary = resOccupationsPost.dataValues.id;

      LogsController.logsCreate(
        useId,
        perId,
        `API ==> Controller => occupationsPost -> Success`,
        `=> [${useId}] # Config: Colaboradores: Fun????es: Cadastrado ## [${objData.idSecondary}] ${objData.data.occName}`,
        objData.idSecondary
      );
      return utils.resSuccess(
        'API ==> Controller => occupationsPost -> Success',
        { occId: objData.idSecondary },
        res
      );
    } catch (error) {
      return utils.resError(
        500,
        `API ==> Controller => occupationsPost -> Error`,
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
          typeof depId !== 'number' ||
          !utils.validateNumberPositive(depId)
        ) {
          isValid = false;
        } else {
          objData.idMain = depId;
          objData.data.depId = depId;
        }
        utils.devLog(2, 'depId -> ' + isValid, null);

        if (
          obj.occName === undefined ||
          obj.occName === '' ||
          obj.occName === null ||
          typeof obj.occName !== 'string'
        ) {
          isValid = false;
        } else {
          objData.data.occName = obj.occName;
        }
        utils.devLog(2, 'occName -> ' + isValid, null);

        if (
          obj.occDescription === undefined ||
          obj.occDescription === '' ||
          obj.occDescription === null ||
          typeof obj.occDescription !== 'string'
        ) {
          isValid = false;
        } else {
          objData.data.occDescription = obj.occDescription;
        }
        utils.devLog(2, 'occDescription -> ' + isValid, null);

        objData.data.occStatus = true;
        utils.devLog(2, 'occStatus -> ' + isValid, null);

        return isValid;
      } catch (error) {
        return false;
      }
    }
  };

  getAll = async ({ body, params }, res) => {
    const objData = {
      idMain: undefined,
      idSecondary: undefined,
      idTertiary: undefined,
      id: undefined,
      data: {},
    };

    try {
      const perId = 'Z002';

      utils.devLog(0, `API ==> Controller => occupationsGetAll -> Start`, null);

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

      const resOccupationsGetAll = await CONFIG_EMPLOYEES_OCCUPATIONS.findAll({
        order: [['id', 'ASC']],
        include: [
          {
            model: CONFIG_EMPLOYEES_DEPARTMENTS,
            as: 'CONFIG_EMPLOYEES_DEPARTMENTS',
            attributes: ['depStatus', 'depName', 'depDescription'],
          },
        ],
      });

      LogsController.logsCreate(
        useId,
        perId,
        'API ==> Controller => occupationsGetAll -> Success',
        `=> [${useId}] # Config: Colaboradores: Fun????es: Listagem geral ## [geral]`,
        null
      );
      return utils.resSuccess(
        'API ==> Controller => occupationsGetAll -> Success',
        resOccupationsGetAll,
        res
      );
    } catch (error) {
      return utils.resError(
        500,
        `API ==> Controller => occupationsGetAll -> Error`,
        error,
        res
      );
    }
  };

  getByDepartment = async ({ body, params }, res) => {
    const objData = {
      idMain: undefined,
      idSecondary: undefined,
      idTertiary: undefined,
      id: undefined,
      data: {},
    };

    try {
      const perId = 'Z002';

      utils.devLog(
        0,
        `API ==> Controller => occupationsGetByDepartment -> Start`,
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

      let { depId } = params;

      utils.devLog(2, 'depId', depId);
      if (!validateParameters(depId)) {
        return utils.resError(
          400,
          `API ==> Controller => occupationsGetByDepartment -> Invalid parameters`,
          null,
          res
        );
      }

      const filter = {};
      if (objData.idMain) {
        filter.depId = objData.idMain;
      }
      const resOccupationsGetAll = await CONFIG_EMPLOYEES_OCCUPATIONS.findAll({
        where: filter,
        order: [['id', 'ASC']],
        include: [
          {
            model: CONFIG_EMPLOYEES_DEPARTMENTS,
            as: 'CONFIG_EMPLOYEES_DEPARTMENTS',
            attributes: ['depStatus', 'depName', 'depDescription'],
          },
        ],
      });

      LogsController.logsCreate(
        useId,
        perId,
        'API ==> Controller => occupationsGetAll -> Success',
        `=> [${useId}] # Config: Colaboradores: Fun????es: Listagem geral ## [geral]`,
        null
      );
      return utils.resSuccess(
        'API ==> Controller => occupationsGetAll -> Success',
        resOccupationsGetAll,
        res
      );
    } catch (error) {
      return utils.resError(
        500,
        `API ==> Controller => occupationsGetAll -> Error`,
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
        }
        utils.devLog(2, 'depId -> ' + isValid, null);

        return isValid;
      } catch (error) {
        return false;
      }
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
      const perId = 'Z002';

      utils.devLog(0, 'API ==> Controller => occupationsGetId -> Start', null);

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

      let { depId, occId } = params;
      utils.devLog(2, 'depId', depId);
      utils.devLog(2, 'occId', occId);
      if (!validateParameters(depId, occId)) {
        return utils.resError(
          400,
          `API ==> Controller => occupationsGetId -> Invalid parameters`,
          null,
          res
        );
      }

      const resDepartmentsGetId = await CONFIG_EMPLOYEES_DEPARTMENTS.findByPk(
        objData.idMain
      );
      if (!resDepartmentsGetId) {
        return utils.resError(
          404,
          `API ==> Controller => occupationsGetId -> departmentsGetId -> Not found`,
          null,
          res
        );
      }

      const resOccupationsGetId = await CONFIG_EMPLOYEES_OCCUPATIONS.findByPk(
        objData.idSecondary
      );
      if (!resOccupationsGetId) {
        return utils.resError(
          404,
          `API ==> Controller => occupationsGetId -> occupationsGetId -> Not found`,
          null,
          res
        );
      }

      if (resDepartmentsGetId.id !== resOccupationsGetId.depId) {
        return utils.resError(
          400,
          `API ==> Controller => occupationsGetId -> Invalid parameters -> id main/secondary`,
          null,
          res
        );
      }

      if (resOccupationsGetId) {
        LogsController.logsCreate(
          useId,
          perId,
          'API ==> Controller => occupationsGetId -> Success',
          `=> [${useId}] # Config: Colaboradores: Fun????es: Consultado ## [${objData.idSecondary}] ${resOccupationsGetId.occName}`,
          objData.idSecondary
        );
        return utils.resSuccess(
          'API ==> Controller => occupationsGetId -> Success',
          resOccupationsGetId,
          res
        );
      } else {
        return utils.resError(
          404,
          `API ==> Controller => occupationsGetId -> Error`,
          null,
          res
        );
      }
    } catch (error) {
      return utils.resError(
        500,
        `API ==> Controller => occupationsGetId -> Error`,
        error,
        res
      );
    }

    function validateParameters(depId, occId) {
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

        occId = Number(occId);
        if (
          occId === undefined ||
          occId === '' ||
          occId === null ||
          isNaN(occId) ||
          typeof occId !== 'number' ||
          !utils.validateNumberPositive(occId)
        ) {
          isValid = false;
        } else {
          objData.idSecondary = occId;
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
      const perId = 'Z002';

      utils.devLog(0, `API ==> Controller => occupationsPut -> Start`, null);
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

      let { depId, occId } = params;
      utils.devLog(2, 'depId', depId);
      utils.devLog(2, 'occId', occId);
      utils.devLog(2, 'body', body);
      if (!validateParameters(depId, occId, body)) {
        return utils.resError(
          400,
          `API ==> Controller => occupationsPut -> Invalid parameters`,
          null,
          res
        );
      }

      utils.devLog(
        2,
        'API ==> Controller => occupationsPut : objData',
        objData
      );

      const resDepartmentsGetId = await CONFIG_EMPLOYEES_DEPARTMENTS.findByPk(
        objData.idMain
      );
      if (!resDepartmentsGetId) {
        return utils.resError(
          404,
          `API ==> Controller => occupationsPut -> departmentsGetId -> Not found`,
          null,
          res
        );
      }

      const resOccupationsGetId = await CONFIG_EMPLOYEES_OCCUPATIONS.findByPk(
        objData.idSecondary
      );
      if (!resOccupationsGetId) {
        return utils.resError(
          404,
          `API ==> Controller => occupationsPut -> occupationsGetId -> Not found`,
          null,
          res
        );
      }

      if (resDepartmentsGetId.id !== resOccupationsGetId.depId) {
        return utils.resError(
          400,
          `API ==> Controller => occupationsPut -> Invalid parameters -> id main / secondary`,
          null,
          res
        );
      }

      utils.devLog(
        2,
        'API ==> Controller => occupationsPut -> Update Occupations',
        null
      );
      await resOccupationsGetId.update(objData.data);

      LogsController.logsCreate(
        useId,
        perId,
        `API ==> Controller => occupationsPut -> Success`,
        `=> [${useId}] # Config: Colaboradores: Fun????es: Atualizado ## [${objData.idSecondary}] ${objData.data.occName}`,
        objData.idSecondary
      );
      return utils.resSuccess(
        'API ==> Controller => occupationsPut -> Success',
        { occId: objData.idSecondary },
        res
      );
    } catch (error) {
      return utils.resError(
        500,
        `API ==> Controller => occupationsPut -> Error`,
        error,
        res
      );
    }

    function validateParameters(depId, occId, obj) {
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

        occId = Number(occId);
        if (
          occId === undefined ||
          occId === '' ||
          occId === null ||
          isNaN(occId) ||
          typeof occId !== 'number' ||
          !utils.validateNumberPositive(occId)
        ) {
          isValid = false;
        } else {
          objData.idSecondary = occId;
        }
        utils.devLog(2, 'occId -> ' + isValid, null);

        if (
          obj.occName === undefined ||
          obj.occName === '' ||
          obj.occName === null ||
          typeof obj.occName !== 'string'
        ) {
          isValid = false;
        } else {
          objData.data.occName = obj.occName;
        }
        utils.devLog(2, 'occName -> ' + isValid, null);

        if (
          obj.occDescription === undefined ||
          obj.occDescription === '' ||
          obj.occDescription === null ||
          typeof obj.occDescription !== 'string'
        ) {
          isValid = false;
        } else {
          objData.data.occDescription = obj.occDescription;
        }
        utils.devLog(2, 'occDescription -> ' + isValid, null);

        if (
          obj.occStatus === undefined ||
          obj.occStatus === '' ||
          obj.occStatus === null ||
          typeof obj.occStatus !== 'boolean' ||
          !utils.validateBoolean(obj.occStatus)
        ) {
          isValid = false;
        } else {
          objData.data.occStatus = obj.occStatus;
        }
        utils.devLog(2, 'occStatus -> ' + isValid, null);

        return isValid;
      } catch (error) {
        return false;
      }
    }
  };
}

module.exports = new ConfigEmployeesOccupationsController();
