"use strict";

module.exports = {
  up: (queryInterface, DataTypes) => {
    return queryInterface.createTable("LOGS", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      useId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: 'USERS',
          key: 'id'
        }
      },
      logDate: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      logPermission: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      logDescription: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      logText: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      objId: {
        allowNull: true,
        type: DataTypes.INTEGER,
      },
      // Control
      logCreated: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      logUpdated: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      logDeleted: {
        type: DataTypes.DATE,
      },
    });
  },
  down: (queryInterface, DataTypes) => {
    return queryInterface.dropTable("LOGS");
  },
};
