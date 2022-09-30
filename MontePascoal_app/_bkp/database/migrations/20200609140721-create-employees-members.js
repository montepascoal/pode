"use strict";

module.exports = {
  up: (queryInterface, DataTypes) => {
    return queryInterface.createTable("EMPLOYEES_MEMBERS", {
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
          model: 'EMPLOYEES',
          key: 'id'
        }
      },
      memStatus: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
      },
      memType: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      memName: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      memRg: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: true,
      },
      memDateBirth: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      memObservations: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      memCreated: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      memUpdated: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      memDeleted: {
        type: DataTypes.DATE,
      },
    });
  },
  down: (queryInterface, DataTypes) => {
    return queryInterface.dropTable("EMPLOYEES_MEMBERS");
  },
};
