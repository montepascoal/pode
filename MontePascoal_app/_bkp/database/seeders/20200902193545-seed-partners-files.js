'use strict';

module.exports = {
  up: (queryInterface, DataTypes) => {
    return queryInterface.bulkInsert("PARTNERS_FILES",
      [
        {
          parId:  1,
          filUseId: 2,
          filStatus:  true,
          filTitle:  'File doc the Partners',
          filType: '.pdf',
          filKey: '14fa03362f9c3051285d4d1ca3d6d754688e22db0ae12d54e2e7ed641305.pdf',
          filCreated: new Date(),
          filUpdated: new Date(),
          filDeleted: null,
        },
        {
          parId:  1,
          filUseId: 2,
          filStatus:  true,
          filTitle:  'File doc the Partners 2',
          filType: '.jpeg',
          filKey: '7fc723597020ec6342f9ea4b2b8ed449496985e3886948008c153df52b84.jpeg',
          filCreated: new Date(),
          filUpdated: new Date(),
          filDeleted: null,
        },
        {
          parId:  1,
          filUseId: 2,
          filStatus:  true,
          filTitle:  'File doc the Partners 2',
          filType: '.jpeg',
          filKey: '7fc723597020ec6342f9ea4b2b8ed449496985e3886948008c153df52b84.jpeg',
          filCreated: new Date(),
          filUpdated: new Date(),
          filDeleted: null,
        },
        {
          parId:  2,
          filUseId: 2,
          filStatus:  true,
          filTitle:  'File doc the Partners',
          filType: '.pdf',
          filKey: '14fa03362f9c3051285d4d1ca3d6d754688e22db0ae12d54e2e7ed641305.pdf',
          filCreated: new Date(),
          filUpdated: new Date(),
          filDeleted: null,
        },
        {
          parId:  2,
          filUseId: 2,
          filStatus:  true,
          filTitle:  'File doc the Partners 2',
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
    return queryInterface.bulkDelete("PARTNERS_FILES", null, {});
  },
};
