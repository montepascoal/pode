'use strict';

module.exports = {
  up: (queryInterface, DataTypes) => {
    return queryInterface.bulkInsert("REL_PROVIDERS_SERVICES",
      [
        {
          proId: 1,
          serId: 1,
          proSerCreated: new Date(),
          proSerUpdated: new Date(),
          proSerDeleted: null,
        },
        {
          proId: 1,
          serId: 2,
          proSerCreated: new Date(),
          proSerUpdated: new Date(),
          proSerDeleted: null,
        },
        {
          proId: 2,
          serId: 3,
          proSerCreated: new Date(),
          proSerUpdated: new Date(),
          proSerDeleted: null,
        },
        {
          proId: 3,
          serId: 2,
          proSerCreated: new Date(),
          proSerUpdated: new Date(),
          proSerDeleted: null,
        },
      ],
      {}
    );
  },
  down: (queryInterface, DataTypes) => {
    return queryInterface.bulkDelete("REL_PROVIDERS_SERVICES", null, {});
  },
};
