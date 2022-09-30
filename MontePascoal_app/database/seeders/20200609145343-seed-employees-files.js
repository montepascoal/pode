'use strict';

module.exports = {
  up: (queryInterface, DataTypes) => {
    return queryInterface.bulkInsert('EMPLOYEES_FILES', []);
  },
  down: (queryInterface, DataTypes) => {
    return queryInterface.bulkDelete('EMPLOYEES_FILES', null, {});
  },
};
