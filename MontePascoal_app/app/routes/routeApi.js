const utils = require('../utils/utils.js');
const express = require('express');
const multer = require('multer');
const multerConfig = require('../config/configMulter');

const router = express.Router();

const SessionsController = require('../controllers/SessionsController');
const UsersController = require('../controllers/UsersController.js');
const UtilsController = require('../controllers/UtilsController');
const TestsController = require('../controllers/TestsController');
const PublicGeneralController = require('../controllers/PublicGeneralController.js');
const PublicSystemController = require('../controllers/PublicSystemController.js');
const PermissionsController = require('../controllers/PermissionsController.js');
const ConfigEmployeesDepartmentsController = require('../controllers/ConfigEmployeesDepartmentsController.js');
const ConfigEmployeesOccupationsController = require('../controllers/ConfigEmployeesOccupationsController.js');
const CompaniesMainController = require('../controllers/CompaniesMainController.js');
const CompaniesController = require('../controllers/CompaniesController.js');
const CompaniesRepresentativesController = require('../controllers/CompaniesRepresentativesController.js');
const CompaniesFilesController = require('../controllers/CompaniesFilesController.js');
const EmployeesController = require('../controllers/EmployeesController.js');
const EmployeesFilesController = require('../controllers/EmployeesFilesController.js');

router.use(async function timeLog(req, res, next) {
  utils.devLog(1, 'LOG => API -> ' + req.method + ' ' + req.originalUrl, null);

  const objResAuth = await SessionsController.sessionsValidateAuth(req.headers);

  if (objResAuth.resData.auth) {
    req.body.useId = objResAuth.resData.useId;
    req.headers.useId = objResAuth.resData.useId;
    next();
  } else {
    return utils.resError(
      401,
      `API ==> Controller => sessionsValidateAuth -> Error`,
      { errMessage: 'Invalid Token' },
      res
    );
  }
});

//0000
router.get('/auth', UsersController.validate);
router.get('/users/permission/:usePerId', UsersController.validatePermission);

//D001 - D005
router.post('/users', UsersController.post);
router.get('/users', UsersController.getAll);
router.get('/users/:id', UsersController.get);
router.get('/users/:id/logs', UsersController.getLogs);
router.patch('/users/:id/companies', UsersController.patchCompanies);
router.patch('/users/:id/password/generate', UsersController.passwordGenerate);
router.patch('/users/:id/permission', UsersController.patchPermission);
router.patch('/users/:id/nickname', UsersController.patchNickname);
router.patch('/users/:id/status', UsersController.patchStatus);
router.patch('/users/password/reset', UsersController.patchPasswordReset);

router.get('/cnpj/:cnpj', UtilsController.utilsGetDataCnpj);
router.get('/test', TestsController.testStatus);

router.get('/public/about', PublicSystemController.systemGetAll);
router.get('/public/countries', PublicGeneralController.countriesGetAll);
router.get('/public/states', PublicGeneralController.statesGetAll);
router.get('/public/cities', PublicGeneralController.citiesGetAll);
router.get('/public/permissions', PermissionsController.permissionsGetAll);
router.get(
  '/public/employees/departments',
  PublicGeneralController.departmentsGetAll
);
router.get(
  '/public/employees/occupations',
  PublicGeneralController.occupationsGetAll
);

// Z001
router.post(
  '/config/employees/departments',
  ConfigEmployeesDepartmentsController.post
);
router.get(
  '/config/employees/departments',
  ConfigEmployeesDepartmentsController.getAll
);
router.get(
  '/config/employees/departments/:depId',
  ConfigEmployeesDepartmentsController.get
);
router.put(
  '/config/employees/departments/:depId',
  ConfigEmployeesDepartmentsController.put
);

// Z002
router.post(
  '/config/employees/departments/:depId/occupations',
  ConfigEmployeesOccupationsController.post
);
router.get(
  '/config/employees/occupations',
  ConfigEmployeesOccupationsController.getAll
);
router.get(
  '/config/employees/departments/:depId/occupations',
  ConfigEmployeesOccupationsController.getByDepartment
);
router.get(
  '/config/employees/departments/:depId/occupations/:occId',
  ConfigEmployeesOccupationsController.get
);
router.put(
  '/config/employees/departments/:depId/occupations/:occId',
  ConfigEmployeesOccupationsController.put
);

// A003
router.put('/companies-main/:comId', CompaniesMainController.put);
router.get('/companies-main/:comId', CompaniesMainController.get);

// B001 - B005
router.post('/companies', CompaniesController.post);
router.get('/companies', CompaniesController.getAll);
router.get('/companies/:comId', CompaniesController.get);
router.put('/companies/:comId', CompaniesController.put);
router.patch('/companies/:comId', CompaniesController.patch);

// B003 - B005
router.post(
  '/companies/:comId/representatives',
  CompaniesRepresentativesController.post
);
router.get(
  '/companies/:comId/representatives',
  CompaniesRepresentativesController.getAll
);
router.get(
  '/companies/:comId/representatives/:repId',
  CompaniesRepresentativesController.get
);
router.put(
  '/companies/:comId/representatives/:repId',
  CompaniesRepresentativesController.put
);
router.patch(
  '/companies/:comId/representatives/:repId',
  CompaniesRepresentativesController.patch
);

// B003 - B005
router.post(
  '/companies/:comId/files',
  multer(multerConfig).single('file'),
  CompaniesFilesController.post
);
router.get('/companies/:comId/files', CompaniesFilesController.getAll);
router.get('/companies/:comId/files/:filId', CompaniesFilesController.download);
router.get('/companies/files/:pathFile', CompaniesFilesController.find);
router.patch('/companies/:comId/files/:filId', CompaniesFilesController.patch);

// C001 - C005
router.post('/employees', EmployeesController.post);
router.get('/employees', EmployeesController.getAll);
router.get('/employees/:empId', EmployeesController.get);
router.put('/employees/:empId', EmployeesController.put);
router.patch('/employees/:empId', EmployeesController.patch);
router.get('/employees/:empId/user', EmployeesController.checkUser);

// C003 - C005
router.post(
  '/employees/:empId/files',
  multer(multerConfig).single('file'),
  EmployeesFilesController.post
);
router.get('/employees/:empId/files', EmployeesFilesController.getAll);
router.get('/employees/:empId/files/:filId', EmployeesFilesController.download);
router.get('/employees/files/:pathFile', EmployeesFilesController.find);
router.patch('/employees/:empId/files/:filId', EmployeesFilesController.patch);

module.exports = router;
