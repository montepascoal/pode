"use strict";

module.exports = {
  up: (queryInterface, DataTypes) => {
    return queryInterface.bulkInsert("NOAUTH",
      [
        {
          useId: 1,
          noaName: "NoAuth", 
          noaType: "NoAuth",
          noaCreated: new Date(),
          noaUpdated: new Date(),
          noaDeleted: null,
        },
      ],
      {}
    );
  },
  down: (queryInterface, DataTypes) => {
    return queryInterface.bulkDelete("NOAUTH", null, {});
  },
};
