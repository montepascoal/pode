"use strict";

module.exports = {
  up: (queryInterface, DataTypes) => {
    return queryInterface.createTable("CLIENTS_EMPLOYEES", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      comId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: 'COMPANIES',
          key: 'id'
        }
      },
      cliId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: 'CLIENTS',
          key: 'id'
        }
      },
      memId: {
        allowNull: true,
        type: DataTypes.INTEGER,
      },

      empStatus: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
      },
      empName: {
        allowNull: false,
        type: DataTypes.STRING, // Nome ou Npme Fantasia
      },
      
      empDocBirthDate: { //2020-07-29   T18:16:50.046Z
        allowNull: false,
        type: DataTypes.DATE,
      },
      empInfMaritalStatus: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      empDocCpf: {
        allowNull: false,
        type: DataTypes.STRING,
        // unique: true,
      },
      empDocRg: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      empDocCtps: { 
        allowNull: true,
        type: DataTypes.STRING,
      },

      empJobOccupation: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      empJobDate: { //2020-07-29   T18:16:50.046Z
        allowNull: true,
        type: DataTypes.DATE,
      },

      empConPhone1: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      empConPhone2: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      empConEmail: {
        allowNull: true,  
        type: DataTypes.STRING,
      },

      empObservations: {
        allowNull: true,
        type: DataTypes.STRING,
      },

      empCreated: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      empUpdated: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      empDeleted: {
        type: DataTypes.DATE,
      },
    });
  },
  down: (queryInterface, DataTypes) => {
    return queryInterface.dropTable("CLIENTS_EMPLOYEES");
  },
};
