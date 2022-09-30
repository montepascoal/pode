const utils = require('../utils/utils.js');

const LogsController = require('./LogsController');
const UsersController = require('./UsersController');

class AuditsController {
  auditsMembersGetId = async ({ body, params }, res) => {
    const objData = {
      idMain: undefined,
      idSecondary: undefined,
      idTertiary: undefined,
      id: undefined,
      data: {},
    };

    try {
      const perId = 'F008';

      utils.devLog(
        0,
        'API ==> Controller => auditsMembersGetId -> Start',
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

      // Function Controller Action
      let { memId } = params;
      utils.devLog(2, 'memId', memId);
      if (!validateParameters(memId)) {
        return utils.resError(
          400,
          `API ==> Controller => auditsMembersGetId -> Invalid parameters`,
          null,
          res
        );
      }

      LogsController.logsCreate(
        useId,
        perId,
        'API ==> Controller => auditsMembersGetId -> Success',
        `=> [${useId}] # Auditoria: Membros ## [${objData.idTertiary}] ${resAuditsMemberGetId.memName}`,
        objData.idTertiary
      );
      return utils.resSuccess(
        'API ==> Controller => auditsMembersGetId -> Success',
        resAuditsMemberGetId,
        res
      );
    } catch (error) {
      return utils.resError(
        500,
        `API ==> Controller => auditsMembersGetId -> Error`,
        error,
        res
      );
    }

    function validateParameters(memId) {
      try {
        let isValid = true;

        // memId
        memId = Number(memId);
        if (
          memId === undefined ||
          memId === '' ||
          memId === null ||
          isNaN(memId) ||
          typeof memId !== 'number' ||
          !utils.validateNumberPositive(memId)
        ) {
          isValid = false;
        } else {
          objData.idTertiary = memId;
        }
        return isValid;
      } catch (error) {
        return false;
      }
    }
  };
}

module.exports = new AuditsController();
