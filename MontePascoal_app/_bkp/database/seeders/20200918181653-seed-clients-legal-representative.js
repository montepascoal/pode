'use strict';

module.exports = {
  up: (queryInterface, DataTypes) => {
    return queryInterface.bulkInsert("CLIENTS_LEGAL_REPRESENTATIVE",
      [
        {
          cliId: 1,
          legStatus: true,
          legName: "Representante Legal (1)",
          legDocCpf: '00000000011',
          legDocRg: '123456',
          legConPhone1: '00000000001',
          legConPhone2: '00000000002',
          legConEmail: 'email@email.com',
          legObservations: 'obs test',
          legCreated: new Date(),
          legUpdated: new Date(),
          legDeleted: null,
        },
        {
          cliId: 1,
          legStatus: true,
          legName: "Representante Legal (2)",
          legDocCpf: '00000000012',
          legDocRg: '123457',
          legConPhone1: '00000000003',
          legConEmail: 'email@email.com',
          legObservations: 'obs test',
          legCreated: new Date(),
          legUpdated: new Date(),
          legDeleted: null,
        }
      ],
      {}
    );
  },
  down: (queryInterface, DataTypes) => {
    return queryInterface.bulkDelete("CLIENTS_LEGAL_REPRESENTATIVE", null, {});
  },
};
