/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// ROUTES MAIN /////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//  --------------------------------------------------------------------------------------------------------------------------------------- Modules -----

const express = require('express');
const path = require('path');

//  ---------------------------------------------------------------------------------------------------------------------------------------- Config -----

let app = express();
app.set('views', path.join(__dirname, '../views'));

//  -------------------------------------------------------------------------------------------------------------------------------- Routes Modules -----

// 
// const routeAuth = require('./routeAdm');
const routeApi = require('./routeApi');
const routeAuth = require('./routeAuth');
const routeDev = require('./routeDev');
const routePublic = require('./routePublic');

//  ----------------------------------------------------------------------------------------------------------------------------------- Routes Main -----

// IMPORTANT: Do Not Change Order

// app.use('/auth', routeAuth);
app.use('/dev', routeDev);
app.use('/auth', routeAuth);
app.use('/api', routeApi);
app.use('/', routePublic);

//  --------------------------------------------------------------------------------------------------------------------------------------- Exports -----
module.exports = app;