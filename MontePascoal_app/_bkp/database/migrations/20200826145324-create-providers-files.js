"use strict";

module.exports = {
  up: (queryInterface, DataTypes) => {
    return queryInterface.createTable("PROVIDERS_FILES", {
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
      filUseId: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      filStatus: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
      },
      filTitle: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      filType: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      filKey: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      filCreated: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      filUpdated: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      filDeleted: {
        type: DataTypes.DATE,
      },
    });
  },
  down: (queryInterface, DataTypes) => {
    return queryInterface.dropTable("PROVIDERS_FILES");
  },
};
