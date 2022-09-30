/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// ROUTE ADM /////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//  --------------------------------------------------------------------------------------------------------------------------------------- Modules -----

const utils     = require('../utils/utils.js');
const express   = require('express');
const router    = express.Router();

const DatabaseController = require('../controllers/DatabaseController');
const TestsController = require('../controllers/TestsController');

//  ------------------------------------------------------------------------------------------------------------------------------------ Middleware -----

router.use(function timeLog (req, res, next) {
  utils.devLog(1, "LOG => PUBLIC -> " + req.method + " " + req.originalUrl, null);
  next();
});

//  -------------------------------------------------------------------------------------------------------------------------------------- GET VIEW -----

router.get('/', async function (req, res, next) {

  let dbStatus = null;
  try {
    const resDbTest = await DatabaseController.dbTest();
      dbStatus = resDbTest.resData.dbStatus;
      console.log(dbStatus);
    res.render('index', {
      strEnvironment: process.env.ENVIRONMENT,
      strSysName: process.env.SYS_NAME,
      strSysVersion: process.env.SYS_VERSION,
      strSysLastUpdated: process.env.SYS_LASTUPDATED,
      strStatusDatabase: dbStatus,
    });
  } catch (error) {
    console.error(error);
    dbStatus = false;
  }

});

router.get('/test', TestsController.testStatus);

//  --------------------------------------------------------------------------------------------------------------------------------------- Exports -----
module.exports = router;