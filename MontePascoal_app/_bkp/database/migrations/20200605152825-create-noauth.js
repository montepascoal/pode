"use strict";

module.exports = {
  up: (queryInterface, DataTypes) => {
    return queryInterface.createTable("NOAUTH", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      useId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: 'USERS',
          key: 'id'
        }
      },
      noaName: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      noaType: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      // Control
      noaCreated: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      noaUpdated: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      noaDeleted: {
        type: DataTypes.DATE,
      },
    });
  },
  down: (queryInterface, DataTypes) => {
    return queryInterface.dropTable("NOAUTH");
  },
};
