/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// CONTROLLER USER /////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//  --------------------------------------------------------------------------------------------------------------------------------------- Modules -----

const utils = require('../utils/utils.js');
const md5 = require('md5');

const { PERMISSIONS } = require('../models');

//  ------------------------------------------------------------------------------------------------------------------------------------- Class API -----
class PermissionsController {

  constructor(){
  //   this.step1 = this.step1.bind(this);
  //   this.step2 = this.step2.bind(this);
  }

  async permissionsGetAll (req, res) {
    try {
        utils.devLog(0, 'API ==> Controller => permissionsGetAll -> Start', null);

        const resPermissionsGetAll = await PERMISSIONS.findAll({});

        return utils.resSuccess('API ==> Controller => permissionsGetAll -> Success',resPermissionsGetAll, res);
    } catch (error) {
        return utils.resError(500,`API ==> Controller => permissionsGetAll -> Error`, error, res);
    }
  }

  async permissionsGetId (req, res) {
    try {
        utils.devLog(0, 'API ==> Controller => permissionsGetId -> Start', null);

        const { perId } = req.params;

        const resPermissionsGetId = await PERMISSIONS.findByPk(perId,{});

        if (resPermissionsGetId) {
          return utils.resSuccess('API ==> Controller => permissionsGetId -> Success',resPermissionsGetId, res);
        } else {
          return utils.resError(404,`API ==> Controller => permissionsGetId -> Error`, {}, res );
        }
    
    } catch (error) {
      return utils.resError(500,`API ==> Controller => permissionsGetId -> Error`, error, res );
    }
  }

}

module.exports = new PermissionsController(); 