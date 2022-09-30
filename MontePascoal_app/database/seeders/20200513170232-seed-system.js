'use strict';

module.exports = {
  up: (queryInterface, DataTypes) => {
    return queryInterface.bulkInsert('SYSTEM', [
      {
        sysKey: 'Nome',
        sysValue: 'Backend',
        sysCreated: new Date(),
        sysUpdated: new Date(),
      },
      {
        sysKey: 'Versão',
        sysValue: '0.1.28',
        sysCreated: new Date(),
        sysUpdated: new Date(),
      },
      {
        sysKey: 'Última atualização',
        sysValue: new Date(),
        sysCreated: new Date(),
        sysUpdated: new Date(),
      },
    ]);
  },

  down: (queryInterface, DataTypes) => {
    return queryInterface.bulkDelete('SYSTEM', null, {});
  },
};
