"use strict";

module.exports = {
  up: (queryInterface, DataTypes) => {
    return queryInterface.createTable("CONFIG_EMPLOYEES_DEPARTMENTS", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      depStatus: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
      },
      depName: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      depDescription: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      depCreated: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      depUpdated: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      depDeleted: {
        type: DataTypes.DATE,
      },
    });
  },
  down: (queryInterface, DataTypes) => {
    return queryInterface.dropTable("CONFIG_EMPLOYEES_DEPARTMENTS");
  },
};
