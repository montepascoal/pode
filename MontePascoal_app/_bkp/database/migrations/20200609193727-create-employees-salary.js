"use strict";

module.exports = {
  up: (queryInterface, DataTypes) => {
    return queryInterface.createTable("EMPLOYEES_SALARY", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      empId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: "EMPLOYEES",
          key: "id",
        },
      },
      salStatus: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
      },
      salType: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      salValueCredit: {
        allowNull: true,
        type: DataTypes.DOUBLE,
      },
      salValueDebit: {
        allowNull: true,
        type: DataTypes.DOUBLE,
      },
      salObservation: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      salCreated: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      salUpdated: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      salDeleted: {
        type: DataTypes.DATE,
      },
    });
  },
  down: (queryInterface, DataTypes) => {
    return queryInterface.dropTable("EMPLOYEES_SALARY");
  },
};
