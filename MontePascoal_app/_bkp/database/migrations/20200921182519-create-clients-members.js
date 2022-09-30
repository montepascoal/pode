"use strict";

module.exports = {
  up: (queryInterface, DataTypes) => {
    return queryInterface.createTable("CLIENTS_MEMBERS", {
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
      empId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: 'CLIENTS_EMPLOYEES',
          key: 'id'
        }
      },

      conStatus: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
      },
      conId: {
        allowNull: true,
        type: DataTypes.INTEGER,
      },
      
      memId: {
        allowNull: false,
        type: DataTypes.STRING, // ID the member x.x.x.x
        unique: true,
      },
      memIdOld: {
        allowNull: true,
        type: DataTypes.STRING, // ID the member x.x.x.x
        unique: true,
      },

      memAudited: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
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

      memDocBirthDate: { //2020-07-29   T18:16:50.046Z
        allowNull: false,
        type: DataTypes.DATE,
      },
      memDocCpf: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      memDocRg: {
        allowNull: false,
        type: DataTypes.STRING,
      },

      memPcD: { // Pessoa com deficiência
        allowNull: false,
        type: DataTypes.BOOLEAN, 
      },
      memObservations: {
        allowNull: true,
        type: DataTypes.STRING,
      },

      auditId: {
        allowNull: true,
        type: DataTypes.INTEGER,
      },
      auditDate: { //2020-07-29   T18:16:50.046Z
        allowNull: true,
        type: DataTypes.DATE,
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
    return queryInterface.dropTable("CLIENTS_MEMBERS");
  },
};
