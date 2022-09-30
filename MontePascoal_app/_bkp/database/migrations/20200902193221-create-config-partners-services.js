"use strict";

module.exports = {
  up: (queryInterface, DataTypes) => {
    return queryInterface.createTable("CONFIG_PARTNERS_SERVICES", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      serStatus: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
      },
      serName: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      serDescription: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      serCreated: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      serUpdated: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      serDeleted: {
        type: DataTypes.DATE,
      },
    });
  },
  down: (queryInterface, DataTypes) => {
    return queryInterface.dropTable("CONFIG_PARTNERS_SERVICES");
  },
};
