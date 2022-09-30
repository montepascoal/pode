'use strict';

module.exports = {
  up: (queryInterface, DataTypes) => {
    return queryInterface.bulkInsert('COMPANIES_MAIN', [
      {
        comStatus: true,
        comName: '[deltta] Nome Fantasia',
        comNameCompany: '[deltta] Razão Social',
        comCpfCnpj: '00000000000099',
        comRegistrationState: '1',
        comRegistrationMunicipal: '2',
        comAddCep: '74465445',
        comAddAddress: 'Endereço',
        comAddComplement: 'Quadra Tal Lote Tal',
        comAddNumber: '1234',
        comAddDistrict: 'Bairro Tal',
        comAddCouId: 1,
        comAddStaId: 9,
        comAddCitId: 997,
        comConPhone1: '99999999999',
        comConPhone2: '99999999999',
        comConEmail: 'deltta@deltta.com',
        comConMediaWebsite: 'teste.com',
        comConMediaWhatsApp: '99999999999',
        comObservations: 'Observação',
        comCreated: new Date(),
        comUpdated: new Date(),
        comDeleted: null,
      },
    ]);
  },
  down: (queryInterface, DataTypes) => {
    return queryInterface.bulkDelete('COMPANIES_MAIN', null, {});
  },
};
