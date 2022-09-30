"use strict";

module.exports = {
  up: (queryInterface, DataTypes) => {
    return queryInterface.createTable("CLIENTS", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      cliIdOld: {
        allowNull: true,
        type: DataTypes.STRING, // ID Antigo
      },
      comId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: 'COMPANIES',
          key: 'id'
        }
      },
      useId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: 'USERS',
          key: 'id'
        }
      },
      empId: {
        allowNull: true,
        type: DataTypes.INTEGER,
      },

      conStatus: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
      },
      conId: {
        allowNull: true,
        type: DataTypes.INTEGER,
      },

      cliStatus: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
      },
      cliName: {
        allowNull: false,
        type: DataTypes.STRING, // Nome ou Npme Fantasia
      },
      cliNameCompany: {
        allowNull: true,
        type: DataTypes.STRING, // Razão Social
      },

      cliInfPerson: {
        allowNull: false,
        type: DataTypes.STRING, // CPF | CNPJ
      },
      cliDocBirthDate: { //2020-07-29   T18:16:50.046Z
        allowNull: false,
        type: DataTypes.DATE,
      },
      cliInfMaritalStatus: {
        allowNull: true,
        type: DataTypes.STRING,
      },

      cliDocCpfCnpj: {
        allowNull: false,
        type: DataTypes.STRING,
        // unique: true,
      },
      cliDocRg: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      cliDocRegistrationStateIndicator: { 
        allowNull: true,
        type: DataTypes.STRING, // Não Contribuinte | Contribuinte | Contribuinte Isento
      },
      cliDocRegistrationState: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      cliDocRegistrationMunicipal: {
        allowNull: true,
        type: DataTypes.STRING,
      },

      cliAddCep: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      cliAddAddress: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      cliAddComplement: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      cliAddNumber: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      cliAddDistrict: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      cliAddCouId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: 'CONFIG_COUNTRIES',
          key: 'id'
        }
      },
      cliAddStaId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: 'CONFIG_STATES',
          key: 'id'
        }
      },
      cliAddCitId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: 'CONFIG_CITIES',
          key: 'id'
        }
      },

      cliConPhone1: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      cliConPhone2: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      cliConEmail: {
        allowNull: true,
        type: DataTypes.STRING,
      },

      cliObservations: {
        allowNull: true,
        type: DataTypes.STRING,
      },

      cliCreated: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      cliUpdated: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      cliDeleted: {
        type: DataTypes.DATE,
      },
    });
  },
  down: (queryInterface, DataTypes) => {
    return queryInterface.dropTable("CLIENTS");
  },
};
