'use strict';

module.exports = {
  up: (queryInterface, DataTypes) => {
    return queryInterface.bulkInsert("PROVIDERS",
      [
        {
          // comId: 0,
          useId: 1,
          proStatus: true,
          proInfPerson: 'CNPJ',
          proName: "Fornecedor A",
          proNameCompany: "Fornecedor A Razão Social",
          
          proDocCpfCnpj: "00000000000009",
          proDocRegistrationStateIndicator: "Contribuinte",
          proDocRegistrationState: "12345",
          proDocRegistrationMunicipal: "123456",

          proAddCep: "74430030",
          proAddAddress: "Rua Tal",
          proAddComplement: "Quadra Tal",
          proAddNumber: "123",
          proAddDistrict: "Bairro Tal",
          proAddCouId: 1,
          proAddStaId: 9,
          proAddCitId: 997,

          proConPhone1: "62000000001",
          proConPhone2: "6200000000",
          proConEmail: "email@email.com",

          proObservations: "Observações",

          proCreated: new Date(),
          proUpdated: new Date(),
          proDeleted: null,
        },
        {
          // comId: 0,
          useId: 1,
          proStatus: true,
          proInfPerson: 'CNPJ',
          proName: "Fornecedor B",
          proNameCompany: "Fornecedor B Razão Social",
          
          proDocCpfCnpj: "00000000000010",
          proDocRegistrationStateIndicator: "Contribuinte Isento",
          proDocRegistrationState: null,
          proDocRegistrationMunicipal: null,

          proAddCep: "74430030",
          proAddAddress: "Rua Tal",
          proAddComplement: "Quadra Tal",
          proAddNumber: "1234",
          proAddDistrict: "Bairro Tal",
          proAddCouId: 1,
          proAddStaId: 9,
          proAddCitId: 997,

          proConPhone1: "62000000001",
          proConPhone2: "6200000000",
          proConEmail: "email@email.com",

          proObservations: "Observações",

          proCreated: new Date(),
          proUpdated: new Date(),
          proDeleted: null,
        },
        {
          // comId: 0,
          useId: 1,
          proStatus: true,
          proInfPerson: 'CPF',
          proName: "Fornecedor C",
          proNameCompany: null,
          
          proDocCpfCnpj: "00000000009",
          proDocRegistrationStateIndicator: "Não Contribuinte",
          proDocRegistrationState: null,
          proDocRegistrationMunicipal: null,

          proAddCep: "74430030",
          proAddAddress: "Rua Tal",
          proAddComplement: "Quadra Tal",
          proAddNumber: null,
          proAddDistrict: "Bairro Tal",
          proAddCouId: 1,
          proAddStaId: 9,
          proAddCitId: 997,

          proConPhone1: "62000000001",
          proConPhone2: "6200000000",
          proConEmail: "email@email.com",

          proObservations: "Observações",
          proCreated: new Date(),
          proUpdated: new Date(),
          proDeleted: null,
        },
      ],
      {}
    );
  },
  down: (queryInterface, DataTypes) => {
    return queryInterface.bulkDelete("PROVIDERS", null, {});
  },
};
