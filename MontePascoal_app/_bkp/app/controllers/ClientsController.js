/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// CONTROLLER USER /////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//  --------------------------------------------------------------------------------------------------------------------------------------- Modules -----

const { Op } = require("sequelize");
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
  CLIENTS,
  CLIENTS_EMPLOYEES,
  CLIENTS_MEMBERS,
  CONFIG_CLIENTS_SERVICES,
} = require("../models");

const LogsController = require('./LogsController');
const UsersController = require('./UsersController');
const ClientsEmployeesController = require('./ClientsEmployeesController');

//  ------------------------------------------------------------------------------------------------------------------------------------- Class API -----
class ClientsController {
  constructor() {
    //  this.step1 = this.step1.bind(this);
    //  this.step2 = this.step2.bind(this);
  }

  clientsPost = async ({body,params}, res) => {
    const objData = { idMain: undefined, idSecondary: undefined, idTertiary: undefined, id: undefined, data: {} };

    try {
      const perId = "F001";

      utils.devLog(0, `API ==> Controller => clientsPost -> Start`, null);
      
      const { useId } = body;
      
      const objResAuth = await UsersController.usersPermission(useId,perId);
      if (!objResAuth.resData.permission) {
        utils.devLog(2, "API ==> Permission -> FALSE", null);
        return utils.resError(403, objResAuth.resMessage, { perId: objResAuth.resData.perId }, res );
      }
      utils.devLog(2, "API ==> Permission -> TRUE", null);

      // Function Controller Action
      // let { cliId } = params;
      utils.devLog(2, 'body', body);
      if (!validateParameters(body)) {
        return utils.resError(400,`API ==> Controller => clientsPost -> Invalid parameters`, null, res);
      }

      utils.devLog(2, "API ==> Controller => clientsPost : objData", objData);

      // Verifica se usuário possui permissão geral sobre as empresas
      // if (objResAuth.resData.useKeyCompany !== 0) {
      //   // Verifica se o registro que deseja alterar pertente a empresa que possui permissão
      //   if (objData.data.comId !== objResAuth.resData.useKeyCompany) {
      //     return utils.resError(403, "API ==> Controller => usersPermission -> Forbidden byId", null, res );
      //   }
      // }

      // Check unique key => cliDocCpfCnpj AND cliDocRg
      const resClientsGetId = await CLIENTS.findAll({
        where: {
          [Op.or]: [
            { cliDocCpfCnpj: objData.data.cliDocCpfCnpj },
            { cliDocRg: objData.data.cliDocRg } // kesdev-cpfcnpj
          ]
        }
      });
      utils.devLog(2, 'Check unique key => cliDocCpfCnpj AND cliDocRg', resClientsGetId);
      if (resClientsGetId.length > 0) {
        return utils.resError(409, "API ==> Controller => clientsPost -> Unique-key conflict", null, res );
      }

      // Check nickname
      const resClientsGetAllbyUniqueNickname = await USERS.findAll({
        where: {
          useNickname: objData.data.cliDocCpfCnpj
        }
      });
      utils.devLog(2, 'Check unique key => nickname', resClientsGetAllbyUniqueNickname);
      if (resClientsGetAllbyUniqueNickname.length > 0) {
        return utils.resError(409, "API ==> Controller => clientsPost -> Unique-key conflict [useNickname]", null, res );
      }

      // Save DATA Clients
      utils.devLog(2, "API ==> Controller => clientsPost -> Save Clients", null);
      const resClientsPost = await CLIENTS.create(objData.data);
      objData.idMain = resClientsPost.dataValues.id;

      // Save DATA services
      // utils.devLog(2, "API ==> Controller => clientsPost -> Save Services", null);
      // const resClientsServicesPost  = await resClientsPost.setCLIENTS_SERVICES(objData.data.lstServices)

      // Create USER
      utils.devLog(2, "API ==> Controller => clientsPost -> Create User", null);
      const resUsersPost = await UsersController.usersPost({ body: {
        useId: useId,
        comId: objData.data.comId,
        useKeyCompany: objData.data.comId,
        useKeyType: "Clients",
        useKeyId: objData.idMain,
        useNickname: objData.data.cliDocCpfCnpj,
      }});
      utils.devLog(2, "API ==> Controller => clientsPost -> resUsersPost -> Success", resUsersPost);
      if (resUsersPost.resStatus !== 200) {
        // Delete Clients
        const resClientsDelete = await resClientsPost.destroy();
        return utils.resError(424, "API ==> Controller => clientsPost -> resUsersPost -> Error [user]", null, res );
      }

      // kesdev-cpfcnpj
      // Check -> CPF [main] <==> CNPJ
      utils.devLog(2, "API ==> Controller => clientsPost -> Check CPF [main] <==> CNPJ", { cliInfPerson: objData.data.cliInfPerson });
      if (objData.data.cliInfPerson === 'CPF') {
      
        // Create CLIENTS_EMPLOYEES and CLIENTS_MEMBERS
        utils.devLog(2, "API ==> Controller => clientsPost -> Create Employees/Members", null);
        const resEmployeesPost = await ClientsEmployeesController.clientsEmployeesPost({ 
          params: {
            cliId: objData.idMain,
          },
          body: {
            useId: useId,
            comId: objData.data.comId,
            empStatus: true, // objData.data.cliStatus,
            empName: objData.data.cliName,
            empDocBirthDate: body.cliDocBirthDate, // objData.data.cliDocBirthDate,
            empInfMaritalStatus: objData.data.cliInfMaritalStatus,
            empDocCpf: objData.data.cliDocCpfCnpj,
            empDocRg: objData.data.cliDocRg,
            empDocCtps: null,
            empJobOccupation: null,
            empJobDate: null,
            empConPhone1: objData.data.cliConPhone1,
            empConPhone2: objData.data.cliConPhone2,
            empConEmail: objData.data.cliConEmail,
            empObservations: objData.data.cliObservations
          }
        });
        utils.devLog(2, "API ==> Controller => clientsPost -> resEmployeesPost -> Success", resEmployeesPost);
        if (resEmployeesPost.resStatus !== 200) {
          // Delete Client and User
          const resClientsDelete = await resClientsPost.destroy();
          const resUsersDelete = await USERS.destroy({where:{id:resUsersPost.resData.useId}});
          return utils.resError(424, "API ==> Controller => clientsPost -> resEmployeesPost -> Error [employees/members]", null, res );
        } else {
          // Update empId
          utils.devLog(2, "API ==> Controller => clientsPost -> Update Clients [empId] -> Start", null);
          const resClientsPut = await resClientsPost.update({
            empId: resEmployeesPost.resData.empId,
          });
          utils.devLog(2, "API ==> Controller => clientsPost -> Update Clients [empId] -> Success", null);
        }
      }

      LogsController.logsCreate(useId, perId, `API ==> Controller => clientsPost -> Success`, `=> [${useId}] # Clientes: Cadastrado ## [${objData.idMain}] ${objData.data.cliName}`, objData.idMain);
      return utils.resSuccess('API ==> Controller => clientsPost -> Success',{cliId: objData.idMain }, res);    

    } catch (error) {
      return utils.resError(500,`API ==> Controller => clientsPost -> Error`, error, res);
    }

    function validateParameters(obj) {
      try {
        let isValid = true;

        // cliIdOld
        if (obj.cliIdOld === undefined ||
          obj.cliIdOld === null) {
          objData.data.cliIdOld = null;
        } else {
          if (
            // obj.cliIdOld === "" ||
            typeof(obj.cliIdOld) !== "string"
          ) {
            isValid = false;
          } else {
            objData.data.cliIdOld = obj.cliIdOld;
          }
        }
        utils.devLog(2, 'cliIdOld -> '+isValid, null);

        // comId
        obj.comId = Number(obj.comId);
        if (
          obj.comId === undefined ||
          obj.comId === "" ||
          obj.comId === null ||
          isNaN(obj.comId) ||
          typeof(obj.comId) !== "number" ||
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

        // conStatus
        objData.data.conStatus = false;
        utils.devLog(2, 'conStatus -> '+isValid, null);

        // conId
        objData.data.conId = null;
        utils.devLog(2, 'conId -> '+isValid, null);

        // cliStatus
        objData.data.cliStatus = true;
        utils.devLog(2, 'cliStatus -> '+isValid, null);

        // cliName
        if (
          obj.cliName === undefined ||
          obj.cliName === "" ||
          obj.cliName === null ||
          typeof(obj.cliName) !== "string"
        ) {
          isValid = false;
        } else {
          objData.data.cliName = obj.cliName;
        }
        utils.devLog(2, 'cliName -> '+isValid, null);

        // cliNameCompany
        if (obj.cliNameCompany === undefined ||
          obj.cliNameCompany === null) {
          objData.data.cliNameCompany = null;
        } else {
          if (
            // obj.cliNameCompany === "" ||
            typeof(obj.cliNameCompany) !== "string"
          ) {
            isValid = false;
          } else {
            objData.data.cliNameCompany = obj.cliNameCompany;
          }
        }
        utils.devLog(2, 'cliNameCompany -> '+isValid, null);

        // cliInfPerson
        if (
          obj.cliInfPerson === undefined ||
          obj.cliInfPerson === "" ||
          obj.cliInfPerson === null ||
          typeof(obj.cliInfPerson) !== "string"
        ) {
          isValid = false;
        } else {
          utils.devLog(2, 'cliInfPerson [tmp] -> '+isValid, null);
          // if (obj.cliInfPerson !== 'CPF' && obj.cliInfPerson !== 'CNPJ') { // kesdev-cpfcnpj
          if (obj.cliInfPerson !== 'CPF') {
            isValid = false;
          } else {
            objData.data.cliInfPerson = obj.cliInfPerson;
          }
        }
        utils.devLog(2, 'cliInfPerson -> '+isValid, null);
        
        // cliDocBirthDate
        if (!utils.dateDateStrToDate(obj.cliDocBirthDate)) {
          isValid = false;
        } else {
          objData.data.cliDocBirthDate = utils.dateDateStrToDate(obj.cliDocBirthDate);
        }
        utils.devLog(2, 'cliDocBirthDate -> '+isValid, null);

        // cliInfMaritalStatus
        if (obj.cliInfMaritalStatus === undefined ||
          obj.cliInfMaritalStatus === null) {
          objData.data.cliInfMaritalStatus = null;
        } else {
          if (
            obj.cliInfMaritalStatus !== "Solteiro" &&
            obj.cliInfMaritalStatus !== "Casado" &&
            obj.cliInfMaritalStatus !== "Viúvo" &&
            obj.cliInfMaritalStatus !== "Divorciado"
          ) {
            isValid = false;
          } else {
            objData.data.cliInfMaritalStatus = obj.cliInfMaritalStatus;
          }
        }
        utils.devLog(2, 'cliInfMaritalStatus -> '+isValid, null);

        // cliDocCpfCnpj
        if (
          obj.cliDocCpfCnpj === undefined ||
          obj.cliDocCpfCnpj === "" ||
          obj.cliDocCpfCnpj === null ||
          typeof(obj.cliDocCpfCnpj) !== "string" ||
          // (obj.cliDocCpfCnpj.length !== 11 && obj.cliDocCpfCnpj.length !== 14 ) // kesdev-cpfcnpj
          ( obj.cliDocCpfCnpj.length !== 11 )
        ) {
          isValid = false;
        } else {
          objData.data.cliDocCpfCnpj = obj.cliDocCpfCnpj;
        }
        utils.devLog(2, 'cliDocCpfCnpj -> '+isValid, null);

        // cliDocRg
        if ( // kesdev-cpfcnpj
          obj.cliDocRg === undefined ||
          obj.cliDocRg === "" ||
          obj.cliDocRg === null ||
          typeof(obj.cliDocRg) !== "string"
        ) {
          isValid = false;
        } else {
          objData.data.cliDocRg = obj.cliDocRg;
        }
        utils.devLog(2, 'cliDocRg -> '+isValid, null);

        // cliDocRegistrationStateIndicator
        if (
          obj.cliDocRegistrationStateIndicator === undefined ||
          obj.cliDocRegistrationStateIndicator === "" ||
          obj.cliDocRegistrationStateIndicator === null ||
          typeof(obj.cliDocRegistrationStateIndicator) !== "string"
        ) {
          isValid = false;
        } else {
          utils.devLog(2, 'cliDocRegistrationStateIndicator [tmp] -> '+isValid, null);
          if (obj.cliDocRegistrationStateIndicator !== 'Não Contribuinte' && obj.cliDocRegistrationStateIndicator !== 'Contribuinte' && obj.cliDocRegistrationStateIndicator !== 'Contribuinte Isento') {
            isValid = false;
          } else {
            objData.data.cliDocRegistrationStateIndicator = obj.cliDocRegistrationStateIndicator;
          }
        }
        utils.devLog(2, 'cliDocRegistrationStateIndicator -> '+isValid, null);

        // cliDocRegistrationState
        if (obj.cliDocRegistrationState === undefined||
          obj.cliDocRegistrationState === null) {
          objData.data.cliDocRegistrationState = null;
        } else {
          if (
            obj.cliDocRegistrationState === "" ||
            typeof(obj.cliDocRegistrationState) !== "string"
          ) {
            isValid = false;
          } else {
            objData.data.cliDocRegistrationState = obj.cliDocRegistrationState;
          }
        }
        utils.devLog(2, 'cliDocRegistrationState -> '+isValid, null);

        // cliDocRegistrationMunicipal
        if (obj.cliDocRegistrationMunicipal === undefined||
          obj.cliDocRegistrationMunicipal === null) {
          objData.data.cliDocRegistrationMunicipal = null;
        } else {
          if (
            obj.cliDocRegistrationMunicipal === "" ||
            typeof(obj.cliDocRegistrationMunicipal) !== "string"
          ) {
            isValid = false;
          } else {
            objData.data.cliDocRegistrationMunicipal = obj.cliDocRegistrationMunicipal;
          }
        }
        utils.devLog(2, 'cliDocRegistrationMunicipal -> '+isValid, null);

        // cliAddCep
        if (
          obj.cliAddCep === undefined ||
          obj.cliAddCep === "" ||
          obj.cliAddCep === null ||
          typeof(obj.cliAddCep) !== "string" ||
          obj.cliAddCep.length !== 8
        ) {
          isValid = false;
        } else {
          objData.data.cliAddCep = obj.cliAddCep;
        }
        utils.devLog(2, 'cliAddCep -> '+isValid, null);

        // cliAddAddress
        if (
          obj.cliAddAddress === undefined ||
          obj.cliAddAddress === "" ||
          obj.cliAddAddress === null ||
          typeof(obj.cliAddAddress) !== "string"
        ) {
          isValid = false;
        } else {
          objData.data.cliAddAddress = obj.cliAddAddress;
        }
        utils.devLog(2, 'cliAddAddress -> '+isValid, null);

        // cliAddComplement
        if (obj.cliAddComplement === undefined ||
          obj.cliAddComplement === null) {
          objData.data.cliAddComplement = null;
        } else {
          if (
            obj.cliAddComplement === "" ||
            typeof(obj.cliAddComplement) !== "string"
          ) {
            isValid = false;
          } else {
            objData.data.cliAddComplement = obj.cliAddComplement;
          }
        }
        utils.devLog(2, 'cliAddComplement -> '+isValid, null);

        // cliAddNumber
        if (obj.cliAddNumber === undefined ||
          obj.cliAddNumber === null) {
          objData.data.cliAddNumber = null;
        } else {
          if (
            obj.cliAddNumber === "" ||
            typeof(obj.cliAddNumber) !== "string"
          ) {
            isValid = false;
          } else {
            objData.data.cliAddNumber = obj.cliAddNumber;
          }
        }
        utils.devLog(2, 'cliAddNumber -> '+isValid, null);

        // cliAddDistrict
        if (
          obj.cliAddDistrict === undefined ||
          obj.cliAddDistrict === "" ||
          obj.cliAddDistrict === null ||
          typeof(obj.cliAddDistrict) !== "string"
        ) {
          isValid = false;
        } else {
          objData.data.cliAddDistrict = obj.cliAddDistrict;
        }
        utils.devLog(2, 'cliAddDistrict -> '+isValid, null);

        // cliAddCouId
        obj.cliAddCouId = Number(obj.cliAddCouId);
        if (
          obj.cliAddCouId === undefined ||
          obj.cliAddCouId === "" ||
          obj.cliAddCouId === null ||
          isNaN(obj.cliAddCouId) ||
          typeof(obj.cliAddCouId) !== "number"||
          !utils.validateNumberPositive(obj.cliAddCouId)
        ) {
          isValid = false;
        } else {
          objData.data.cliAddCouId = 1;// 1 = Brasil // Number(obj.cliAddCouId);
        }
        utils.devLog(2, 'cliAddCouId -> '+isValid, null);

        // cliAddStaId
        obj.cliAddStaId = Number(obj.cliAddStaId);
        if (
          obj.cliAddStaId === undefined ||
          obj.cliAddStaId === "" ||
          obj.cliAddStaId === null ||
          isNaN(obj.cliAddStaId) ||
          typeof(obj.cliAddStaId) !== "number" ||
          !utils.validateNumberPositive(obj.cliAddStaId)
        ) {
          isValid = false;
        } else {
          objData.data.cliAddStaId = Number(obj.cliAddStaId);
        }
        utils.devLog(2, 'cliAddStaId -> '+isValid, null);

        // cliAddCitId
        obj.cliAddCitId = Number(obj.cliAddCitId);
        if (
          obj.cliAddCitId === undefined ||
          obj.cliAddCitId === "" ||
          obj.cliAddCitId === null ||
          isNaN(obj.cliAddCitId) ||
          typeof(obj.cliAddCitId) !== "number"||
          !utils.validateNumberPositive(obj.cliAddCitId)
        ) {
          isValid = false;
        } else {
          objData.data.cliAddCitId = Number(obj.cliAddCitId);
        }
        utils.devLog(2, 'cliAddCitId -> '+isValid, null);

        // cliConPhone1
        if (
          obj.cliConPhone1 === undefined ||
          obj.cliConPhone1 === "" ||
          obj.cliConPhone1 === null ||
          typeof(obj.cliConPhone1) !== "string"||
          (obj.cliConPhone1.length !== 10 && obj.cliConPhone1.length !== 11 )
        ) {
          isValid = false;
        } else {
          objData.data.cliConPhone1 = obj.cliConPhone1;
        }
        utils.devLog(2, 'cliConPhone1 -> '+isValid, null);

        // cliConPhone2
        if (obj.cliConPhone2 === undefined ||
          obj.cliConPhone2 === null) {
          objData.data.cliConPhone2 = null;
        } else {
          if (
            obj.cliConPhone2 === "" ||
            obj.cliConPhone2 === null ||
            typeof(obj.cliConPhone2) !== "string"||
            (obj.cliConPhone2.length !== 10 && obj.cliConPhone2.length !== 11 )
          ) {
            isValid = false;
          } else {
            objData.data.cliConPhone2 = obj.cliConPhone2;
          }
        }
        utils.devLog(2, 'cliConPhone2 -> '+isValid, null);

        // cliConEmail
        if (
          obj.cliConEmail === undefined ||
          obj.cliConEmail === "" ||
          obj.cliConEmail === null ||
          typeof(obj.cliConEmail) !== "string"
        ) {
          isValid = false;
        } else {
          objData.data.cliConEmail = obj.cliConEmail;
        }
        utils.devLog(2, 'cliConEmail -> '+isValid, null);

        // cliObservations
        if (obj.cliObservations === undefined||
          obj.cliObservations === null) {
          objData.data.cliObservations = null;
        } else {
          if (
            obj.cliObservations === "" ||
            typeof(obj.cliObservations) !== "string"
          ) {
            isValid = false;
          } else {
            objData.data.cliObservations = obj.cliObservations;
          }
        }
        utils.devLog(2, 'cliObservations -> '+isValid, null);

        // cliCreated
        // objData.data.cliCreated = new Date();

        // cliUpdated
        // objData.data.cliUpdated = new Date();

        // cliDeleted
        // objData.data.cliDeleted = null;

        utils.devLog(2, 'Finish -> '+isValid, null);

        return isValid;
      } catch (error) {
        return false;
      }
    }
  }

  clientsGetAll = async ({body,params}, res) => {
    const objData = { idMain: undefined, idSecondary: undefined, idTertiary: undefined, id: undefined, data: {} };

    try {
      const perId = "F002";

      utils.devLog(0, `API ==> Controller => clientsGetAll -> Start`, null);
      
      const { useId } = body;

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
      // if (objResAuth.resData.useKeyCompany !== 0) {
      //   filter.comId = objResAuth.resData.useKeyCompany;
      // }
      const resClientsGetAll = await CLIENTS.findAll({
        where: filter,
        order: [
          ['id', 'ASC'],
        ],
        include: [
          'COMPANIES',
          // 'USERS',
          // 'CONFIG_COUNTRIES',
          // 'CONFIG_STATES',
          // 'CONFIG_CITIES',
          // 'CLIENTS_CONTACTS',
          // 'CLIENTS_SERVICES',
          // 'CLIENTS_FILES',
        ],
      });
      LogsController.logsCreate(useId, perId, `API ==> Controller => clientsGetAll -> Success`, `=> [${useId}] # Clientes: Listagem geral ## [geral]`, null);
      return utils.resSuccess(`API ==> Controller => clientsGetAll -> Success`, resClientsGetAll, res );
    } catch (error) {
      return utils.resError(500,`API ==> Controller => clientsGetAll -> Error`, error, res);
    }
  }

  clientsGetId = async ({body,params}, res) => {
    const objData = { idMain: undefined, idSecondary: undefined, idTertiary: undefined, id: undefined, data: {} };

    try {
      const perId = "F003";

      utils.devLog(0, "API ==> Controller => clientsGetId -> Start", null);
      
      const { useId } = body;

      const objResAuth = await UsersController.usersPermission(useId,perId);
      if (!objResAuth.resData.permission) {
        utils.devLog(2, "API ==> Permission -> FALSE", null);
        return utils.resError(403, objResAuth.resMessage, { perId: objResAuth.resData.perId }, res );
      }
      utils.devLog(2, "API ==> Permission -> TRUE", null);

      // Function Controller Action
      let { cliId } = params;
      utils.devLog(2, 'cliId', cliId);
      if (!validateParameters(cliId)) {
        return utils.resError(400,`API ==> Controller => clientsGetId -> Invalid parameters`, null, res);
      }

      const resClientsGetId = await CLIENTS.findByPk(objData.idMain,{
        include: [
          'COMPANIES',
          'CONFIG_COUNTRIES',
          'CONFIG_STATES',
          'CONFIG_CITIES',          
          'CLIENTS_FILES',
          'CLIENTS_EMPLOYEES',
          'CLIENTS_MEMBERS',
          { 
            model: USERS,
            as: "USERS",
            attributes: ['id','useNickname'], 
          }
        ],
      });

      if (resClientsGetId) {
        // if (objResAuth.resData.useKeyCompany !== 0) {
        //   if (resClientsGetId.comId !== objResAuth.resData.useKeyCompany) {
        //     return utils.resError(403, "API ==> Controller => usersPermission -> Forbidden byId", null, res );
        //   }
        // }
        // resClientsGetId.USERS = [1,2,3]
        // resClientsGetId.USERS = {
        //   id: resClientsGetId.USERS.id,
        //   useNickname: resClientsGetId.USERS.useNickname,
        // }
        LogsController.logsCreate(useId, perId, "API ==> Controller => clientsGetId -> Success", `=> [${useId}] # Clientes: Consultado ## [${objData.idMain}] ${resClientsGetId.cliName}`, objData.idMain);
        return utils.resSuccess('API ==> Controller => clientsGetId -> Success',resClientsGetId, res);    
      } else {
        return utils.resError(404,`API ==> Controller => clientsGetId -> Not found`, null, res);
      }
    } catch (error) {
      return utils.resError(500,`API ==> Controller => clientsGetId -> Error`, error, res);
    }

    function validateParameters(cliId) {
      try {
        let isValid = true;

        // cliId
        cliId = Number(cliId);
        if (
          cliId === undefined ||
          cliId === "" ||
          cliId === null ||
          isNaN(cliId) ||
          typeof(cliId) !== "number"||
          !utils.validateNumberPositive(cliId)
        ) {
          isValid = false;
        } else {
          objData.idMain = cliId;
        }

        return isValid;
      } catch (error) {
        return false;
      }
    }
  }

  clientsPut = async ({body,params}, res) => {
    const objData = { idMain: undefined, idSecondary: undefined, idTertiary: undefined, id: undefined, data: {} };

    try {
      const perId = "F004";

      utils.devLog(0, `API ==> Controller => clientsPut -> Start`, null);
      
      const { useId } = body;


      const objResAuth = await UsersController.usersPermission(useId,perId);
      if (!objResAuth.resData.permission) {
        utils.devLog(2, "API ==> Permission -> FALSE", null);
        return utils.resError(403, objResAuth.resMessage, { perId: objResAuth.resData.perId }, res );
      }
      utils.devLog(2, "API ==> Permission -> TRUE", null);

      // Function Controller Action
      let { cliId } = params;
      utils.devLog(2, 'cliId', cliId);
      utils.devLog(2, 'body', body);
      if (!validateParameters(cliId, body)) {
        return utils.resError(400,`API ==> Controller => clientsPut -> Invalid parameters`, null, res);
      }

      utils.devLog(2, 'API ==> Controller => clientsPut : objData', objData);

      // Check Clients
      const resClientsGetId = await CLIENTS.findByPk(objData.idMain,{});
      console.log(resClientsGetId)
      if (resClientsGetId) {
        // Verifica se usuário possui permissão geral sobre as empresas
        // if (objResAuth.resData.useKeyCompany !== 0) {
        //   // Verifica se o registro que deseja alterar pertente a empresa que possui permissão
        //   if (resClientsGetId.comId !== objResAuth.resData.useKeyCompany) {
        //     return utils.resError(403, "API ==> Controller => usersPermission -> Forbidden byId", null, res );
        //   }
        // }
      } else {
        return utils.resError(404,`API ==> Controller => clientsPut -> clientsGetId -> Not found`, null, res);
      }

      // Check Need Changes User
      let isChangeUser = false;
      if (objData.data.cliDocCpfCnpj !== resClientsGetId.cliDocCpfCnpj || objData.data.comId !== resClientsGetId.comId) {
        isChangeUser = true;
      }

      // Check unique key => cliDocCpfCnpj
      if (objData.data.cliDocCpfCnpj !== resClientsGetId.cliDocCpfCnpj) {
        const resClientsCheckCpfCnpj = await CLIENTS.findAll({
          where: {
            cliDocCpfCnpj: objData.data.cliDocCpfCnpj, // kesdev-cpfcnpj
          }
        });
        utils.devLog(2, 'Check unique key => cliDocCpfCnpj', resClientsCheckCpfCnpj);
        if (resClientsCheckCpfCnpj.length > 0) {
          return utils.resError( 409, "API ==> Controller => clientsPut -> Unique-key conflict [cliDocCpfCnpj]", null, res );
        }
      }

      // Check unique key => cliDocRg
      if (objData.data.cliDocRg !== resClientsGetId.cliDocRg) {
        const resClientsCheckRg = await CLIENTS.findAll({
          where: { 
            cliDocRg: objData.data.cliDocRg // kesdev-cpfcnpj
          }
        });
        utils.devLog(2, 'Check unique key => cliDocRg', resClientsCheckRg);
        if (resClientsCheckRg.length > 0) {
          return utils.resError( 409, "API ==> Controller => clientsPut -> Unique-key conflict [cliDocRg]", null, res );
        }
      }

      // Save Backup
      const bkpClientsData = resClientsGetId;

      // Update Clients
      utils.devLog(2, "API ==> Controller => clientsPut -> Update Clients", null);
      const resClientsPut = await resClientsGetId.update(objData.data);

      // Update User
      let bkpUsersData = null;
      if (isChangeUser) {
        utils.devLog(2, "API ==> Controller => clientsPut -> Update User", null);
        const resUsersPatch = await UsersController.usersPutClients({ 
          params: {
            id: resClientsGetId.useId,
          },
          body: {
            useId: useId,
            comId: objData.data.comId,
            useNickname: objData.data.cliDocCpfCnpj,
          }
        });
        bkpUsersData = resUsersPatch.resData.objUser;
        utils.devLog(2, "API ==> Controller => clientsPut -> resUsersPatch -> Success", resUsersPatch);
        if (resUsersPatch.resStatus !== 200) {
          utils.devLog(2, "API ==> Controller => clientsPut -> Update Clients [restore]", null);
          const resClientsPutRestore = await resClientsGetId.update(bkpClientsData);
          return utils.resError(424, "API ==> Controller => clientsPut -> resUsersPatch -> Error", null, res );
        }
      }

      utils.devLog(2, "API ==> Controller => clientsPut -> Update Employees", null);
      const resEmployeesPut = await ClientsEmployeesController.clientsEmployeesPut({ 
        params: {
          cliId: objData.idMain,
          empId: resClientsGetId.empId,
        },
        body: {
          useId: useId,
          comId: objData.data.comId,
          empName: objData.data.cliName,
          empDocBirthDate: body.cliDocBirthDate, // objData.data.cliDocBirthDate,
          empInfMaritalStatus: objData.data.cliInfMaritalStatus,
          empDocCpf: objData.data.cliDocCpfCnpj,
          empDocRg: objData.data.cliDocRg,
          // empDocCtps: null,
          // empJobOccupation: null,
          // empJobDate: null,
          empConPhone1: objData.data.cliConPhone1,
          empConPhone2: objData.data.cliConPhone2,
          empConEmail: objData.data.cliConEmail,
          empObservations: objData.data.cliObservations,
        }
      });
      utils.devLog(2, "API ==> Controller => clientsPut -> resEmployeesPut -> Success", resEmployeesPut);
      if (resEmployeesPut.resStatus !== 200) {
        utils.devLog(2, "API ==> Controller => clientsPut -> Update Employees [restore] -> Clients", null);
        const resClientsPutRestore = await resClientsGetId.update(bkpClientsData);
        const resUsersGetId = await USERS.findByPk(resClientsGetId.useId,{});
        if (resUsersGetId) {
          // 
        } else {
          return utils.resError(404,`API ==> Controller => clientsPut -> usersGetId -> Not found`, null, res);
        }
        utils.devLog(2, "API ==> Controller => clientsPut -> Update Employees [restore] -> Users", null);
        const resUsersPutRestore = await resUsersGetId.update(bkpUsersData);
        return utils.resError(424, "API ==> Controller => clientsPut -> resEmployeesPut -> Error", null, res );
      }

      LogsController.logsCreate(useId, perId, `API ==> Controller => clientsPut -> Success`, `=> [${useId}] # Clientes: Atualizado ## [${objData.idMain}] ${resClientsGetId.cliName}`, objData.idMain);
      return utils.resSuccess('API ==> Controller => clientsPut -> Success',{cliId: objData.idMain }, res);    

    } catch (error) {
      return utils.resError(500,`API ==> Controller => clientsPut -> Error`, error, res);
    }

    function validateParameters(cliId, obj) {
      try {
        let isValid = true;

        // cliId
        cliId = Number(cliId);
        if (
          cliId === undefined ||
          cliId === "" ||
          cliId === null ||
          isNaN(cliId) ||
          typeof(cliId) !== "number"
        ) {
          isValid = false;
        } else {
          objData.idMain = cliId;
          objData.id = cliId;
        }
        utils.devLog(2, 'cliId -> '+isValid, null);

        // cliIdOld
        if (obj.cliIdOld === undefined ||
          obj.cliIdOld === null) {
          objData.data.cliIdOld = null;
        } else {
          if (
            // obj.cliIdOld === "" ||
            typeof(obj.cliIdOld) !== "string"
          ) {
            isValid = false;
          } else {
            objData.data.cliIdOld = obj.cliIdOld;
          }
        }
        utils.devLog(2, 'cliIdOld -> '+isValid, null);

        // comId
        obj.comId = Number(obj.comId);
        if (
          obj.comId === undefined ||
          obj.comId === "" ||
          obj.comId === null ||
          isNaN(obj.comId) ||
          typeof(obj.comId) !== "number" ||
          !utils.validateNumberPositive(obj.comId)
        ) {
          isValid = false;
        } else {
          objData.data.comId = Number(obj.comId);
        }
        utils.devLog(2, 'comId -> '+isValid, null);
        
        // useId - not change
        // objData.data.useId = 1; // noAuth
        // utils.devLog(2, 'useId -> '+isValid, null);
  
        // cliStatus - not change
        // objData.data.cliStatus = true;
        // utils.devLog(2, 'cliStatus -> '+isValid, null);
        
        // kesdev-current

        // cliName
      if (
        obj.cliName === undefined ||
        obj.cliName === "" ||
        obj.cliName === null ||
        typeof(obj.cliName) !== "string"
      ) {
        isValid = false;
      } else {
        objData.data.cliName = obj.cliName;
      }
      utils.devLog(2, 'cliName -> '+isValid, null);

      // cliNameCompany
      if (obj.cliNameCompany === undefined ||
        obj.cliNameCompany === null) {
        objData.data.cliNameCompany = null;
      } else {
        if (
          // obj.cliNameCompany === "" ||
          typeof(obj.cliNameCompany) !== "string"
        ) {
          isValid = false;
        } else {
          objData.data.cliNameCompany = obj.cliNameCompany;
        }
      }
      utils.devLog(2, 'cliNameCompany -> '+isValid, null);

      // cliInfPerson
      if (
        obj.cliInfPerson === undefined ||
        obj.cliInfPerson === "" ||
        obj.cliInfPerson === null ||
        typeof(obj.cliInfPerson) !== "string"
      ) {
        isValid = false;
      } else {
        utils.devLog(2, 'cliInfPerson [tmp] -> '+isValid, null);
        // if (obj.cliInfPerson !== 'CPF' && obj.cliInfPerson !== 'CNPJ') { // kesdev-cpfcnpj
        if (obj.cliInfPerson !== 'CPF') {
          isValid = false;
        } else {
          objData.data.cliInfPerson = obj.cliInfPerson;
        }
      }
      utils.devLog(2, 'cliInfPerson -> '+isValid, null);
      
      // cliDocBirthDate
      if (!utils.dateDateStrToDate(obj.cliDocBirthDate)) {
        isValid = false;
      } else {
        objData.data.cliDocBirthDate = utils.dateDateStrToDate(obj.cliDocBirthDate);
      }
      utils.devLog(2, 'cliDocBirthDate -> '+isValid, null);

      // cliInfMaritalStatus
      if (obj.cliInfMaritalStatus === undefined ||
        obj.cliInfMaritalStatus === null) {
        objData.data.cliInfMaritalStatus = null;
      } else {
        if (
          obj.cliInfMaritalStatus !== "Solteiro" &&
          obj.cliInfMaritalStatus !== "Casado" &&
          obj.cliInfMaritalStatus !== "Viúvo" &&
          obj.cliInfMaritalStatus !== "Divorciado"
        ) {
          isValid = false;
        } else {
          objData.data.cliInfMaritalStatus = obj.cliInfMaritalStatus;
        }
      }
      utils.devLog(2, 'cliInfMaritalStatus -> '+isValid, null);

      // cliDocCpfCnpj
      if (
        obj.cliDocCpfCnpj === undefined ||
        obj.cliDocCpfCnpj === "" ||
        obj.cliDocCpfCnpj === null ||
        typeof(obj.cliDocCpfCnpj) !== "string" ||
        // (obj.cliDocCpfCnpj.length !== 11 && obj.cliDocCpfCnpj.length !== 14 ) // kesdev-cpfcnpj
        ( obj.cliDocCpfCnpj.length !== 11 )
      ) {
        isValid = false;
      } else {
        objData.data.cliDocCpfCnpj = obj.cliDocCpfCnpj;
      }
      utils.devLog(2, 'cliDocCpfCnpj -> '+isValid, null);

      // cliDocRg
      if ( // kesdev-cpfcnpj
        obj.cliDocRg === undefined ||
        obj.cliDocRg === "" ||
        obj.cliDocRg === null ||
        typeof(obj.cliDocRg) !== "string"
      ) {
        isValid = false;
      } else {
        objData.data.cliDocRg = obj.cliDocRg;
      }
      utils.devLog(2, 'cliDocRg -> '+isValid, null);

      // cliDocRegistrationStateIndicator
      if (
        obj.cliDocRegistrationStateIndicator === undefined ||
        obj.cliDocRegistrationStateIndicator === "" ||
        obj.cliDocRegistrationStateIndicator === null ||
        typeof(obj.cliDocRegistrationStateIndicator) !== "string"
      ) {
        isValid = false;
      } else {
        utils.devLog(2, 'cliDocRegistrationStateIndicator [tmp] -> '+isValid, null);
        if (obj.cliDocRegistrationStateIndicator !== 'Não Contribuinte' && obj.cliDocRegistrationStateIndicator !== 'Contribuinte' && obj.cliDocRegistrationStateIndicator !== 'Contribuinte Isento') {
          isValid = false;
        } else {
          objData.data.cliDocRegistrationStateIndicator = obj.cliDocRegistrationStateIndicator;
        }
      }
      utils.devLog(2, 'cliDocRegistrationStateIndicator -> '+isValid, null);

      // cliDocRegistrationState
      if (obj.cliDocRegistrationState === undefined||
        obj.cliDocRegistrationState === null) {
        objData.data.cliDocRegistrationState = null;
      } else {
        if (
          obj.cliDocRegistrationState === "" ||
          typeof(obj.cliDocRegistrationState) !== "string"
        ) {
          isValid = false;
        } else {
          objData.data.cliDocRegistrationState = obj.cliDocRegistrationState;
        }
      }
      utils.devLog(2, 'cliDocRegistrationState -> '+isValid, null);

      // cliDocRegistrationMunicipal
      if (obj.cliDocRegistrationMunicipal === undefined||
        obj.cliDocRegistrationMunicipal === null) {
        objData.data.cliDocRegistrationMunicipal = null;
      } else {
        if (
          obj.cliDocRegistrationMunicipal === "" ||
          typeof(obj.cliDocRegistrationMunicipal) !== "string"
        ) {
          isValid = false;
        } else {
          objData.data.cliDocRegistrationMunicipal = obj.cliDocRegistrationMunicipal;
        }
      }
      utils.devLog(2, 'cliDocRegistrationMunicipal -> '+isValid, null);

      // cliAddCep
      if (
        obj.cliAddCep === undefined ||
        obj.cliAddCep === "" ||
        obj.cliAddCep === null ||
        typeof(obj.cliAddCep) !== "string" ||
        obj.cliAddCep.length !== 8
      ) {
        isValid = false;
      } else {
        objData.data.cliAddCep = obj.cliAddCep;
      }
      utils.devLog(2, 'cliAddCep -> '+isValid, null);

      // cliAddAddress
      if (
        obj.cliAddAddress === undefined ||
        obj.cliAddAddress === "" ||
        obj.cliAddAddress === null ||
        typeof(obj.cliAddAddress) !== "string"
      ) {
        isValid = false;
      } else {
        objData.data.cliAddAddress = obj.cliAddAddress;
      }
      utils.devLog(2, 'cliAddAddress -> '+isValid, null);

      // cliAddComplement
      if (obj.cliAddComplement === undefined ||
        obj.cliAddComplement === null) {
        objData.data.cliAddComplement = null;
      } else {
        if (
          obj.cliAddComplement === "" ||
          typeof(obj.cliAddComplement) !== "string"
        ) {
          isValid = false;
        } else {
          objData.data.cliAddComplement = obj.cliAddComplement;
        }
      }
      utils.devLog(2, 'cliAddComplement -> '+isValid, null);

      // cliAddNumber
      if (obj.cliAddNumber === undefined ||
        obj.cliAddNumber === null) {
        objData.data.cliAddNumber = null;
      } else {
        if (
          obj.cliAddNumber === "" ||
          typeof(obj.cliAddNumber) !== "string"
        ) {
          isValid = false;
        } else {
          objData.data.cliAddNumber = obj.cliAddNumber;
        }
      }
      utils.devLog(2, 'cliAddNumber -> '+isValid, null);

      // cliAddDistrict
      if (
        obj.cliAddDistrict === undefined ||
        obj.cliAddDistrict === "" ||
        obj.cliAddDistrict === null ||
        typeof(obj.cliAddDistrict) !== "string"
      ) {
        isValid = false;
      } else {
        objData.data.cliAddDistrict = obj.cliAddDistrict;
      }
      utils.devLog(2, 'cliAddDistrict -> '+isValid, null);

      // cliAddCouId
      obj.cliAddCouId = Number(obj.cliAddCouId);
      if (
        obj.cliAddCouId === undefined ||
        obj.cliAddCouId === "" ||
        obj.cliAddCouId === null ||
        isNaN(obj.cliAddCouId) ||
        typeof(obj.cliAddCouId) !== "number"||
        !utils.validateNumberPositive(obj.cliAddCouId)
      ) {
        isValid = false;
      } else {
        objData.data.cliAddCouId = 1;// 1 = Brasil // Number(obj.cliAddCouId);
      }
      utils.devLog(2, 'cliAddCouId -> '+isValid, null);

      // cliAddStaId
      obj.cliAddStaId = Number(obj.cliAddStaId);
      if (
        obj.cliAddStaId === undefined ||
        obj.cliAddStaId === "" ||
        obj.cliAddStaId === null ||
        isNaN(obj.cliAddStaId) ||
        typeof(obj.cliAddStaId) !== "number" ||
        !utils.validateNumberPositive(obj.cliAddStaId)
      ) {
        isValid = false;
      } else {
        objData.data.cliAddStaId = Number(obj.cliAddStaId);
      }
      utils.devLog(2, 'cliAddStaId -> '+isValid, null);

      // cliAddCitId
      obj.cliAddCitId = Number(obj.cliAddCitId);
      if (
        obj.cliAddCitId === undefined ||
        obj.cliAddCitId === "" ||
        obj.cliAddCitId === null ||
        isNaN(obj.cliAddCitId) ||
        typeof(obj.cliAddCitId) !== "number"||
        !utils.validateNumberPositive(obj.cliAddCitId)
      ) {
        isValid = false;
      } else {
        objData.data.cliAddCitId = Number(obj.cliAddCitId);
      }
      utils.devLog(2, 'cliAddCitId -> '+isValid, null);

      // cliConPhone1
      if (
        obj.cliConPhone1 === undefined ||
        obj.cliConPhone1 === "" ||
        obj.cliConPhone1 === null ||
        typeof(obj.cliConPhone1) !== "string"||
        (obj.cliConPhone1.length !== 10 && obj.cliConPhone1.length !== 11 )
      ) {
        isValid = false;
      } else {
        objData.data.cliConPhone1 = obj.cliConPhone1;
      }
      utils.devLog(2, 'cliConPhone1 -> '+isValid, null);

      // cliConPhone2
      if (obj.cliConPhone2 === undefined ||
        obj.cliConPhone2 === null) {
        objData.data.cliConPhone2 = null;
      } else {
        if (
          obj.cliConPhone2 === "" ||
          obj.cliConPhone2 === null ||
          typeof(obj.cliConPhone2) !== "string"||
          (obj.cliConPhone2.length !== 10 && obj.cliConPhone2.length !== 11 )
        ) {
          isValid = false;
        } else {
          objData.data.cliConPhone2 = obj.cliConPhone2;
        }
      }
      utils.devLog(2, 'cliConPhone2 -> '+isValid, null);

      // cliConEmail
      if (
        obj.cliConEmail === undefined ||
        obj.cliConEmail === "" ||
        obj.cliConEmail === null ||
        typeof(obj.cliConEmail) !== "string"
      ) {
        isValid = false;
      } else {
        objData.data.cliConEmail = obj.cliConEmail;
      }
      utils.devLog(2, 'cliConEmail -> '+isValid, null);

      // cliObservations
      if (obj.cliObservations === undefined||
        obj.cliObservations === null) {
        objData.data.cliObservations = null;
      } else {
        if (
          obj.cliObservations === "" ||
          typeof(obj.cliObservations) !== "string"
        ) {
          isValid = false;
        } else {
          objData.data.cliObservations = obj.cliObservations;
        }
      }
      utils.devLog(2, 'cliObservations -> '+isValid, null);

      // cliCreated
      // objData.data.cliCreated = new Date();

      // cliUpdated
      // objData.data.cliUpdated = new Date();

      // cliDeleted
      // objData.data.cliDeleted = null;

      utils.devLog(2, 'Finish -> '+isValid, null);

        return isValid;
      } catch (error) {
        return false;
      }
    }
  }

  clientsPatch = async ({body,params}, res) => {
    const objData = { idMain: undefined, idSecondary: undefined, idTertiary: undefined, id: undefined, data: {} };

    try {
      const perId = "F005";

      utils.devLog(0, `API ==> Controller => clientsPatch Start`, null);

      const { useId } = body;

      const objResAuth = await UsersController.usersPermission(useId,perId);
      if (!objResAuth.resData.permission) {
        utils.devLog(2, "API ==> Permission -> FALSE", null);
        return utils.resError(403, objResAuth.resMessage, { perId: objResAuth.resData.perId }, res );
      }
      utils.devLog(2, "API ==> Permission -> TRUE", null);

      // Function Controller Action
      let { cliId } = params;
      utils.devLog(2, 'cliId', cliId);
      utils.devLog(2, 'body', body);
      if (!validateParameters(cliId, body)) {
        return utils.resError(400,`API ==> Controller => clientsPatch -> Invalid parameters`, null, res);
      }

      utils.devLog(2, 'API ==> Controller => clientsPatch : objData', objData);

      // Check Clients
      const resClientsGetId = await CLIENTS.findByPk(objData.idMain,{});
      if (resClientsGetId) {
        // Verifica se usuário possui permissão geral sobre as empresas
        // if (objResAuth.resData.useKeyCompany !== 0) {
        //   if (resClientsGetId.comId !== objResAuth.resData.useKeyCompany) {
        //     return utils.resError(403, "API ==> Controller => usersPermission -> Forbidden byId", null, res );
        //   }
        // }
      } else {
        return utils.resError(404,`API ==> Controller => clientsPatch -> clientsGetId -> Not found`, null, res);
      }
      const bkpClientsData = resClientsGetId;

      // Update Clients
      utils.devLog(2, "API ==> Controller => clientsPatch -> Update Clients", null);
      const resClientsPatch = await resClientsGetId.update(objData.data);

      // Update User
      let bkpUsersData = null;
      utils.devLog(2, "API ==> Controller => clientsPatch -> Update User", null);
      const resUsersPatch = await UsersController.usersPatchStatus({ 
        params: {
          id: resClientsGetId.useId,
        },
        body: {
          useId: useId,
          useStatus: objData.data.cliStatus,
      }});
      bkpUsersData = resUsersPatch.resData.objUser;
      utils.devLog(2, "API ==> Controller => clientsPatch -> resUsersPatch -> Success", resUsersPatch);
      if (resUsersPatch.resStatus !== 200) {
        utils.devLog(2, "API ==> Controller => clientsPatch -> Update Clients [restore]", null);
        const resClientsPutRestore = await resClientsGetId.update(bkpClientsData);
        return utils.resError(424, "API ==> Controller => clientsPatch -> resUsersPatch -> Error", null, res );
      }

      if (!objData.data.cliStatus) {
        // Disable ALL
        utils.devLog(2, "API ==> Controller => clientsPatch -> Disable ALL", null);

        const sqlWhere = { where: { cliId: objData.idMain }};
        // Disabled Employees
          utils.devLog(2, "API ==> Controller => clientsPatch -> Disable Clients Employees", null);
          await CLIENTS_EMPLOYEES.update({ empStatus: false }, sqlWhere);
        // Disabled Employees
          utils.devLog(2, "API ==> Controller => clientsPatch -> Disable Clients Members", null);
          await CLIENTS_MEMBERS.update({ memStatus: false }, sqlWhere);

          utils.devLog(2, "API ==> Controller => clientsPatch -> Disable ALL -> Success", null);
      }
      
      LogsController.logsCreate(useId, perId, 'API ==> Controller => clientsPatch -> Success', `=> [${useId}] # Clientes: Atualizado [status] ## [${objData.idMain}] ${resClientsGetId.cliName}`, objData.idMain);
      return utils.resSuccess('API ==> Controller => clientsPatch -> Success',{cliId: objData.idMain }, res);    

    } catch (error) {
      return utils.resError(500,`API ==> Controller => clientsPatch -> Error`, error, res);
    }

    function validateParameters(cliId, obj) {
      try {
        let isValid = true;

        // cliId
        cliId = Number(cliId);
        if (
          cliId === undefined ||
          cliId === "" ||
          cliId === null ||
          isNaN(cliId) ||
          typeof(cliId) !== "number"||
          !utils.validateNumberPositive(cliId)
        ) {
          isValid = false;
        } else {
          objData.id = cliId;
          objData.idMain = cliId;
        }
        utils.devLog(2, null, isValid);

        // cliStatus
        if (
          obj.cliStatus === undefined ||
          obj.cliStatus === "" ||
          obj.cliStatus === null ||
          typeof(obj.cliStatus) !== "boolean" ||
          !utils.validateBoolean(obj.cliStatus)
        ) {
          isValid = false;
        } else {
          objData.data.cliStatus = obj.cliStatus;
        }
        utils.devLog(2, null, isValid);

        // parCreated
        // objData.data.parCreated = new Date();

        // parUpdated
        // objData.data.parUpdated = new Date();

        // parDeleted
        // objData.data.parDeleted = null;

        // console.log(isValid)

        return isValid;
      } catch (error) {
        return false;
      }
    }
  }
  
  // Disabled
  clientsDelete = async ({body,params}, res) => {
    const objData = { idMain: undefined, id: undefined, data: {} };

    try {
      const perId = "F006";
      const logMsg = "API ==> Controller => clientsDelete -> Start";
      const { useId } = body;

      utils.devLog(0, logMsg, null);
      const objResAuth = await UsersController.usersPermission(useId,perId);
      if (!objResAuth.resData.permission) {
        utils.devLog(2, "API ==> Permission -> FALSE", null);
        return utils.resError(403, objResAuth.resMessage, { perId: objResAuth.resData.perId }, res );
      }
      utils.devLog(2, "API ==> Permission -> TRUE", null);

      // Function Controller Action
      let { cliId } = params;
      if (!validateParameters(cliId)) {
        return utils.resError(400,`API ==> Controller => clientsDelete -> Invalid parameters`, null, res);
      }

      utils.devLog(2, "API ==> Controller => clientsDelete : objData", null);
      utils.devLog(2, null, objData);

      // Check Clients
      const resClientsGetId = await CLIENTS.findByPk(objData.id,{});
      if (resClientsGetId) {
        // Verifica se usuário possui permissão geral sobre as empresas
        // if (objResAuth.resData.useKeyCompany !== 0) {
        //   if (resClientsGetId.comId !== objResAuth.resData.useKeyCompany) {
        //     return utils.resError(403, "API ==> Controller => usersPermission -> Forbidden byId", null, res );
        //   }
        // }
      } else {
        return utils.resError(404,`API ==> Controller => clientsDelete -> clientsGetId -> Not found`, null, res);
      }

      // Delete Clients
      const resClientsDelete = await resClientsGetId.destroy();

      LogsController.logsCreate(useId, perId, logMsg, `=> [${useId}] # Clientes: Deletado ## [${objData.id}] ${resClientsGetId.parName}`, objData.id);
      return utils.resSuccess('API ==> Controller => clientsDelete -> Success',{cliId: objData.id }, res);    

    } catch (error) {
      return utils.resError(500,`API ==> Controller => clientsDelete -> Error`, error, res);
    }

    function validateParameters(cliId) {
      try {
        let isValid = true;

        // cliId
        cliId = Number(cliId);
        if (
          cliId === undefined ||
          cliId === "" ||
          cliId === null ||
          isNaN(cliId) ||
          typeof(cliId) !== "number"||
          !utils.validateNumberPositive(cliId)
        ) {
          isValid = false;
        } else {
          objData.id = cliId;
        }

        return isValid;
      } catch (error) {
        return false;
      }
    }
  }
  
}

module.exports = new ClientsController();
