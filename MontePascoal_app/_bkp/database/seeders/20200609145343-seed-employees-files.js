'use strict';

module.exports = {
  up: (queryInterface, DataTypes) => {
    return queryInterface.bulkInsert("EMPLOYEES_FILES",
      [
        {
          empId:  1,
          memId: 0,
          filUseId: 2,
          filStatus:  true,
          filTitle:  'File doc the Employees',
          filType: '.pdf',
          filKey: '14fa03362f9c3051285d4d1ca3d6d754688e22db0ae12d54e2e7ed641305.pdf',
          filCreated: new Date(),
          filUpdated: new Date(),
          filDeleted: null,
        },
        {
          empId:  1,
          memId: 0,
          filUseId: 2,
          filStatus:  true,
          filTitle:  'File doc the Employees Esposa',
          filType: '.jpeg',
          filKey: '7fc723597020ec6342f9ea4b2b8ed449496985e3886948008c153df52b84.jpeg',
          filCreated: new Date(),
          filUpdated: new Date(),
          filDeleted: null,
        },
        {
          empId:  2,
          memId: 0,
          filUseId: 2,
          filStatus:  true,
          filTitle:  'File doc the Employees 2',
          filType: '.jpeg',
          filKey: '7fc723597020ec6342f9ea4b2b8ed449496985e3886948008c153df52b84.jpeg',
          filCreated: new Date(),
          filUpdated: new Date(),
          filDeleted: null,
        },
        {
          empId:  3,
          memId: 0,
          filUseId: 2,
          filStatus:  true,
          filTitle:  'File doc the Employees',
          filType: '.pdf',
          filKey: '14fa03362f9c3051285d4d1ca3d6d754688e22db0ae12d54e2e7ed641305.pdf',
          filCreated: new Date(),
          filUpdated: new Date(),
          filDeleted: null,
        },
        {
          empId:  4,
          memId: 0,
          filUseId: 2,
          filStatus:  true,
          filTitle:  'File doc the Employees 2',
          filType: '.jpeg',
          filKey: '7fc723597020ec6342f9ea4b2b8ed449496985e3886948008c153df52b84.jpeg',
          filCreated: new Date(),
          filUpdated: new Date(),
          filDeleted: null,
        }
      ],
      {}
    );
  },
  down: (queryInterface, DataTypes) => {
    return queryInterface.bulkDelete("EMPLOYEES_FILES", null, {});
  },
};
