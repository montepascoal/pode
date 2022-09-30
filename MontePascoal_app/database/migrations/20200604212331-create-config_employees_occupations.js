'use strict';

module.exports = {
  up: (queryInterface, DataTypes) => {
    return queryInterface.createTable('CONFIG_EMPLOYEES_OCCUPATIONS', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      occStatus: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
      },
      depId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: 'CONFIG_EMPLOYEES_DEPARTMENTS',
          key: 'id',
        },
      },
      occName: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      occDescription: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      occCreated: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      occUpdated: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      occDeleted: {
        type: DataTypes.DATE,
      },
    });
  },
  down: (queryInterface, DataTypes) => {
    return queryInterface.dropTable('CONFIG_EMPLOYEES_OCCUPATIONS');
  },
};
