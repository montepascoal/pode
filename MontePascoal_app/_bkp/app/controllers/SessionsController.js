/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// CONTROLLER SESSION /////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//  --------------------------------------------------------------------------------------------------------------------------------------- Modules -----

const utils = require('../utils/utils.js');
const configAuth = require('../config/configAuth.js');
const md5 = require('md5');
const jwt = require('jsonwebtoken');
const { promisify } = require('util');

const { USERS } = require('../models');

const LogsController = require('./LogsController');

class SessionsController {
  async sessionsLogin(req, res) {
    const objError = { errMessage: null };
    let msgError = 'Error';
    const auxMsgError = (msg) => {
      msgError = msg;
      return { resStatus: false };
    };
    let userID = null;
    let userNAME = null;

    try {
      const perId = '0000';
      const logMsg = 'API ==> Controller => sessionsLogin -> Start';

      utils.devLog(0, logMsg, null);

      const objResCheckParameters = sessionsLoginAuxCheckParameters(
        req.body.useNickname,
        req.body.usePassword
      );
      const objResCheckUser = objResCheckParameters.resStatus
        ? objResCheckParameters.resNext
          ? await sessionsLoginCheckUser(objResCheckParameters.resData)
          : auxMsgError('Check Parameters')
        : { resStatus: false };
      const objResCheckPassword = objResCheckUser.resStatus
        ? objResCheckUser.resNext
          ? sessionsLoginCheckPassword(objResCheckUser.resData)
          : auxMsgError('Invalid User')
        : { resStatus: false };
      const objResGenerateToken = objResCheckPassword.resStatus
        ? objResCheckPassword.resNext
          ? await sessionsLoginGenerateToken(objResCheckPassword.resData.useId)
          : auxMsgError('Invalid Password')
        : { resStatus: false };

      if (objResGenerateToken.resStatus) {
        LogsController.logsCreate(
          userID,
          perId,
          logMsg,
          `=> [${userID}] # Sess??o: Login ## [${userID}] ${userNAME}`,
          userID
        );
        return utils.resSuccess(
          'API ==> Controller => sessionsLogin -> Success',
          objResGenerateToken.resData,
          res
        );
      } else {
        if (objError.errMessage) {
          return utils.resError(
            409,
            `API ==> Controller => sessionsLogin -> Error`,
            objError,
            res
          );
        } else {
          return utils.resError(
            401,
            `API ==> Controller => sessionsLogin -> Error`,
            { errMessage: msgError },
            res
          );
        }
      }
    } catch (error) {
      return utils.resError(
        500,
        `API ==> Controller => sessionsLogin -> Error`,
        error,
        res
      );
    }

    function sessionsLoginAuxCheckParameters(useNickname, usePassword) {
      let varValidacao = true;

      if (
        useNickname === undefined ||
        useNickname === '' ||
        useNickname === null
      ) {
        varValidacao = false;
      }
      if (
        usePassword === undefined ||
        usePassword === '' ||
        usePassword === null
      ) {
        varValidacao = false;
      }

      return varValidacao
        ? utils.devResSuccess(
            'API ==> Controller => sessionsLogin -> Check Parameters -> Success',
            { useNickname: useNickname, keyPassword: md5(usePassword) }
          )
        : utils.devResSuccess(
            'API ==> Controller => sessionsLogin -> Check Parameters -> Error',
            { useNickname: useNickname, usePassword: usePassword },
            false
          );
    }

    async function sessionsLoginCheckUser(objUser) {
      try {
        utils.devLog(
          2,
          'API ==> Controller => sessionsLogin -> Check User -> Start',
          null
        );

        const user = await USERS.findOne({
          where: { useNickname: objUser.useNickname },
        });

        if (user) {
          if (!user.useStatus) {
            objError.errMessage = 'User disabled';
            return utils.devResError(
              `API DEV ==> Controller => sessionsLogin -> User disabled`,
              { errMessage: 'User disabled' }
            );
          }
          if (user.usePasswordReset) {
            objError.errMessage = 'Password reset required';
            return utils.devResError(
              `API ==> Controller => sessionsLogin -> Password reset required`,
              { errMessage: 'Password reset required' }
            );
          }
        }
        userNAME = objUser.useNickname;
        return user !== null
          ? utils.devResSuccess(
              `API DEV ==> Controller => sessionsLogin -> Check User -> useId: ${user.id}`,
              {
                useId: user.id,
                usePassword: user.usePassword,
                keyPassword: objUser.keyPassword,
              },
              true
            )
          : utils.devResSuccess(
              `API DEV ==> Controller => sessionsLogin -> Check User -> Invalid user`,
              { useNickname: objUser.useNickname },
              false
            );
      } catch (error) {
        utils.devError(
          false,
          `API DEV ==> Controller => sessionsLogin -> Check User -> Error SQL -> ${
            error.original !== undefined
              ? error.original.sqlMessage
              : 'not error sql'
          }`
        );
        utils.devError(
          false,
          `API DEV ==> Controller => sessionsLogin -> Check User -> Error -> ${
            error || 'null'
          }`
        );
        return utils.devResError(
          `API DEV ==> Controller => sessionsLogin -> Check User -> Error`,
          error.original !== undefined ? error.original.sqlMessage : error
        );
      }
    }

    function sessionsLoginCheckPassword(objUser) {
      try {
        utils.devLog(
          2,
          'API ==> Controller => sessionsLogin -> Check Password -> Start',
          null
        );

        utils.devLog(
          2,
          `API ==> Controller => sessionsLogin -> Check Password -> use: ${objUser.usePassword} | key: ${objUser.keyPassword}`,
          null
        );

        return objUser.usePassword === objUser.keyPassword
          ? utils.devResSuccess(
              'API ==> Controller => sessionsLogin -> Check Password -> Success',
              { useId: objUser.useId },
              true
            )
          : utils.devResSuccess(
              'API ==> Controller => sessionsLogin -> Check Password -> Invalid password',
              objUser.useId,
              false
            );
      } catch (error) {
        return utils.devResError(
          `API DEV ==> Controller => sessionsLogin -> Check Password -> Error`,
          error
        );
      }
    }

    async function sessionsLoginGenerateToken(id) {
      try {
        utils.devLog(
          2,
          'API ==> Controller => sessionsLogin -> Generate Token -> Start',
          null
        );

        // console.log(id);
        userID = id;
        const token = await jwt.sign({ id }, configAuth.secret, {
          expiresIn: configAuth.ttl,
        });

        const decoded = await promisify(jwt.verify)(token, configAuth.secret);
        utils.devLog(2, 'API ==> Controller => Decoded', null);
        utils.devLog(2, decoded, null);

        return utils.devResSuccess(
          `API ==> Controller => sessionsLogin -> Generate Token -> Success`,
          { useToken: token },
          res
        );
      } catch (error) {
        return utils.devResError(
          `API ==> Controller => sessionsLogin -> Generate Token -> Error`,
          error,
          res
        );
      }
    }
  }

  async sessionsLogout(req, res) {
    return utils.resSuccess(
      'API ==> Controller => sessionsLogout -> Success',
      { useToken: null },
      res
    );
  }

  async sessionsValidateAuth(reqHeader) {
    try {
      utils.devLog(
        0,
        'API ==> Controller => sessionsValidateAuth -> Start',
        null
      );
      utils.devLog(2, null, reqHeader);
      const authHeader = reqHeader.authorization;

      // Se o header n??o existir:
      if (!authHeader) {
        return utils.resSuccess(
          'API ==> Controller => sessionsValidateAuth -> Error',
          {
            auth: false,
            errMessage: 'Invalid Token',
          }
        );
        // return utils.devResError('API ==> Controller => sessionsValidateAuth -> Error', { errMessage: 'Invalid Token' });
        // return utils.resError(401,`API ==> Controller => sessionsValidateAuth -> Error`, { errMessage: 'Invalid Token' }, res);
      } else {
        // Quando envia pro back, o authorization vem: Bearer TOKEN
        // Uso do split para separar e pegar s?? o TOKEN
        const [, token] = authHeader.split(' ');
        utils.devLog(2, null, token);
        // const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTk0NzQwMzczLCJleHAiOjE1OTQ3NDA0MzN9.QyGCM9IKO-tM0M2Kwi8D_Hx9EBx3H-Ye_Bz7on_9Lro';

        // Por padr??o a fun????o jwt n??o retorna uma promise, usar promisify.
        // Decoded: objeto apenas cm o id do usu??rio.
        const decoded = await promisify(jwt.verify)(token, configAuth.secret);
        utils.devLog(2, 'API ==> Controller => Decoded', null);
        utils.devLog(2, decoded, null);

        // Nesse middlweare pra frente vai ter info qual id do usu??rio est?? fazendo a req.
        const useId = decoded.id;

        return utils.resSuccess(
          'API ==> Controller => sessionsValidateAuth -> Success',
          {
            auth: true,
            useId: useId,
          }
        );
        // return utils.devResSuccess('API ==> Controller => sessionsValidateAuth -> Success', { useId: useId });
      }
    } catch (error) {
      return utils.resSuccess(
        'API ==> Controller => sessionsValidateAuth -> Error',
        {
          auth: false,
          errMessage: 'Invalid Token',
        }
      );
      // return utils.devResError('API ==> Controller => sessionsValidateAuth -> Error', { errMessage: 'Invalid Token' });
    }
  }
}

module.exports = new SessionsController();
