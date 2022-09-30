const utils = require('../utils/utils.js');

const { PERMISSIONS } = require('../models');

class PermissionsController {
  async permissionsGetAll(req, res) {
    try {
      const perId = '0000';
      const logMsg = 'API ==> Controller => permissionsGetAll -> Start';

      utils.devLog(0, logMsg, null);

      const permissions = await PERMISSIONS.findAll({
        order: [['id', 'ASC']],
        attributes: ['id', 'perDescription', 'perCategory'],
      });

      return utils.resSuccess(
        'API ==> Controller => permissionsGetAll -> Success',
        permissions,
        res
      );
    } catch (error) {
      return utils.resError(
        500,
        `API ==> Controller => permissionsGetAll -> Error`,
        error,
        res
      );
    }
  }

  async permissionsGetId(req, res) {
    try {
      utils.devLog(0, 'API ==> Controller => permissionsGetId -> Start', null);

      const { perId } = req.params;

      const resPermissionsGetId = await PERMISSIONS.findByPk(perId, {});

      if (resPermissionsGetId) {
        return utils.resSuccess(
          'API ==> Controller => permissionsGetId -> Success',
          resPermissionsGetId,
          res
        );
      } else {
        return utils.resError(
          404,
          `API ==> Controller => permissionsGetId -> Error`,
          {},
          res
        );
      }
    } catch (error) {
      return utils.resError(
        500,
        `API ==> Controller => permissionsGetId -> Error`,
        error,
        res
      );
    }
  }
}

module.exports = new PermissionsController();
