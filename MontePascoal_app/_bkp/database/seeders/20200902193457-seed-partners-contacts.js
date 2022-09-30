'use strict';

module.exports = {
  up: (queryInterface, DataTypes) => {
    return queryInterface.bulkInsert("PARTNERS_CONTACTS",
      [
        {
          parId: 1,
          conStatus: true,
          conName: "Contact A (1)",
          conPhone1: '00000000001',
          conPhone2: '00000000002',
          conEmail: 'email@email.com',
          conObservations: 'obs test',
          conCreated: new Date(),
          conUpdated: new Date(),
          conDeleted: null,
        },
        {
          parId: 1,
          conStatus: true,
          conName: "Contact A (2)",
          conPhone1: '00000000003',
          conEmail: 'email@email.com',
          conObservations: 'obs test',
          conCreated: new Date(),
          conUpdated: new Date(),
          conDeleted: null,
        },
        {
          parId: 2,
          conStatus: true,
          conName: "Contact B (1)",
          conPhone1: '00000000004',
          conPhone2: '00000000005',
          conEmail: 'email@email.com',
          conObservations: 'obs test',
          conCreated: new Date(),
          conUpdated: new Date(),
          conDeleted: null,
        },
        {
          parId: 2,
          conStatus: true,
          conName: "Contact B (2)",
          conPhone1: '00000000006',
          conPhone2: '00000000007',
          conEmail: 'email@email.com',
          conObservations: 'obs test',
          conCreated: new Date(),
          conUpdated: new Date(),
          conDeleted: null,
        },
      ],
      {}
    );
  },
  down: (queryInterface, DataTypes) => {
    return queryInterface.bulkDelete("PARTNERS_CONTACTS", null, {});
  },
};
