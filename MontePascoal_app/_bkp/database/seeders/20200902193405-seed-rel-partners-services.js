'use strict';

module.exports = {
  up: (queryInterface, DataTypes) => {
    return queryInterface.bulkInsert("REL_PARTNERS_SERVICES",
      [
        {
          parId: 1,
          serId: 1,
          parSerCreated: new Date(),
          parSerUpdated: new Date(),
          parSerDeleted: null,
        },
        {
          parId: 1,
          serId: 2,
          parSerCreated: new Date(),
          parSerUpdated: new Date(),
          parSerDeleted: null,
        },
        {
          parId: 2,
          serId: 3,
          parSerCreated: new Date(),
          parSerUpdated: new Date(),
          parSerDeleted: null,
        },
      ],
      {}
    );
  },
  down: (queryInterface, DataTypes) => {
    return queryInterface.bulkDelete("REL_PARTNERS_SERVICES", null, {});
  },
};
