const utils = require('../utils/utils.js');
const express = require('express');
const router = express.Router();

const DatabaseController = require('../controllers/DatabaseController');
const TestsController = require('../controllers/TestsController');
const PublicSystemController = require('../controllers/PublicSystemController');
const EmployeesFilesController = require('../controllers/EmployeesFilesController.js');
const CompaniesFilesController = require('../controllers/CompaniesFilesController.js');

router.use(function timeLog(req, res, next) {
  utils.devLog(
    1,
    'LOG => PUBLIC -> ' + req.method + ' ' + req.originalUrl,
    null
  );
  next();
});

router.get('/', async function (req, res, next) {
  let dbStatus = null;

  const systemConfig = await PublicSystemController.systemGetAll({});

  try {
    const resDbTest = await DatabaseController.dbTest();
    dbStatus = resDbTest.resData.dbStatus;
    res.render('index', {
      strEnvironment: process.env.ENVIRONMENT,
      strSysName: systemConfig?.resData[0]?.sysValue,
      strSysVersion: systemConfig?.resData[1]?.sysValue,
      strSysLastUpdated: systemConfig?.resData[2]?.sysValue,
      strStatusDatabase: dbStatus,
    });
  } catch (error) {
    console.error(error);
    dbStatus = false;
  }
});

router.get('/test', TestsController.testStatus);

router.get('/files/companies/:pathFile/:token', CompaniesFilesController.view);
router.get('/files/employees/:pathFile/:token', EmployeesFilesController.view);

module.exports = router;
