const utils = require('../utils/utils.js');

const {
  COMPANIES,
  COMPANIES_REPRESENTATIVES,
  CONFIG_COUNTRIES,
  CONFIG_STATES,
  CONFIG_CITIES,
} = require('../models');

const LogsController = require('./LogsController');
const UsersController = require('./UsersController');

class CompaniesRepresentativesController {
  post = async ({ body, params }, res) => {
    const objData = { idMain: undefined, id: undefined, data: {} };

    try {
      const perId = 'B003';
      const logMsg =
        'API ==> Controller => companiesRepresentativesPost -> Start';
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

      utils.devLog(2, null, body);

      console.log('body');

      let { comId } = params;
      if (!validateParameters(comId, body)) {
        return utils.resError(
          400,
          `API ==> Controller => companiesRepresentativesPost -> Invalid parameters`,
          null,
          res
        );
      }

      utils.devLog(
        2,
        'API ==> Controller => companiesRepresentativesPost : objData',
        null
      );
      utils.devLog(2, null, objData);

      const resCompaniesGetId = await COMPANIES.findByPk(objData.data.comId);
      if (!resCompaniesGetId) {
        return utils.resError(
          400,
          'API ==> Controller => companiesRepresentativesPost -> companiesGetId -> Not found ',
          null,
          res
        );
      }

      const resCountriesGetId = await CONFIG_COUNTRIES.findByPk(
        objData.data.repAddCouId
      );
      if (!resCountriesGetId) {
        return utils.resError(
          404,
          `API ==> Controller => companiesRepresentativesPost -> resCountriesGetId -> Not found`,
          null,
          res
        );
      }

      const resStatesGetId = await CONFIG_STATES.findByPk(
        objData.data.repAddStaId
      );
      if (!resStatesGetId) {
        return utils.resError(
          404,
          `API ==> Controller => companiesRepresentativesPost -> resStatesGetId -> Not found`,
          null,
          res
        );
      }
      if (resStatesGetId.couId != objData.data.repAddCouId) {
        return utils.resError(
          404,
          `API ==> Controller => companiesRepresentativesPost -> resStatesGetId -> repAddCouId invalid`,
          null,
          res
        );
      }

      const resCitiesGetId = await CONFIG_CITIES.findByPk(
        objData.data.repAddCitId
      );
      if (!resCitiesGetId) {
        return utils.resError(
          404,
          `API ==> Controller => companiesRepresentativesPost -> resCitiesGetId -> Not found`,
          null,
          res
        );
      }
      if (resCitiesGetId.staId != objData.data.repAddStaId) {
        return utils.resError(
          404,
          `API ==> Controller => companiesRepresentativesPost -> resCitiesGetId -> repAddStaId invalid`,
          null,
          res
        );
      }

      const resCompaniesRepresentativesPost =
        await COMPANIES_REPRESENTATIVES.create(objData.data);
      objData.id = resCompaniesRepresentativesPost.dataValues.id;

      LogsController.logsCreate(
        useId,
        perId,
        logMsg,
        `=> [${useId}] # Representante: Cadastrado ## [${objData.id}] ${objData.data.comName}`,
        objData.id
      );
      return utils.resSuccess(
        'API ==> Controller => companiesRepresentativesPost -> Success',
        { repId: objData.id },
        res
      );
    } catch (error) {
      if (error.original) {
        if (error.name === 'SequelizeUniqueConstraintError') {
          error = {
            errMessage: 'Error system',
            errType: 'SequelizeUniqueConstraintError',
          };
          return utils.resError(
            500,
            `API ==> Controller => companiesRepresentativesPost -> Error`,
            error,
            res
          );
        }
      }
      return utils.resError(
        500,
        `API ==> Controller => companiesRepresentativesPost -> Error`,
        error,
        res
      );
    }

    function validateParameters(comId, obj) {
      try {
        let isValid = true;

        objData.data.repStatus = true;
        utils.devLog(2, 'repStatus -> ' + isValid, null);

        if (comId === undefined || comId === null || comId === '') {
          isValid = false;
        } else {
          objData.data.comId = comId;
        }
        utils.devLog(2, 'comId -> ' + isValid, null);

        if (
          obj.repName === undefined ||
          obj.repName === null ||
          obj.repName === ''
        ) {
          objData.data.repName = null;
        } else {
          if (typeof obj.repName !== 'string') {
            isValid = false;
          } else {
            objData.data.repName = obj.repName;
          }
        }
        utils.devLog(2, 'repName -> ' + isValid, null);

        if (
          obj.repAddCep === undefined ||
          obj.repAddCep === null ||
          obj.repAddCep === ''
        ) {
          objData.data.repAddCep = null;
        } else {
          if (typeof obj.repAddCep !== 'string') {
            isValid = false;
          } else {
            objData.data.repAddCep = obj.repAddCep;
          }
        }
        utils.devLog(2, 'repAddCep -> ' + isValid, null);

        if (
          obj.repAddAddress === undefined ||
          obj.repAddAddress === null ||
          obj.repAddAddress === ''
        ) {
          objData.data.repAddAddress = null;
        } else {
          if (typeof obj.repAddAddress !== 'string') {
            isValid = false;
          } else {
            objData.data.repAddAddress = obj.repAddAddress;
          }
        }
        utils.devLog(2, 'repAddAddress -> ' + isValid, null);

        if (
          obj.repAddComplement === undefined ||
          obj.repAddComplement === null ||
          obj.repAddComplement === ''
        ) {
          objData.data.repAddComplement = null;
        } else {
          if (typeof obj.repAddComplement !== 'string') {
            isValid = false;
          } else {
            objData.data.repAddComplement = obj.repAddComplement;
          }
        }
        utils.devLog(2, 'repAddComplement -> ' + isValid, null);

        if (
          obj.repAddDistrict === undefined ||
          obj.repAddDistrict === null ||
          obj.repAddDistrict === ''
        ) {
          objData.data.repAddDistrict = null;
        } else {
          if (typeof obj.repAddDistrict !== 'string') {
            isValid = false;
          } else {
            objData.data.repAddDistrict = obj.repAddDistrict;
          }
        }
        utils.devLog(2, 'repAddDistrict -> ' + isValid, null);

        obj.repAddCouId = Number(obj.repAddCouId);
        if (
          obj.repAddCouId === undefined ||
          obj.repAddCouId === '' ||
          obj.repAddCouId === null ||
          isNaN(obj.repAddCouId) ||
          typeof obj.repAddCouId !== 'number'
        ) {
          isValid = false;
        } else {
          objData.data.repAddCouId = Number(obj.repAddCouId);
        }
        utils.devLog(2, 'repAddCouId -> ' + isValid, null);

        obj.repAddStaId = Number(obj.repAddStaId);
        if (
          obj.repAddStaId === undefined ||
          obj.repAddStaId === '' ||
          obj.repAddStaId === null ||
          isNaN(obj.repAddStaId) ||
          typeof obj.repAddStaId !== 'number'
        ) {
          isValid = false;
        } else {
          objData.data.repAddStaId = Number(obj.repAddStaId);
        }
        utils.devLog(2, 'repAddStaId -> ' + isValid, null);

        obj.repAddCitId = Number(obj.repAddCitId);
        if (
          obj.repAddCitId === undefined ||
          obj.repAddCitId === '' ||
          obj.repAddCitId === null ||
          isNaN(obj.repAddCitId) ||
          typeof obj.repAddCitId !== 'number'
        ) {
          isValid = false;
        } else {
          objData.data.repAddCitId = Number(obj.repAddCitId);
        }
        utils.devLog(2, 'repAddCitId -> ' + isValid, null);

        if (obj.repDocCpf === undefined || obj.repDocCpf === null) {
          objData.data.repDocCpf = null;
        } else {
          if (obj.repDocCpf === 10) {
            isValid = false;
          } else {
            objData.data.repDocCpf = obj.repDocCpf;
          }
        }
        utils.devLog(2, 'repDocCpf -> ' + isValid, null);

        if (
          obj.repDocRg === undefined ||
          obj.repDocRg === null ||
          obj.repDocRg === ''
        ) {
          objData.data.repDocRg = null;
        } else {
          if (typeof obj.repDocRg !== 'string') {
            isValid = false;
          } else {
            objData.data.repDocRg = obj.repDocRg;
          }
        }
        utils.devLog(2, 'repDocRg -> ' + isValid, null);

        if (
          obj.repDocRgDateExpedition === undefined ||
          obj.repDocRgDateExpedition === null ||
          obj.repDocRgDateExpedition === ''
        ) {
          objData.data.repDocRgDateExpedition = null;
        } else {
          if (typeof obj.repDocRgDateExpedition !== 'string') {
            isValid = false;
          } else {
            objData.data.repDocRgDateExpedition = obj.repDocRgDateExpedition;
          }
        }
        utils.devLog(2, 'repDocRgDateExpedition -> ' + isValid, null);

        if (
          obj.repDocRgExpeditor === undefined ||
          obj.repDocRgExpeditor === null ||
          obj.repDocRgExpeditor === ''
        ) {
          objData.data.repDocRgExpeditor = null;
        } else {
          if (typeof obj.repDocRgExpeditor !== 'string') {
            isValid = false;
          } else {
            objData.data.repDocRgExpeditor = obj.repDocRgExpeditor;
          }
        }
        utils.devLog(2, 'repDocRgExpeditor -> ' + isValid, null);

        if (
          obj.repConPhone1 === undefined ||
          obj.repConPhone1 === null ||
          obj.repConPhone1 === ''
        ) {
          objData.data.repConPhone1 = null;
        } else {
          if (typeof obj.repConPhone1 !== 'string') {
            isValid = false;
          } else {
            objData.data.repConPhone1 = obj.repConPhone1;
          }
        }
        utils.devLog(2, 'repConPhone1 -> ' + isValid, null);

        if (
          obj.repConPhone2 === undefined ||
          obj.repConPhone2 === null ||
          obj.repConPhone2 === ''
        ) {
          objData.data.repConPhone2 = null;
        } else {
          if (typeof obj.repConPhone2 !== 'string') {
            isValid = false;
          } else {
            objData.data.repConPhone2 = obj.repConPhone2;
          }
        }
        utils.devLog(2, 'repConPhone2 -> ' + isValid, null);

        if (
          obj.repConEmail === undefined ||
          obj.repConEmail === null ||
          obj.repConEmail === ''
        ) {
          objData.data.repConEmail = null;
        } else {
          if (typeof obj.repConEmail !== 'string') {
            isValid = false;
          } else {
            objData.data.repConEmail = obj.repConEmail;
          }
        }
        utils.devLog(2, 'repConEmail -> ' + isValid, null);

        if (
          obj.repConEmergencyName === undefined ||
          obj.repConEmergencyName === null ||
          obj.repConEmergencyName === ''
        ) {
          objData.data.repConEmergencyName = null;
        } else {
          if (typeof obj.repConEmergencyName !== 'string') {
            isValid = false;
          } else {
            objData.data.repConEmergencyName = obj.repConEmergencyName;
          }
        }
        utils.devLog(2, 'repConEmergencyName -> ' + isValid, null);

        if (
          obj.repConEmergencyPhone === undefined ||
          obj.repConEmergencyPhone === null ||
          obj.repConEmergencyPhone === ''
        ) {
          objData.data.repConEmergencyPhone = null;
        } else {
          if (typeof obj.repConEmergencyPhone !== 'string') {
            isValid = false;
          } else {
            objData.data.repConEmergencyPhone = obj.repConEmergencyPhone;
          }
        }
        utils.devLog(2, 'repConEmergencyPhone -> ' + isValid, null);

        if (
          obj.repObservations === undefined ||
          obj.repObservations === null ||
          obj.repObservations === ''
        ) {
          objData.data.repObservations = null;
        } else {
          if (typeof obj.repObservations !== 'string') {
            isValid = false;
          } else {
            objData.data.repObservations = obj.repObservations;
          }
        }
        utils.devLog(2, 'repObservations -> ' + isValid, null);

        return isValid;
      } catch (error) {
        return false;
      }
    }
  };

  getAll = async ({ body, params }, res) => {
    try {
      const perId = 'B003';
      const logMsg =
        'API ==> Controller => companiesRepresentativesGetAll -> Start';
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
      if (!comId) {
        return utils.resError(
          400,
          `API ==> Controller => companiesMainGetId -> Invalid parameters`,
          null,
          res
        );
      }

      const resCompaniesGetId = await COMPANIES.findByPk(comId);
      if (!resCompaniesGetId) {
        return utils.resError(
          404,
          `API ==> Controller => companiesGetId -> Not found`,
          null,
          res
        );
      }

      const resCompaniesRepresentatives =
        await COMPANIES_REPRESENTATIVES.findAll({
          where: {
            comId,
          },
          order: [['id', 'ASC']],
        });

      LogsController.logsCreate(
        useId,
        perId,
        logMsg,
        `=> [${useId}] # Representanates Empresa: Listagem geral ## [geral]`,
        null
      );

      return utils.resSuccess(
        'API ==> Controller => companiesRepresentativesGetAll -> Success',
        resCompaniesRepresentatives,
        res
      );
    } catch (error) {
      return utils.resError(
        500,
        `API ==> Controller => companiesRepresentativesGetAll -> Error`,
        error,
        res
      );
    }
  };

  get = async ({ body, params }, res) => {
    const objData = { idMain: undefined, id: undefined, data: {} };

    try {
      const perId = 'B003';
      const logMsg =
        'API ==> Controller => companiesRepresentativesGetId -> Start';
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

      let { repId, comId } = params;
      if (!validateParameters(repId, comId)) {
        return utils.resError(
          400,
          `API ==> Controller => companiesRepresentativesGetId -> Invalid parameters`,
          null,
          res
        );
      }

      const resCompaniesGetId = await COMPANIES.findByPk(comId);
      if (!resCompaniesGetId) {
        return utils.resError(
          404,
          `API ==> Controller => companiesGetId -> Not found`,
          null,
          res
        );
      }

      const resCompaniesRepresentativesGetId =
        await COMPANIES_REPRESENTATIVES.findByPk(objData.id, {
          include: [
            { model: CONFIG_COUNTRIES, as: 'CONFIG_COUNTRIES' },
            { model: CONFIG_STATES, as: 'CONFIG_STATES' },
            { model: CONFIG_CITIES, as: 'CONFIG_CITIES' },
          ],
        });

      if (!resCompaniesRepresentativesGetId) {
        return utils.resError(
          404,
          `API ==> Controller => companiesRepresentativesGetId -> Not found`,
          null,
          res
        );
      }

      if (resCompaniesRepresentativesGetId.comId != comId) {
        return utils.resError(
          400,
          `API ==> Controller => companiesRepresentativesGetId -> Invalid parameters -> id main/secondary`,
          null,
          res
        );
      }

      if (resCompaniesRepresentativesGetId) {
        LogsController.logsCreate(
          useId,
          perId,
          logMsg,
          `=> [${useId}] # Representante: Consultada ## [${objData.id}] ${resCompaniesRepresentativesGetId.repName}`,
          objData.id
        );
        return utils.resSuccess(
          'API ==> Controller => companiesRepresentativesGetId -> Success',
          resCompaniesRepresentativesGetId,
          res
        );
      }
    } catch (error) {
      return utils.resError(
        500,
        `API ==> Controller => companiesGetId -> Error`,
        error,
        res
      );
    }

    function validateParameters(repId, comId) {
      try {
        let isValid = true;

        repId = Number(repId);
        if (
          repId === undefined ||
          repId === '' ||
          repId === null ||
          isNaN(repId) ||
          typeof repId !== 'number'
        ) {
          isValid = false;
        } else {
          objData.id = repId;
        }

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
          objData.comId = comId;
        }

        return isValid;
      } catch (error) {
        return false;
      }
    }
  };

  put = async ({ body, params }, res) => {
    const objData = { idMain: undefined, id: undefined, data: {} };

    try {
      const perId = 'B004';
      const logMsg =
        'API ==> Controller => companiesRepresentativesPut -> Start';
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

      let { comId, repId } = params;
      utils.devLog(2, null, comId);
      utils.devLog(2, null, body);
      if (!validateParameters(comId, repId, body)) {
        return utils.resError(
          400,
          `API ==> Controller => companiesRepresentativesPut -> Invalid parameters`,
          null,
          res
        );
      }

      utils.devLog(
        2,
        'API ==> Controller => companiesRepresentativesPut : objData',
        null
      );
      utils.devLog(2, null, objData);

      const resCompaniesGetId = await COMPANIES.findByPk(comId);
      if (!resCompaniesGetId) {
        return utils.resError(
          404,
          `API ==> Controller => companiesRepresentativesPut => companiesGetId -> Not found`,
          null,
          res
        );
      }

      const resCountriesGetId = await CONFIG_COUNTRIES.findByPk(
        objData.data.repAddCouId
      );
      if (!resCountriesGetId) {
        return utils.resError(
          404,
          `API ==> Controller => companiesRepresentativesPut -> resCountriesGetId -> Not found`,
          null,
          res
        );
      }

      const resStatesGetId = await CONFIG_STATES.findByPk(
        objData.data.repAddStaId
      );
      if (!resStatesGetId) {
        return utils.resError(
          404,
          `API ==> Controller => companiesRepresentativesPut -> resStatesGetId -> Not found`,
          null,
          res
        );
      }
      if (resStatesGetId.couId != objData.data.repAddCouId) {
        return utils.resError(
          404,
          `API ==> Controller => companiesRepresentativesPut -> resStatesGetId -> repAddCouId invalid`,
          null,
          res
        );
      }

      const resCitiesGetId = await CONFIG_CITIES.findByPk(
        objData.data.repAddCitId
      );
      if (!resCitiesGetId) {
        return utils.resError(
          404,
          `API ==> Controller => companiesRepresentativesPut -> resCitiesGetId -> Not found`,
          null,
          res
        );
      }
      if (resCitiesGetId.staId != objData.data.repAddStaId) {
        return utils.resError(
          404,
          `API ==> Controller => companiesRepresentativesPut -> resCitiesGetId -> repAddStaId invalid`,
          null,
          res
        );
      }

      const resRepresentativesCompaniesGetId =
        await COMPANIES_REPRESENTATIVES.findByPk(objData.id);
      if (!resRepresentativesCompaniesGetId) {
        return utils.resError(
          404,
          `API ==> Controller => companiesRepresentativesPut -> companiesRepresentativesId -> Not found`,
          null,
          res
        );
      }

      if (!resRepresentativesCompaniesGetId) {
        return utils.resError(
          404,
          `API ==> Controller => companiesRepresentativesGetId -> Not found`,
          null,
          res
        );
      }

      if (resRepresentativesCompaniesGetId.comId != comId) {
        return utils.resError(
          400,
          `API ==> Controller => companiesRepresentativesPut -> Invalid parameters -> id main/secondary`,
          null,
          res
        );
      }

      await resRepresentativesCompaniesGetId.update(objData.data);

      LogsController.logsCreate(
        useId,
        perId,
        logMsg,
        `=> [${useId}] # Representante: Atualizado ## [${objData.id}] ${resRepresentativesCompaniesGetId.repName}`,
        objData.id
      );
      return utils.resSuccess(
        'API ==> Controller => companiesRepresentativesPut -> Success',
        { repId: objData.id },
        res
      );
    } catch (error) {
      return utils.resError(
        500,
        `API ==> Controller => companiesRepresentativesPut -> Error`,
        error,
        res
      );
    }

    function validateParameters(comId, repId, obj) {
      try {
        let isValid = true;

        objData.data.repStatus = true;
        utils.devLog(2, 'repStatus -> ' + isValid, null);

        if (comId === undefined || comId === null || comId === '') {
          isValid = false;
        } else {
          objData.data.comId = comId;
        }
        utils.devLog(2, 'comId -> ' + isValid, null);

        repId = Number(repId);
        if (
          repId === undefined ||
          repId === '' ||
          repId === null ||
          isNaN(repId) ||
          typeof repId !== 'number'
        ) {
          isValid = false;
        } else {
          objData.id = repId;
        }
        utils.devLog(2, 'repId -> ' + isValid, null);

        if (
          obj.repName === undefined ||
          obj.repName === null ||
          obj.repName === ''
        ) {
          objData.data.repName = null;
        } else {
          if (typeof obj.repName !== 'string') {
            isValid = false;
          } else {
            objData.data.repName = obj.repName;
          }
        }
        utils.devLog(2, 'repName -> ' + isValid, null);

        if (
          obj.repAddCep === undefined ||
          obj.repAddCep === null ||
          obj.repAddCep === ''
        ) {
          objData.data.repAddCep = null;
        } else {
          if (typeof obj.repAddCep !== 'string') {
            isValid = false;
          } else {
            objData.data.repAddCep = obj.repAddCep;
          }
        }
        utils.devLog(2, 'repAddCep -> ' + isValid, null);

        if (
          obj.repAddAddress === undefined ||
          obj.repAddAddress === null ||
          obj.repAddAddress === ''
        ) {
          objData.data.repAddAddress = null;
        } else {
          if (typeof obj.repAddAddress !== 'string') {
            isValid = false;
          } else {
            objData.data.repAddAddress = obj.repAddAddress;
          }
        }
        utils.devLog(2, 'repAddAddress -> ' + isValid, null);

        if (
          obj.repAddComplement === undefined ||
          obj.repAddComplement === null ||
          obj.repAddComplement === ''
        ) {
          objData.data.repAddComplement = null;
        } else {
          if (typeof obj.repAddComplement !== 'string') {
            isValid = false;
          } else {
            objData.data.repAddComplement = obj.repAddComplement;
          }
        }
        utils.devLog(2, 'repAddComplement -> ' + isValid, null);

        if (
          obj.repAddDistrict === undefined ||
          obj.repAddDistrict === null ||
          obj.repAddDistrict === ''
        ) {
          objData.data.repAddDistrict = null;
        } else {
          if (typeof obj.repAddDistrict !== 'string') {
            isValid = false;
          } else {
            objData.data.repAddDistrict = obj.repAddDistrict;
          }
        }
        utils.devLog(2, 'repAddDistrict -> ' + isValid, null);

        obj.repAddCouId = Number(obj.repAddCouId);
        if (
          obj.repAddCouId === undefined ||
          obj.repAddCouId === '' ||
          obj.repAddCouId === null ||
          isNaN(obj.repAddCouId) ||
          typeof obj.repAddCouId !== 'number'
        ) {
          isValid = false;
        } else {
          objData.data.repAddCouId = Number(obj.repAddCouId);
        }
        utils.devLog(2, 'repAddCouId -> ' + isValid, null);

        obj.repAddStaId = Number(obj.repAddStaId);
        if (
          obj.repAddStaId === undefined ||
          obj.repAddStaId === '' ||
          obj.repAddStaId === null ||
          isNaN(obj.repAddStaId) ||
          typeof obj.repAddStaId !== 'number'
        ) {
          isValid = false;
        } else {
          objData.data.repAddStaId = Number(obj.repAddStaId);
        }
        utils.devLog(2, 'repAddStaId -> ' + isValid, null);

        obj.repAddCitId = Number(obj.repAddCitId);
        if (
          obj.repAddCitId === undefined ||
          obj.repAddCitId === '' ||
          obj.repAddCitId === null ||
          isNaN(obj.repAddCitId) ||
          typeof obj.repAddCitId !== 'number'
        ) {
          isValid = false;
        } else {
          objData.data.repAddCitId = Number(obj.repAddCitId);
        }
        utils.devLog(2, 'repAddCitId -> ' + isValid, null);

        if (obj.repDocCpf === undefined || obj.repDocCpf === null) {
          objData.data.repDocCpf = null;
        } else {
          if (obj.repDocCpf === 10) {
            isValid = false;
          } else {
            objData.data.repDocCpf = obj.repDocCpf;
          }
        }
        utils.devLog(2, 'repDocCpf -> ' + isValid, null);

        if (
          obj.repDocRg === undefined ||
          obj.repDocRg === null ||
          obj.repDocRg === ''
        ) {
          objData.data.repDocRg = null;
        } else {
          if (typeof obj.repDocRg !== 'string') {
            isValid = false;
          } else {
            objData.data.repDocRg = obj.repDocRg;
          }
        }
        utils.devLog(2, 'repDocRg -> ' + isValid, null);

        if (
          obj.repDocRgDateExpedition === undefined ||
          obj.repDocRgDateExpedition === null ||
          obj.repDocRgDateExpedition === ''
        ) {
          objData.data.repDocRgDateExpedition = null;
        } else {
          if (typeof obj.repDocRgDateExpedition !== 'string') {
            isValid = false;
          } else {
            objData.data.repDocRgDateExpedition = obj.repDocRgDateExpedition;
          }
        }
        utils.devLog(2, 'repDocRgDateExpedition -> ' + isValid, null);

        if (
          obj.repDocRgExpeditor === undefined ||
          obj.repDocRgExpeditor === null ||
          obj.repDocRgExpeditor === ''
        ) {
          objData.data.repDocRgExpeditor = null;
        } else {
          if (typeof obj.repDocRgExpeditor !== 'string') {
            isValid = false;
          } else {
            objData.data.repDocRgExpeditor = obj.repDocRgExpeditor;
          }
        }
        utils.devLog(2, 'repDocRgExpeditor -> ' + isValid, null);

        if (
          obj.repConPhone1 === undefined ||
          obj.repConPhone1 === null ||
          obj.repConPhone1 === ''
        ) {
          objData.data.repConPhone1 = null;
        } else {
          if (typeof obj.repConPhone1 !== 'string') {
            isValid = false;
          } else {
            objData.data.repConPhone1 = obj.repConPhone1;
          }
        }
        utils.devLog(2, 'repConPhone1 -> ' + isValid, null);

        if (
          obj.repConPhone2 === undefined ||
          obj.repConPhone2 === null ||
          obj.repConPhone2 === ''
        ) {
          objData.data.repConPhone2 = null;
        } else {
          if (typeof obj.repConPhone2 !== 'string') {
            isValid = false;
          } else {
            objData.data.repConPhone2 = obj.repConPhone2;
          }
        }
        utils.devLog(2, 'repConPhone2 -> ' + isValid, null);

        if (
          obj.repConEmail === undefined ||
          obj.repConEmail === null ||
          obj.repConEmail === ''
        ) {
          objData.data.repConEmail = null;
        } else {
          if (typeof obj.repConEmail !== 'string') {
            isValid = false;
          } else {
            objData.data.repConEmail = obj.repConEmail;
          }
        }
        utils.devLog(2, 'repConEmail -> ' + isValid, null);

        if (
          obj.repConEmergencyName === undefined ||
          obj.repConEmergencyName === null ||
          obj.repConEmergencyName === ''
        ) {
          objData.data.repConEmergencyName = null;
        } else {
          if (typeof obj.repConEmergencyName !== 'string') {
            isValid = false;
          } else {
            objData.data.repConEmergencyName = obj.repConEmergencyName;
          }
        }
        utils.devLog(2, 'repConEmergencyName -> ' + isValid, null);

        if (
          obj.repConEmergencyPhone === undefined ||
          obj.repConEmergencyPhone === null ||
          obj.repConEmergencyPhone === ''
        ) {
          objData.data.repConEmergencyPhone = null;
        } else {
          if (typeof obj.repConEmergencyPhone !== 'string') {
            isValid = false;
          } else {
            objData.data.repConEmergencyPhone = obj.repConEmergencyPhone;
          }
        }
        utils.devLog(2, 'repConEmergencyPhone -> ' + isValid, null);

        if (
          obj.repObservations === undefined ||
          obj.repObservations === null ||
          obj.repObservations === ''
        ) {
          objData.data.repObservations = null;
        } else {
          if (typeof obj.repObservations !== 'string') {
            isValid = false;
          } else {
            objData.data.repObservations = obj.repObservations;
          }
        }
        utils.devLog(2, 'repObservations -> ' + isValid, null);

        return isValid;
      } catch (error) {
        return false;
      }
    }
  };

  patch = async ({ body, params }, res) => {
    const objData = { idMain: undefined, id: undefined, data: {} };

    try {
      const perId = 'B005';
      const logMsg =
        'API ==> Controller => companiesRepresentativesPatch -> Start';
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

      let { comId, repId } = params;
      utils.devLog(2, null, comId);
      utils.devLog(2, null, body);
      if (!validateParameters(comId, repId, body)) {
        return utils.resError(
          400,
          `API ==> Controller => companiesRepresentativesPatch -> Invalid parameters`,
          null,
          res
        );
      }

      utils.devLog(
        2,
        'API ==> Controller => companiesRepresentativesPatch : objData',
        null
      );
      utils.devLog(2, null, objData);

      const resCompaniesGetId = await COMPANIES.findByPk(comId);
      if (!resCompaniesGetId) {
        return utils.resError(
          404,
          `API ==> Controller => companiesRepresentativesPatch => companiesGetId -> Not found`,
          null,
          res
        );
      }

      const resRepresentativesCompaniesGetId =
        await COMPANIES_REPRESENTATIVES.findByPk(objData.id);

      if (!resRepresentativesCompaniesGetId) {
        return utils.resError(
          404,
          `API ==> Controller => companiesRepresentativesPatch -> companiesGetId -> Not found`,
          null,
          res
        );
      }

      if (resRepresentativesCompaniesGetId.comId != comId) {
        return utils.resError(
          400,
          `API ==> Controller => companiesRepresentativesPut -> Invalid parameters -> id main/secondary`,
          null,
          res
        );
      }

      await resRepresentativesCompaniesGetId.update(objData.data);

      LogsController.logsCreate(
        useId,
        perId,
        logMsg,
        `=> [${useId}] # Representante: Atualizado [status] ## [${objData.id}] ${resRepresentativesCompaniesGetId.repName}`,
        objData.id
      );
      return utils.resSuccess(
        'API ==> Controller => companiesRepresentativesPatch -> Success',
        { repId: objData.id },
        res
      );
    } catch (error) {
      return utils.resError(
        500,
        `API ==> Controller => companiesRepresentativesPatch -> Error`,
        error,
        res
      );
    }

    function validateParameters(comId, repId, obj) {
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

        repId = Number(repId);
        if (
          repId === undefined ||
          repId === '' ||
          repId === null ||
          isNaN(repId) ||
          typeof repId !== 'number'
        ) {
          isValid = false;
        } else {
          objData.id = repId;
        }
        utils.devLog(2, 'repId -> ' + isValid, null);

        if (
          obj.repStatus === undefined ||
          obj.repStatus === '' ||
          obj.repStatus === null ||
          typeof obj.repStatus !== 'boolean'
        ) {
          isValid = false;
        } else {
          objData.data.repStatus = obj.repStatus;
        }
        utils.devLog(2, 'repStatus -> ' + isValid, null);

        return isValid;
      } catch (error) {
        return false;
      }
    }
  };
}

module.exports = new CompaniesRepresentativesController();
