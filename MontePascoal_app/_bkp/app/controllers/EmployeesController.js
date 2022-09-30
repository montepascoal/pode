/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// CONTROLLER USER /////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//  --------------------------------------------------------------------------------------------------------------------------------------- Modules -----

const utils = require("../utils/utils.js");

const {
  USERS,
  EMPLOYEES,
  COMPANIES,
  CONFIG_COUNTRIES,
  CONFIG_STATES,
  CONFIG_CITIES,
  CONFIG_EMPLOYEES_DEPARTMENTS,
  CONFIG_EMPLOYEES_OCCUPATIONS,
} = require("../models");

const LogsController = require('./LogsController');
const UsersController = require('./UsersController');

//  ------------------------------------------------------------------------------------------------------------------------------------- Class API -----
class EmployeesController {
  constructor() {
    //   this.step1 = this.step1.bind(this);
    //   this.step2 = this.step2.bind(this);
  }

  employeesPost = async ({body,params}, res) => {
    const objData = { idMain: undefined, id: undefined, data: {} };

    try {
      const perId = "B001";
      const logMsg = "API ==> Controller => employeesPost -> Start";
      const { useId } = body;

      utils.devLog(0, logMsg, null);
      const objResAuth = await UsersController.usersPermission(useId,perId);
      if (!objResAuth.resData.permission) {
        utils.devLog(2, "API ==> Permission -> FALSE", null);
        return utils.resError(403, objResAuth.resMessage, { perId: objResAuth.resData.perId }, res );
      }
      utils.devLog(2, "API ==> Permission -> TRUE", null);

      // Function Controller Action
      // let { empId } = params;
      utils.devLog(2, null, body);
      if (!validateParameters(body)) {
        return utils.resError(400,`API ==> Controller => employeesPost -> Invalid parameters`, null, res);
      }

      utils.devLog(2, "API ==> Controller => employeesPost : objData", null);
      utils.devLog(2, null, objData);

      // Verifica se usuário possui permissão geral sobre as empresas
      if (objResAuth.resData.useKeyCompany !== 0) {
        // Verifica se o registro que deseja alterar pertente a empresa que possui permissão
        if (objData.data.comId !== objResAuth.resData.useKeyCompany) {
          return utils.resError(403, "API ==> Controller => usersPermission -> Forbidden byId", null, res );
        }
      }

      // Check unique key => empDocCpf
      const resEmployeesGetId = await EMPLOYEES.findAll({
        where: {
          empDocCpf: objData.data.empDocCpf
        }
      });
      utils.devLog(2, null, resEmployeesGetId);
      if (resEmployeesGetId.length > 0) {
        return utils.resError(409, "API ==> Controller => employeesPost -> Unique-key conflict", null, res );
      }

      // Save DATA
      const resEmployeesPost = await EMPLOYEES.create(objData.data);
      objData.id = resEmployeesPost.dataValues.id;

      LogsController.logsCreate(useId, perId, logMsg, `=> [${useId}] # Colaborador: Cadastrado ## [${objData.id}] ${objData.data.empName}`, objData.id);
      return utils.resSuccess('API ==> Controller => employeesPost -> Success',{empId: objData.id }, res);    

    } catch (error) {
      return utils.resError(500,`API ==> Controller => employeesPost -> Error`, error, res);
    }

    function validateParameters(obj) {
      try {
        let isValid = true;

        // empStatus
        objData.data.empStatus = true;
        utils.devLog(2, 'empStatus -> '+isValid, null);

        // comId
        obj.comId = Number(obj.comId);
        if (
          obj.comId === undefined ||
          obj.comId === "" ||
          obj.comId === null ||
          isNaN(obj.comId) ||
          typeof(obj.comId) !== "number"||
          !utils.validateNumberPositive(obj.comId)
        ) {
          isValid = false;
        } else {
          objData.data.comId = Number(obj.comId);
        }
        utils.devLog(2, 'comId -> '+isValid, null);

        // useId
        objData.data.useId = 1; // noAuth
        utils.devLog(2, 'useId -> '+isValid, null);

        // empName
        if (
          obj.empName === undefined ||
          obj.empName === "" ||
          obj.empName === null ||
          typeof(obj.empName) !== "string"
        ) {
          isValid = false;
        } else {
          objData.data.empName = obj.empName;
        }
        utils.devLog(2, 'comName -> '+isValid, null);

        // empDocBirthDate
        if (!utils.dateDateStrToDate(obj.empDocBirthDate)) {
          isValid = false;
        } else {
          objData.data.empDocBirthDate = utils.dateDateStrToDate(obj.empDocBirthDate);
        }
        utils.devLog(2, 'empDocBirthDate -> '+isValid, null);

        // empInfBirthPlaceCouId
        obj.empInfBirthPlaceCouId = Number(obj.empInfBirthPlaceCouId);
        if (
          obj.empInfBirthPlaceCouId === undefined ||
          obj.empInfBirthPlaceCouId === "" ||
          obj.empInfBirthPlaceCouId === null ||
          isNaN(obj.empInfBirthPlaceCouId) ||
          typeof(obj.empInfBirthPlaceCouId) !== "number"||
          !utils.validateNumberPositive(obj.empInfBirthPlaceCouId)
        ) {
          isValid = false;
        } else {
          objData.data.empInfBirthPlaceCouId = 1;// 1 = Brasil // Number(obj.empInfBirthPlaceCouId);
        }
        utils.devLog(2, 'empInfBirthPlaceCouId -> '+isValid, null);

        // empInfBirthPlaceStaId
        obj.empInfBirthPlaceStaId = Number(obj.empInfBirthPlaceStaId);
        if (
          obj.empInfBirthPlaceStaId === undefined ||
          obj.empInfBirthPlaceStaId === "" ||
          obj.empInfBirthPlaceStaId === null ||
          isNaN(obj.empInfBirthPlaceStaId) ||
          typeof(obj.empInfBirthPlaceStaId) !== "number"||
          !utils.validateNumberPositive(obj.empInfBirthPlaceStaId)
        ) {
          isValid = false;
        } else {
          objData.data.empInfBirthPlaceStaId = Number(obj.empInfBirthPlaceStaId);
        }
        utils.devLog(2, 'empInfBirthPlaceStaId -> '+isValid, null);

        // empInfBirthPlaceCitId
        obj.empInfBirthPlaceCitId = Number(obj.empInfBirthPlaceCitId);
        if (
          obj.empInfBirthPlaceCitId === undefined ||
          obj.empInfBirthPlaceCitId === "" ||
          obj.empInfBirthPlaceCitId === null ||
          isNaN(obj.empInfBirthPlaceCitId) ||
          typeof(obj.empInfBirthPlaceCitId) !== "number" ||
          !utils.validateNumberPositive(obj.empInfBirthPlaceCitId)
        ) {
          isValid = false;
        } else {
          objData.data.empInfBirthPlaceCitId = Number(obj.empInfBirthPlaceCitId);
        }
        utils.devLog(2, 'empInfBirthPlaceCitId -> '+isValid, null);

        // empInfMaritalStatus
        if (obj.empInfMaritalStatus === undefined ||
          obj.empInfMaritalStatus === null) {
          objData.data.empInfMaritalStatus = null;
        } else {
          if (
            obj.empInfMaritalStatus !== "Solteiro" &&
            obj.empInfMaritalStatus !== "Casado" &&
            obj.empInfMaritalStatus !== "Viúvo" &&
            obj.empInfMaritalStatus !== "Divorciado"
          ) {
            isValid = false;
          } else {
            objData.data.empInfMaritalStatus = obj.empInfMaritalStatus;
          }
        }
        utils.devLog(2, 'empInfMaritalStatus -> '+isValid, null);

        // empInfDegreeEducation
        if (obj.empInfDegreeEducation === undefined ||
          obj.empInfDegreeEducation === null) {
          objData.data.empInfDegreeEducation = null;
        } else {
          if (
            obj.empInfDegreeEducation !== "Analfabeto" &&
            obj.empInfDegreeEducation !== "Ensino fundamental incompleto" &&
            obj.empInfDegreeEducation !== "Ensino fundamental completo" &&
            obj.empInfDegreeEducation !== "Ensino médio incompleto" &&
            obj.empInfDegreeEducation !== "Ensino médio completo" &&
            obj.empInfDegreeEducation !== "Superior incompleto" &&
            obj.empInfDegreeEducation !== "Superior completo" &&
            obj.empInfDegreeEducation !== "Pós-graduação" &&
            obj.empInfDegreeEducation !== "Mestrado" &&
            obj.empInfDegreeEducation !== "Doutorado" &&
            obj.empInfDegreeEducation !== "Pós-Doutorado"
          ) {
            isValid = false;
          } else {
            objData.data.empInfDegreeEducation = obj.empInfDegreeEducation;
          }
        }
        utils.devLog(2, 'empInfDegreeEducation -> '+isValid, null);

        // empInfMother
        if (obj.empInfMother === undefined||
          obj.empInfMother === null) {
          objData.data.empInfMother = null;
        } else {
          if (
            obj.empInfMother === "" ||
            typeof(obj.empInfMother) !== "string"
          ) {
            isValid = false;
          } else {
            objData.data.empInfMother = obj.empInfMother;
          }
        }
        utils.devLog(2, 'empInfMother -> '+isValid, null);

        // empInfDad
        if (obj.empInfDad === undefined||
          obj.empInfDad === null) {
          objData.data.empInfDad = null;
        } else {
          if (
            obj.empInfDad === "" ||
            typeof(obj.empInfDad) !== "string"
          ) {
            isValid = false;
          } else {
            objData.data.empInfDad = obj.empInfDad;
          }
        }
        utils.devLog(2, 'empInfDad -> '+isValid, null);

        // empAddCep
        if (
          obj.empAddCep === undefined ||
          obj.empAddCep === "" ||
          obj.empAddCep === null ||
          typeof(obj.empAddCep) !== "string" ||
          obj.empAddCep.length !== 8
        ) {
          isValid = false;
        } else {
          objData.data.empAddCep = obj.empAddCep;
        }
        utils.devLog(2, 'empAddCep -> '+isValid, null);

        // empAddAddress
        if (
          obj.empAddAddress === undefined ||
          obj.empAddAddress === "" ||
          obj.empAddAddress === null ||
          typeof(obj.empAddAddress) !== "string"
        ) {
          isValid = false;
        } else {
          objData.data.empAddAddress = obj.empAddAddress;
        }
        utils.devLog(2, 'empAddAddress -> '+isValid, null);

        // empAddComplement
        if (obj.empAddComplement === undefined ||
          obj.empAddComplement === null) {
          objData.data.empAddComplement = null;
        } else {
          if (
            obj.empAddComplement === "" ||
            typeof(obj.empAddComplement) !== "string"
          ) {
            isValid = false;
          } else {
            objData.data.empAddComplement = obj.empAddComplement;
          }
        }
        utils.devLog(2, 'empAddComplement -> '+isValid, null);

        // empAddNumber
        if (obj.empAddNumber === undefined ||
          obj.empAddNumber === null) {
          objData.data.empAddNumber = null;
        } else {
          if (
            obj.empAddNumber === "" ||
            typeof(obj.empAddNumber) !== "string"
          ) {
            isValid = false;
          } else {
            objData.data.empAddNumber = obj.empAddNumber;
          }
        }
        utils.devLog(2, 'empAddNumber -> '+isValid, null);

        // empAddDistrict
        if (
          obj.empAddDistrict === undefined ||
          obj.empAddDistrict === "" ||
          obj.empAddDistrict === null ||
          typeof(obj.empAddDistrict) !== "string"
        ) {
          isValid = false;
        } else {
          objData.data.empAddDistrict = obj.empAddDistrict;
        }
        utils.devLog(2, 'empAddDistrict -> '+isValid, null);

        // empAddCouId
        obj.empAddCouId = Number(obj.empAddCouId);
        if (
          obj.empAddCouId === undefined ||
          obj.empAddCouId === "" ||
          obj.empAddCouId === null ||
          isNaN(obj.empAddCouId) ||
          typeof(obj.empAddCouId) !== "number"||
          !utils.validateNumberPositive(obj.empAddCouId)
        ) {
          isValid = false;
        } else {
          objData.data.empAddCouId = 1;// 1 = Brasil // Number(obj.empAddCouId);
        }
        utils.devLog(2, 'empAddCouId -> '+isValid, null);

        // empAddStaId
        obj.empAddStaId = Number(obj.empAddStaId);
        if (
          obj.empAddStaId === undefined ||
          obj.empAddStaId === "" ||
          obj.empAddStaId === null ||
          isNaN(obj.empAddStaId) ||
          typeof(obj.empAddStaId) !== "number" ||
          !utils.validateNumberPositive(obj.empAddStaId)
        ) {
          isValid = false;
        } else {
          objData.data.empAddStaId = Number(obj.empAddStaId);
        }
        utils.devLog(2, 'empAddStaId -> '+isValid, null);

        // empAddCitId
        obj.empAddCitId = Number(obj.empAddCitId);
        if (
          obj.empAddCitId === undefined ||
          obj.empAddCitId === "" ||
          obj.empAddCitId === null ||
          isNaN(obj.empAddCitId) ||
          typeof(obj.empAddCitId) !== "number"||
          !utils.validateNumberPositive(obj.empAddCitId)
        ) {
          isValid = false;
        } else {
          objData.data.empAddCitId = Number(obj.empAddCitId);
        }
        utils.devLog(2, 'empAddCitId -> '+isValid, null);

        // empDocCpf
        if (
          obj.empDocCpf === undefined ||
          obj.empDocCpf === "" ||
          obj.empDocCpf === null ||
          typeof(obj.empDocCpf) !== "string"||
          (obj.empDocCpf.length !== 11 ) ||
          !utils.validateCpf(obj.empDocCpf)
        ) {
          isValid = false;
        } else {
          objData.data.empDocCpf = obj.empDocCpf;
        }
        utils.devLog(2, 'empDocCpf -> '+isValid, null);

        // empDocRg
        if (
          obj.empDocRg === undefined ||
          obj.empDocRg === "" ||
          obj.empDocRg === null ||
          typeof(obj.empDocRg) !== "string"
        ) {
          isValid = false;
        } else {
          objData.data.empDocRg = obj.empDocRg;
        }
        utils.devLog(2, 'empDocRg -> '+isValid, null);

        // empDocRgDateExpedition
        if (obj.empDocRgDateExpedition === undefined||
          obj.empDocRgDateExpedition === null) {
          objData.data.empDocRgDateExpedition = null;
        } else {
          if (!utils.dateDateStrToDate(obj.empDocRgDateExpedition)) {
            isValid = false;
          } else {
            objData.data.empDocRgDateExpedition = utils.dateDateStrToDate(obj.empDocRgDateExpedition);
          }
        }
        utils.devLog(2, 'empDocRgDateExpedition -> '+isValid, null);

        // empDocRgExpeditor
        if (obj.empDocRgExpeditor === undefined||
          obj.empDocRgExpeditor === null) {
          objData.data.empDocRgExpeditor = null;
        } else {
          if (
            obj.empDocRgExpeditor === "" ||
            typeof(obj.empDocRgExpeditor) !== "string"
          ) {
            isValid = false;
          } else {
            objData.data.empDocRgExpeditor = obj.empDocRgExpeditor;
          }
        }
        utils.devLog(2, 'empDocRgExpeditor -> '+isValid, null);

        // empDocVoterTitle
        if (obj.empDocVoterTitle === undefined||
          obj.empDocVoterTitle === null) {
          objData.data.empDocVoterTitle = null;
        } else {
          if (
            obj.empDocVoterTitle === "" ||
            typeof(obj.empDocVoterTitle) !== "string"
          ) {
            isValid = false;
          } else {
            objData.data.empDocVoterTitle = obj.empDocVoterTitle;
          }
        }
        utils.devLog(2, 'empDocVoterTitle -> '+isValid, null);

        // empDocVoterZone
        if (obj.empDocVoterZone === undefined||
          obj.empDocVoterZone === null) {
          objData.data.empDocVoterZone = null;
        } else {
          if (
            obj.empDocVoterZone === "" ||
            typeof(obj.empDocVoterZone) !== "string"
          ) {
            isValid = false;
          } else {
            objData.data.empDocVoterZone = obj.empDocVoterZone;
          }
        }
        utils.devLog(2, 'empDocVoterZone -> '+isValid, null);

        // empDocVoterSection
        if (obj.empDocVoterSection === undefined||
          obj.empDocVoterSection === null) {
          objData.data.empDocVoterSection = null;
        } else {
          if (
            obj.empDocVoterSection === "" ||
            typeof(obj.empDocVoterSection) !== "string"
          ) {
            isValid = false;
          } else {
            objData.data.empDocVoterSection = obj.empDocVoterSection;
          }
        }
        utils.devLog(2, 'empDocVoterSection -> '+isValid, null);

        // empDocReservist
        if (obj.empDocReservist === undefined||
          obj.empDocReservist === null) {
          objData.data.empDocReservist = null;
        } else {
          if (
            obj.empDocReservist === "" ||
            typeof(obj.empDocReservist) !== "string"
          ) {
            isValid = false;
          } else {
            objData.data.empDocReservist = obj.empDocReservist;
          }
        }
        utils.devLog(2, 'empDocReservist -> '+isValid, null);

        // empDocReservistCategory
        if (obj.empDocReservistCategory === undefined||
          obj.empDocReservistCategory === null) {
          objData.data.empDocReservistCategory = null;
        } else {
          if (
            obj.empDocReservistCategory === "" ||
            typeof(obj.empDocReservistCategory) !== "string"
          ) {
            isValid = false;
          } else {
            objData.data.empDocReservistCategory = obj.empDocReservistCategory;
          }
        }
        utils.devLog(2, 'empDocReservistCategory -> '+isValid, null);

        // empDocCtpsInfo
        if (
          obj.empDocCtpsInfo === undefined ||
          obj.empDocCtpsInfo === "" ||
          obj.empDocCtpsInfo === null ||
          typeof(obj.empDocCtpsInfo) !== "boolean" ||
          !utils.validateBoolean(obj.empDocCtpsInfo)
        ) {
          isValid = false;
        } else {
          objData.data.empDocCtpsInfo = obj.empDocCtpsInfo;
        }
        utils.devLog(2, 'empDocCtpsInfo -> '+isValid, null);

        // empDocCtps
        if (obj.empDocCtps === undefined||
          obj.empDocCtps === null) {
          objData.data.empDocCtps = null;
        } else {
          if (
            obj.empDocCtps === "" ||
            typeof(obj.empDocCtps) !== "string"
          ) {
            isValid = false;
          } else {
            objData.data.empDocCtps = obj.empDocCtps;
          }
        }
        utils.devLog(2, 'empDocCtps -> '+isValid, null);

        // empDocCtpsSerieUf
        if (obj.empDocCtpsSerieUf === undefined||
          obj.empDocCtpsSerieUf === null) {
          objData.data.empDocCtpsSerieUf = null;
        } else {
          if (
            obj.empDocCtpsSerieUf === "" ||
            typeof(obj.empDocCtpsSerieUf) !== "string"
          ) {
            isValid = false;
          } else {
            objData.data.empDocCtpsSerieUf = obj.empDocCtpsSerieUf;
          }
        }
        utils.devLog(2, 'empDocCtpsSerieUf -> '+isValid, null);

        // empDocCtpsDate
        if (obj.empDocCtpsDate === undefined||
          obj.empDocCtpsDate === null) {
          objData.data.empDocCtpsDate = null;
        } else {
          if (!utils.dateDateStrToDate(obj.empDocCtpsDate)) {
            isValid = false;
          } else {
            objData.data.empDocCtpsDate = utils.dateDateStrToDate(obj.empDocCtpsDate);
          }
        }
        utils.devLog(2, 'empDocCtpsDate -> '+isValid, null);

        // empDocPis
        if (obj.empDocPis === undefined||
          obj.empDocPis === null) {
          objData.data.empDocPis = null;
        } else {
          if (
            obj.empDocPis === "" ||
            typeof(obj.empDocPis) !== "string"
          ) {
            isValid = false;
          } else {
            objData.data.empDocPis = obj.empDocPis;
          }
        }
        utils.devLog(2, 'empDocPis -> '+isValid, null);

        // empDocFirstJob
        if (
          obj.empDocFirstJob === undefined ||
          obj.empDocFirstJob === "" ||
          obj.empDocFirstJob === null ||
          typeof(obj.empDocFirstJob) !== "boolean" ||
          !utils.validateBoolean(obj.empDocFirstJob)
        ) {
          isValid = false;
        } else {
          objData.data.empDocFirstJob = obj.empDocFirstJob;
        }
        utils.devLog(2, 'empDocFirstJob -> '+isValid, null);

        // empConPhone1
        if (
          obj.empConPhone1 === undefined ||
          obj.empConPhone1 === "" ||
          obj.empConPhone1 === null ||
          typeof(obj.empConPhone1) !== "string"||
          (obj.empConPhone1.length !== 10 && obj.empConPhone1.length !== 11 )
        ) {
          isValid = false;
        } else {
          objData.data.empConPhone1 = obj.empConPhone1;
        }
        utils.devLog(2, 'empConPhone1 -> '+isValid, null);

        // empConPhone2
        if (obj.empConPhone2 === undefined ||
          obj.empConPhone2 === null) {
          objData.data.empConPhone2 = null;
        } else {
          if (
            obj.empConPhone2 === "" ||
            obj.empConPhone2 === null ||
            typeof(obj.empConPhone2) !== "string"||
            (obj.empConPhone2.length !== 10 && obj.empConPhone2.length !== 11 )
          ) {
            isValid = false;
          } else {
            objData.data.empConPhone2 = obj.empConPhone2;
          }
        }
        utils.devLog(2, 'empConPhone2 -> '+isValid, null);

        // empConEmail
        if (
          obj.empConEmail === undefined ||
          obj.empConEmail === "" ||
          obj.empConEmail === null ||
          typeof(obj.empConEmail) !== "string"
        ) {
          isValid = false;
        } else {
          objData.data.empConEmail = obj.empConEmail;
        }
        utils.devLog(2, 'empConEmail -> '+isValid, null);

        // empJobAdmissionDate
        if (!utils.dateDateStrToDate(obj.empJobAdmissionDate)) {
          isValid = false;
        } else {
          objData.data.empJobAdmissionDate = utils.dateDateStrToDate(obj.empJobAdmissionDate);
        }
        utils.devLog(2, 'empJobAdmissionDate -> '+isValid, null);

        // empJobDepId
        obj.empJobDepId = Number(obj.empJobDepId);
        if (
          obj.empJobDepId === undefined ||
          obj.empJobDepId === "" ||
          obj.empJobDepId === null ||
          isNaN(obj.empJobDepId) ||
          typeof(obj.empJobDepId) !== "number"||
          !utils.validateNumberPositive(obj.empJobDepId)
        ) {
          isValid = false;
        } else {
          objData.data.empJobDepId = Number(obj.empJobDepId);
        }
        utils.devLog(2, 'empJobDepId -> '+isValid, null);

        // empJobOccId
        obj.empJobOccId = Number(obj.empJobOccId);
        if (
          obj.empJobOccId === undefined ||
          obj.empJobOccId === "" ||
          obj.empJobOccId === null ||
          isNaN(obj.empJobOccId) ||
          typeof(obj.empJobOccId) !== "number"||
          !utils.validateNumberPositive(obj.empJobOccId)
        ) {
          isValid = false;
        } else {
          objData.data.empJobOccId = Number(obj.empJobOccId);
        }
        utils.devLog(2, 'empJobOccId -> '+isValid, null);

        // empJobMonthlySalary
        obj.empJobMonthlySalary = Number(obj.empJobMonthlySalary);
        if (
          obj.empJobMonthlySalary === undefined ||
          obj.empJobMonthlySalary === "" ||
          obj.empJobMonthlySalary === null ||
          isNaN(obj.empJobMonthlySalary) ||
          typeof(obj.empJobMonthlySalary) !== "number"||
          !utils.validateNumberPositive(obj.empJobMonthlySalary)
        ) {
          isValid = false;
        } else {
          objData.data.empJobMonthlySalary = Number(obj.empJobMonthlySalary);
        }
        utils.devLog(2, 'empJobMonthlySalary -> '+isValid, null);
        
        // empJobWeekMondayToFridayH
        if (obj.empJobWeekMondayToFridayH === undefined||
          obj.empJobWeekMondayToFridayH === null) {
          objData.data.empJobWeekMondayToFridayH = null;
        } else {
          if (
            obj.empJobWeekMondayToFridayH === "" ||
            typeof(obj.empJobWeekMondayToFridayH) !== "string"
          ) {
            isValid = false;
          } else {
            objData.data.empJobWeekMondayToFridayH = obj.empJobWeekMondayToFridayH;
          }
        }
        utils.devLog(2, 'empJobWeekMondayToFridayH -> '+isValid, null);

        // empJobWeekSaturdayH
        if (obj.empJobWeekSaturdayH === undefined||
          obj.empJobWeekSaturdayH === null) {
          objData.data.empJobWeekSaturdayH = null;
        } else {
          if (
            obj.empJobWeekSaturdayH === "" ||
            typeof(obj.empJobWeekSaturdayH) !== "string"
          ) {
            isValid = false;
          } else {
            objData.data.empJobWeekSaturdayH = obj.empJobWeekSaturdayH;
          }
        }
        utils.devLog(2, 'empJobWeekSaturdayH -> '+isValid, null);

        // empJobExperienceContract
        if (
          obj.empJobExperienceContract === undefined ||
          obj.empJobExperienceContract === "" ||
          obj.empJobExperienceContract === null ||
          typeof(obj.empJobExperienceContract) !== "boolean" ||
          !utils.validateBoolean(obj.empJobExperienceContract)
        ) {
          isValid = false;
        } else {
          objData.data.empJobExperienceContract = obj.empJobExperienceContract;
        }
        utils.devLog(2, 'empJobExperienceContract -> '+isValid, null);

        // empJobExperienceContractDays
        if (obj.empJobExperienceContractDays === undefined||
          obj.empJobExperienceContractDays === null) {
          objData.data.empJobExperienceContractDays = null;
        } else {
          obj.empJobExperienceContractDays = Number(obj.empJobExperienceContractDays);
          if (
            obj.empJobExperienceContractDays === undefined ||
            obj.empJobExperienceContractDays === "" ||
            obj.empJobExperienceContractDays === null ||
            isNaN(obj.empJobExperienceContractDays) ||
            typeof(obj.empJobExperienceContractDays) !== "number" ||
            !utils.validateNumberPositive(obj.empJobExperienceContractDays)
          ) {
            isValid = false;
          } else {
            objData.data.empJobExperienceContractDays = Number(obj.empJobExperienceContractDays);
          }
        }
        utils.devLog(2, 'empJobExperienceContractDays -> '+isValid, null);

        // empPayBank
        if (obj.empPayBank === undefined||
          obj.empPayBank === null) {
          objData.data.empPayBank = null;
        } else {
          if (
            obj.empPayBank === "" ||
            typeof(obj.empPayBank) !== "string"
          ) {
            isValid = false;
          } else {
            objData.data.empPayBank = obj.empPayBank;
          }
        }
        utils.devLog(2, 'empPayBank -> '+isValid, null);

        // empPayAgency
        if (obj.empPayAgency === undefined||
          obj.empPayAgency === null) {
          objData.data.empPayAgency = null;
        } else {
          if (
            obj.empPayAgency === "" ||
            typeof(obj.empPayAgency) !== "string"
          ) {
            isValid = false;
          } else {
            objData.data.empPayAgency = obj.empPayAgency;
          }
        }
        utils.devLog(2, 'empPayAgency -> '+isValid, null);

        // empPayType
        if (obj.empPayType === undefined||
          obj.empPayType === null) {
          objData.data.empPayType = null;
        } else {
          if (
            obj.empPayType === "" ||
            typeof(obj.empPayType) !== "string"
          ) {
            isValid = false;
          } else {
            objData.data.empPayType = obj.empPayType;
          }
        }
        utils.devLog(2, 'empPayType -> '+isValid, null);

        // empPayAccount
        if (obj.empPayAccount === undefined||
          obj.empPayAccount === null) {
          objData.data.empPayAccount = null;
        } else {
          if (
            obj.empPayAccount === "" ||
            typeof(obj.empPayAccount) !== "string"
          ) {
            isValid = false;
          } else {
            objData.data.empPayAccount = obj.empPayAccount;
          }
        }
        utils.devLog(2, 'empPayAccount -> '+isValid, null);

        // empObservations
        if (obj.empObservations === undefined||
          obj.empObservations === null) {
          objData.data.empObservations = null;
        } else {
          if (
            obj.empObservations === "" ||
            typeof(obj.empObservations) !== "string"
          ) {
            isValid = false;
          } else {
            objData.data.empObservations = obj.empObservations;
          }
        }
        utils.devLog(2, 'empObservations -> '+isValid, null);

        // empCreated
        // objData.data.empCreated = new Date();

        // empUpdated
        // objData.data.empUpdated = new Date();

        // empDeleted
        // objData.data.empDeleted = null;

        utils.devLog(2, 'Finish -> '+isValid, null);

        return isValid;
      } catch (error) {
        return false;
      }
    }
  }

  employeesGetAll = async ({body,params}, res) => {
    try {
      const perId = "B002";
      const logMsg = "API ==> Controller => employeesGetAll -> Start";
      const { useId } = body;
      
      utils.devLog(0, logMsg, null);
      // utils.devLog(2, null, useId);
      const objResAuth = await UsersController.usersPermission(useId,perId);
      if (!objResAuth.resData.permission) {
        utils.devLog(2, "API ==> Permission -> FALSE", null);
        return utils.resError(403, objResAuth.resMessage, {perId: objResAuth.resData.perId}, res );
      }
      utils.devLog(2, "API ==> Permission -> TRUE", null);
      
      // Function Controller Action

      // Check companies permissions
      const filter = {};
      if (objResAuth.resData.useKeyCompany !== 0) {
        filter.comId = objResAuth.resData.useKeyCompany;
      }
      const resEmployeesGetAll = await EMPLOYEES.findAll({
        where: filter,
        order: [
          ['id', 'ASC'],
        ],
        include: [
          // { model: CONFIG_COUNTRIES, as: "CONFIG_COUNTRIES_inf" },
          // { model: CONFIG_STATES, as: "CONFIG_STATES_inf" },
          // { model: CONFIG_CITIES, as: "CONFIG_CITIES_inf" },
          // { model: CONFIG_COUNTRIES, as: "CONFIG_COUNTRIES_add" },
          // { model: CONFIG_STATES, as: "CONFIG_STATES_add" },
          // { model: CONFIG_CITIES, as: "CONFIG_CITIES_add" },
          { model: COMPANIES, as: "COMPANIES" },
          { model: CONFIG_EMPLOYEES_DEPARTMENTS, as: "CONFIG_EMPLOYEES_DEPARTMENTS" },
          { model: CONFIG_EMPLOYEES_OCCUPATIONS, as: "CONFIG_EMPLOYEES_OCCUPATIONS" },
        ],
      });

      LogsController.logsCreate(useId, perId, logMsg, `=> [${useId}] # Colaborador: Listagem geral ## [geral]`, null);
      return utils.resSuccess('API ==> Controller => employeesGetAll -> Success', resEmployeesGetAll, res );
    } catch (error) {
      return utils.resError(500,`API ==> Controller => employeesGetAll -> Error`, error, res);
    }
  }

  employeesGetId = async ({body,params}, res) => {
    const objData = { idMain: undefined, id: undefined, data: {} };

    try {
      const perId = "B003";
      const logMsg = "API ==> Controller => employeesGetId -> Start";
      const { useId } = body;

      utils.devLog(0, logMsg, null);
      const objResAuth = await UsersController.usersPermission(useId,perId);
      if (!objResAuth.resData.permission) {
        utils.devLog(2, "API ==> Permission -> FALSE", null);
        return utils.resError(403, objResAuth.resMessage, { perId: objResAuth.resData.perId }, res );
      }
      utils.devLog(2, "API ==> Permission -> TRUE", null);

      // Function Controller Action
      let { empId } = params;
      if (!validateParameters(empId)) {
        return utils.resError(400,`API ==> Controller => employeesGetId -> Invalid parameters`, null, res);
      }

      const resEmployeesGetId = await EMPLOYEES.findByPk(objData.id,{
        include: [
          { model: CONFIG_COUNTRIES, as: "CONFIG_COUNTRIES_inf" },
          { model: CONFIG_STATES, as: "CONFIG_STATES_inf" },
          { model: CONFIG_CITIES, as: "CONFIG_CITIES_inf" },
          { model: CONFIG_COUNTRIES, as: "CONFIG_COUNTRIES_add" },
          { model: CONFIG_STATES, as: "CONFIG_STATES_add" },
          { model: CONFIG_CITIES, as: "CONFIG_CITIES_add" },
          { model: CONFIG_EMPLOYEES_DEPARTMENTS, as: "CONFIG_EMPLOYEES_DEPARTMENTS" },
          { model: CONFIG_EMPLOYEES_OCCUPATIONS, as: "CONFIG_EMPLOYEES_OCCUPATIONS" },
        ],
      });

      if (resEmployeesGetId) {
        if (objResAuth.resData.useKeyCompany !== 0) {
          if (resEmployeesGetId.comId !== objResAuth.resData.useKeyCompany) {
            return utils.resError(403, "API ==> Controller => usersPermission -> Forbidden byId", null, res );
          }
        }
        LogsController.logsCreate(useId, perId, logMsg, `=> [${useId}] # Colaborador: Consultado ## [${objData.id}] ${resEmployeesGetId.empName}`, objData.id);
        return utils.resSuccess('API ==> Controller => employeesGetId -> Success',resEmployeesGetId, res);    
      } else {
        return utils.resError(404,`API ==> Controller => employeesGetId -> Not found`, null, res);
      }
    } catch (error) {
      return utils.resError(500,`API ==> Controller => employeesGetId -> Error`, error, res);
    }

    function validateParameters(empId) {
      try {
        let isValid = true;

        // empId
        empId = Number(empId);
        if (
          empId === undefined ||
          empId === "" ||
          empId === null ||
          isNaN(empId) ||
          typeof(empId) !== "number"||
          !utils.validateNumberPositive(empId)
        ) {
          isValid = false;
        } else {
          objData.id = empId;
        }

        return isValid;
      } catch (error) {
        return false;
      }
    }
  }

  employeesCheckUser = async ({body,params}, res) => {
    const objData = { idMain: undefined, id: undefined, data: {} };

    try {
      const perId = "B003";
      const logMsg = "API ==> Controller => employeesCheckUser -> Start";
      const { useId } = body;

      utils.devLog(0, logMsg, null);
      const objResAuth = await UsersController.usersPermission(useId,perId);
      if (!objResAuth.resData.permission) {
        utils.devLog(2, "API ==> Permission -> FALSE", null);
        return utils.resError(403, objResAuth.resMessage, { perId: objResAuth.resData.perId }, res );
      }
      utils.devLog(2, "API ==> Permission -> TRUE", null);

      // Function Controller Action
      let { empId } = params;
      if (!validateParameters(empId)) {
        return utils.resError(400,`API ==> Controller => employeesCheckUser -> Invalid parameters`, null, res);
      }

      // Check Employees
      utils.devLog(2, "API ==> Controller => employeesCheckUser -> CheckEmployees -> Start", null);
      const resEmployeesCheckEmployees = await EMPLOYEES.findByPk(objData.id,{
        // attributes: ['empName', 'useId', 'comId],
      });
      if (resEmployeesCheckEmployees) {
        if (objResAuth.resData.useKeyCompany !== 0) {
          if (resEmployeesCheckEmployees.comId !== objResAuth.resData.useKeyCompany) {
            return utils.resError(403, "API ==> Controller => usersPermission -> Forbidden byId", null, res );
          }
        }
      } else {
        return utils.resError(404,`API ==> Controller => employeesCheckUser -> CheckEmployees -> Not found`, null, res);
      }

      // Verificar se já foi gerado algum usuário
      utils.devLog(2, "API ==> Controller => employeesCheckUser -> CheckUserExist", null);
      if (resEmployeesCheckEmployees.useId === 1) {
        let objResData = {
          useKeyStatus: resEmployeesCheckEmployees.empStatus,
          useStatus: false,
          id: resEmployeesCheckEmployees.useId,
        }
        LogsController.logsCreate(useId, perId, logMsg, `=> [${useId}] # Colaborador: Consultado ## [${objData.id}] ${resEmployeesCheckEmployees.empName}`, objData.id);
        return utils.resSuccess('API ==> Controller => employeesCheckUser -> Success', objResData, res);
      }

      // Já existe um usuário
      // Check User
      utils.devLog(2, "API ==> Controller => employeesCheckUser -> CheckUser -> Start", null);
      const resEmployeesCheckUser = await USERS.findByPk(resEmployeesCheckEmployees.useId,{
        attributes: { exclude: ['usePassword'] }
      });
      if (resEmployeesCheckUser) {
        if (objResAuth.resData.useKeyCompany !== 0) {
          if (resEmployeesCheckUser.useKeyCompany !== objResAuth.resData.useKeyCompany) {
            return utils.resError(403, "API ==> Controller => usersPermission -> Forbidden byId", null, res );
          }
        }
      } else {
        return utils.resError(404,`API ==> Controller => employeesCheckUser -> CheckUser -> Not found`, null, res);
      }

      // Add useKeyStatus => Status employees
      resEmployeesCheckUser.dataValues.useKeyStatus = resEmployeesCheckEmployees.empStatus;

      LogsController.logsCreate(useId, perId, logMsg, `=> [${useId}] # Colaborador: Consultado (login) ## [${objData.id}] ${resEmployeesCheckEmployees.empName}`, objData.id);
      return utils.resSuccess('API ==> Controller => employeesCheckUser -> Success',resEmployeesCheckUser, res);
    } catch (error) {
      return utils.resError(500,`API ==> Controller => employeesCheckUser -> Error`, error, res);
    }

    function validateParameters(empId) {
      try {
        let isValid = true;

        // empId
        empId = Number(empId);
        if (
          empId === undefined ||
          empId === "" ||
          empId === null ||
          isNaN(empId) ||
          typeof(empId) !== "number"||
          !utils.validateNumberPositive(empId)
        ) {
          isValid = false;
        } else {
          objData.id = empId;
        }

        return isValid;
      } catch (error) {
        return false;
      }
    }
  }

  employeesPut = async ({body,params}, res) => {
    const objData = { idMain: undefined, id: undefined, data: {} };

    try {
      const perId = "B004";
      const logMsg = "API ==> Controller => employeesPut -> Start";
      const { useId } = body;

      utils.devLog(0, logMsg, null);
      const objResAuth = await UsersController.usersPermission(useId,perId);
      if (!objResAuth.resData.permission) {
        utils.devLog(2, "API ==> Permission -> FALSE", null);
        return utils.resError(403, objResAuth.resMessage, { perId: objResAuth.resData.perId }, res );
      }
      utils.devLog(2, "API ==> Permission -> TRUE", null);

      // Function Controller Action
      let { empId } = params;
      utils.devLog(2, null, body);
      if (!validateParameters(empId, body)) {
        return utils.resError(400,`API ==> Controller => employeesPut -> Invalid parameters`, null, res);
      }

      utils.devLog(2, "API ==> Controller => employeesPut : objData", null);
      utils.devLog(2, null, objData);

      // Check Employees
      const resEmployeesGetId = await EMPLOYEES.findByPk(objData.id,{});
      if (resEmployeesGetId) {
        // Verifica se usuário possui permissão geral sobre as empresas
        if (objResAuth.resData.useKeyCompany !== 0) {
          // Verifica se o registro que deseja alterar pertente a empresa que possui permissão
          if (resEmployeesGetId.comId !== objResAuth.resData.useKeyCompany) {
            return utils.resError(403, "API ==> Controller => usersPermission -> Forbidden byId", null, res );
          }
        }
        if (resEmployeesGetId.comId !== objData.data.comId) {
          // Companies Altered 
          if (resEmployeesGetId.comId !== 1) {
            // Possui usuário ativo ou desativado
            const resUsersGetId = await USERS.findByPk(resEmployeesGetId.useId,{});
            if (resUsersGetId) {
              if (resUsersGetId.useStatus) {
                return utils.resError(409,`API ==> Controller => employeesPut -> USER -> Login Enabled`, { errMessage: 'Login Enabled'}, res);
              }
            }
          }
        }
      } else {
        return utils.resError(404,`API ==> Controller => employeesPut -> employeesGetId -> Not found`, null, res);
      }

      // Check unique key => empDocCpf
      if (objData.data.empDocCpf !== resEmployeesGetId.empDocCpf) {
        const resEmployeesGetAllbyUnique = await EMPLOYEES.findAll({
          where: {
            empDocCpf: objData.data.empDocCpf
          }
        });
        utils.devLog(2, null, resEmployeesGetAllbyUnique);
        if (resEmployeesGetAllbyUnique.length > 0) {
          return utils.resError(409, "API ==> Controller => employeesPut -> Unique-key conflict", null, res );
        }
      }

      // Update Employees
      const resEmployeesPut = await resEmployeesGetId.update(objData.data);

      LogsController.logsCreate(useId, perId, logMsg, `=> [${useId}] # Colaborador: Atualizado ## [${objData.id}] ${resEmployeesGetId.empName}`, objData.id);
      return utils.resSuccess('API ==> Controller => employeesPut -> Success',{empId: objData.id }, res);    

    } catch (error) {
      if (error.original) {
        if (error.name === 'SequelizeUniqueConstraintError') {
          error = {errMessage: 'Error system', errType: 'SequelizeUniqueConstraintError'};
          return utils.resError(500,`API ==> Controller => employeesPut -> Error`, error, res);
        }
      }
      return utils.resError(500,`API ==> Controller => employeesPut -> Error`, error, res);
    }

    function validateParameters(empId, obj) {
      try {
        let isValid = true;

        // empId
        empId = Number(empId);
        if (
          empId === undefined ||
          empId === "" ||
          empId === null ||
          isNaN(empId) ||
          typeof(empId) !== "number"
        ) {
          isValid = false;
        } else {
          objData.id = empId;
        }
        utils.devLog(2, 'empId -> '+isValid, null);

        // comId
        obj.comId = Number(obj.comId);
        if (
          obj.comId === undefined ||
          obj.comId === "" ||
          obj.comId === null ||
          isNaN(obj.comId) ||
          typeof(obj.comId) !== "number"||
          !utils.validateNumberPositive(obj.comId)
        ) {
          isValid = false;
        } else {
          objData.data.comId = Number(obj.comId);
        }
        utils.devLog(2, 'comId -> '+isValid, null);

        // useId
        // Change in PATCH
        utils.devLog(2, 'useId -> '+isValid, null);
        
        // empName
        if (
          obj.empName === undefined ||
          obj.empName === "" ||
          obj.empName === null ||
          typeof(obj.empName) !== "string"
        ) {
          isValid = false;
        } else {
          objData.data.empName = obj.empName;
        }
        utils.devLog(2, 'comName -> '+isValid, null);

        // empDocBirthDate
        if (!utils.dateDateStrToDate(obj.empDocBirthDate)) {
          isValid = false;
        } else {
          objData.data.empDocBirthDate = utils.dateDateStrToDate(obj.empDocBirthDate);
        }
        utils.devLog(2, 'empDocBirthDate -> '+isValid, null);

        // empInfBirthPlaceCouId
        obj.empInfBirthPlaceCouId = Number(obj.empInfBirthPlaceCouId);
        if (
          obj.empInfBirthPlaceCouId === undefined ||
          obj.empInfBirthPlaceCouId === "" ||
          obj.empInfBirthPlaceCouId === null ||
          isNaN(obj.empInfBirthPlaceCouId) ||
          typeof(obj.empInfBirthPlaceCouId) !== "number"||
          !utils.validateNumberPositive(obj.empInfBirthPlaceCouId)
        ) {
          isValid = false;
        } else {
          objData.data.empInfBirthPlaceCouId = 1;// 1 = Brasil // Number(obj.empInfBirthPlaceCouId);
        }
        utils.devLog(2, 'empInfBirthPlaceCouId -> '+isValid, null);

        // empInfBirthPlaceStaId
        obj.empInfBirthPlaceStaId = Number(obj.empInfBirthPlaceStaId);
        if (
          obj.empInfBirthPlaceStaId === undefined ||
          obj.empInfBirthPlaceStaId === "" ||
          obj.empInfBirthPlaceStaId === null ||
          isNaN(obj.empInfBirthPlaceStaId) ||
          typeof(obj.empInfBirthPlaceStaId) !== "number"||
          !utils.validateNumberPositive(obj.empInfBirthPlaceStaId)
        ) {
          isValid = false;
        } else {
          objData.data.empInfBirthPlaceStaId = Number(obj.empInfBirthPlaceStaId);
        }
        utils.devLog(2, 'empInfBirthPlaceStaId -> '+isValid, null);

        // empInfBirthPlaceCitId
        obj.empInfBirthPlaceCitId = Number(obj.empInfBirthPlaceCitId);
        if (
          obj.empInfBirthPlaceCitId === undefined ||
          obj.empInfBirthPlaceCitId === "" ||
          obj.empInfBirthPlaceCitId === null ||
          isNaN(obj.empInfBirthPlaceCitId) ||
          typeof(obj.empInfBirthPlaceCitId) !== "number" ||
          !utils.validateNumberPositive(obj.empInfBirthPlaceCitId)
        ) {
          isValid = false;
        } else {
          objData.data.empInfBirthPlaceCitId = Number(obj.empInfBirthPlaceCitId);
        }
        utils.devLog(2, 'empInfBirthPlaceCitId -> '+isValid, null);

        // empInfMaritalStatus
        if (obj.empInfMaritalStatus === undefined ||
          obj.empInfMaritalStatus === null) {
          objData.data.empInfMaritalStatus = null;
        } else {
          if (
            obj.empInfMaritalStatus !== "Solteiro" &&
            obj.empInfMaritalStatus !== "Casado" &&
            obj.empInfMaritalStatus !== "Viúvo" &&
            obj.empInfMaritalStatus !== "Divorciado"
          ) {
            isValid = false;
          } else {
            objData.data.empInfMaritalStatus = obj.empInfMaritalStatus;
          }
        }
        utils.devLog(2, 'empInfMaritalStatus -> '+isValid, null);

        // empInfDegreeEducation
        if (obj.empInfDegreeEducation === undefined ||
          obj.empInfDegreeEducation === null) {
          objData.data.empInfDegreeEducation = null;
        } else {
          if (
            obj.empInfDegreeEducation !== "Analfabeto" &&
            obj.empInfDegreeEducation !== "Ensino fundamental incompleto" &&
            obj.empInfDegreeEducation !== "Ensino fundamental completo" &&
            obj.empInfDegreeEducation !== "Ensino médio incompleto" &&
            obj.empInfDegreeEducation !== "Ensino médio completo" &&
            obj.empInfDegreeEducation !== "Superior incompleto" &&
            obj.empInfDegreeEducation !== "Superior completo" &&
            obj.empInfDegreeEducation !== "Pós-graduação" &&
            obj.empInfDegreeEducation !== "Mestrado" &&
            obj.empInfDegreeEducation !== "Doutorado" &&
            obj.empInfDegreeEducation !== "Pós-Doutorado"
          ) {
            isValid = false;
          } else {
            objData.data.empInfDegreeEducation = obj.empInfDegreeEducation;
          }
        }
        utils.devLog(2, 'empInfDegreeEducation -> '+isValid, null);

        // empInfMother
        if (obj.empInfMother === undefined||
          obj.empInfMother === null) {
          objData.data.empInfMother = null;
        } else {
          if (
            obj.empInfMother === "" ||
            typeof(obj.empInfMother) !== "string"
          ) {
            isValid = false;
          } else {
            objData.data.empInfMother = obj.empInfMother;
          }
        }
        utils.devLog(2, 'empInfMother -> '+isValid, null);

        // empInfDad
        if (obj.empInfDad === undefined||
          obj.empInfDad === null) {
          objData.data.empInfDad = null;
        } else {
          if (
            obj.empInfDad === "" ||
            typeof(obj.empInfDad) !== "string"
          ) {
            isValid = false;
          } else {
            objData.data.empInfDad = obj.empInfDad;
          }
        }
        utils.devLog(2, 'empInfDad -> '+isValid, null);

        // empAddCep
        if (
          obj.empAddCep === undefined ||
          obj.empAddCep === "" ||
          obj.empAddCep === null ||
          typeof(obj.empAddCep) !== "string" ||
          obj.empAddCep.length !== 8
        ) {
          isValid = false;
        } else {
          objData.data.empAddCep = obj.empAddCep;
        }
        utils.devLog(2, 'empAddCep -> '+isValid, null);

        // empAddAddress
        if (
          obj.empAddAddress === undefined ||
          obj.empAddAddress === "" ||
          obj.empAddAddress === null ||
          typeof(obj.empAddAddress) !== "string"
        ) {
          isValid = false;
        } else {
          objData.data.empAddAddress = obj.empAddAddress;
        }
        utils.devLog(2, 'empAddAddress -> '+isValid, null);

        // empAddComplement
        if (obj.empAddComplement === undefined ||
          obj.empAddComplement === null) {
          objData.data.empAddComplement = null;
        } else {
          if (
            obj.empAddComplement === "" ||
            typeof(obj.empAddComplement) !== "string"
          ) {
            isValid = false;
          } else {
            objData.data.empAddComplement = obj.empAddComplement;
          }
        }
        utils.devLog(2, 'empAddComplement -> '+isValid, null);

        // empAddNumber
        if (obj.empAddNumber === undefined ||
          obj.empAddNumber === null) {
          objData.data.empAddNumber = null;
        } else {
          if (
            obj.empAddNumber === "" ||
            typeof(obj.empAddNumber) !== "string"
          ) {
            isValid = false;
          } else {
            objData.data.empAddNumber = obj.empAddNumber;
          }
        }
        utils.devLog(2, 'empAddNumber -> '+isValid, null);

        // empAddDistrict
        if (
          obj.empAddDistrict === undefined ||
          obj.empAddDistrict === "" ||
          obj.empAddDistrict === null ||
          typeof(obj.empAddDistrict) !== "string"
        ) {
          isValid = false;
        } else {
          objData.data.empAddDistrict = obj.empAddDistrict;
        }
        utils.devLog(2, 'empAddDistrict -> '+isValid, null);

        // empAddCouId
        obj.empAddCouId = Number(obj.empAddCouId);
        if (
          obj.empAddCouId === undefined ||
          obj.empAddCouId === "" ||
          obj.empAddCouId === null ||
          isNaN(obj.empAddCouId) ||
          typeof(obj.empAddCouId) !== "number"||
          !utils.validateNumberPositive(obj.empAddCouId)
        ) {
          isValid = false;
        } else {
          objData.data.empAddCouId = 1;// 1 = Brasil // Number(obj.empAddCouId);
        }
        utils.devLog(2, 'empAddCouId -> '+isValid, null);

        // empAddStaId
        obj.empAddStaId = Number(obj.empAddStaId);
        if (
          obj.empAddStaId === undefined ||
          obj.empAddStaId === "" ||
          obj.empAddStaId === null ||
          isNaN(obj.empAddStaId) ||
          typeof(obj.empAddStaId) !== "number" ||
          !utils.validateNumberPositive(obj.empAddStaId)
        ) {
          isValid = false;
        } else {
          objData.data.empAddStaId = Number(obj.empAddStaId);
        }
        utils.devLog(2, 'empAddStaId -> '+isValid, null);

        // empAddCitId
        obj.empAddCitId = Number(obj.empAddCitId);
        if (
          obj.empAddCitId === undefined ||
          obj.empAddCitId === "" ||
          obj.empAddCitId === null ||
          isNaN(obj.empAddCitId) ||
          typeof(obj.empAddCitId) !== "number"||
          !utils.validateNumberPositive(obj.empAddCitId)
        ) {
          isValid = false;
        } else {
          objData.data.empAddCitId = Number(obj.empAddCitId);
        }
        utils.devLog(2, 'empAddCitId -> '+isValid, null);

        // empDocCpf
        if (
          obj.empDocCpf === undefined ||
          obj.empDocCpf === "" ||
          obj.empDocCpf === null ||
          typeof(obj.empDocCpf) !== "string"||
          (obj.empDocCpf.length !== 11 ) ||
          !utils.validateCpf(obj.empDocCpf)
        ) {
          isValid = false;
        } else {
          objData.data.empDocCpf = obj.empDocCpf;
        }
        utils.devLog(2, 'empDocCpf -> '+isValid, null);

        // empDocRg
        if (
          obj.empDocRg === undefined ||
          obj.empDocRg === "" ||
          obj.empDocRg === null ||
          typeof(obj.empDocRg) !== "string"
        ) {
          isValid = false;
        } else {
          objData.data.empDocRg = obj.empDocRg;
        }
        utils.devLog(2, 'empDocRg -> '+isValid, null);

        // empDocRgDateExpedition
        if (obj.empDocRgDateExpedition === undefined||
          obj.empDocRgDateExpedition === null) {
          objData.data.empDocRgDateExpedition = null;
        } else {
          if (!utils.dateDateStrToDate(obj.empDocRgDateExpedition)) {
            isValid = false;
          } else {
            objData.data.empDocRgDateExpedition = utils.dateDateStrToDate(obj.empDocRgDateExpedition);
          }
        }
        utils.devLog(2, 'empDocRgDateExpedition -> '+isValid, null);

        // empDocRgExpeditor
        if (obj.empDocRgExpeditor === undefined||
          obj.empDocRgExpeditor === null) {
          objData.data.empDocRgExpeditor = null;
        } else {
          if (
            obj.empDocRgExpeditor === "" ||
            typeof(obj.empDocRgExpeditor) !== "string"
          ) {
            isValid = false;
          } else {
            objData.data.empDocRgExpeditor = obj.empDocRgExpeditor;
          }
        }
        utils.devLog(2, 'empDocRgExpeditor -> '+isValid, null);

        // empDocVoterTitle
        if (obj.empDocVoterTitle === undefined||
          obj.empDocVoterTitle === null) {
          objData.data.empDocVoterTitle = null;
        } else {
          if (
            obj.empDocVoterTitle === "" ||
            typeof(obj.empDocVoterTitle) !== "string"
          ) {
            isValid = false;
          } else {
            objData.data.empDocVoterTitle = obj.empDocVoterTitle;
          }
        }
        utils.devLog(2, 'empDocVoterTitle -> '+isValid, null);

        // empDocVoterZone
        if (obj.empDocVoterZone === undefined||
          obj.empDocVoterZone === null) {
          objData.data.empDocVoterZone = null;
        } else {
          if (
            obj.empDocVoterZone === "" ||
            typeof(obj.empDocVoterZone) !== "string"
          ) {
            isValid = false;
          } else {
            objData.data.empDocVoterZone = obj.empDocVoterZone;
          }
        }
        utils.devLog(2, 'empDocVoterZone -> '+isValid, null);

        // empDocVoterSection
        if (obj.empDocVoterSection === undefined||
          obj.empDocVoterSection === null) {
          objData.data.empDocVoterSection = null;
        } else {
          if (
            obj.empDocVoterSection === "" ||
            typeof(obj.empDocVoterSection) !== "string"
          ) {
            isValid = false;
          } else {
            objData.data.empDocVoterSection = obj.empDocVoterSection;
          }
        }
        utils.devLog(2, 'empDocVoterSection -> '+isValid, null);

        // empDocReservist
        if (obj.empDocReservist === undefined||
          obj.empDocReservist === null) {
          objData.data.empDocReservist = null;
        } else {
          if (
            obj.empDocReservist === "" ||
            typeof(obj.empDocReservist) !== "string"
          ) {
            isValid = false;
          } else {
            objData.data.empDocReservist = obj.empDocReservist;
          }
        }
        utils.devLog(2, 'empDocReservist -> '+isValid, null);

        // empDocReservistCategory
        if (obj.empDocReservistCategory === undefined||
          obj.empDocReservistCategory === null) {
          objData.data.empDocReservistCategory = null;
        } else {
          if (
            obj.empDocReservistCategory === "" ||
            typeof(obj.empDocReservistCategory) !== "string"
          ) {
            isValid = false;
          } else {
            objData.data.empDocReservistCategory = obj.empDocReservistCategory;
          }
        }
        utils.devLog(2, 'empDocReservistCategory -> '+isValid, null);

        // empDocCtpsInfo
        if (
          obj.empDocCtpsInfo === undefined ||
          obj.empDocCtpsInfo === "" ||
          obj.empDocCtpsInfo === null ||
          typeof(obj.empDocCtpsInfo) !== "boolean" ||
          !utils.validateBoolean(obj.empDocCtpsInfo)
        ) {
          isValid = false;
        } else {
          objData.data.empDocCtpsInfo = obj.empDocCtpsInfo;
        }
        utils.devLog(2, 'empDocCtpsInfo -> '+isValid, null);

        // empDocCtps
        if (obj.empDocCtps === undefined||
          obj.empDocCtps === null) {
          objData.data.empDocCtps = null;
        } else {
          if (
            obj.empDocCtps === "" ||
            typeof(obj.empDocCtps) !== "string"
          ) {
            isValid = false;
          } else {
            objData.data.empDocCtps = obj.empDocCtps;
          }
        }
        utils.devLog(2, 'empDocCtps -> '+isValid, null);

        // empDocCtpsSerieUf
        if (obj.empDocCtpsSerieUf === undefined||
          obj.empDocCtpsSerieUf === null) {
          objData.data.empDocCtpsSerieUf = null;
        } else {
          if (
            obj.empDocCtpsSerieUf === "" ||
            typeof(obj.empDocCtpsSerieUf) !== "string"
          ) {
            isValid = false;
          } else {
            objData.data.empDocCtpsSerieUf = obj.empDocCtpsSerieUf;
          }
        }
        utils.devLog(2, 'empDocCtpsSerieUf -> '+isValid, null);

        // empDocCtpsDate
        if (obj.empDocCtpsDate === undefined||
          obj.empDocCtpsDate === null) {
          objData.data.empDocCtpsDate = null;
        } else {
          if (!utils.dateDateStrToDate(obj.empDocCtpsDate)) {
            isValid = false;
          } else {
            objData.data.empDocCtpsDate = utils.dateDateStrToDate(obj.empDocCtpsDate);
          }
        }
        utils.devLog(2, 'empDocCtpsDate -> '+isValid, null);

        // empDocPis
        if (obj.empDocPis === undefined||
          obj.empDocPis === null) {
          objData.data.empDocPis = null;
        } else {
          if (
            obj.empDocPis === "" ||
            typeof(obj.empDocPis) !== "string"
          ) {
            isValid = false;
          } else {
            objData.data.empDocPis = obj.empDocPis;
          }
        }
        utils.devLog(2, 'empDocPis -> '+isValid, null);

        // empDocFirstJob
        if (
          obj.empDocFirstJob === undefined ||
          obj.empDocFirstJob === "" ||
          obj.empDocFirstJob === null ||
          typeof(obj.empDocFirstJob) !== "boolean" ||
          !utils.validateBoolean(obj.empDocFirstJob)
        ) {
          isValid = false;
        } else {
          objData.data.empDocFirstJob = obj.empDocFirstJob;
        }
        utils.devLog(2, 'empDocFirstJob -> '+isValid, null);

        // empConPhone1
        if (
          obj.empConPhone1 === undefined ||
          obj.empConPhone1 === "" ||
          obj.empConPhone1 === null ||
          typeof(obj.empConPhone1) !== "string"||
          (obj.empConPhone1.length !== 10 && obj.empConPhone1.length !== 11 )
        ) {
          isValid = false;
        } else {
          objData.data.empConPhone1 = obj.empConPhone1;
        }
        utils.devLog(2, 'empConPhone1 -> '+isValid, null);

        // empConPhone2
        if (obj.empConPhone2 === undefined ||
          obj.empConPhone2 === null) {
          objData.data.empConPhone2 = null;
        } else {
          if (
            obj.empConPhone2 === "" ||
            obj.empConPhone2 === null ||
            typeof(obj.empConPhone2) !== "string"||
            (obj.empConPhone2.length !== 10 && obj.empConPhone2.length !== 11 )
          ) {
            isValid = false;
          } else {
            objData.data.empConPhone2 = obj.empConPhone2;
          }
        }
        utils.devLog(2, 'empConPhone2 -> '+isValid, null);

        // empConEmail
        if (
          obj.empConEmail === undefined ||
          obj.empConEmail === "" ||
          obj.empConEmail === null ||
          typeof(obj.empConEmail) !== "string"
        ) {
          isValid = false;
        } else {
          objData.data.empConEmail = obj.empConEmail;
        }
        utils.devLog(2, 'empConEmail -> '+isValid, null);

        // empJobAdmissionDate
        if (!utils.dateDateStrToDate(obj.empJobAdmissionDate)) {
          isValid = false;
        } else {
          objData.data.empJobAdmissionDate = utils.dateDateStrToDate(obj.empJobAdmissionDate);
        }
        utils.devLog(2, 'empJobAdmissionDate -> '+isValid, null);

        // empJobDepId
        obj.empJobDepId = Number(obj.empJobDepId);
        if (
          obj.empJobDepId === undefined ||
          obj.empJobDepId === "" ||
          obj.empJobDepId === null ||
          isNaN(obj.empJobDepId) ||
          typeof(obj.empJobDepId) !== "number"||
          !utils.validateNumberPositive(obj.empJobDepId)
        ) {
          isValid = false;
        } else {
          objData.data.empJobDepId = Number(obj.empJobDepId);
        }
        utils.devLog(2, 'empJobDepId -> '+isValid, null);

        // empJobOccId
        obj.empJobOccId = Number(obj.empJobOccId);
        if (
          obj.empJobOccId === undefined ||
          obj.empJobOccId === "" ||
          obj.empJobOccId === null ||
          isNaN(obj.empJobOccId) ||
          typeof(obj.empJobOccId) !== "number"||
          !utils.validateNumberPositive(obj.empJobOccId)
        ) {
          isValid = false;
        } else {
          objData.data.empJobOccId = Number(obj.empJobOccId);
        }
        utils.devLog(2, 'empJobOccId -> '+isValid, null);

        // empJobMonthlySalary
        obj.empJobMonthlySalary = Number(obj.empJobMonthlySalary);
        if (
          obj.empJobMonthlySalary === undefined ||
          obj.empJobMonthlySalary === "" ||
          obj.empJobMonthlySalary === null ||
          isNaN(obj.empJobMonthlySalary) ||
          typeof(obj.empJobMonthlySalary) !== "number"||
          !utils.validateNumberPositive(obj.empJobMonthlySalary)
        ) {
          isValid = false;
        } else {
          objData.data.empJobMonthlySalary = Number(obj.empJobMonthlySalary);
        }
        utils.devLog(2, 'empJobMonthlySalary -> '+isValid, null);
        
        // empJobWeekMondayToFridayH
        if (obj.empJobWeekMondayToFridayH === undefined||
          obj.empJobWeekMondayToFridayH === null) {
          objData.data.empJobWeekMondayToFridayH = null;
        } else {
          if (
            obj.empJobWeekMondayToFridayH === "" ||
            typeof(obj.empJobWeekMondayToFridayH) !== "string"
          ) {
            isValid = false;
          } else {
            objData.data.empJobWeekMondayToFridayH = obj.empJobWeekMondayToFridayH;
          }
        }
        utils.devLog(2, 'empJobWeekMondayToFridayH -> '+isValid, null);

        // empJobWeekSaturdayH
        if (obj.empJobWeekSaturdayH === undefined||
          obj.empJobWeekSaturdayH === null) {
          objData.data.empJobWeekSaturdayH = null;
        } else {
          if (
            obj.empJobWeekSaturdayH === "" ||
            typeof(obj.empJobWeekSaturdayH) !== "string"
          ) {
            isValid = false;
          } else {
            objData.data.empJobWeekSaturdayH = obj.empJobWeekSaturdayH;
          }
        }
        utils.devLog(2, 'empJobWeekSaturdayH -> '+isValid, null);

        // empJobExperienceContract
        if (
          obj.empJobExperienceContract === undefined ||
          obj.empJobExperienceContract === "" ||
          obj.empJobExperienceContract === null ||
          typeof(obj.empJobExperienceContract) !== "boolean" ||
          !utils.validateBoolean(obj.empJobExperienceContract)
        ) {
          isValid = false;
        } else {
          objData.data.empJobExperienceContract = obj.empJobExperienceContract;
        }
        utils.devLog(2, 'empJobExperienceContract -> '+isValid, null);

        // empJobExperienceContractDays
        if (obj.empJobExperienceContractDays === undefined||
          obj.empJobExperienceContractDays === null) {
          objData.data.empJobExperienceContractDays = null;
        } else {
          obj.empJobExperienceContractDays = Number(obj.empJobExperienceContractDays);
          if (
            obj.empJobExperienceContractDays === undefined ||
            obj.empJobExperienceContractDays === "" ||
            obj.empJobExperienceContractDays === null ||
            isNaN(obj.empJobExperienceContractDays) ||
            typeof(obj.empJobExperienceContractDays) !== "number" ||
            !utils.validateNumberPositive(obj.empJobExperienceContractDays)
          ) {
            isValid = false;
          } else {
            objData.data.empJobExperienceContractDays = Number(obj.empJobExperienceContractDays);
          }
        }
        utils.devLog(2, 'empJobExperienceContractDays -> '+isValid, null);

        // empPayBank
        if (obj.empPayBank === undefined||
          obj.empPayBank === null) {
          objData.data.empPayBank = null;
        } else {
          if (
            obj.empPayBank === "" ||
            typeof(obj.empPayBank) !== "string"
          ) {
            isValid = false;
          } else {
            objData.data.empPayBank = obj.empPayBank;
          }
        }
        utils.devLog(2, 'empPayBank -> '+isValid, null);

        // empPayAgency
        if (obj.empPayAgency === undefined||
          obj.empPayAgency === null) {
          objData.data.empPayAgency = null;
        } else {
          if (
            obj.empPayAgency === "" ||
            typeof(obj.empPayAgency) !== "string"
          ) {
            isValid = false;
          } else {
            objData.data.empPayAgency = obj.empPayAgency;
          }
        }
        utils.devLog(2, 'empPayAgency -> '+isValid, null);

        // empPayType
        if (obj.empPayType === undefined||
          obj.empPayType === null) {
          objData.data.empPayType = null;
        } else {
          if (
            obj.empPayType === "" ||
            typeof(obj.empPayType) !== "string"
          ) {
            isValid = false;
          } else {
            objData.data.empPayType = obj.empPayType;
          }
        }
        utils.devLog(2, 'empPayType -> '+isValid, null);

        // empPayAccount
        if (obj.empPayAccount === undefined||
          obj.empPayAccount === null) {
          objData.data.empPayAccount = null;
        } else {
          if (
            obj.empPayAccount === "" ||
            typeof(obj.empPayAccount) !== "string"
          ) {
            isValid = false;
          } else {
            objData.data.empPayAccount = obj.empPayAccount;
          }
        }
        utils.devLog(2, 'empPayAccount -> '+isValid, null);

        // empObservations
        if (obj.empObservations === undefined||
          obj.empObservations === null) {
          objData.data.empObservations = null;
        } else {
          if (
            obj.empObservations === "" ||
            typeof(obj.empObservations) !== "string"
          ) {
            isValid = false;
          } else {
            objData.data.empObservations = obj.empObservations;
          }
        }
        utils.devLog(2, 'empObservations -> '+isValid, null);

        // empCreated
        // objData.data.empCreated = new Date();

        // empUpdated
        // objData.data.empUpdated = new Date();

        // empDeleted
        // objData.data.empDeleted = null;

        utils.devLog(2, 'Finish -> '+isValid, null);

        return isValid;
      } catch (error) {
        return false;
      }
    }
  }

  employeesPatch = async ({body,params}, res) => {
    const objData = { idMain: undefined, id: undefined, data: {} };

    try {
      const perId = "B005";
      const logMsg = "API ==> Controller => employeesPatch -> Start";
      const { useId } = body;

      utils.devLog(0, logMsg, null);
      const objResAuth = await UsersController.usersPermission(useId,perId);
      if (!objResAuth.resData.permission) {
        utils.devLog(2, "API ==> Permission -> FALSE", null);
        return utils.resError(403, objResAuth.resMessage, { perId: objResAuth.resData.perId }, res );
      }
      utils.devLog(2, "API ==> Permission -> TRUE", null);

      // Function Controller Action
      let { empId } = params;
      utils.devLog(2, null, empId);
      utils.devLog(2, null, body);
      if (!validateParameters(empId, body)) {
        return utils.resError(400,`API ==> Controller => employeesPatch -> Invalid parameters`, null, res);
      }
      
      utils.devLog(2, "API ==> Controller => employeesPatch : objData", null);
      utils.devLog(2, null, objData);

      // Check Employees
      const resEmployeesGetId = await EMPLOYEES.findByPk(objData.id,{});
      if (resEmployeesGetId) {
        // Verifica se usuário possui permissão geral sobre as empresas
        if (objResAuth.resData.useKeyCompany !== 0) {
          if (resEmployeesGetId.comId !== objResAuth.resData.useKeyCompany) {
            return utils.resError(403, "API ==> Controller => usersPermission -> Forbidden byId", null, res );
          }
        }
      } else {
        return utils.resError(404,`API ==> Controller => employeesPatch -> employeesGetId -> Not found`, null, res);
      }
      const bkpEmployeesData = resEmployeesGetId;

      // Update Employees
      const resEmployeesPatch = await resEmployeesGetId.update(objData.data);

      // Update User
      if (resEmployeesGetId.useId !== 1) {
        // Possui Usuário Gerado
        if (objData.data.empStatus === false) {
          utils.devLog(2, "API ==> Controller => employeesPatch -> Update User", null);
          const resUsersPatch = await UsersController.usersPatchStatus({ 
            params: {
              id: resEmployeesGetId.useId,
            },
            body: {
              useId: useId,
              useStatus: objData.data.empStatus,
          }});
          utils.devLog(2, "API ==> Controller => employeesPatch -> resUsersPatch -> Success", resUsersPatch);
          if (resUsersPatch.resStatus !== 200) {
            utils.devLog(2, "API ==> Controller => employeesPatch -> Update Employees [restore]", null);
            const resEmployeesPutRestore = await resEmployeesGetId.update(bkpEmployeesData);
            return utils.resError(424, "API ==> Controller => employeesPatch -> resUsersPatch -> Error", null, res );
          }
        }
      }

      LogsController.logsCreate(useId, perId, logMsg, `=> [${useId}] # Colaborador: Atualizado [status] ## [${objData.id}] ${resEmployeesGetId.empName}`, objData.id);
      return utils.resSuccess('API ==> Controller => employeesPatch -> Success',{empId: objData.id }, res);    

    } catch (error) {
      return utils.resError(500,`API ==> Controller => employeesPatch -> Error`, error, res);
    }

    function validateParameters(empId, obj) {
      try {
        let isValid = true;

        // empId
        empId = Number(empId);
        if (
          empId === undefined ||
          empId === "" ||
          empId === null ||
          isNaN(empId) ||
          typeof(empId) !== "number"||
          !utils.validateNumberPositive(empId)
        ) {
          isValid = false;
        } else {
          objData.id = empId;
        }
        utils.devLog(2, null, isValid);

        // empStatus
        if (
          obj.empStatus === undefined ||
          obj.empStatus === "" ||
          obj.empStatus === null ||
          typeof(obj.empStatus) !== "boolean" ||
          !utils.validateBoolean(obj.empStatus)
        ) {
          isValid = false;
        } else {
          objData.data.empStatus = obj.empStatus;
        }
        utils.devLog(2, null, isValid);

        // empCreated
        // objData.data.empCreated = new Date();

        // empUpdated
        // objData.data.empUpdated = new Date();

        // empDeleted
        // objData.data.empDeleted = null;

        // console.log(isValid)

        return isValid;
      } catch (error) {
        return false;
      }
    }
  }

  employeesDelete = async ({body,params}, res) => {
    const objData = { idMain: undefined, id: undefined, data: {} };

    try {
      const perId = "B006";
      const logMsg = "API ==> Controller => employeesDelete -> Start";
      const { useId } = body;

      utils.devLog(0, logMsg, null);
      const objResAuth = await UsersController.usersPermission(useId,perId);
      if (!objResAuth.resData.permission) {
        utils.devLog(2, "API ==> Permission -> FALSE", null);
        return utils.resError(403, objResAuth.resMessage, { perId: objResAuth.resData.perId }, res );
      }
      utils.devLog(2, "API ==> Permission -> TRUE", null);

      // Function Controller Action
      let { empId } = params;
      if (!validateParameters(empId)) {
        return utils.resError(400,`API ==> Controller => employeesDelete -> Invalid parameters`, null, res);
      }
      
      utils.devLog(2, "API ==> Controller => employeesDelete : objData", null);
      utils.devLog(2, null, objData);

      // Check Employees
      const resEmployeesGetId = await EMPLOYEES.findByPk(objData.id,{});
      if (resEmployeesGetId) {
        // Verifica se usuário possui permissão geral sobre as empresas
        if (objResAuth.resData.useKeyCompany !== 0) {
          if (resEmployeesGetId.comId !== objResAuth.resData.useKeyCompany) {
            return utils.resError(403, "API ==> Controller => usersPermission -> Forbidden byId", null, res );
          }
        }
      } else {
        return utils.resError(404,`API ==> Controller => employeesDelete -> employeesGetId -> Not found`, null, res);
      }

      // Delete Employees
      const resEmployeesDelete = await resCompaniesGetId.destroy();

      LogsController.logsCreate(useId, perId, logMsg, `=> [${useId}] # Colaborador: Deletado ## [${objData.id}] ${resEmployeesGetId.empName}`, objData.id);
      return utils.resSuccess('API ==> Controller => employeesDelete -> Success',{empId: objData.id }, res);    

    } catch (error) {
      return utils.resError(500,`API ==> Controller => employeesDelete -> Error`, error, res);
    }

    function validateParameters(empId) {
      try {
        let isValid = true;

        // empId
        empId = Number(empId);
        if (
          empId === undefined ||
          empId === "" ||
          empId === null ||
          isNaN(empId) ||
          typeof(empId) !== "number"||
          !utils.validateNumberPositive(empId)
        ) {
          isValid = false;
        } else {
          objData.id = empId;
        }

        return isValid;
      } catch (error) {
        return false;
      }
    }
  }
}

module.exports = new EmployeesController();
