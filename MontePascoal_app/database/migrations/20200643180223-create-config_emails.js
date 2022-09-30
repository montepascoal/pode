'use strict';

module.exports = {
  up: (queryInterface, DataTypes) => {
    return queryInterface.createTable('CONFIG_EMAILS', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      emaProtocol: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      emaHost: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      emaTitle: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      emaPort: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      emaUsername: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      emaPassword: {
        allowNull: false,
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
  down: (queryInterface) => {
    return queryInterface.dropTable('CONFIG_EMAILS');
  },
};
