const utils = require('../utils/utils.js');

const { USERS, LOGS } = require('../models');

class LogsController {
  async logsGetAll(req, res) {
    try {
      utils.devLog(0, 'API ==> Controller => logsGetAll -> Start', null);

      const resLogsGetAll = await LOGS.findAll({
        include: [{ model: USERS, as: 'USERS' }],
      });

      return utils.resSuccess(
        'API ==> Controller => logsGetAll -> Success',
        resLogsGetAll,
        res
      );
    } catch (error) {
      return utils.resError(
        500,
        `API ==> Controller => logsGetAll -> Error`,
        error,
        res
      );
    }
  }

  async logsGetId(req, res) {
    try {
      utils.devLog(0, 'API ==> Controller => logsGetId -> Start', null);

      const { logId } = req.params;

      const resLogsGetId = await LOGS.findByPk(logId, {
        include: [{ model: USERS, as: 'USERS' }],
      });

      if (resLogsGetId) {
        return utils.resSuccess(
          'API ==> Controller => logsGetId -> Success',
          resLogsGetId,
          res
        );
      } else {
        return utils.resError(
          404,
          `API ==> Controller => logsGetId -> Error`,
          {},
          res
        );
      }
    } catch (error) {
      return utils.resError(
        500,
        `API ==> Controller => logsGetId -> Error`,
        error,
        res
      );
    }
  }

  async logsCreate(useId, logPermission, logDescription, logText, objId) {
    try {
      await LOGS.create({
        useId: useId,
        logDate: new Date(),
        logPermission: logPermission,
        logDescription: logDescription,
        logText: logText,
        objId: objId,
        logCreated: new Date(),
        logUpdated: new Date(),
        logDeleted: null,
      });
      utils.devLog(2, 'Description: ' + logDescription, {
        useId,
        logPermission,
        logDescription,
        logText,
        objId,
      });
    } catch (error) {
      utils.devLog(4, 'API ==> Controller => logsCreate -> Error', null);
    }
  }
}

module.exports = new LogsController();
