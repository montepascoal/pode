"use strict";

module.exports = {
  up: (queryInterface, DataTypes) => {
    return queryInterface.bulkInsert("LOGS",
      [
        {
          useId: 1,
          logDate: new Date(),
          logPermission: "0000", // Number of permission request
          logDescription: "Test for log 01",
          logText: "=> 1 # Descrição do que foi feito ## [1] Name", //"=> ADM # Colaborador criado ## [deltta] Suporte",
          objId: 1,
          logCreated: new Date(),
          logUpdated: new Date(),
          logDeleted: null,
        },
        {
          useId: 2,
          logDate: new Date(),
          logPermission: "A001",
          logDescription: "Test for log 02",
          logText: "=> 1 # Empresa criada ## [1] Name", //"=> ADM # Usuário criado ## suporte",
          objId: 1,
          logCreated: new Date(),
          logUpdated: new Date(),
          logDeleted: null,
        },
      ],
      {}
    );
  },
  down: (queryInterface, DataTypes) => {
    return queryInterface.bulkDelete("LOGS", null, {});
  },
};
