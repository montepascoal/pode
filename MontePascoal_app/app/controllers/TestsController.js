const utils = require('../utils/utils.js');

const UsersController = require('./UsersController');
const LogsController = require('./LogsController');

class TestsController {
  async testStatus(req, res) {
    try {
      const perId = '0000';
      const logMsg = 'API ==> Controller => testStatusAuth -> Start';

      utils.devLog(0, logMsg, null);

      LogsController.logsCreate(
        1,
        perId,
        logMsg,
        `=> [undefined] # Test unAuth ## [geral]`,
        null
      );
      return utils.resSuccess(
        'API ==> Controller => testStatus -> Success',
        { status: true },
        res
      );
    } catch (error) {
      utils.devLog(0, 'API ==> Controller => testStatusAuth -> Error', error);
      return utils.resError(
        500,
        `API ==> Controller => testStatus -> Error`,
        { dbStatus: false },
        res
      );
    }
  }

  async testStatusAuth({ body: { useId } }, res) {
    try {
      const perId = '0000';
      const logMsg = 'API ==> Controller => testStatusAuth -> Start';

      utils.devLog(0, logMsg, null);
      const objResAuth = await UsersController.usersPermission(useId, perId);
      if (!objResAuth.resData.permission) {
        utils.devLog(2, 'API ==> Permission -> FALSE', null);
        return utils.resError(403, objResAuth.resMessage, null, res);
      }
      utils.devLog(2, 'API ==> Permission -> TRUE', null);

      LogsController.logsCreate(
        useId,
        perId,
        logMsg,
        `=> [${useId}] # Test Auth ## [geral]`,
        null
      );
      return utils.resSuccess(
        'API ==> Controller => testStatusAuth -> Success',
        { status: true },
        res
      );
    } catch (error) {
      return utils.resError(
        500,
        `API ==> Controller => testStatusAuth -> Error`,
        { dbStatus: false },
        res
      );
    }
  }
}

module.exports = new TestsController();
