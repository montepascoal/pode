const utils = require('../utils/utils.js');

const { SYSTEM } = require('../models');

class PublicSystemController {
  systemCheckVersion = async ({ body, params }, res) => {
    try {
      const perId = '0000';
      const logMsg =
        'API ==> Controller => Config => systemCheckVersion -> Start';

      utils.devLog(0, logMsg, null);

      const resSystemCheckVersion = await SYSTEM.findByPk(1, {});

      if (resSystemCheckVersion) {
        return utils.resSuccess(
          'API ==> Controller => systemCheckVersion -> Success',
          resSystemCheckVersion,
          res
        );
      } else {
        return utils.resSuccess(
          `API ==> Controller => systemCheckVersion -> Not found`,
          { sysKey: 'Version', sysValue: null },
          res
        );
      }
    } catch (error) {
      return utils.resError(
        500,
        `API ==> Controller => Config => systemCheckVersion -> Error`,
        error,
        res
      );
    }
  };
  systemGetAll = async ({ body, params }, res) => {
    try {
      const perId = '0000';
      const logMsg = 'API ==> Controller => Config => systemGetAll -> Start';

      utils.devLog(0, logMsg, null);

      const resSystemCheckVersion = await SYSTEM.findAll({
        order: [['id', 'ASC']],
        attributes: ['id', 'sysKey', 'sysValue', 'sysCreated', 'sysUpdated'],
      });

      if (resSystemCheckVersion) {
        return utils.resSuccess(
          'API ==> Controller => systemGetAll -> Success',
          resSystemCheckVersion,
          res
        );
      } else {
        return utils.resSuccess(
          `API ==> Controller => systemGetAll -> Not found`,
          { sysKey: 'Version', sysValue: null },
          res
        );
      }
    } catch (error) {
      return utils.resError(
        500,
        `API ==> Controller => Config => systemGetAll -> Error`,
        error,
        res
      );
    }
  };
}

module.exports = new PublicSystemController();
