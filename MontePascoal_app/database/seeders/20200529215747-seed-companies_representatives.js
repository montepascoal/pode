'use strict';

module.exports = {
  up: (queryInterface, DataTypes) => {
    return queryInterface.bulkInsert('COMPANIES_REPRESENTATIVES', [
      {
        comId: 1,
        repStatus: true,
        repName: 'teste01',
        repAddCep: '99999999',
        repAddAddress: '11111',
        repAddComplement: 'Quadra Tal Lote Tal',
        repAddDistrict: 'Bairro Tal',
        repAddCouId: 1,
        repAddStaId: 8,
        repAddCitId: 1,
        repDocCPF: '99999999999',
        repDocRG: '99999999999',
        repDocRgDateExpedition: '',
        repDocRgExpeditor: '',
        repConPhone1: '99999999999',
        repConPhone2: '99999999999',
        repConEmail: '',
        repConEmergencyName: 'Fulano',
        repConEmergencyPhone: '99999999999',
        repObservations: 'Observação de teste',

        repCreated: new Date(),
        repUpdated: new Date(),
        repDeleted: null,
      },
      {
        comId: 2,
        repStatus: true,
        repName: 'teste02',
        repAddCep: '99999999',
        repAddAddress: '11111',
        repAddComplement: 'Quadra Tal Lote Tal',
        repAddDistrict: 'Bairro Tal',
        repAddCouId: 1,
        repAddStaId: 8,
        repAddCitId: 1,
        repDocCPF: '99999999999',
        repDocRG: '99999999999',
        repDocRgDateExpedition: '',
        repDocRgExpeditor: '',
        repCreated: new Date(),
        repUpdated: new Date(),
        repDeleted: null,
      },
    ]);
  },
  down: (queryInterface, DataTypes) => {
    return queryInterface.bulkDelete('COMPANIES_REPRESENTATIVES', null, {});
  },
};
