const path = require('path');
const utils = require('../utils/utils.js');
const FS = require('fs');

const { EMPLOYEES, EMPLOYEES_FILES } = require('../models');

const LogsController = require('./LogsController');
const UsersController = require('./UsersController');

const configAuth = require('../config/configAuth.js');
const jwt = require('jsonwebtoken');
const { promisify } = require('util');

class EmployeesFilesController {
  post = async ({ headers: { useId }, body, params, query, file }, res) => {
    const objData = {
      idMain: undefined,
      idSec: undefined,
      id: undefined,
      data: {},
    };

    try {
      const perId = 'C003';
      const logMsg = 'API ==> Controller => employeesFilesUpload -> Start';

      const { title } = body;
      const { empId } = params;

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

      if (!validateParameters(useId, empId, title, file)) {
        return utils.resError(
          400,
          `API ==> Controller => employeesFilesUpload -> Invalid parameters`,
          null,
          res
        );
      }

      utils.devLog(
        2,
        'API ==> Controller => employeesFilesUpload : objData',
        null
      );
      utils.devLog(2, null, objData);

      const resEmployeesGetId = await EMPLOYEES.findByPk(objData.idMain);
      if (resEmployeesGetId) {
        if (objResAuth.resData.useKeyCompany !== 0) {
          if (resEmployeesGetId.comId !== objResAuth.resData.useKeyCompany) {
            return utils.resError(
              403,
              'API ==> Controller => usersPermission -> Forbidden byId',
              null,
              res
            );
          }
        }
      } else {
        return utils.resError(
          404,
          `API ==> Controller => employeesFilesUpload -> employeesGetId -> Not found`,
          null,
          res
        );
      }

      const resEmployeesFilesPost = await EMPLOYEES_FILES.create(objData.data);
      objData.id = resEmployeesFilesPost.dataValues.id;

      LogsController.logsCreate(
        useId,
        perId,
        logMsg,
        `=> [${useId}] # Colaborador (Arquivos): Upload ## [${objData.id}] ${objData.data.filTitle}`,
        objData.id
      );
      return utils.resSuccess(
        'API ==> Controller => employeesFilesUpload -> Success',
        { filId: objData.id },
        res
      );
    } catch (error) {
      return utils.resError(
        500,
        `API ==> Controller => employeesFilesUpload -> Error`,
        error,
        res
      );
    }

    function validateParameters(useId, empId, filTitle, file) {
      try {
        let isValid = true;

        utils.devLog(2, 'FILE =>', null);
        utils.devLog(2, null, file);

        empId = Number(empId);
        if (
          empId === undefined ||
          empId === '' ||
          empId === null ||
          isNaN(empId) ||
          typeof empId !== 'number' ||
          !utils.validateNumberPositive(empId)
        ) {
          isValid = false;
        } else {
          objData.idMain = Number(empId);
          objData.data.empId = Number(empId);
        }
        utils.devLog(2, 'empId -> ' + isValid, null);

        objData.data.filStatus = true;
        utils.devLog(2, 'filStatus -> ' + isValid, null);

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
    const objData = { idMain: undefined, id: undefined, data: {} };

    try {
      const perId = 'C003';
      const logMsg = 'API ==> Controller => employeesFilesGetAll -> Start';
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

      let { empId } = params;
      if (!validateParameters(empId)) {
        return utils.resError(
          400,
          `API ==> Controller => employeesFilesGetId -> Invalid parameters`,
          null,
          res
        );
      }

      const resEmployeesGetId = await EMPLOYEES.findByPk(objData.idMain);
      if (resEmployeesGetId) {
        if (objResAuth.resData.useKeyCompany !== 0) {
          if (resEmployeesGetId.comId !== objResAuth.resData.useKeyCompany) {
            return utils.resError(
              403,
              'API ==> Controller => usersPermission -> Forbidden byId',
              null,
              res
            );
          }
        }
      } else {
        return utils.resError(
          404,
          `API ==> Controller => employeesFilesGetAll -> employeesGetId -> Not found`,
          null,
          res
        );
      }

      const filter = {
        empId: objData.idMain,
      };
      const resEmployeesFilesGetAll = await EMPLOYEES_FILES.findAll({
        where: filter,
        order: [['id', 'ASC']],
        attributes: { exclude: ['filUseId'] },
      });

      LogsController.logsCreate(
        useId,
        perId,
        logMsg,
        `=> [${useId}] # Colaborador (Arquivos): Listagem geral ## [geral]`,
        null
      );
      return utils.resSuccess(
        'API ==> Controller => employeesFilesGetAll -> Success',
        resEmployeesFilesGetAll,
        res
      );
    } catch (error) {
      return utils.resError(
        500,
        `API ==> Controller => employeesFilesGetAll -> Error`,
        error,
        res
      );
    }

    function validateParameters(empId) {
      try {
        let isValid = true;

        empId = Number(empId);
        if (
          empId === undefined ||
          empId === '' ||
          empId === null ||
          isNaN(empId) ||
          typeof empId !== 'number' ||
          !utils.validateNumberPositive(empId)
        ) {
          isValid = false;
        } else {
          objData.idMain = Number(empId);
        }

        return isValid;
      } catch (error) {
        return false;
      }
    }
  };

  download = async ({ body, params, query, file }, res) => {
    const objData = { idMain: undefined, id: undefined, data: {} };

    try {
      const perId = 'C003';
      const logMsg = 'API ==> Controller => employeesFilesDownload -> Start';

      const { useId } = body;
      const { empId, filId } = params;

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

      if (!validateParameters(empId, filId)) {
        return utils.resError(
          400,
          `API ==> Controller => employeesFilesDownload -> Invalid parameters`,
          null,
          res
        );
      }

      utils.devLog(
        2,
        'API ==> Controller => employeesFilesDownload : objData',
        null
      );
      utils.devLog(2, null, objData);

      const resEmployeesGetId = await EMPLOYEES.findByPk(objData.idMain);
      if (resEmployeesGetId) {
        if (objResAuth.resData.useKeyCompany !== 0) {
          if (resEmployeesGetId.comId !== objResAuth.resData.useKeyCompany) {
            return utils.resError(
              403,
              'API ==> Controller => usersPermission -> Forbidden byId',
              null,
              res
            );
          }
        }
      } else {
        return utils.resError(
          404,
          `API ==> Controller => employeesFilesDownload -> employeesGetId -> Not found`,
          null,
          res
        );
      }

      const resEmployeesFilesGetId = await EMPLOYEES_FILES.findByPk(
        objData.data.filId
      );
      if (resEmployeesFilesGetId) {
        if (resEmployeesFilesGetId.empId === resEmployeesGetId.id) {
          if (resEmployeesFilesGetId.filStatus) {
          } else {
            return utils.resError(
              403,
              `API ==> Controller => usersPermission -> Forbidden byStatus`,
              null,
              res
            );
          }
        } else {
          return utils.resError(
            400,
            `API ==> Controller => employeesFilesDownload -> resEmployeesFilesGetId -> Invalid parameters -> id main`,
            null,
            res
          );
        }
      } else {
        return utils.resError(
          404,
          `API ==> Controller => employeesFilesDownload -> resEmployeesFilesGetId -> Not found`,
          null,
          res
        );
      }

      const filePATH = path.resolve(__dirname, '..', '..', 'files', 'uploads');
      const fileKEY = resEmployeesFilesGetId.filKey;
      const fileTITLE = resEmployeesFilesGetId.filTitle;

      res.download(
        `${filePATH}/${fileKEY}`,
        `${fileTITLE}${path.extname(resEmployeesFilesGetId.filKey)}`,
        (err) => {
          if (err) {
            utils.devLog(2, null, err);
            return utils.resError(
              500,
              'API ==> Controller => employeesFilesDownload -> Download -> Error',
              utils.devDebugError(err),
              res
            );
          } else {
            LogsController.logsCreate(
              useId,
              perId,
              logMsg,
              `=> [${useId}] # Colaborador (Arquivos): Download ## [${objData.id}] ${resEmployeesFilesGetId.filTitle}`,
              objData.id
            );
            return utils.resSuccess(
              'API ==> Controller => employeesFilesDownload -> Success',
              { status: true }
            );
          }
        }
      );
    } catch (error) {
      return utils.resError(
        500,
        `API ==> Controller => employeesFilesDownload -> Error`,
        error,
        res
      );
    }

    function validateParameters(empId, filId) {
      try {
        let isValid = true;

        empId = Number(empId);
        if (
          empId === undefined ||
          empId === '' ||
          empId === null ||
          isNaN(empId) ||
          typeof empId !== 'number' ||
          !utils.validateNumberPositive(empId)
        ) {
          isValid = false;
        } else {
          objData.idMain = Number(empId);
        }
        utils.devLog(2, 'empId -> ' + isValid, null);

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
      const perId = 'C003';

      utils.devLog(
        0,
        `API ==> Controller => employeesFilesView -> Start`,
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

      const resEmployeesFilesGetId = await EMPLOYEES_FILES.findOne({
        where: { filKey: pathFile },
      });

      if (!resEmployeesFilesGetId) {
        return utils.resError(
          404,
          `API ==> Controller => employeesFilesView -> employeesFilesGetId -> Not found`,
          null,
          res
        );
      }

      if (!resEmployeesFilesGetId.filStatus) {
        return utils.resError(
          403,
          `API ==> Controller => employeesFilesView -> Forbidden byStatus`,
          null,
          res
        );
      }

      const fileKEY = resEmployeesFilesGetId.filKey;
      const fileTITLE = resEmployeesFilesGetId.filTitle;

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
        path.extname(resEmployeesFilesGetId.filKey)
      );
      res.setHeader(
        'Content-Disposition',
        `inline; filename=${fileTITLE}${path.extname(
          resEmployeesFilesGetId.filKey
        )}`
      );
      FS.createReadStream(filePATH).pipe(res);
    } catch (error) {
      return utils.resError(
        500,
        `API ==> Controller => employeesFilesView -> Error`,
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
        `API ==> Controller => employeesFilesFind -> Start`,
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
          `API ==> Controller => employeesFilesFind -> Invalid parameters`,
          null,
          res
        );
      }

      utils.devLog(
        2,
        'API ==> Controller => employeesFilesFind : objData',
        objData
      );

      const resEmployeesFilesGetId = await EMPLOYEES_FILES.findOne({
        where: { filKey: pathFile },
      });

      if (!resEmployeesFilesGetId) {
        return utils.resError(
          404,
          `API ==> Controller => employeesFilesFind -> employeesFilesGetId -> Not found`,
          null,
          res
        );
      }

      if (!resEmployeesFilesGetId.filStatus) {
        return utils.resError(
          403,
          `API ==> Controller => employeesFilesFind -> Forbidden byStatus`,
          null,
          res
        );
      }

      const token = jwt.sign({ useId }, configAuth.secret, {
        expiresIn: '1min',
      });

      return utils.resSuccess(
        'API ==> Controller => employeesFilesFind -> Success',
        {
          url: `${headers?.host}/files/employees/${resEmployeesFilesGetId.filKey}/${token}`,
        },
        res
      );
    } catch (error) {
      return utils.resError(
        500,
        `API ==> Controller => employeesFilesFind -> Error`,
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
    const objData = { idMain: undefined, id: undefined, data: {} };

    try {
      const perId = 'C005';
      const logMsg = 'API ==> Controller => employeesFilesPatch -> Start';
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

      let { empId, filId } = params;
      utils.devLog(2, null, empId);
      utils.devLog(2, null, filId);
      utils.devLog(2, null, body);
      if (!validateParameters(empId, filId, body)) {
        return utils.resError(
          400,
          `API ==> Controller => employeesFilesPatch -> Invalid parameters`,
          null,
          res
        );
      }

      utils.devLog(
        2,
        'API ==> Controller => employeesFilesPatch : objData',
        null
      );
      utils.devLog(2, null, objData);

      const resEmployeesGetId = await EMPLOYEES.findByPk(objData.idMain);
      if (resEmployeesGetId) {
        if (objResAuth.resData.useKeyCompany !== 0) {
          if (resEmployeesGetId.comId !== objResAuth.resData.useKeyCompany) {
            return utils.resError(
              403,
              'API ==> Controller => usersPermission -> Forbidden byId',
              null,
              res
            );
          }
        }
      } else {
        return utils.resError(
          404,
          `API ==> Controller => employeesFilesPatch -> employeesGetId -> Not found`,
          null,
          res
        );
      }

      const resEmployeesFilesGetId = await EMPLOYEES_FILES.findByPk(objData.id);
      if (resEmployeesFilesGetId) {
        if (resEmployeesFilesGetId.empId === objData.idMain) {
        } else {
          return utils.resError(
            400,
            `API ==> Controller => employeesFilesPatch -> Invalid parameters -> id main`,
            null,
            res
          );
        }
      } else {
        return utils.resError(
          404,
          `API ==> Controller => employeesFilesPatch -> employeesFilesGetId -> Not found`,
          null,
          res
        );
      }

      await resEmployeesFilesGetId.update(objData.data);

      LogsController.logsCreate(
        useId,
        perId,
        logMsg,
        `=> [${useId}] # Colaborador (Arquivos): Atualizado [habilitado/desabilitado] ## [${objData.id}] ${resEmployeesFilesGetId.filTitle}`,
        objData.id
      );
      return utils.resSuccess(
        'API ==> Controller => employeesFilesPatch -> Success',
        { filId: objData.id },
        res
      );
    } catch (error) {
      return utils.resError(
        500,
        `API ==> Controller => employeesFilesPatch -> Error`,
        error,
        res
      );
    }

    function validateParameters(empId, filId, obj) {
      try {
        let isValid = true;

        empId = Number(empId);
        if (
          empId === undefined ||
          empId === '' ||
          empId === null ||
          isNaN(empId) ||
          typeof empId !== 'number' ||
          !utils.validateNumberPositive(empId)
        ) {
          isValid = false;
        } else {
          objData.idMain = Number(empId);
        }
        utils.devLog(2, 'empId -> ' + isValid, null);

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

module.exports = new EmployeesFilesController();
