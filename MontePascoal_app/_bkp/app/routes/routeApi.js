/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// ROUTE ADM /////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// ======================================================================================================================================================
//  --------------------------------------------------------------------------------------------------------------------------------------- Modules -----
// ======================================================================================================================================================

const utils = require("../utils/utils.js");
const express = require("express");
const multer = require("multer");
const multerConfig = require("../config/configMulter");

const router = express.Router();

const SessionsController = require("../controllers/SessionsController");
const PublicSystemController = require("../controllers/PublicSystemController.js");
const PublicGeneralController = require("../controllers/PublicGeneralController.js");
const TestsController = require("../controllers/TestsController");
const CompaniesController = require("../controllers/CompaniesController");
const EmployeesController = require("../controllers/EmployeesController");
const EmployeesMembersController = require("../controllers/EmployeesMembersController");
const EmployeesFilesController = require("../controllers/EmployeesFilesController");
const UsersController = require("../controllers/UsersController.js");
const ProvidersController = require("../controllers/ProvidersController");
const ProvidersContactsController = require("../controllers/ProvidersContactsController");
const ProvidersFilesController = require("../controllers/ProvidersFilesController");
const ProvidersServicesController = require("../controllers/ProvidersServicesController");
const PartnersController = require("../controllers/PartnersController");
const PartnersContactsController = require("../controllers/PartnersContactsController");
const PartnersFilesController = require("../controllers/PartnersFilesController");
const PartnersServicesController = require("../controllers/PartnersServicesController");
const ClientsController = require("../controllers/ClientsController");
const ClientsEmployeesController = require("../controllers/ClientsEmployeesController");
const ClientsEmployeesFilesController = require("../controllers/ClientsEmployeesFilesController");
const ClientsMembersController = require("../controllers/ClientsMembersController");
const ClientsMembersFilesController = require("../controllers/ClientsMembersFilesController");
const ClientsFilesController = require("../controllers/ClientsFilesController");
const UtilsController = require("../controllers/UtilsController");
const AuditsController = require("../controllers/AuditsController");
const ConfigEmployeesDepartmentsController = require("../controllers/ConfigEmployeesDepartmentsController");
const ConfigEmployeesOccupationsController = require("../controllers/ConfigEmployeesOccupationsController");
const ConfigProvidersServicesController = require("../controllers/ConfigProvidersServicesController");
const ConfigPartnersServicesController = require("../controllers/ConfigPartnersServicesController");

// ======================================================================================================================================================
//  ------------------------------------------------------------------------------------------------------------------------------------ Middleware -----
// ======================================================================================================================================================

router.use(async function timeLog(req, res, next) {
  utils.devLog(1, "LOG => API -> " + req.method + " " + req.originalUrl, null);

  const objResAuth = await SessionsController.sessionsValidateAuth(req.headers);

  if (objResAuth.resData.auth) {
    req.body.useId = objResAuth.resData.useId;
    req.headers.useId = objResAuth.resData.useId;
    next();
  } else {
    return utils.resError(
      401,
      `API ==> Controller => sessionsValidateAuth -> Error`,
      { errMessage: "Invalid Token" },
      res
    );
  }
});

// ======================================================================================================================================================
//  -------------------------------------------------------------------------------------------------------------------------------------- GET VIEW -----
// ======================================================================================================================================================

// router.get('/', function(req, res, next) {
//   res.send('API - Home');
// });
router.get("/", TestsController.testStatusAuth);

// ======================================================================================================================================================
//  -------------------------------------------------------------------------------------------------------------------------------------- API REST -----
// ======================================================================================================================================================

// ==========================================================================================================================
// ------------------------------------------------------------------------------------------------------------- PUBLIC -----
// ==========================================================================================================================

router.get("/public/companies", PublicGeneralController.companiesGetAll);
router.get("/public/countries", PublicGeneralController.countriesGetAll);
router.get("/public/states", PublicGeneralController.statesGetAll);
router.get("/public/cities", PublicGeneralController.citiesGetAll);
router.get("/public/employees/departments", PublicGeneralController.employeesDepartmentsGetAll);
router.get("/public/employees/occupations", PublicGeneralController.employeesOccupationsGetAll);
router.get("/public/providers/services", PublicGeneralController.providersServicesGetAll);
router.get("/public/partners/services", PublicGeneralController.partnersServicesGetAll);

// ==========================================================================================================================
// -------------------------------------------------------------------------------------------------------------- USERS -----
// ==========================================================================================================================

router.get("/auth", UsersController.usersValidate);                                                                   // 0000
router.get("/users/permission/:usePerId", UsersController.usersValidatePermission);                                   // 0000

router.patch("/users/password/reset", UsersController.usersPatchPasswordReset);                                       // 0000
router.post("/users", UsersController.usersPost);                                                                     // C001
router.get("/users", UsersController.usersGetAll);                                                                    // C002
router.get("/users/:id", UsersController.usersGetId);                                                                 // C003
router.get("/users/:id/logs", UsersController.usersGetLogs);                                                          // C004
router.patch("/users/:id/companies", UsersController.usersPatchCompanies);                                            // C005
// router.patch("/users/:id/password", UsersController.usersPatchPassword);                                           // C005 ADM
router.patch("/users/:id/password/generate", UsersController.usersPatchPasswordGenerate);                             // C005
router.patch("/users/:id/permission", UsersController.usersPatchPermission);                                          // C005
router.patch("/users/:id/nickname", UsersController.usersPatchNickname);                                              // C005
router.patch("/users/:id/status", UsersController.usersPatchStatus);                                                  // C006
// delete - disabled -                                                                                                // C007

// ==========================================================================================================================
// ---------------------------------------------------------------------------------------------------------- COMPANIES -----
// ==========================================================================================================================

router.post("/companies", CompaniesController.companiesPost);
router.get("/companies", CompaniesController.companiesGetAll);
router.get("/companies/:comId", CompaniesController.companiesGetId);
router.put("/companies/:comId", CompaniesController.companiesPut);
router.patch("/companies/:comId", CompaniesController.companiesPatch);
// router.delete('/companies/:comId', CompaniesController.companiesDelete); // Somente ADM

// ==========================================================================================================================
// ---------------------------------------------------------------------------------------------------------- EMPLOYEES -----
// ==========================================================================================================================

router.post("/employees", EmployeesController.employeesPost);
router.get("/employees", EmployeesController.employeesGetAll);
router.get("/employees/:empId", EmployeesController.employeesGetId);
router.get("/employees/:empId/user", EmployeesController.employeesCheckUser);
router.put("/employees/:empId", EmployeesController.employeesPut);
router.patch("/employees/:empId", EmployeesController.employeesPatch);
// router.delete('/employees/:empId', EmployeesController.employeesDelete); // Somente ADM

router.post(
  "/employees/:empId/members",
  EmployeesMembersController.employeesMembersPost
);
router.get(
  "/employees/:empId/members",
  EmployeesMembersController.employeesMembersGetAll
);
router.put(
  "/employees/:empId/members/:memId",
  EmployeesMembersController.employeesMembersPut
);
router.patch(
  "/employees/:empId/members/:memId",
  EmployeesMembersController.employeesMembersPatch
);
// router.delete('/employees/:empId/members/:memId', EmployeesMembersController.employeesMembersDelete); // Somente ADM

// ==========================================================================================================================
// ---------------------------------------------------------------------------------------------------- EMPLOYEES FILES -----
// ==========================================================================================================================

router.post(
  "/employees/:empId/files/:memId/upload", 
  multer(multerConfig).single("file"), 
  EmployeesFilesController.employeesFilesUpload 
  // FilesController.test
);
router.get(
  "/employees/:empId/files/:memId/download/:filId",
  EmployeesFilesController.employeesFilesDownload
);
router.get(
  "/employees/:empId/files",
  EmployeesFilesController.employeesFilesGetAll
);
router.patch(
  "/employees/:empId/files/:filId",
  EmployeesFilesController.employeesFilesPatch
);
// router.delete('/employees/:empId/files/:filId', EmployeesFilesController.employeesFilesDelete); // Somente ADM

// ==========================================================================================================================
// ---------------------------------------------------------------------------------------------------------- PROVIDERS -----
// ==========================================================================================================================

router.post("/providers", ProvidersController.providersPost);                                                         // D001
router.get("/providers", ProvidersController.providersGetAll);                                                        // D002
router.get("/providers/:proId", ProvidersController.providersGetId);                                                  // D003
router.put("/providers/:proId", ProvidersController.providersPut);                                                    // D004
router.patch("/providers/:proId", ProvidersController.providersPatch);                                                // D005
// router.delete('/providers/:proId', ProvidersController.providersDelete);                                           // D006 ADM

// ----- PROVIDERS_CONTACTS

router.post("/providers/:proId/contacts", ProvidersContactsController.providersContactsPost);                         // D001
router.get("/providers/:proId/contacts", ProvidersContactsController.providersContactsGetAll);                        // D003
router.patch("/providers/:proId/contacts/:conId", ProvidersContactsController.providersContactsPatch);                // D004
// router.delete('/providers/:proId/contacts/:conId', ProvidersContactsController.providersContactsDelete);           // D006 ADM

// ----- PROVIDERS_FILES

router.post("/providers/:proId/files/upload", 
  multer(multerConfig).single("file"), 
  ProvidersFilesController.providersFilesUpload );                                                                    // D004
router.get("/providers/:proId/files/download/:filId", ProvidersFilesController.providersFilesDownload );              // D003
router.get("/providers/:proId/files", ProvidersFilesController.providersFilesGetAll );                                // D003
router.patch("/providers/:proId/files/:filId", ProvidersFilesController.providersFilesPatch );                        // D005
// router.delete('/providers/:proId/files/:filId', ProvidersFilesController.providersFilesDelete );                   // D006 ADM

// ----- PROVIDERS_SERVICES

router.patch("/providers/:proId/services", ProvidersServicesController.providersServicesPatch);                       // D004
router.get("/providers/:proId/services", ProvidersServicesController.providersServicesGetAll);                        // D003

// ==========================================================================================================================
// ----------------------------------------------------------------------------------------------------------- PARTNERS -----
// ==========================================================================================================================

router.post("/partners", PartnersController.partnersPost);                                                          // D001
router.get("/partners", PartnersController.partnersGetAll);                                                          // D002
router.get("/partners/:parId", PartnersController.partnersGetId);                                                    // D003
router.put("/partners/:parId", PartnersController.partnersPut);                                                      // D004
router.patch("/partners/:parId", PartnersController.partnersPatch);                                                  // D005
// router.delete('/partners/:parId', PartnersController.partnersDelete);                                             // D006 ADM

// ----- PARTNERS_CONTACTS

router.post("/partners/:parId/contacts", PartnersContactsController.partnersContactsPost);                           // D001
router.get("/partners/:parId/contacts", PartnersContactsController.partnersContactsGetAll);                          // D003
router.patch("/partners/:parId/contacts/:conId", PartnersContactsController.partnersContactsPatch);                  // D004
// router.delete('/partners/:parId/contacts/:conId', PartnersContactsController.partnersContactsDelete);             // D006 ADM

// ----- PARTNERS_FILES

router.post("/partners/:parId/files/upload", 
  multer(multerConfig).single("file"), 
  PartnersFilesController.partnersFilesUpload );                                                                     // D004
router.get("/partners/:parId/files/download/:filId", PartnersFilesController.partnersFilesDownload );                // D003
router.get("/partners/:parId/files", PartnersFilesController.partnersFilesGetAll );                                  // D003
router.patch("/partners/:parId/files/:filId", PartnersFilesController.partnersFilesPatch );                          // D005
// router.delete('/partners/:parId/files/:filId', PartnersFilesController.partnersFilesDelete );                     // D006 ADM

// ----- PARTNERS_SERVICES

router.patch("/partners/:parId/services", PartnersServicesController.partnersServicesPatch);                         // E004
router.get("/partners/:parId/services", PartnersServicesController.partnersServicesGetAll);                          // E003

// ==========================================================================================================================
// ------------------------------------------------------------------------------------------------------------ CLIENTS -----
// ==========================================================================================================================

router.post("/clients", ClientsController.clientsPost);                                                               // F001
router.get("/clients", ClientsController.clientsGetAll);                                                              // F002
router.get("/clients/:cliId", ClientsController.clientsGetId);                                                        // F003
router.put("/clients/:cliId", ClientsController.clientsPut);                                                          // F004
router.patch("/clients/:cliId", ClientsController.clientsPatch);                                                      // F005
// router.delete('/clients/:cliId', ClientsController.clientsDelete);                                                 // F006 NOT

// ----- CLIENTS_FILES

router.post("/clients/:cliId/files/upload", 
  multer(multerConfig).single("file"), 
  ClientsFilesController.clientsFilesUpload );                                                                        // F004
router.get("/clients/:cliId/files/download/:filId", ClientsFilesController.clientsFilesDownload );                    // F003
router.get("/clients/:cliId/files", ClientsFilesController.clientsFilesGetAll );                                      // F003
router.patch("/clients/:cliId/files/:filId", ClientsFilesController.clientsFilesPatch );                              // F005
// router.delete('/clients/:cliId/files/:filId', ClientsFilesController.clientsFilesDelete );                         // F006 NOT

// ----- CLIENTS_EMPLOYEES

router.post("/clients/:cliId/employees", ClientsEmployeesController.clientsEmployeesPost);                            // F001
router.get("/clients/:cliId/employees", ClientsEmployeesController.clientsEmployeesGetAll);                           // F003
router.get("/clients/:cliId/employees/:empId", ClientsEmployeesController.clientsEmployeesGetId);                     // F003
router.put("/clients/:cliId/employees/:empId", ClientsEmployeesController.clientsEmployeesPut);                       // F004
router.patch("/clients/:cliId/employees/:empId", ClientsEmployeesController.clientsEmployeesPatch);                   // F005
// router.delete('/clients/:cliId/employees/:empId', ClientsEmployeesController.clientsEmployeesDelete);              // F006 NOT

// ----- CLIENTS_EMPLOYEES_FILES

router.post("/clients/:cliId/employees/:empId/files/upload", 
  multer(multerConfig).single("file"), 
  ClientsEmployeesFilesController.clientsEmployeesFilesUpload );                                                      // F004
router.get("/clients/:cliId/employees/:empId/files/download/:filId",
  ClientsEmployeesFilesController.clientsEmployeesFilesDownload );                                                    // F003
router.get("/clients/:cliId/employees/:empId/files",
  ClientsEmployeesFilesController.clientsEmployeesFilesGetAll );                                                      // F003
router.patch("/clients/:cliId/employees/:empId/files/:filId",
  ClientsEmployeesFilesController.clientsEmployeesFilesPatch );                                                       // F005
// router.delete('/clients/:cliId/employees/:empId/files/:filId',
  //ClientsEmployeesFilesController.clientsEmployeesFilesDelete );                                                    // F006 NOT

// ----- CLIENTS_MEMBERS

router.post("/clients/:cliId/employees/:empId/members", ClientsMembersController.clientsMembersPost);                 // F001
router.get("/clients/:cliId/employees/:empId/members", ClientsMembersController.clientsMembersGetAll);                // F003
router.get("/clients/:cliId/employees/:empId/members/:memId", ClientsMembersController.clientsMembersGetId);          // F003
router.put("/clients/:cliId/employees/:empId/members/:memId", ClientsMembersController.clientsMembersPut);            // F004
router.patch("/clients/:cliId/employees/:empId/members/:memId", ClientsMembersController.clientsMembersPatch);        // F005
// router.delete('/clients/:cliId/employees/:empId/members/:memId', ClientsMembersController.clientsMembersDelete);   // D006 NOT
router.get("/members", ClientsMembersController.clientsMembersGetAllGeneral);                                         // F002
router.get("/members/:memId", ClientsMembersController.clientsMembersGetIdPartners);                                  // E007

// ----- CLIENTS_MEMBERS_FILES

router.post("/clients/:cliId/employees/:empId/members/:memId/files/upload", 
  multer(multerConfig).single("file"), 
  ClientsMembersFilesController.clientsMembersFilesUpload );                                                          // F004
router.get("/clients/:cliId/employees/:empId/members/:memId/files/download/:filId",
  ClientsMembersFilesController.clientsMembersFilesDownload );                                                        // F003
router.get("/clients/:cliId/employees/:empId/members/:memId/files",
  ClientsMembersFilesController.clientsMembersFilesGetAll );                                                          // F003
router.patch("/clients/:cliId/employees/:empId/members/:memId/files/:filId",
  ClientsMembersFilesController.clientsMembersFilesPatch );                                                           // F005
// router.delete('/clients/:cliId/employees/:empId/members/:memId/files/:filId',
  //ClientsMembersFilesController.clientsMembersFilesDelete );                                                        // F006 NOT

// ----- PARTNERS_CONTACTS

// router.post("/partners/:parId/contacts", PartnersContactsController.partnersContactsPost);                           // D001
// router.get("/partners/:parId/contacts", PartnersContactsController.partnersContactsGetAll);                          // D003
// router.patch("/partners/:parId/contacts/:conId", PartnersContactsController.partnersContactsPatch);                  // D004
// // router.delete('/partners/:parId/contacts/:conId', PartnersContactsController.partnersContactsDelete);             // D006 ADM

// // ----- PARTNERS_SERVICES

// router.patch("/partners/:parId/services", PartnersServicesController.partnersServicesPatch);                         // E004
// router.get("/partners/:parId/services", PartnersServicesController.partnersServicesGetAll);                          // E003

// ===========================================================================================================================
// -------------------------------------------------------------------------------------------------------------- AUDITS -----
// ===========================================================================================================================

// router.post("/clients", ClientsController.clientsPost);                                                            // F001
router.get("/audits/members", AuditsController.auditsMembersGetAll);                                                  // F008
router.get("/audits/members/:memId", AuditsController.auditsMembersGetId);                                            // F008
router.patch("/audits/clients/:cliId/employees/:empId/members/:memId", AuditsController.auditsMembersPatch);          // F008
// router.patch("/clients/:cliId", ClientsController.clientsPatch);                                                   // F005
// router.delete('/clients/:cliId', ClientsController.clientsDelete);                                                 // F006 NOT

// ==========================================================================================================================
// ------------------------------------------------------------------------------------------------------------- CONFIG -----
// ==========================================================================================================================

router.post("/config/employees/departments", ConfigEmployeesDepartmentsController.departmentsPost);                   // Z001
router.get("/config/employees/departments", ConfigEmployeesDepartmentsController.departmentsGetAll);                  // Z001
router.get("/config/employees/departments/:depId", ConfigEmployeesDepartmentsController.departmentsGetId);            // Z001
router.put("/config/employees/departments/:depId", ConfigEmployeesDepartmentsController.departmentsPut);              // Z001

router.post("/config/employees/departments/:depId/occupations", 
  ConfigEmployeesOccupationsController.occupationsPost);                                                              // Z002
router.get("/config/employees/departments/0/occupations", 
  ConfigEmployeesOccupationsController.occupationsGetAll);                                                            // Z002
router.get("/config/employees/departments/:depId/occupations/:occId", 
  ConfigEmployeesOccupationsController.occupationsGetId);                                                             // Z002
router.put("/config/employees/departments/:depId/occupations/:occId", 
  ConfigEmployeesOccupationsController.occupationsPut);                                                               // Z002

router.post("/config/providers/services", ConfigProvidersServicesController.servicesPost);                            // Z003
router.get("/config/providers/services", ConfigProvidersServicesController.servicesGetAll);                           // Z003
router.get("/config/providers/services/:serId", ConfigProvidersServicesController.servicesGetId);                     // Z003
router.put("/config/providers/services/:serId", ConfigProvidersServicesController.servicesPut);                       // Z003

router.post("/config/partners/services", ConfigPartnersServicesController.servicesPost);                              // Z004
router.get("/config/partners/services", ConfigPartnersServicesController.servicesGetAll);                             // Z004
router.get("/config/partners/services/:serId", ConfigPartnersServicesController.servicesGetId);                       // Z004
router.put("/config/partners/services/:serId", ConfigPartnersServicesController.servicesPut);                         // Z004

// ==========================================================================================================================
// -------------------------------------------------------------------------------------------------------------- UTILS -----
// ==========================================================================================================================

router.get("/cnpj/:cnpj", UtilsController.utilsGetDataCnpj);

// ======================================================================================================================================================
//  --------------------------------------------------------------------------------------------------------------------------------------- Exports -----
// ======================================================================================================================================================

module.exports = router;
