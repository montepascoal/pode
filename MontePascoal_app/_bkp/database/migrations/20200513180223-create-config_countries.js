'use strict';

module.exports = {
  up: (queryInterface, DataTypes) => {
    return queryInterface.createTable('CONFIG_COUNTRIES', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      couNameGlobal: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      couName: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      couInitials: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      couBacen: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      couCreated: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      couUpdated: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      couDeleted: {
        type: DataTypes.DATE,
      },
    });
  },
  down: (queryInterface, DataTypes) => {
    return queryInterface.dropTable('CONFIG_COUNTRIES');
  }
};