'use strict';

module.exports = {
  up: (queryInterface, DataTypes) => {
    return queryInterface.bulkInsert(
      'SYSTEM',
      [
        {
          // id: 1,
          sysKey: 'Version',
          sysValue: '0.0.1',
          sysCreated: new Date(),
          sysUpdated: new Date(),
          sysDeleted: null,
        },
      ],
      {}
    );
  },

  down: (queryInterface, DataTypes) => {
    return queryInterface.bulkDelete('SYSTEM', null, {});
  },
};
