const path = require('path');
const utils = require('../utils/utils.js');
const FS = require('fs');

const { COMPANIES, COMPANIES_FILES } = require('../models');

const LogsController = require('./LogsController');
const UsersController = require('./UsersController');

const configAuth = require('../config/configAuth.js');
const jwt = require('jsonwebtoken');
const { promisify } = require('util');

class CompaniesFilesController {
  post = async ({ headers: { useId }, body, params, query, file }, res) => {
    const objData = {
      idMain: undefined,
      idSecondary: undefined,
      idTertiary: undefined,
      id: undefined,
      data: {},
    };

    try {
      const perId = 'B003';

      utils.devLog(
        0,
        `API ==> Controller => companiesFilessPost -> Start`,
        null
      );

      const { title } = body;
      const { comId } = params;

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

      console.log('----------------TIPO DO ARQUIVO', file.mimetype);

      if (!validateParameters(useId, comId, title, file)) {
        return utils.resError(
          400,
          `API ==> Controller => companiesFilessPost -> Invalid parameters`,
          null,
          res
        );
      }

      utils.devLog(
        2,
        'API ==> Controller => companiesFilessPost : objData',
        objData
      );

      const resCompaniesGetId = await COMPANIES.findByPk(
        objData.data.comId,
        {}
      );
      if (!resCompaniesGetId) {
        return utils.resError(
          404,
          `API ==> Controller => companiesFilessPost -> companiesGetId -> Not found`,
          null,
          res
        );
        s;
      }

      const resClientsEmployeesFilesPost = await COMPANIES_FILES.create(
        objData.data
      );
      objData.id = resClientsEmployeesFilesPost.dataValues.id;

      LogsController.logsCreate(
        useId,
        perId,
        `API ==> Controller => companiesFilessPost -> Success`,
        `=> [${useId}] # Companias: Arquivos: Upload ## [${objData.id}] ${objData.data.filTitle}`,
        objData.id
      );
      return utils.resSuccess(
        'API ==> Controller => companiesFilessPost -> Success',
        { filId: objData.id },
        res
      );
    } catch (error) {
      return utils.resError(
        500,
        `API ==> Controller => companiesFilessPost -> Error`,
        error,
        res
      );
    }

    function validateParameters(useId, comId, filTitle, file) {
      try {
        let isValid = true;

        utils.devLog(2, 'FILE =>', null);
        utils.devLog(2, null, file);

        objData.data.filStatus = true;

        comId = Number(comId);
        if (
          comId === undefined ||
          comId === '' ||
          comId === null ||
          isNaN(comId) ||
          typeof comId !== 'number' ||
          !utils.validateNumberPositive(comId)
        ) {
          isValid = false;
        } else {
          objData.data.comId = Number(comId);
        }
        utils.devLog(2, 'comId -> ' + isValid, null);

        if (
          filTitle === undefined ||
          filTitle === '' ||
          filTitle === null ||
          typeof filTitle !== 'string'
        ) {
          isValid = false;
        } else {
          objData.data.filTitle = filTitle;
        }
        utils.devLog(2, 'filTitle -> ' + isValid, null);

        if (
          file.mimetype !== 'application/pdf' &&
          file.mimetype !== 'image/jpeg' &&
          file.mimetype !== 'image/png' &&
          file.mimetype !== 'video/mp4' &&
          file.mimetype !==
            'c16c47a0ea1f1d3bf2768b93041a32fcc840d37ffaac005d55dd9e02b82c.avi' &&
          file.mimetype !==
            '7b26b009976bd65568e3e84353b92a76d3a5b92f1ba5f50ad3a072e2ee5d.webm' &&
          file.mimetype !== 'audio/mp3' &&
          file.mimetype !== 'audio/mpeg' &&
          file.mimetype !==
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document' &&
          file.mimetype !==
            '7628f1f17fa42c0703022b5a63f1f0eae7b590f11d7f43d2ee44099e0cad.odt' &&
          file.mimetype !==
            '1702f0346ad73f684596e74abcdb01ca4ae7dd3918750aea09964567366d.xls' &&
          file.mimetype !==
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' &&
          file.mimetype !== 'application/vnd.oasis.opendocument.text' &&
          file.mimetype !== 'application/vnd.oasis.opendocument.spreadsheet' &&
          file.mimetype !== 'application/octet-stream'
        ) {
          isValid = false;
        } else {
          objData.data.filType = path.extname(file.originalname);
        }
        utils.devLog(2, 'filType -> ' + isValid, null);

        if (file.key) {
          objData.data.filKey = file.key;
        } else {
          isValid = false;
        }
        utils.devLog(2, 'filKey -> ' + isValid, null);

        objData.data.filUseId = useId;
        utils.devLog(2, 'filUseId -> ' + isValid, null);

        return isValid;
      } catch (error) {
        return false;
      }
    }
  };

  getAll = async ({ headers, body, params }, res) => {
    const objData = {
      idMain: undefined,
      idSecondary: undefined,
      idTertiary: undefined,
      id: undefined,
      data: {},
    };

    try {
      const perId = 'B003';

      utils.devLog(
        0,
        `API ==> Controller => companiesFilesGetAll -> Start`,
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

      let { comId } = params;
      utils.devLog(2, 'comId', comId);

      if (!validateParameters(comId)) {
        return utils.resError(
          400,
          `API ==> Controller => companiesFilesGetAll -> Invalid parameters`,
          null,
          res
        );
      }

      const resCompaniesGetId = await COMPANIES.findByPk(objData.idMain, {});
      if (!resCompaniesGetId) {
        return utils.resError(
          404,
          `API ==> Controller => companiesFilesGetAll -> companiesGetId -> Not found`,
          null,
          res
        );
      }

      const filter = {
        filStatus: true,
        comId,
      };

      const resCompaniesFilesGetAll = await COMPANIES_FILES.findAll({
        where: filter,
        order: [['id', 'ASC']],
        attributes: { exclude: ['filUseId'] },
      });

      LogsController.logsCreate(
        useId,
        perId,
        `API ==> Controller => companiesFilesGetAll -> Success`,
        `=> [${useId}] #Compainhas: Arquivos: Consultado (todos arquivos) ## [${objData.idSecondary}]`,
        objData.idSecondary
      );

      return utils.resSuccess(
        'API ==> Controller => companiesFilesGetAll -> Success',
        resCompaniesFilesGetAll,
        res
      );
    } catch (error) {
      return utils.resError(
        500,
        `API ==> Controller => companiesFilesGetAll -> Error`,
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
          typeof comId !== 'number' ||
          !utils.validateNumberPositive(comId)
        ) {
          isValid = false;
        } else {
          objData.idMain = Number(comId);
          objData.data.comId = Number(comId);
        }
        utils.devLog(2, 'comId -> ' + isValid, null);

        return isValid;
      } catch (error) {
        return false;
      }
    }
  };

  download = async ({ headers, body, params, query, file }, res) => {
    const objData = {
      idMain: undefined,
      idSecondary: undefined,
      idTertiary: undefined,
      id: undefined,
      data: {},
    };

    try {
      const perId = 'B003';

      utils.devLog(
        0,
        `API ==> Controller => companiesFilesDownload -> Start`,
        null
      );

      const { useId } = body;
      const { comId, filId } = params;

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

      if (!validateParameters(comId, filId)) {
        return utils.resError(
          400,
          `API ==> Controller => companiesFilesDownload -> Invalid parameters`,
          null,
          res
        );
      }

      utils.devLog(
        2,
        'API ==> Controller => companiesFilesDownload : objData',
        objData
      );

      const resCompaniesGetId = await COMPANIES.findByPk(objData.idMain);
      if (!resCompaniesGetId) {
        return utils.resError(
          404,
          `API ==> Controller => companiesFilesDownload -> companiesGetId -> Not found`,
          null,
          res
        );
      }

      const resCompaniesFilesFilesGetId = await COMPANIES_FILES.findByPk(
        objData.data.filId
      );

      if (!resCompaniesFilesFilesGetId) {
        return utils.resError(
          404,
          `API ==> Controller => companiesFilesDownload -> companiesFilesGetId -> Not found`,
          null,
          res
        );
      }

      if (!resCompaniesFilesFilesGetId.filStatus) {
        return utils.resError(
          403,
          `API ==> Controller => companiesFilesDownload -> Forbidden byStatus`,
          null,
          res
        );
      }

      if (resCompaniesFilesFilesGetId.comId != comId) {
        return utils.resError(
          400,
          `API ==> Controller => companiesFilesDownload -> Invalid parameters -> id main/secondary`,
          null,
          res
        );
      }

      const filePATH = path.resolve(__dirname, '..', '..', 'files', 'uploads');
      const fileKEY = resCompaniesFilesFilesGetId.filKey;
      const fileTITLE = resCompaniesFilesFilesGetId.filTitle;

      res.download(
        `${filePATH}/${fileKEY}`,
        `${fileTITLE}${path.extname(resCompaniesFilesFilesGetId.filKey)}`,
        (err) => {
          if (err) {
            utils.devLog(2, null, err);
            return utils.resError(
              500,
              'API ==> Controller => companiesFilesDownload -> Download -> Error',
              utils.devDebugError(err),
              res
            );
          } else {
            LogsController.logsCreate(
              useId,
              perId,
              `API ==> Controller => companiesFilesDownload -> Success`,
              `=> [${useId}] # Companias: Arquivos: Download ## [${objData.id}] ${resCompaniesFilesFilesGetId.filTitle}`,
              objData.id
            );
            return utils.resSuccess(
              'API ==> Controller => companiesFilesDownload -> Success',
              { status: true }
            );
          }
        }
      );
    } catch (error) {
      return utils.resError(
        500,
        `API ==> Controller => companiesFilesDownload -> Error`,
        error,
        res
      );
    }

    function validateParameters(comId, filId) {
      try {
        let isValid = true;

        comId = Number(comId);
        if (
          comId === undefined ||
          comId === '' ||
          comId === null ||
          isNaN(comId) ||
          typeof comId !== 'number' ||
          !utils.validateNumberPositive(comId)
        ) {
          isValid = false;
        } else {
          objData.idMain = Number(comId);
          objData.data.comId = Number(comId);
        }
        utils.devLog(2, 'comId -> ' + isValid, null);

        filId = Number(filId);
        if (
          filId === undefined ||
          filId === '' ||
          filId === null ||
          isNaN(filId) ||
          typeof filId !== 'number' ||
          !utils.validateNumberPositive(filId)
        ) {
          isValid = false;
        } else {
          objData.data.filId = Number(filId);
          objData.id = Number(filId);
        }
        utils.devLog(2, 'filId -> ' + isValid, null);

        return isValid;
      } catch (error) {
        return false;
      }
    }
  };

  view = async ({ body, params }, res) => {
    try {
      const perId = 'B003';

      utils.devLog(
        0,
        `API ==> Controller => companiesFilesView -> Start`,
        null
      );

      const { pathFile, token } = params;

      if (!validateParameters(pathFile, token)) {
        return utils.resError(
          400,
          `API ==> Controller => employeesFilesView -> Invalid parameters`,
          null,
          res
        );
      }

      const decoded = await promisify(jwt.verify)(token, configAuth.secret);
      const useId = decoded.useId;

      if (!useId) {
        return utils.resSuccess(
          'API ==> Controller => sessionsValidateAuth -> Error',
          {
            auth: false,
            errMessage: 'Invalid Token',
          }
        );
      }

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

      const resCompaniesFilesFilesGetId = await COMPANIES_FILES.findOne({
        where: { filKey: pathFile },
      });

      if (!resCompaniesFilesFilesGetId) {
        return utils.resError(
          404,
          `API ==> Controller => companiesFilesView -> companiesFilesGetId -> Not found`,
          null,
          res
        );
      }

      if (!resCompaniesFilesFilesGetId.filStatus) {
        return utils.resError(
          403,
          `API ==> Controller => companiesFilesView -> Forbidden byStatus`,
          null,
          res
        );
      }

      const fileKEY = resCompaniesFilesFilesGetId.filKey;
      const fileTITLE = resCompaniesFilesFilesGetId.filTitle;

      const filePATH = path.resolve(
        __dirname,
        '..',
        '..',
        'files',
        'uploads',
        fileKEY
      );

      res.setHeader(
        'Content-Type',
        path.extname(resCompaniesFilesFilesGetId.filKey)
      );
      res.setHeader(
        'Content-Disposition',
        `inline; filename=${fileTITLE}${path.extname(
          resCompaniesFilesFilesGetId.filKey
        )}`
      );
      FS.createReadStream(filePATH).pipe(res);
    } catch (error) {
      return utils.resError(
        500,
        `API ==> Controller => companiesFilesView -> Error`,
        error,
        res
      );
    }

    function validateParameters(pathFile, token) {
      try {
        let isValid = true;

        if (
          pathFile === undefined ||
          pathFile === '' ||
          pathFile === null ||
          typeof pathFile !== 'string'
        ) {
          isValid = false;
        }

        utils.devLog(2, 'pathFile -> ' + isValid, null);

        if (
          token === undefined ||
          token === '' ||
          token === null ||
          typeof token !== 'string'
        ) {
          isValid = false;
        }

        utils.devLog(2, 'token -> ' + isValid, null);

        return isValid;
      } catch (error) {
        return false;
      }
    }
  };

  find = async ({ headers, body, params, query, file }, res) => {
    const objData = {
      idMain: undefined,
      idSecondary: undefined,
      idTertiary: undefined,
      id: undefined,
      data: {},
    };

    try {
      const perId = 'B003';

      utils.devLog(
        0,
        `API ==> Controller => companiesFilesFind -> Start`,
        null
      );

      const { useId } = body;
      const { pathFile } = params;

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

      if (!validateParameters(pathFile)) {
        return utils.resError(
          400,
          `API ==> Controller => companiesFilesFind -> Invalid parameters`,
          null,
          res
        );
      }

      utils.devLog(
        2,
        'API ==> Controller => companiesFilesFind : objData',
        objData
      );

      const resCompaniesFilesFilesGetId = await COMPANIES_FILES.findOne({
        where: { filKey: pathFile },
      });

      if (!resCompaniesFilesFilesGetId) {
        return utils.resError(
          404,
          `API ==> Controller => companiesFilesFind -> companiesFilesGetId -> Not found`,
          null,
          res
        );
      }

      if (!resCompaniesFilesFilesGetId.filStatus) {
        return utils.resError(
          403,
          `API ==> Controller => companiesFilesFind -> Forbidden byStatus`,
          null,
          res
        );
      }

      const token = jwt.sign({ useId }, configAuth.secret, {
        expiresIn: '1min',
      });

      return utils.resSuccess(
        'API ==> Controller => companiesFilesFind -> Success',
        {
          url: `${headers?.host}/files/companies/${resCompaniesFilesFilesGetId.filKey}/${token}`,
        },
        res
      );
    } catch (error) {
      return utils.resError(
        500,
        `API ==> Controller => companiesFilesFind -> Error`,
        error,
        res
      );
    }

    function validateParameters(pathFile) {
      try {
        let isValid = true;

        if (
          pathFile === undefined ||
          pathFile === '' ||
          pathFile === null ||
          typeof pathFile !== 'string'
        ) {
          isValid = false;
        }
        utils.devLog(2, 'pathFile -> ' + isValid, null);

        return isValid;
      } catch (error) {
        return false;
      }
    }
  };

  patch = async ({ body, params }, res) => {
    const objData = {
      idMain: undefined,
      idSecondary: undefined,
      idTertiary: undefined,
      id: undefined,
      data: {},
    };

    try {
      const perId = 'B005';
      const logMsg = 'API ==> Controller => companiesFilesPatch ->';
      const { useId } = body;

      utils.devLog(0, `${logMsg} Start`, null);
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

      let { comId, filId } = params;
      utils.devLog(2, 'comId', comId);
      utils.devLog(2, 'filId', filId);
      utils.devLog(2, 'body', body);

      if (!validateParameters(comId, filId, body)) {
        return utils.resError(
          400,
          `API ==> Controller => companiesFilesPatch -> Invalid parameters`,
          null,
          res
        );
      }

      utils.devLog(
        2,
        'API ==> Controller => companiesFilesPatch : objData',
        objData
      );

      const resCompaniesGetId = await COMPANIES.findByPk(objData.idMain, {});
      if (!resCompaniesGetId) {
        return utils.resError(
          404,
          `API ==> Controller => companiesFilesPatch -> companiesGetId -> Not found`,
          null,
          res
        );
      }

      const resCompaniesFilesFilesGetId = await COMPANIES_FILES.findByPk(
        objData.id
      );

      if (!resCompaniesFilesFilesGetId) {
        return utils.resError(
          404,
          `API ==> Controller => companiesFilesPatch -> Not found`,
          null,
          res
        );
      }

      if (resCompaniesFilesFilesGetId.comId != comId) {
        return utils.resError(
          400,
          `API ==> Controller => companiesFilesPatch -> Invalid parameters -> id main/secondary`,
          null,
          res
        );
      }

      await resCompaniesFilesFilesGetId.update(objData.data);

      LogsController.logsCreate(
        useId,
        perId,
        `API ==> Controller => companiesFilesPatch -> Success`,
        `=> [${useId}] # Compania: Arquivos: Atualizado [habilitado/desabilitado] ## [${objData.id}] `,
        objData.id
      );
      return utils.resSuccess(
        'API ==> Controller => companiesFilesPatch -> Success',
        { filId: objData.id },
        res
      );
    } catch (error) {
      return utils.resError(
        500,
        `API ==> Controller => companiesFilesPatch -> Error`,
        error,
        res
      );
    }

    function validateParameters(comId, filId, obj) {
      try {
        let isValid = true;

        comId = Number(comId);
        if (
          comId === undefined ||
          comId === '' ||
          comId === null ||
          isNaN(comId) ||
          typeof comId !== 'number' ||
          !utils.validateNumberPositive(comId)
        ) {
          isValid = false;
        } else {
          objData.idMain = Number(comId);
        }
        utils.devLog(2, 'comId -> ' + isValid, null);

        filId = Number(filId);
        if (
          filId === undefined ||
          filId === '' ||
          filId === null ||
          isNaN(filId) ||
          typeof filId !== 'number' ||
          !utils.validateNumberPositive(filId)
        ) {
          isValid = false;
        } else {
          objData.id = Number(filId);
        }
        utils.devLog(2, 'filId -> ' + isValid, null);

        if (
          obj.filStatus === undefined ||
          obj.filStatus === '' ||
          obj.filStatus === null ||
          typeof obj.filStatus !== 'boolean' ||
          !utils.validateBoolean(obj.filStatus)
        ) {
          isValid = false;
          objData.data.filStatus = false;
        } else {
          objData.data.filStatus = obj.filStatus;
        }
        utils.devLog(2, 'filStatus -> ' + isValid, null);

        return isValid;
      } catch (error) {
        return false;
      }
    }
  };
}

module.exports = new CompaniesFilesController();
