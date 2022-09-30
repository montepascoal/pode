'use strict';

module.exports = {
  up: (queryInterface, DataTypes) => {
    return queryInterface.bulkInsert("CLIENTS",
      [
        {
          cliIdOld: null,

          comId: 1,
          useId: 8,
          empId: 1,

          conStatus: false,
          conId: null,

          cliStatus: true,
          cliName: "[test] [1] Cliente Deltta CPF",
          cliNameCompany: null,
          cliInfPerson: 'CPF',
          cliInfMaritalStatus: 'Casado',
          cliDocBirthDate: new Date('09-12-1993'),
          cliDocCpfCnpj: "00000000011",
          cliDocRg: "123456",
          cliDocRegistrationStateIndicator: "Não Contribuinte",
          cliDocRegistrationState: null,
          cliDocRegistrationMunicipal: null,

          cliAddCep: "74430030",
          cliAddAddress: "Rua Tal",
          cliAddComplement: "Quadra Tal",
          cliAddNumber: "1234",
          cliAddDistrict: "Bairro Tal",
          cliAddCouId: 1,
          cliAddStaId: 9,
          cliAddCitId: 997,

          cliConPhone1: "62000000001",
          cliConPhone2: "6200000000",
          cliConEmail: "email@email.com",

          cliObservations: "Observações",

          cliCreated: new Date(),
          cliUpdated: new Date(),
          cliDeleted: null,
        },
        {
          cliIdOld: "1.2.3.4",

          comId: 1,
          useId: 9,
          empId: 2,

          conStatus: false,
          conId: null,
          
          cliStatus: true,
          cliName: "[test] [2] Cliente Deltta CPF",
          cliNameCompany: null,
          cliInfPerson: 'CPF',
          cliInfMaritalStatus: 'Casado',
          cliDocBirthDate: new Date('09-12-1993'),
          cliDocCpfCnpj: "00000000012",
          cliDocRg: "1234567",
          cliDocRegistrationStateIndicator: "Não Contribuinte",
          cliDocRegistrationState: null,
          cliDocRegistrationMunicipal: null,

          cliAddCep: "74430030",
          cliAddAddress: "Rua Tal",
          cliAddComplement: "Quadra Tal",
          cliAddNumber: "1234",
          cliAddDistrict: "Bairro Tal",
          cliAddCouId: 1,
          cliAddStaId: 9,
          cliAddCitId: 997,

          cliConPhone1: "62000000001",
          cliConPhone2: "6200000000",
          cliConEmail: "email@email.com",

          cliObservations: "Observações",

          cliCreated: new Date(),
          cliUpdated: new Date(),
          cliDeleted: null,
        },
      ],
      {}
    );
  },
  down: (queryInterface, DataTypes) => {
    return queryInterface.bulkDelete("CLIENTS", null, {});
  },
};
