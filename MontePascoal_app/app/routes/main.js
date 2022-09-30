const express = require('express');
const path = require('path');

let app = express();
app.set('views', path.join(__dirname, '../views'));

const routeApi = require('./routeApi');
const routeAuth = require('./routeAuth');
const routeDev = require('./routeDev');
const routePublic = require('./routePublic');

app.use('/dev', routeDev);
app.use('/auth', routeAuth);
app.use('/api', routeApi);
app.use('/', routePublic);

module.exports = app;
