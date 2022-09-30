'use strict';

module.exports = {
  up: (queryInterface, DataTypes) => {
    return queryInterface.createTable('COMPANIES_REPRESENTATIVES', {
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
          key: 'id',
        },
      },
      repStatus: {
        allowNull: true,
        type: DataTypes.BOOLEAN,
      },
      repName: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      repAddCep: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      repAddAddress: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      repAddComplement: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      repAddDistrict: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      repAddCouId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: 'CONFIG_COUNTRIES',
          key: 'id',
        },
      },
      repAddStaId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: 'CONFIG_STATES',
          key: 'id',
        },
      },
      repAddCitId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: 'CONFIG_CITIES',
          key: 'id',
        },
      },
      repDocCpf: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      repDocRg: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      repDocRgDateExpedition: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      repDocRgExpeditor: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      repConPhone1: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      repConPhone2: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      repConEmail: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      repConEmergencyName: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      repConEmergencyPhone: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      repObservations: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      repCreated: {
        allowNull: true,
        type: DataTypes.DATE,
      },
      repUpdated: {
        allowNull: true,
        type: DataTypes.DATE,
      },
      repDeleted: {
        type: DataTypes.DATE,
      },
    });
  },
  down: (queryInterface, DataTypes) => {
    return queryInterface.dropTable('COMPANIES_REPRESENTATIVES');
  },
};
