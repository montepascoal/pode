const utils = require('../utils/utils.js');
const express = require('express');
const router = express.Router();

const SessionsController = require('../controllers/SessionsController');

router.use(async function timeLog(req, res, next) {
  utils.devLog(1, 'LOG => Auth -> ' + req.method + ' ' + req.originalUrl, null);
  next();
});

router.get('/', function (req, res, next) {
  res.send('Auth - Home');
});

router.post('/login', SessionsController.sessionsLogin);
router.post('/logout', SessionsController.sessionsLogout);

module.exports = router;
