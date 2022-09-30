"use strict";

module.exports = {
  up: (queryInterface, DataTypes) => {
    return queryInterface.createTable("CONFIG_CITIES", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      citName: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      staId: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      citIbge: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      citGeoLat: {
        allowNull: false,
        type: DataTypes.DOUBLE,
      },
      citGeoLng: {
        allowNull: false,
        type: DataTypes.DOUBLE,
      },
      citTom: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      citCreated: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      citUpdated: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      citDeleted: {
        type: DataTypes.DATE,
      },
    });
  },
  down: (queryInterface, DataTypes) => {
    return queryInterface.dropTable("CONFIG_CITIES");
  },
};
