/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// CONTROLLER USER /////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//  --------------------------------------------------------------------------------------------------------------------------------------- Modules -----

const { Op } = require('sequelize');

const utils = require('../utils/utils.js');

const { SYSTEM } = require('../models');

const LogsController = require('./LogsController');
const UsersController = require('./UsersController');

//  ------------------------------------------------------------------------------------------------------------------------------------- Class API -----
class PublicSystemController {
  constructor() {
    // this.step1 = this.step1.bind(this);
    // this.step2 = this.step2.bind(this);
  }

  systemCheckVersion = async ({ body, params }, res) => {
    try {
      const perId = '0000';
      const logMsg =
        'API ==> Controller => Config => systemCheckVersion -> Start';

      utils.devLog(0, logMsg, null);

      // GET Data
      const resSystemCheckVersion = await SYSTEM.findByPk(1, {});
      // sysKey = 'Version'
      // sysValue = '0.0.1'

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
}

module.exports = new PublicSystemController();
