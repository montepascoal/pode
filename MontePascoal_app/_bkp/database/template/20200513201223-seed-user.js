'use strict';

module.exports = {
  up: (queryInterface, DataTypes) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    return queryInterface.bulkInsert('USERS',
      [
        {
          useEmail: 'suporte@dev.com', // deltta@2020
          usePassword: 'b2dbec8c1fc1d7f1e6dcfcebc0306d3e',
          useCreated: new Date(),
          useUpdated: new Date(),
          useDeleted: null,
        },
        {
          useEmail: 'adm@facilitecard.com.br', // 123456
          usePassword: 'e10adc3949ba59abbe56e057f20f883e',
          useCreated: new Date(),
          useUpdated: new Date(),
          useDeleted: null,
        },
      ], {}
    );
  },

  down: (queryInterface, DataTypes) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
   return queryInterface.bulkDelete('USERS', null, {});
  }
};
