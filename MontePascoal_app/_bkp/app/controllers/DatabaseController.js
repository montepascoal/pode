/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// CONTROLLER DATABASE /////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//  --------------------------------------------------------------------------------------------------------------------------------------- Modules -----

const Sequelize = require("sequelize");
const config = require("../../app/config/configDatabase.js");
const utils = require("../utils/utils.js");

const sequelize = new Sequelize(config);
//  ------------------------------------------------------------------------------------------------------------------------------------- Class API -----
class DatabaseController {
  constructor() {
    //   this.step1 = this.step1.bind(this);
    //   this.step2 = this.step2.bind(this);
  }

  async dbTest() {
    try {
      utils.devLog(0, 'API ==> Controller => dbTest -> Start', null);
      await sequelize.authenticate();
      return utils.resSuccess('API ==> Controller => dbTest -> Success', {
        dbStatus: true,
      });
    } catch (error) {
      utils.devError(false, 'API ==> Controller => dbTest -> Error', error);
      return utils.resError(500, `API ==> Controller => dbTest -> Error`, {
        dbStatus: false,
      });
    }
  }
}

module.exports = new DatabaseController();
