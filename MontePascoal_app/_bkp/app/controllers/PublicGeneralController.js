/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// CONTROLLER USER /////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//  --------------------------------------------------------------------------------------------------------------------------------------- Modules -----

const { Op } = require("sequelize");

const utils = require('../utils/utils.js');

const { COMPANIES, CONFIG_COUNTRIES, CONFIG_STATES, CONFIG_CITIES, CONFIG_EMPLOYEES_DEPARTMENTS, CONFIG_EMPLOYEES_OCCUPATIONS, CONFIG_PROVIDERS_SERVICES, CONFIG_PARTNERS_SERVICES } = require('../models');

const LogsController = require('./LogsController');
const UsersController = require('./UsersController');

//  ------------------------------------------------------------------------------------------------------------------------------------- Class API -----
class PublicGeneralController {

  constructor(){
    // this.step1 = this.step1.bind(this);
    // this.step2 = this.step2.bind(this);
  }

  companiesGetAll = async ({body,params}, res) => {
    try {
      const perId = "0000";
      const logMsg = "API ==> Controller => Config => companiesGetAll -> Start";
      const { useId } = body;
      
      utils.devLog(0, logMsg, null);
      // utils.devLog(2, null, useId);
      const objResAuth = await UsersController.usersPermission(useId,perId);
      if (!objResAuth.resData.permission) {
        utils.devLog(2, "API ==> Permission -> FALSE", null);
        return utils.resError(403, objResAuth.resMessage, {perId: objResAuth.resData.perId}, res );
      }
      utils.devLog(2, "API ==> Permission -> TRUE", null);
      
      // Check filters
      const filters = [];
      if (objResAuth.resData.useKeyCompany !== 0) {
        filters.push({ id: objResAuth.resData.useKeyCompany });
      }
        // filters.push({ comStatus: true });
      const objFilter = {
        [Op.and]: filters
      };
      // GET Data
      const resCompaniesGetAll = await COMPANIES.findAll({
        where: objFilter,
        order: [
          ['id', 'ASC'],
        ],
        // attributes: [['id','value'], ['id', 'comName']],
        attributes: ['id', 'comStatus', 'comName'],
        include: [
          // { model: CONFIG_COUNTRIES, as: "CONFIG_COUNTRIES_inf" },
        ],
      });

      // Validate Permission all 
      if (objResAuth.resData.useKeyCompany === 0) {
        resCompaniesGetAll.unshift({ id: 0, comName: 'Todas as Empresas' });
      }

      return utils.resSuccess('API ==> Controller => Config => companiesGetAll -> Success', resCompaniesGetAll, res );
    } catch (error) {
      return utils.resError(500,`API ==> Controller => Config => companiesGetAll -> Error`, error, res);
    }
  }

  async countriesGetAll ({body,params}, res) {
    try {
      const perId = "0000";
      const logMsg = "API ==> Controller => countriesGetAll -> Start";
      const { useId } = body;
      
      utils.devLog(0, logMsg, null);
      // utils.devLog(2, null, useId);
      utils.devLog(2, "API ==> Permission -> TRUE", null);
      
      // GET Data
      const resCountriesGetAll = await CONFIG_COUNTRIES.findAll({
        order: [
          ['id', 'ASC'],
        ],
        // attributes: ['id', 'couName'],
        include: [
          // { model: CONFIG_COUNTRIES, as: "CONFIG_COUNTRIES_inf" },
        ],
      });

      return utils.resSuccess('API ==> Controller => countriesGetAll -> Success', resCountriesGetAll, res );
    } catch (error) {
      return utils.resError(500,`API ==> Controller => countriesGetAll -> Error`, error, res);
    }
  }

  async statesGetAll ({body,params}, res) {
    try {
      const perId = "0000";
      const logMsg = "API ==> Controller => statesGetAll -> Start";
      const { useId } = body;
      
      utils.devLog(0, logMsg, null);
      // utils.devLog(2, null, useId);
      utils.devLog(2, "API ==> Permission -> TRUE", null);
      
      // GET Data
      const resStatesGetAll = await CONFIG_STATES.findAll({
        order: [
          ['id', 'ASC'],
        ],
        attributes: ['id', 'staName'],
        include: [
          // { model: CONFIG_COUNTRIES, as: "CONFIG_COUNTRIES_inf" },
        ],
      });

      return utils.resSuccess('API ==> Controller => statesGetAll -> Success', resStatesGetAll, res );
    } catch (error) {
      return utils.resError(500,`API ==> Controller => statesGetAll -> Error`, error, res);
    }
  }

  async citiesGetAll ({body,params}, res) {
    try {
      const perId = "0000";
      const logMsg = "API ==> Controller => citiesGetAll -> Start";
      const { useId } = body;
      
      utils.devLog(0, logMsg, null);
      // utils.devLog(2, null, useId);
      utils.devLog(2, "API ==> Permission -> TRUE", null);
      
      // GET Data
      const resCitiesGetAll = await CONFIG_CITIES.findAll({
        order: [
          ['id', 'ASC'],
        ],
        attributes: ['id', 'citName', 'staId'],
        include: [
          // { model: CONFIG_COUNTRIES, as: "CONFIG_COUNTRIES_inf" },
        ],
      });

      return utils.resSuccess('API ==> Controller => citiesGetAll -> Success', resCitiesGetAll, res );
    } catch (error) {
      return utils.resError(500,`API ==> Controller => citiesGetAll -> Error`, error, res);
    }
  }

  employeesDepartmentsGetAll = async ({body,params}, res) => {
    try {
      const perId = "0000";
      const logMsg = "API ==> Controller => Config => employeesDepartmentsGetAll -> Start";
      const { useId } = body;
      
      utils.devLog(0, logMsg, null);
      // utils.devLog(2, null, useId);
      const objResAuth = await UsersController.usersPermission(useId,perId);
      if (!objResAuth.resData.permission) {
        utils.devLog(2, "API ==> Permission -> FALSE", null);
        return utils.resError(403, objResAuth.resMessage, {perId: objResAuth.resData.perId}, res );
      }
      utils.devLog(2, "API ==> Permission -> TRUE", null);
      
      // Check filters
      const filters = [];
            // filters.push({ depStatus: true });
      const objFilter = {
        [Op.and]: filters
      };
      // GET Data
      const resEmployeesDepartmentsGetAll = await CONFIG_EMPLOYEES_DEPARTMENTS.findAll({
        where: objFilter,
        order: [
          ['id', 'ASC'],
        ],
        attributes: ['id', 'depName', 'depStatus'],
      });

      return utils.resSuccess('API ==> Controller => Config => employeesDepartmentsGetAll -> Success', resEmployeesDepartmentsGetAll, res );
    } catch (error) {
      return utils.resError(500,`API ==> Controller => Config => employeesDepartmentsGetAll -> Error`, error, res);
    }
  }

  employeesOccupationsGetAll = async ({body,params}, res) => {
    try {
      const perId = "0000";
      const logMsg = "API ==> Controller => Config => employeesOccupationsGetAll -> Start";
      const { useId } = body;
      
      utils.devLog(0, logMsg, null);
      // utils.devLog(2, null, useId);
      const objResAuth = await UsersController.usersPermission(useId,perId);
      if (!objResAuth.resData.permission) {
        utils.devLog(2, "API ==> Permission -> FALSE", null);
        return utils.resError(403, objResAuth.resMessage, {perId: objResAuth.resData.perId}, res );
      }
      utils.devLog(2, "API ==> Permission -> TRUE", null);
      
      // Check filters
      const filters = [];
            // filters.push({ occStatus: true });
      const objFilter = {
        [Op.and]: filters
      };
      // GET Data
      const resEmployeesOccupationsGetAll = await CONFIG_EMPLOYEES_OCCUPATIONS.findAll({
        where: objFilter,
        order: [
          ['id', 'ASC'],
        ],
        attributes: ['id', 'depId', 'occName', 'occStatus'],
      });

      return utils.resSuccess('API ==> Controller => Config => employeesOccupationsGetAll -> Success', resEmployeesOccupationsGetAll, res );
    } catch (error) {
      return utils.resError(500,`API ==> Controller => Config => employeesOccupationsGetAll -> Error`, error, res);
    }
  }

  providersServicesGetAll = async ({body,params}, res) => {
    try {
      const perId = "0000";
      const logMsg = "API ==> Controller => Config => providersServicesGetAll -> Start";
      const { useId } = body;
      
      utils.devLog(0, logMsg, null);
      // utils.devLog(2, null, useId);
      const objResAuth = await UsersController.usersPermission(useId,perId);
      if (!objResAuth.resData.permission) {
        utils.devLog(2, "API ==> Permission -> FALSE", null);
        return utils.resError(403, objResAuth.resMessage, {perId: objResAuth.resData.perId}, res );
      }
      utils.devLog(2, "API ==> Permission -> TRUE", null);
      
      // Check filters
      // const filters = [];
      //       filters.push({ serStatus: true });
      // const objFilter = {
      //   [Op.and]: filters
      // };
      // GET Data
      const resProvidersServicesGetAll = await CONFIG_PROVIDERS_SERVICES.findAll({
        // where: objFilter,
        order: [
          ['serName', 'ASC'],
        ],
        attributes: ['id', 'serName', 'serStatus'],
      });

      return utils.resSuccess('API ==> Controller => Config => providersServicesGetAll -> Success', resProvidersServicesGetAll, res );
    } catch (error) {
      return utils.resError(500,`API ==> Controller => Config => providersServicesGetAll -> Error`, error, res);
    }
  }

  partnersServicesGetAll = async ({body,params}, res) => {
    try {
      const perId = "0000";
      const logMsg = "API ==> Controller => Config => partnersServicesGetAll -> Start";
      const { useId } = body;
      
      utils.devLog(0, logMsg, null);
      // utils.devLog(2, null, useId);
      const objResAuth = await UsersController.usersPermission(useId,perId);
      if (!objResAuth.resData.permission) {
        utils.devLog(2, "API ==> Permission -> FALSE", null);
        return utils.resError(403, objResAuth.resMessage, {perId: objResAuth.resData.perId}, res );
      }
      utils.devLog(2, "API ==> Permission -> TRUE", null);
      
      // Check filters
      // const filters = [];
      //       filters.push({ serStatus: true });
      // const objFilter = {
      //   [Op.and]: filters
      // };
      // GET Data
      const resPartnersServicesGetAll = await CONFIG_PARTNERS_SERVICES.findAll({
        // where: objFilter,
        order: [
          ['serName', 'ASC'],
        ],
        attributes: ['id', 'serName', 'serStatus'],
      });

      return utils.resSuccess('API ==> Controller => Config => partnersServicesGetAll -> Success', resPartnersServicesGetAll, res );
    } catch (error) {
      return utils.resError(500,`API ==> Controller => Config => partnersServicesGetAll -> Error`, error, res);
    }
  }

}

module.exports = new PublicGeneralController(); 