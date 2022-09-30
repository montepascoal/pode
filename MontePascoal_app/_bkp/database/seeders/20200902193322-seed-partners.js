'use strict';

module.exports = {
  up: (queryInterface, DataTypes) => {
    return queryInterface.bulkInsert("PARTNERS",
      [
        {
          // comId: 0,
          useId: 6,
          parStatus: true,
          parInfPerson: 'CNPJ',
          parName: "[deltta] Parceiro A",
          parNameCompany: "[deltta] Parceiro A",
          
          parDocCpfCnpj: "00000000000000",
          parDocRegistrationStateIndicator: "Contribuinte",
          parDocRegistrationState: "12345",
          parDocRegistrationMunicipal: "123456",

          parAddCep: "74430030",
          parAddAddress: "Rua Tal",
          parAddComplement: "Quadra Tal",
          parAddNumber: "1234",
          parAddDistrict: "Bairro Tal",
          parAddCouId: 1,
          parAddStaId: 9,
          parAddCitId: 997,

          parConPhone1: "62000000001",
          parConPhone2: "6200000000",
          parConEmail: "email@email.com",

          parObservations: "Observações",

          parCreated: new Date(),
          parUpdated: new Date(),
          parDeleted: null,
        },
        {
          // comId: 0,
          useId: 7,
          parStatus: true,
          parInfPerson: 'CPF',
          parName: "[test] Parceiro B",
          parNameCompany: null,
          
          parDocCpfCnpj: "00000000000",
          parDocRegistrationStateIndicator: "Não Contribuinte",
          parDocRegistrationState: null,
          parDocRegistrationMunicipal: null,

          parAddCep: "74430030",
          parAddAddress: "Rua Tal",
          parAddComplement: "Quadra Tal",
          parAddNumber: "1234",
          parAddDistrict: "Bairro Tal",
          parAddCouId: 1,
          parAddStaId: 9,
          parAddCitId: 997,

          parConPhone1: "62000000001",
          parConPhone2: "6200000000",
          parConEmail: "email@email.com",

          parObservations: "Observações",
          parCreated: new Date(),
          parUpdated: new Date(),
          parDeleted: null,
        },
      ],
      {}
    );
  },
  down: (queryInterface, DataTypes) => {
    return queryInterface.bulkDelete("PARTNERS", null, {});
  },
};
