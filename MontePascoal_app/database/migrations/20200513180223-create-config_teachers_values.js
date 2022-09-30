'use strict';

module.exports = {
  up: (queryInterface, DataTypes) => {
    return queryInterface.createTable('CONFIG_TEACHERS_VALUES', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      valName: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      valValue: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
      },
      valCreated: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      valUpdated: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      valDeleted: {
        type: DataTypes.DATE,
      },
    });
  },
  down: (queryInterface) => {
    return queryInterface.dropTable('CONFIG_TEACHERS_VALUES');
  },
};
