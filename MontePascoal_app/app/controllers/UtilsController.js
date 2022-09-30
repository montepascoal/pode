const axios = require('axios').default;
const utils = require('../utils/utils.js');

const LogsController = require('./LogsController');
const UsersController = require('./UsersController');

const apiREST = axios.create();

class UiltsController {
  utilsGetDataCnpj = async ({ body, params }, res) => {
    const objData = { id: undefined, data: {} };

    try {
      const perId = '0000';
      const logMsg = 'API ==> Controller => utilsGetDataCnpj -> Start';
      const { useId } = body;

      utils.devLog(0, logMsg, null);
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
      let { cnpj } = params;
      utils.devLog(2, null, cnpj);
      if (!validateParameters(cnpj)) {
        return utils.resError(
          400,
          `API ==> Controller => utilsGetDataCnpj -> Invalid parameters`,
          null,
          res
        );
      }

      const resGetCnpj = await apiREST.get(
        'https://www.receitaws.com.br/v1/cnpj/' + objData.cnpj
      );
      LogsController.logsCreate(
        useId,
        perId,
        logMsg,
        `=> [${useId}] # Config: Busca CNPJ ## [geral]`,
        null
      );
      return utils.resSuccess(
        'API ==> Controller => utilsGetDataCnpj -> Success',
        resGetCnpj.data,
        res
      );
    } catch (error) {
      return utils.resError(
        500,
        `API ==> Controller => utilsGetDataCnpj -> Error`,
        error,
        res
      );
    }

    function validateParameters(cnpj) {
      try {
        let isValid = true;

        if (
          cnpj === undefined ||
          cnpj === '' ||
          cnpj === null ||
          typeof cnpj !== 'string'
        ) {
          isValid = false;
        } else {
          objData.cnpj = cnpj;
        }
        utils.devLog(2, null, isValid);

        return isValid;
      } catch (error) {
        return false;
      }
    }
  };
}

module.exports = new UiltsController();
