/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// CONTROLLER USER /////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//  --------------------------------------------------------------------------------------------------------------------------------------- Modules -----

const utils = require("../utils/utils.js");
const md5 = require("md5");

const { EMPLOYEES_SALARY, EMPLOYEES } = require("../models");

//  ------------------------------------------------------------------------------------------------------------------------------------- Class API -----
class EmployeesSalaryController {
  constructor() {
    //   this.step1 = this.step1.bind(this);
    //   this.step2 = this.step2.bind(this);
  }

  async employeesSalaryGetAll(req, res) {
    try {
      utils.devLog(0, "API ==> Controller => employeesSalaryGetAll -> Start", null);

      const resEmployeesSalaryGetAll = await EMPLOYEES_SALARY.findAll({
        include: [{ model: EMPLOYEES, as: "EMPLOYEES" }],
      });

      return utils.resSuccess( "API ==> Controller => employeesSalaryGetAll -> Success", resEmployeesSalaryGetAll, res );
    } catch (error) {
      return utils.resError( 500, `API ==> Controller => employeesSalaryGetAll -> Error`, error, res );
    }
  }

  async employeesSalaryGetId(req, res) {
    try {
      utils.devLog(0, "API ==> Controller => employeesSalaryGetId -> Start", null);

      const { salId } = req.params;

      const resEmployeesSalaryGetId = await EMPLOYEES_SALARY.findByPk(salId, {
        include: [{ model: EMPLOYEES, as: "EMPLOYEES" }],
      });

      if (resEmployeesSalaryGetId) {
        return utils.resSuccess('API ==> Controller => employeesSalaryGetId -> Success',resEmployeesSalaryGetId, res);
      } else {
        return utils.resError(404,`API ==> Controller => employeesSalaryGetId -> Error`, {}, res);
      }
    } catch (error) {
      return utils.resError(500,`API ==> Controller => employeesSalaryGetId -> Error`, error, res);
    }
  }
}

module.exports = new EmployeesSalaryController();
