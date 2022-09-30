const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

require('dotenv').config({
  path:
    process.env.NODE_ENV == 'dev'
      ? path.join(__dirname, './environment/.env.development')
      : process.env.NODE_ENV == 'prod'
      ? path.join(__dirname, './environment/.env.production')
      : null,
});

const routeMain = require('./app/routes/main');
const infraError = require('./app/infra/infraError');

let app = express();

app.set('view engine', 'ejs');
app.use(cors());
app.use(logger('dev'));
app.use(express.json());

app.use(cookieParser());
app.use(express.static(path.join(__dirname, './app/public')));

app.use(express.urlencoded({ extended: true }));

app.use(routeMain);
app.use(infraError);

module.exports = app;
