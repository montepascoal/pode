const utils = require('../utils/utils.js');
const express = require('express');

const router = express.Router();

const PublicSystemController = require('../controllers/PublicSystemController.js');

router.use(function timeLog(req, res, next) {
  console.log(`======================================================`);
  utils.devLog(
    1,
    'LOG => API [dev] -> ' + req.method + ' ' + req.originalUrl,
    null
  );
  next();
});

router.get('/', function (req, res, next) {
  res.send('API DEV - Home');
});

router.get('/version', PublicSystemController.systemCheckVersion);

module.exports = router;
