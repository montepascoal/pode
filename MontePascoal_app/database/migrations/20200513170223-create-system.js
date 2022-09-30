'use strict';

module.exports = {
  up: (queryInterface, DataTypes) => {
    return queryInterface.createTable('SYSTEM', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      sysKey: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      sysValue: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      sysCreated: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      sysUpdated: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      sysDeleted: {
        type: DataTypes.DATE,
      },
    });
  },
  down: (queryInterface, DataTypes) => {
    return queryInterface.dropTable('SYSTEM');
  }
};