"use strict";

module.exports = {
  up: (queryInterface, DataTypes) => {
    return queryInterface.createTable("PERMISSIONS", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.STRING,
      },
      perCategory: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      perDescription: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      // Control
      perCreated: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      perUpdated: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      perDeleted: {
        type: DataTypes.DATE,
      },
    });
  },
  down: (queryInterface, DataTypes) => {
    return queryInterface.dropTable("PERMISSIONS");
  },
};
