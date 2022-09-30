'use strict';

module.exports = {
  up: (queryInterface, DataTypes) => {
    return queryInterface.bulkInsert('COMPANIES_FILES', []);
  },
  down: (queryInterface, DataTypes) => {
    return queryInterface.bulkDelete('COMPANIES_FILES', null, {});
  },
};
