"use strict";

module.exports = {
  up: (queryInterface, DataTypes) => {
    return queryInterface.createTable("CLIENTS_LEGAL_REPRESENTATIVE", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      // comId: {
      //   allowNull: false,
      //   type: DataTypes.INTEGER,
      //   references: {
      //     model: 'COMPANIES',
      //     key: 'id'
      //   }
      // },
      cliId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: 'CLIENTS',
          key: 'id'
        }
      },

      legStatus: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
      },
      legName: {
        allowNull: false,
        type: DataTypes.STRING, // Nome ou Npme Fantasia
      },

      legDocCpf: {
        allowNull: false,
        type: DataTypes.STRING,
        // unique: true,
      },
      legDocRg: {
        allowNull: false,
        type: DataTypes.STRING,
      },

      legConPhone1: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      legConPhone2: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      legConEmail: {
        allowNull: true,
        type: DataTypes.STRING,
      },

      legObservations: {
        allowNull: true,
        type: DataTypes.STRING,
      },

      legCreated: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      legUpdated: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      legDeleted: {
        type: DataTypes.DATE,
      },
    });
  },
  down: (queryInterface, DataTypes) => {
    return queryInterface.dropTable("CLIENTS_LEGAL_REPRESENTATIVE");
  },
};
