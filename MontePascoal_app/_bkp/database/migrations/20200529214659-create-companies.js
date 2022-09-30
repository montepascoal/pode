"use strict";

module.exports = {
  up: (queryInterface, DataTypes) => {
    return queryInterface.createTable("COMPANIES", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      comStatus: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
      },
      comName: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      comNameCompany: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      comCnpj: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: true,
      },
      comRegistrationState: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      comRegistrationMunicipal: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      comAddCep: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      comAddAddress: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      comAddComplement: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      comAddNumber: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      comAddDistrict: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      comAddCouId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: 'CONFIG_COUNTRIES',
          key: 'id'
        }
      },
      comAddStaId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: 'CONFIG_STATES',
          key: 'id'
        }
      },
      comAddCitId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: 'CONFIG_CITIES',
          key: 'id'
        }
      },
      comConPhone1: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      comConPhone2: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      comConEmail: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      comObservations: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      comCreated: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      comUpdated: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      comDeleted: {
        type: DataTypes.DATE,
      },
    });
  },
  down: (queryInterface, DataTypes) => {
    return queryInterface.dropTable("COMPANIES");
  },
};
