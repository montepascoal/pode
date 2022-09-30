'use strict';

module.exports = {
  up: (queryInterface, DataTypes) => {
    return queryInterface.bulkInsert("CLIENTS_EMPLOYEES",
      [
        {
          comId: 1,
          cliId: 1,
          memId: 1,
          empStatus: true,
          empName: "[test] [1] Cliente Employees Deltta CPF",
          empDocBirthDate: new Date('09-12-1993'),
          empInfMaritalStatus: 'Casado',
          empDocCpf: "00000000011",
          empDocRg: "123456",
          empDocCtps: null,
          empJobOccupation: null,
          empJobDate: null,

          empConPhone1: "62000000001",
          empConPhone2: "6200000000",
          empConEmail: "email@email.com",

          empObservations: "Observações",

          empCreated: new Date(),
          empUpdated: new Date(),
          empDeleted: null,
        },
        {
          comId: 1,
          cliId: 2,
          memId: 2,
          empStatus: true,
          empName: "[test] [2] Cliente Employees Deltta CPF",
          empDocBirthDate: new Date('09-12-1993'),
          empInfMaritalStatus: 'Casado',
          empDocCpf: "00000000012",
          empDocRg: "1234567",
          empDocCtps: null,
          empJobOccupation: null,
          empJobDate: null,

          empConPhone1: "62000000001",
          empConPhone2: "6200000000",
          empConEmail: "email@email.com",

          empObservations: "Observações",

          empCreated: new Date(),
          empUpdated: new Date(),
          empDeleted: null,
        },
      ],
      {}
    );
  },
  down: (queryInterface, DataTypes) => {
    return queryInterface.bulkDelete("CLIENTS_EMPLOYEES", null, {});
  },
};
