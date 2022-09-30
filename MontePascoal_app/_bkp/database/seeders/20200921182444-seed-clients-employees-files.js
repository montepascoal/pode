'use strict';

module.exports = {
  up: (queryInterface, DataTypes) => {
    return queryInterface.bulkInsert("CLIENTS_EMPLOYEES_FILES",
      [
        {
          empId:  1,
          filUseId: 2,
          filStatus:  true,
          filTitle:  'File doc the Client Employees pdf',
          filType: '.pdf',
          filKey: '14fa03362f9c3051285d4d1ca3d6d754688e22db0ae12d54e2e7ed641305.pdf',
          filCreated: new Date(),
          filUpdated: new Date(),
          filDeleted: null,
        },
      ],
      {}
    );
  },
  down: (queryInterface, DataTypes) => {
    return queryInterface.bulkDelete("CLIENTS_EMPLOYEES_FILES", null, {});
  },
};
