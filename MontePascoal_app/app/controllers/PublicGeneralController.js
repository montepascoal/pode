const utils = require('../utils/utils.js');

const {
  CONFIG_STATES,
  CONFIG_CITIES,
  CONFIG_COUNTRIES,
  CONFIG_EMPLOYEES_DEPARTMENTS,
  CONFIG_EMPLOYEES_OCCUPATIONS,
} = require('../models');

class PublicGeneralController {
  async statesGetAll({ body, params }, res) {
    try {
      const perId = '0000';
      const logMsg = 'API ==> Controller => statesGetAll -> Start';

      utils.devLog(0, logMsg, null);
      utils.devLog(2, 'API ==> Permission -> TRUE', null);

      const resStatesGetAll = await CONFIG_STATES.findAll({
        order: [['id', 'ASC']],
        attributes: ['id', 'staName', 'staInitials', 'staIbge', 'staDDD'],
      });

      return utils.resSuccess(
        'API ==> Controller => statesGetAll -> Success',
        resStatesGetAll,
        res
      );
    } catch (error) {
      return utils.resError(
        500,
        `API ==> Controller => statesGetAll -> Error`,
        error,
        res
      );
    }
  }

  async citiesGetAll({ body, params }, res) {
    try {
      const perId = '0000';
      const logMsg = 'API ==> Controller => citiesGetAll -> Start';

      utils.devLog(0, logMsg, null);
      utils.devLog(2, 'API ==> Permission -> TRUE', null);

      let resCitiesGetAll = await CONFIG_CITIES.findAll({
        order: [['id', 'ASC']],
        attributes: ['id', 'citName', 'staId', 'citIbge'],
        include: [
          {
            model: CONFIG_STATES,
            as: 'CONFIG_STATES',
            attributes: ['staName', 'staInitials', 'staIbge', 'staDDD'],
          },
        ],
      });

      return utils.resSuccess(
        'API ==> Controller => citiesGetAll -> Success',
        resCitiesGetAll,
        res
      );
    } catch (error) {
      return utils.resError(
        500,
        `API ==> Controller => citiesGetAll -> Error`,
        error,
        res
      );
    }
  }

  async countriesGetAll({ body, params }, res) {
    try {
      const perId = '0000';
      const logMsg = 'API ==> Controller => countriesGetAll -> Start';

      utils.devLog(0, logMsg, null);
      utils.devLog(2, 'API ==> Permission -> TRUE', null);

      const countries = await CONFIG_COUNTRIES.findAll({
        order: [['id', 'ASC']],
        attributes: [
          'id',
          'couNameGlobal',
          'couName',
          'couInitials',
          'couBacen',
        ],
      });

      return utils.resSuccess(
        'API ==> Controller => countriesGetAll -> Success',
        countries,
        res
      );
    } catch (error) {
      return utils.resError(
        500,
        `API ==> Controller => countriesGetAll -> Error`,
        error,
        res
      );
    }
  }

  async departmentsGetAll({ body, params }, res) {
    try {
      const perId = '0000';
      const logMsg = 'API ==> Controller => departmentsGetAll -> Start';

      utils.devLog(0, logMsg, null);
      utils.devLog(2, 'API ==> Permission -> TRUE', null);

      const departments = await CONFIG_EMPLOYEES_DEPARTMENTS.findAll({
        order: [['id', 'ASC']],
        attributes: ['id', 'depName', 'depStatus'],
      });

      return utils.resSuccess(
        'API ==> Controller => departmentsGetAll -> Success',
        departments,
        res
      );
    } catch (error) {
      return utils.resError(
        500,
        `API ==> Controller => departmentsGetAll -> Error`,
        error,
        res
      );
    }
  }

  async occupationsGetAll({ body, params }, res) {
    try {
      const perId = '0000';
      const logMsg = 'API ==> Controller => occupationsGetAll -> Start';

      utils.devLog(0, logMsg, null);
      utils.devLog(2, 'API ==> Permission -> TRUE', null);

      const departments = await CONFIG_EMPLOYEES_OCCUPATIONS.findAll({
        order: [['id', 'ASC']],
        attributes: ['id', 'occName', 'occStatus', 'depId'],
      });

      return utils.resSuccess(
        'API ==> Controller => occupationsGetAll -> Success',
        departments,
        res
      );
    } catch (error) {
      return utils.resError(
        500,
        `API ==> Controller => occupationsGetAll -> Error`,
        error,
        res
      );
    }
  }
}

module.exports = new PublicGeneralController();
