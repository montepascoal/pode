'use strict';

module.exports = {
  up: (queryInterface, DataTypes) => {
    return queryInterface.createTable('CONFIG_STATES', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      staName: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      staInitials: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      staIbge: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      couId: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      staDDD: {
        allowNull: false,
        type: DataTypes.ARRAY(DataTypes.STRING),
      },
      staCreated: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      staUpdated: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      staDeleted: {
        type: DataTypes.DATE,
      },
    });
  },
  down: (queryInterface, DataTypes) => {
    return queryInterface.dropTable('CONFIG_STATES');
  }
};