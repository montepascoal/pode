"use strict";

module.exports = {
  up: (queryInterface, DataTypes) => {
    return queryInterface.createTable("PROVIDERS_CONTACTS", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      proId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: 'PROVIDERS',
          key: 'id'
        }
      },
      conStatus: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
      },
      conName: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      conPhone1: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      conPhone2: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      conEmail: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      conObservations: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      conCreated: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      conUpdated: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      conDeleted: {
        type: DataTypes.DATE,
      },
    });
  },
  down: (queryInterface, DataTypes) => {
    return queryInterface.dropTable("PROVIDERS_CONTACTS");
  },
};
