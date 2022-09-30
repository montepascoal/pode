const utils = require('../utils/utils.js');

const {
  COMPANIES_MAIN,
  CONFIG_COUNTRIES,
  CONFIG_STATES,
  CONFIG_CITIES,
} = require('../models');

const LogsController = require('./LogsController');
const UsersController = require('./UsersController');

class CompaniesMainController {
  put = async ({ body, params }, res) => {
    const objData = { idMain: undefined, id: undefined, data: {} };

    try {
      const perId = 'A004';
      const logMsg = 'API ==> Controller => companiesMainPut -> Start';
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

      let { comId } = params;
      utils.devLog(2, null, comId);
      utils.devLog(2, null, body);
      if (!validateParameters(comId, body)) {
        return utils.resError(
          400,
          `API ==> Controller => companiesMainPut -> Invalid parameters`,
          null,
          res
        );
      }

      utils.devLog(2, 'API ==> Controller => companiesMainPut : objData', null);
      utils.devLog(2, null, objData);

      const resCompaniesGetId = await COMPANIES_MAIN.findByPk(objData.id, {});
      if (!resCompaniesGetId) {
        return utils.resError(
          404,
          `API ==> Controller => companiesMainPut -> companiesMainGetId -> Not found`,
          null,
          res
        );
      }
      const resCountriesGetId = await CONFIG_COUNTRIES.findByPk(
        objData.data.comAddCouId
      );
      if (!resCountriesGetId) {
        return utils.resError(
          404,
          `API ==> Controller => companiesMainPut -> resCountriesGetId -> Not found`,
          null,
          res
        );
      }

      const resStatesGetId = await CONFIG_STATES.findByPk(
        objData.data.comAddStaId
      );
      if (!resStatesGetId) {
        return utils.resError(
          404,
          `API ==> Controller => companiesMainPut -> resStatesGetId -> Not found`,
          null,
          res
        );
      }
      if (resStatesGetId.couId !== objData.data.comAddCouId) {
        return utils.resError(
          404,
          `API ==> Controller => companiesMainPut -> resStatesGetId -> comAddCouId invalid`,
          null,
          res
        );
      }

      const resCitiesGetId = await CONFIG_CITIES.findByPk(
        objData.data.comAddCitId
      );
      if (!resCitiesGetId) {
        return utils.resError(
          404,
          `API ==> Controller => companiesMainPut -> resCitiesGetId -> Not found`,
          null,
          res
        );
      }
      if (resCitiesGetId.staId !== objData.data.comAddStaId) {
        return utils.resError(
          404,
          `API ==> Controller => companiesMainPut -> resCitiesGetId -> comAddStaId invalid`,
          null,
          res
        );
      }

      await resCompaniesGetId.update(objData.data);

      LogsController.logsCreate(
        useId,
        perId,
        logMsg,
        `=> [${useId}] # Empresa: Atualizada ## [${objData.id}] ${resCompaniesGetId.comName}`,
        objData.id
      );
      return utils.resSuccess(
        'API ==> Controller => companiesMainPut -> Success',
        { comId: objData.id },
        res
      );
    } catch (error) {
      return utils.resError(
        500,
        `API ==> Controller => companiesMainPut -> Error`,
        error,
        res
      );
    }

    function validateParameters(comId, obj) {
      try {
        let isValid = true;

        comId = Number(comId);
        if (
          comId === undefined ||
          comId === '' ||
          comId === null ||
          isNaN(comId) ||
          typeof comId !== 'number'
        ) {
          isValid = false;
        } else {
          objData.id = comId;
        }
        utils.devLog(2, 'comId -> ' + isValid, null);

        if (
          obj.comName === undefined ||
          obj.comName === '' ||
          obj.comName === null ||
          typeof obj.comName !== 'string'
        ) {
          isValid = false;
        } else {
          objData.data.comName = obj.comName;
        }
        utils.devLog(2, 'comName -> ' + isValid, null);

        if (
          obj.comNameCompany === undefined ||
          obj.comNameCompany === '' ||
          obj.comNameCompany === null ||
          typeof obj.comNameCompany !== 'string'
        ) {
          isValid = false;
        } else {
          objData.data.comNameCompany = obj.comNameCompany;
        }
        utils.devLog(2, 'comNameCompany -> ' + isValid, null);
        if (
          obj.comCpfCnpj === undefined ||
          obj.comCpfCnpj === '' ||
          obj.comCpfCnpj === null ||
          typeof obj.comCpfCnpj !== 'string'
        ) {
          isValid = false;
        } else {
          objData.data.comCpfCnpj = obj.comCpfCnpj;
        }
        utils.devLog(2, 'comCpfCnpj -> ' + isValid, null);

        if (
          obj.comRegistrationState === undefined ||
          obj.comRegistrationState === null ||
          obj.comRegistrationState === ''
        ) {
          objData.data.comRegistrationState = null;
        } else {
          if (typeof obj.comRegistrationState !== 'string') {
            isValid = false;
          } else {
            objData.data.comRegistrationState = obj.comRegistrationState;
          }
        }
        utils.devLog(2, 'comRegistrationState -> ' + isValid, null);

        if (
          obj.comRegistrationMunicipal === undefined ||
          obj.comRegistrationMunicipal === null ||
          obj.comRegistrationMunicipal === ''
        ) {
          objData.data.comRegistrationMunicipal = null;
        } else {
          if (typeof obj.comRegistrationMunicipal !== 'string') {
            isValid = false;
          } else {
            objData.data.comRegistrationMunicipal =
              obj.comRegistrationMunicipal;
          }
        }
        utils.devLog(2, 'comRegistrationMunicipal -> ' + isValid, null);

        if (
          obj.comAddCep === undefined ||
          obj.comAddCep === '' ||
          obj.comAddCep === null ||
          typeof obj.comAddCep !== 'string' ||
          obj.comAddCep.length !== 8
        ) {
          isValid = false;
        } else {
          objData.data.comAddCep = obj.comAddCep;
        }
        utils.devLog(2, 'comAddCep -> ' + isValid, null);

        if (
          obj.comAddAddress === undefined ||
          obj.comAddAddress === '' ||
          obj.comAddAddress === null ||
          typeof obj.comAddAddress !== 'string'
        ) {
          isValid = false;
        } else {
          objData.data.comAddAddress = obj.comAddAddress;
        }
        utils.devLog(2, 'comAddAddress -> ' + isValid, null);

        if (
          obj.comAddComplement === undefined ||
          obj.comAddComplement === null ||
          obj.comAddComplement === ''
        ) {
          objData.data.comAddComplement = null;
        } else {
          if (typeof obj.comAddComplement !== 'string') {
            isValid = false;
          } else {
            objData.data.comAddComplement = obj.comAddComplement;
          }
        }
        utils.devLog(2, 'comAddComplement -> ' + isValid, null);

        if (
          obj.comAddNumber === undefined ||
          obj.comAddNumber === null ||
          obj.comAddNumber === ''
        ) {
          objData.data.comAddNumber = null;
        } else {
          if (typeof obj.comAddNumber !== 'string') {
            isValid = false;
          } else {
            objData.data.comAddNumber = obj.comAddNumber;
          }
        }
        utils.devLog(2, 'comAddNumber -> ' + isValid, null);

        if (
          obj.comAddDistrict === undefined ||
          obj.comAddDistrict === '' ||
          obj.comAddDistrict === null ||
          typeof obj.comAddDistrict !== 'string'
        ) {
          isValid = false;
        } else {
          objData.data.comAddDistrict = obj.comAddDistrict;
        }
        utils.devLog(2, 'comAddDistrict -> ' + isValid, null);

        obj.comAddCouId = Number(obj.comAddCouId);
        if (
          obj.comAddCouId === undefined ||
          obj.comAddCouId === '' ||
          obj.comAddCouId === null ||
          isNaN(obj.comAddCouId) ||
          typeof obj.comAddCouId !== 'number'
        ) {
          isValid = false;
        } else {
          objData.data.comAddCouId = Number(obj.comAddCouId);
        }
        utils.devLog(2, 'comAddCouId -> ' + isValid, null);

        obj.comAddStaId = Number(obj.comAddStaId);
        if (
          obj.comAddStaId === undefined ||
          obj.comAddStaId === '' ||
          obj.comAddStaId === null ||
          isNaN(obj.comAddStaId) ||
          typeof obj.comAddStaId !== 'number'
        ) {
          isValid = false;
        } else {
          objData.data.comAddStaId = Number(obj.comAddStaId);
        }
        utils.devLog(2, 'comAddStaId -> ' + isValid, null);

        obj.comAddCitId = Number(obj.comAddCitId);
        if (
          obj.comAddCitId === undefined ||
          obj.comAddCitId === '' ||
          obj.comAddCitId === null ||
          isNaN(obj.comAddCitId) ||
          typeof obj.comAddCitId !== 'number'
        ) {
          isValid = false;
        } else {
          objData.data.comAddCitId = Number(obj.comAddCitId);
        }
        utils.devLog(2, 'comAddCitId -> ' + isValid, null);

        if (
          obj.comConPhone1 === undefined ||
          obj.comConPhone1 === '' ||
          obj.comConPhone1 === null ||
          typeof obj.comConPhone1 !== 'string' ||
          (obj.comConPhone1.length !== 10 && obj.comConPhone1.length !== 11)
        ) {
          isValid = false;
        } else {
          objData.data.comConPhone1 = obj.comConPhone1;
        }
        utils.devLog(2, 'comConPhone1 -> ' + isValid, null);

        if (obj.comConPhone2 === undefined || obj.comConPhone2 === null) {
          objData.data.comConPhone2 = null;
        } else {
          if (
            obj.comConPhone2 === '' ||
            obj.comConPhone2 === null ||
            typeof obj.comConPhone2 !== 'string' ||
            (obj.comConPhone2.length !== 10 && obj.comConPhone2.length !== 11)
          ) {
            isValid = false;
          } else {
            objData.data.comConPhone2 = obj.comConPhone2;
          }
        }
        utils.devLog(2, 'comConPhone2 -> ' + isValid, null);

        if (
          obj.comConEmail === undefined ||
          obj.comConEmail === '' ||
          obj.comConEmail === null ||
          typeof obj.comConEmail !== 'string'
        ) {
          isValid = false;
        } else {
          objData.data.comConEmail = obj.comConEmail;
        }
        utils.devLog(2, 'comConEmail -> ' + isValid, null);

        if (
          obj.comConMediaWebsite === undefined ||
          obj.comConMediaWebsite === null ||
          obj.comConMediaWebsite === ''
        ) {
          objData.data.comConMediaWebsite = null;
        } else {
          if (typeof obj.comConMediaWebsite !== 'string') {
            isValid = false;
          } else {
            objData.data.comConMediaWebsite = obj.comConMediaWebsite;
          }
        }
        utils.devLog(2, 'comConMediaWebsite -> ' + isValid, null);

        if (
          obj.comConMediaWhatsApp === undefined ||
          obj.comConMediaWhatsApp === null ||
          obj.comConMediaWhatsApp === ''
        ) {
          objData.data.comConMediaWhatsApp = null;
        } else {
          if (typeof obj.comConMediaWhatsApp !== 'string') {
            isValid = false;
          } else {
            objData.data.comConMediaWhatsApp = obj.comConMediaWhatsApp;
          }
        }
        utils.devLog(2, 'comConMediaWhatsApp -> ' + isValid, null);

        if (
          obj.comConMediaFacebook === undefined ||
          obj.comConMediaFacebook === null ||
          obj.comConMediaFacebook === ''
        ) {
          objData.data.comConMediaFacebook = null;
        } else {
          if (typeof obj.comConMediaFacebook !== 'string') {
            isValid = false;
          } else {
            objData.data.comConMediaFacebook = obj.comConMediaFacebook;
          }
        }
        utils.devLog(2, 'comConMediaFacebook -> ' + isValid, null);

        if (
          obj.comConMediaInstagram === undefined ||
          obj.comConMediaInstagram === null ||
          obj.comConMediaInstagram === ''
        ) {
          objData.data.comConMediaInstagram = null;
        } else {
          if (typeof obj.comConMediaInstagram !== 'string') {
            isValid = false;
          } else {
            objData.data.comConMediaInstagram = obj.comConMediaInstagram;
          }
        }
        utils.devLog(2, 'comConMediaInstagram -> ' + isValid, null);

        if (
          obj.comConMediaTikTok === undefined ||
          obj.comConMediaTikTok === null ||
          obj.comConMediaTikTok === ''
        ) {
          objData.data.comConMediaTikTok = null;
        } else {
          if (typeof obj.comConMediaTikTok !== 'string') {
            isValid = false;
          } else {
            objData.data.comConMediaTikTok = obj.comConMediaTikTok;
          }
        }
        utils.devLog(2, 'comConMediaTikTok -> ' + isValid, null);

        if (
          obj.comConMediaLinkedin === undefined ||
          obj.comConMediaLinkedin === null ||
          obj.comConMediaLinkedin === ''
        ) {
          objData.data.comConMediaLinkedin = null;
        } else {
          if (typeof obj.comConMediaLinkedin !== 'string') {
            isValid = false;
          } else {
            objData.data.comConMediaLinkedin = obj.comConMediaLinkedin;
          }
        }
        utils.devLog(2, 'comConMediaLinkedin -> ' + isValid, null);

        if (
          obj.comConMediaYoutube === undefined ||
          obj.comConMediaYoutube === null ||
          obj.comConMediaYoutube === ''
        ) {
          objData.data.comConMediaYoutube = null;
        } else {
          if (typeof obj.comConMediaYoutube !== 'string') {
            isValid = false;
          } else {
            objData.data.comConMediaYoutube = obj.comConMediaYoutube;
          }
        }
        utils.devLog(2, 'comConMediaYoutube -> ' + isValid, null);

        if (
          obj.comConMediaTwitter === undefined ||
          obj.comConMediaTwitter === null ||
          obj.comConMediaTwitter === ''
        ) {
          objData.data.comConMediaTwitter = null;
        } else {
          if (typeof obj.comConMediaTwitter !== 'string') {
            isValid = false;
          } else {
            objData.data.comConMediaTwitter = obj.comConMediaTwitter;
          }
        }
        utils.devLog(2, 'comConMediaTwitter -> ' + isValid, null);

        if (
          obj.comConMediaOther1 === undefined ||
          obj.comConMediaOther1 === null ||
          obj.comConMediaOther1 === ''
        ) {
          objData.data.comConMediaOther1 = null;
        } else {
          if (typeof obj.comConMediaOther1 !== 'string') {
            isValid = false;
          } else {
            objData.data.comConMediaOther1 = obj.comConMediaOther1;
          }
        }
        utils.devLog(2, 'comConMediaOther1 -> ' + isValid, null);

        if (
          obj.comConMediaOther2 === undefined ||
          obj.comConMediaOther2 === null ||
          obj.comConMediaOther2 === ''
        ) {
          objData.data.comConMediaOther2 = null;
        } else {
          if (typeof obj.comConMediaOther2 !== 'string') {
            isValid = false;
          } else {
            objData.data.comConMediaOther2 = obj.comConMediaOther2;
          }
        }
        utils.devLog(2, 'comConMediaOther2 -> ' + isValid, null);

        if (
          obj.comObservations === undefined ||
          obj.comObservations === null ||
          obj.comObservations === ''
        ) {
          objData.data.comObservations = null;
        } else {
          if (typeof obj.comObservations !== 'string') {
            isValid = false;
          } else {
            objData.data.comObservations = obj.comObservations;
          }
        }
        utils.devLog(2, 'comObservations -> ' + isValid, null);

        return isValid;
      } catch (error) {
        return false;
      }
    }
  };

  get = async ({ body, params }, res) => {
    const objData = { idMain: undefined, id: undefined, data: {} };

    try {
      const perId = 'A003';
      const logMsg = 'API ==> Controller => companiesMainGetId -> Start';
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

      let { comId } = params;
      if (!validateParameters(comId)) {
        return utils.resError(
          400,
          `API ==> Controller => companiesMainGetId -> Invalid parameters`,
          null,
          res
        );
      }

      const resCompaniesGetId = await COMPANIES_MAIN.findByPk(objData.id, {
        include: [
          {
            model: CONFIG_COUNTRIES,
            as: 'CONFIG_COUNTRIES',
            attributes: ['couNameGlobal', 'couName', 'couInitials', 'couBacen'],
          },
          {
            model: CONFIG_STATES,
            as: 'CONFIG_STATES',
            attributes: ['staName', 'staInitials', 'staIbge', 'staDDD'],
          },
          {
            model: CONFIG_CITIES,
            as: 'CONFIG_CITIES',
            attributes: [
              'citName',
              'citIbge',
              'citGeoLat',
              'citGeoLng',
              'citTom',
            ],
          },
        ],
      });

      if (resCompaniesGetId) {
        LogsController.logsCreate(
          useId,
          perId,
          logMsg,
          `=> [${useId}] # Empresa: Consultada ## [${objData.id}] ${resCompaniesGetId.comName}`,
          objData.id
        );
        return utils.resSuccess(
          'API ==> Controller => companiesMainGetId -> Success',
          resCompaniesGetId,
          res
        );
      } else {
        return utils.resError(
          404,
          `API ==> Controller => companiesMainGetId -> Not found`,
          null,
          res
        );
      }
    } catch (error) {
      return utils.resError(
        500,
        `API ==> Controller => companiesMainGetId -> Error`,
        error,
        res
      );
    }

    function validateParameters(comId) {
      try {
        let isValid = true;

        comId = Number(comId);
        if (
          comId === undefined ||
          comId === '' ||
          comId === null ||
          isNaN(comId) ||
          typeof comId !== 'number'
        ) {
          isValid = false;
        } else {
          objData.id = comId;
        }

        return isValid;
      } catch (error) {
        return false;
      }
    }
  };
}

module.exports = new CompaniesMainController();
