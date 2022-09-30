/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// SERVER NODE /////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//  --------------------------------------------------------------------------------------------------------------------------------------- Modules -----

const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");

require("dotenv").config({
  path:
    process.env.NODE_ENV == 'dev'
      ? path.join(__dirname, "./environment/.env.development")
      : process.env.NODE_ENV == 'prod'
      ? path.join(__dirname, "./environment/.env.production")
      : null,
});
// require("dotenv").config();

const routeMain = require("./app/routes/main");
const infraError = require("./app/infra/infraError");

//  ---------------------------------------------------------------------------------------------------------------------------------------- Config -----

let app = express();

app.set("view engine", "ejs");
app.use(cors());
app.use(logger("dev"));
app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "./app/public")));

app.use(express.urlencoded({ extended: true })); // Permite o envio e recebimento de arquivos diversos up down (url encoded)

// Link direto para arquivos físicos em upload
// app.use('/files', express.static(path.resolve(__dirname, 'files')));

app.use(routeMain);
app.use(infraError);

//  --------------------------------------------------------------------------------------------------------------------------------------- Exports -----

module.exports = app;
