/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// CONTROLLER USER /////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//  --------------------------------------------------------------------------------------------------------------------------------------- Modules -----

const { Op } = require("sequelize");
const utils = require("../utils/utils.js");

const {
  EMPLOYEES,
  EMPLOYEES_MEMBERS,
  CONFIG_COUNTRIES,
  CONFIG_STATES,
  CONFIG_CITIES,
  CONFIG_EMPLOYEES_DEPARTMENTS,
  CONFIG_EMPLOYEES_OCCUPATIONS,
  PARTNERS,
  PARTNERS_CONTACTS
} = require("../models");

const LogsController = require('./LogsController');
const UsersController = require('./UsersController');

//  ------------------------------------------------------------------------------------------------------------------------------------- Class API -----
class PartnersContactsController {

  constructor() {
    //   this.step1 = this.step1.bind(this);
    //   this.step2 = this.step2.bind(this);
  }

  partnersContactsPost = async ({body,params}, res) => {
    const objData = { idMain: undefined, id: undefined, data: {} };

    try {
      const perId = "D001";
      const logMsg = "API ==> Controller => partnersContactsPost -> Start";
      const { useId } = body;

      utils.devLog(0, logMsg, null);
      const objResAuth = await UsersController.usersPermission(useId,perId);
      if (!objResAuth.resData.permission) {
        utils.devLog(2, "API ==> Permission -> FALSE", null);
        return utils.resError(403, objResAuth.resMessage, { perId: objResAuth.resData.perId }, res );
      }
      utils.devLog(2, "API ==> Permission -> TRUE", null);

      // Function Controller Action
      let { parId } = params;
      utils.devLog(2, null, parId);
      utils.devLog(2, null, body);
      if (!validateParameters(parId, body)) {
        return utils.resError(400,`API ==> Controller => partnersContactsPost -> Invalid parameters`, null, res);
      }

      utils.devLog(2, "API ==> Controller => partnersContactsPost : objData", null);
      utils.devLog(2, null, objData);

      // Check Partners
      const resPartnersGetId = await PARTNERS.findByPk(objData.idMain, {});
      if (resPartnersGetId) {
        // Verifica se usuário possui permissão geral sobre as empresas
        // if (objResAuth.resData.useKeyCompany !== 0) {
        //   // Verifica se o registro que deseja alterar pertente a empresa que possui permissão
        //   if (resPartnersGetId.comId !== objResAuth.resData.useKeyCompany) {
        //     return utils.resError(403, "API ==> Controller => usersPermission -> Forbidden byId", null, res );
        //   }
        // }
      } else {
        return utils.resError(404,`API ==> Controller => partnersContactsPost -> partnersGetId -> Not found`, null, res);
      }

      // Check unique key => empDocCpf
      // const resEmployeesMembersGetId = await PARTNERS_CONTACTS.findAll({
      //   where: {
      //     memRg: objData.data.memRg
      //   }
      // });
      // utils.devLog(2, null, resEmployeesMembersGetId);
      // if (resEmployeesMembersGetId.length > 0) {
      //   return utils.resError(409, "API ==> Controller => employeesPost -> Unique-key conflict", null, res );
      // }

      // Save DATA
      const resPartnersContactsPost = await PARTNERS_CONTACTS.create(objData.data);
      objData.id = resPartnersContactsPost.dataValues.id;

      LogsController.logsCreate(useId, perId, logMsg, `=> [${useId}] # Parceiros (Contatos): Cadastrado ## [${objData.id}] ${objData.data.conName}`, objData.id);
      return utils.resSuccess('API ==> Controller => partnersContactsPost -> Success',{conId: objData.id }, res);    

    } catch (error) {
      return utils.resError(500,`API ==> Controller => partnersContactsPost -> Error`, error, res);
    }

    function validateParameters(parId, obj) {
      try {
        let isValid = true;
        
        // parId
        parId = Number(parId);
        if (
          parId === undefined ||
          parId === "" ||
          parId === null ||
          isNaN(parId) ||
          typeof(parId) !== "number"||
          !utils.validateNumberPositive(parId)
        ) {
          isValid = false;
        } else {
          objData.idMain = Number(parId);
          objData.data.parId = Number(parId);
        }
        utils.devLog(2, 'parId -> '+isValid, null);

        // conStatus
        objData.data.conStatus = true;
        utils.devLog(2, 'conStatus -> '+isValid, null);

        // conName
        if (
          obj.conName === undefined ||
          obj.conName === "" ||
          obj.conName === null ||
          typeof(obj.conName) !== "string"
        ) {
          isValid = false;
        } else {
          objData.data.conName = obj.conName;
        }
        utils.devLog(2, 'conName -> '+isValid, null);

        // conPhone1
        if (
          obj.conPhone1 === undefined ||
          obj.conPhone1 === "" ||
          obj.conPhone1 === null ||
          typeof(obj.conPhone1) !== "string"||
          (obj.conPhone1.length !== 10 && obj.conPhone1.length !== 11 )
        ) {
          isValid = false;
        } else {
          objData.data.conPhone1 = obj.conPhone1;
        }
        utils.devLog(2, 'conPhone1 -> '+isValid, null);

        // conPhone2
        if (obj.conPhone2 === undefined ||
          obj.conPhone2 === null) {
          objData.data.conPhone2 = null;
        } else {
          if (
            obj.conPhone2 === "" ||
            obj.conPhone2 === null ||
            typeof(obj.conPhone2) !== "string"||
            (obj.conPhone2.length !== 10 && obj.conPhone2.length !== 11 )
          ) {
            isValid = false;
          } else {
            objData.data.conPhone2 = obj.conPhone2;
          }
        }
        utils.devLog(2, 'conPhone2 -> '+isValid, null);

        // conEmail
        if (
          obj.conEmail === undefined ||
          obj.conEmail === "" ||
          obj.conEmail === null ||
          typeof(obj.conEmail) !== "string"
        ) {
          isValid = false;
        } else {
          objData.data.conEmail = obj.conEmail;
        }
        utils.devLog(2, 'conEmail -> '+isValid, null);

        // conObservations
        if (obj.conObservations === undefined||
          obj.conObservations === null) {
          objData.data.conObservations = null;
        } else {
          if (
            obj.conObservations === "" ||
            typeof(obj.conObservations) !== "string"
          ) {
            isValid = false;
          } else {
            objData.data.conObservations = obj.conObservations;
          }
        }
        utils.devLog(2, 'parObservations -> '+isValid, null);

        // parCreated
        // objData.data.parCreated = new Date();

        // parUpdated
        // objData.data.parUpdated = new Date();

        // parDeleted
        // objData.data.parDeleted = null;

        utils.devLog(2, 'Finish -> '+isValid, null);

        return isValid;
      } catch (error) {
        console.error(error);
        return false;
      }
    }
  }

  partnersContactsGetAll = async ({body,params}, res) => {
    const objData = { idMain: undefined, id: undefined, data: {} };

    try {
      const perId = "D003";
      const logMsg = "API ==> Controller => partnersContactsGetAll -> Start";
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
      let { parId } = params;
      if (!validateParameters(parId)) {
        return utils.resError(400,`API ==> Controller => partnersContactsGetId -> Invalid parameters`, null, res);
      }

      // Check Partners
      const resPartnersGetId = await PARTNERS.findByPk(objData.idMain, {});
      if (resPartnersGetId) {
        // Verifica se usuário possui permissão geral sobre as empresas
        // if (objResAuth.resData.useKeyCompany !== 0) {
        //   // Verifica se o registro que deseja alterar pertente a empresa que possui permissão
        //   if (resPartnersGetId.comId !== objResAuth.resData.useKeyCompany) {
        //     return utils.resError(403, "API ==> Controller => usersPermission -> Forbidden byId", null, res );
        //   }
        // }
      } else {
        return utils.resError(404,`API ==> Controller => partnersContactsGetAll -> partnersGetId -> Not found`, null, res);
      }

      // Check filters
      const filters = [];
        filters.push({parId: objData.idMain});
        // filters.push({conStatus: false});
      const objFilter = {
        [Op.and]: filters
      };
      const resPartnersContactsGetAll = await PARTNERS_CONTACTS.findAll({
        where: objFilter,
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
          // { model: CONFIG_EMPLOYEES_DEPARTMENTS, as: "CONFIG_EMPLOYEES_DEPARTMENTS" },
          // { model: CONFIG_EMPLOYEES_OCCUPATIONS, as: "CONFIG_EMPLOYEES_OCCUPATIONS" },
        ],
      });

      LogsController.logsCreate(useId, perId, logMsg, `=> [${useId}] # Parceiros (Contatos): Listagem geral ## [geral]`, null);
      return utils.resSuccess('API ==> Controller => partnersContactsGetAll -> Success', resPartnersContactsGetAll, res );
    } catch (error) {
      return utils.resError(500,`API ==> Controller => partnersContactsGetAll -> Error`, error, res);
    }

    function validateParameters(parId) {
      try {
        let isValid = true;

        // parId
        parId = Number(parId);
        if (
          parId === undefined ||
          parId === "" ||
          parId === null ||
          isNaN(parId) ||
          typeof(parId) !== "number"||
          !utils.validateNumberPositive(parId)
        ) {
          isValid = false;
        } else {
          objData.idMain = Number(parId);
        }

        return isValid;
      } catch (error) {
        return false;
      }
    }
  }

  partnersContactsPatch = async ({body,params}, res) => {
    const objData = { idMain: undefined, id: undefined, data: {} };

    try {
      const perId = "D004";
      const logMsg = "API ==> Controller => partnersContactsPatch -> Start";
      const { useId } = body;

      utils.devLog(0, logMsg, null);
      const objResAuth = await UsersController.usersPermission(useId,perId);
      if (!objResAuth.resData.permission) {
        utils.devLog(2, "API ==> Permission -> FALSE", null);
        return utils.resError(403, objResAuth.resMessage, { perId: objResAuth.resData.perId }, res );
      }
      utils.devLog(2, "API ==> Permission -> TRUE", null);

      // Function Controller Action
      let { parId, conId } = params;
      utils.devLog(2, null, parId);
      utils.devLog(2, null, conId);
      utils.devLog(2, null, body);
      if (!validateParameters(parId, conId, body)) {
        return utils.resError(400,`API ==> Controller => partnersContactsPatch -> Invalid parameters`, null, res);
      }

      utils.devLog(2, "API ==> Controller => partnersContactsPatch : objData", null);
      utils.devLog(2, null, objData);

      // Check Partners
      const resPartnersGetId = await PARTNERS.findByPk(objData.idMain, {});
      if (resPartnersGetId) {
        // Verifica se usuário possui permissão geral sobre as empresas
        // if (objResAuth.resData.useKeyCompany !== 0) {
        //   // Verifica se o registro que deseja alterar pertente a empresa que possui permissão
        //   if (resPartnersGetId.comId !== objResAuth.resData.useKeyCompany) {
        //     return utils.resError(403, "API ==> Controller => usersPermission -> Forbidden byId", null, res );
        //   }
        // }
      } else {
        return utils.resError(404,`API ==> Controller => partnersContactsPatch -> partnersGetId -> Not found`, null, res);
      }

      // Check Contacts
      const resPartnersContactsGetId = await PARTNERS_CONTACTS.findByPk(objData.id, {});
      if (resPartnersContactsGetId) {
        // Verifica membro corresponde ao colaborador enviado
        if (resPartnersContactsGetId.parId === objData.idMain) {
        } else {
          return utils.resError(400,`API ==> Controller => partnersContactsPatch -> Invalid parameters -> id main`, null, res);
        }
      } else {
        return utils.resError(404,`API ==> Controller => partnersContactsPatch -> PartnersContactsGetId -> Not found`, null, res);
      }

      // Update Partners
      const resPartnersPatch = await resPartnersContactsGetId.update(objData.data);

      LogsController.logsCreate(useId, perId, logMsg, `=> [${useId}] # Parceiros (Contatos): Atualizado [desabilitado] ## [${objData.id}] ${resPartnersContactsGetId.conName}`, objData.id);
      return utils.resSuccess('API ==> Controller => partnersContactsPatch -> Success',{conId: objData.id }, res);    

    } catch (error) {
      return utils.resError(500,`API ==> Controller => partnersContactsPatch -> Error`, error, res);
    }

    function validateParameters(parId, conId, obj) {
      try {
        let isValid = true;

        // parId
        parId = Number(parId);
        if (
          parId === undefined ||
          parId === "" ||
          parId === null ||
          isNaN(parId) ||
          typeof(parId) !== "number"||
          !utils.validateNumberPositive(parId)
        ) {
          isValid = false;
        } else {
          objData.idMain = Number(parId);
        }
        utils.devLog(2, 'parId -> '+isValid, null);

        // conId
        conId = Number(conId);
        if (
          conId === undefined ||
          conId === "" ||
          conId === null ||
          isNaN(conId) ||
          typeof(conId) !== "number"||
          !utils.validateNumberPositive(conId)
        ) {
          isValid = false;
        } else {
          objData.id = Number(conId);
        }
        utils.devLog(2, 'conId -> '+isValid, null);

        // conStatus
        if (
          obj.conStatus === undefined ||
          obj.conStatus === "" ||
          obj.conStatus === null ||
          typeof(obj.conStatus) !== "boolean" ||
          !utils.validateBoolean(obj.conStatus)
        ) {
          isValid = false;
        } else {
          objData.data.conStatus = obj.conStatus;
        }
        utils.devLog(2, 'conStatus -> '+isValid, null);

        // conCreated
        // objData.data.conCreated = new Date();

        // conUpdated
        // objData.data.conUpdated = new Date();

        // conDeleted
        // objData.data.conDeleted = null;

        // console.log(isValid);

        return isValid;
      } catch (error) {
        return false;
      }
    }
  }

  partnersContactsDelete = async ({body,params}, res) => {
    const objData = { idMain: undefined, id: undefined, data: {} };

    try {
      const perId = "D006";
      const logMsg = "API ==> Controller => partnersContactsDelete -> Start";
      const { useId } = body;

      utils.devLog(0, logMsg, null);
      const objResAuth = await UsersController.usersPermission(useId,perId);
      if (!objResAuth.resData.permission) {
        utils.devLog(2, "API ==> Permission -> FALSE", null);
        return utils.resError(403, objResAuth.resMessage, { perId: objResAuth.resData.perId }, res );
      }
      utils.devLog(2, "API ==> Permission -> TRUE", null);

      // Function Controller Action
      let { parId, conId } = params;
      utils.devLog(2, null, parId);
      utils.devLog(2, null, conId);
      utils.devLog(2, null, body);
      if (!validateParameters(parId, conId, body)) {
        return utils.resError(400,`API ==> Controller => partnersContactsDelete -> Invalid parameters`, null, res);
      }

      utils.devLog(2, "API ==> Controller => partnersContactsDelete : objData", null);
      utils.devLog(2, null, objData);

      // Check Partners
      const resPartnersGetId = await PARTNERS.findByPk(objData.idMain, {});
      if (resPartnersGetId) {
        // Verifica se usuário possui permissão geral sobre as empresas
        // if (objResAuth.resData.useKeyCompany !== 0) {
        //   // Verifica se o registro que deseja alterar pertente a empresa que possui permissão
        //   if (resPartnersGetId.comId !== objResAuth.resData.useKeyCompany) {
        //     return utils.resError(403, "API ==> Controller => usersPermission -> Forbidden byId", null, res );
        //   }
        // }
      } else {
        return utils.resError(404,`API ==> Controller => partnersContactsDelete -> PartnersGetId -> Not found`, null, res);
      }

      // Check Members
      const resPartnersContactsGetId = await PARTNERS_CONTACTS.findByPk(objData.id, {});
      if (resPartnersContactsGetId) {
        // Verifica membro corresponde ao colaborador enviado
        if (resPartnersContactsGetId.parId === objData.idMain) {
        } else {
          return utils.resError(400,`API ==> Controller => partnersContactsDelete -> Invalid parameters -> id main`, null, res);
        }
      } else {
        return utils.resError(404,`API ==> Controller => partnersContactsDelete -> partnersContactsGetId -> Not found`, null, res);
      }

      // Update Partners
      const resPartnersContactsDelete = await resPartnersContactsGetId.destroy();

      LogsController.logsCreate(useId, perId, logMsg, `=> [${useId}] # Parceiros (Contatos): Deletado ## [${objData.id}] ${resPartnersContactsGetId.conName}`, objData.id);
      return utils.resSuccess('API ==> Controller => partnersContactsDelete -> Success',{conId: objData.id }, res);    

    } catch (error) {
      return utils.resError(500,`API ==> Controller => partnersContactsDelete -> Error`, error, res);
    }

    function validateParameters(parId, conId, obj) {
      try {
        let isValid = true;

        // parId
        parId = Number(parId);
        if (
          parId === undefined ||
          parId === "" ||
          parId === null ||
          isNaN(parId) ||
          typeof(parId) !== "number"||
          !utils.validateNumberPositive(parId)
        ) {
          isValid = false;
        } else {
          objData.idMain = Number(parId);
        }
        utils.devLog(2, 'parId -> '+isValid, null);

        // conId
        conId = Number(conId);
        if (
          conId === undefined ||
          conId === "" ||
          conId === null ||
          isNaN(conId) ||
          typeof(conId) !== "number"||
          !utils.validateNumberPositive(conId)
        ) {
          isValid = false;
        } else {
          objData.id = Number(conId);
        }
        utils.devLog(2, 'conId -> '+isValid, null);

        // conCreated
        // objData.data.conCreated = new Date();

        // conUpdated
        // objData.data.conUpdated = new Date();

        // conDeleted
        // objData.data.conDeleted = null;

        // console.log(isValid);

        return isValid;
      } catch (error) {
        return false;
      }
    }
  }

}

module.exports = new PartnersContactsController();
