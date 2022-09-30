/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// ROUTE ADM /////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//  --------------------------------------------------------------------------------------------------------------------------------------- Modules -----

const utils     = require('../utils/utils.js');
const express   = require('express');
const router    = express.Router();

const SessionsController = require('../controllers/SessionsController');

//  ------------------------------------------------------------------------------------------------------------------------------------ Middleware -----

router.use(async function timeLog (req, res, next) {

  utils.devLog(1, "LOG => Auth -> " + req.method + " " + req.originalUrl, null);
  // const objResAuth = await controllerSession.sessionValidateAuth(req.headers);

  // if (objResAuth.resStatus) {
  //   req.body.useId = objResAuth.resData.useId;
  //   next();
  // }else{
  //   return res.json(objResAuth);
  // }
  next();

});

//  -------------------------------------------------------------------------------------------------------------------------------------- GET VIEW -----

router.get('/', function(req, res, next) {
  res.send('Auth - Home');
});

// router.post('/step1', controllerApi.step1);
// router.post('/step2', controllerApi.step2);

router.post('/login', SessionsController.sessionsLogin);
router.post('/logout', SessionsController.sessionsLogout);

//  --------------------------------------------------------------------------------------------------------------------------------------- Exports -----
module.exports = router;
