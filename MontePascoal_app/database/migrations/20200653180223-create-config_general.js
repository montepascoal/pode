'use strict';

module.exports = {
  up: (queryInterface, DataTypes) => {
    return queryInterface.createTable('CONFIG_GENERAL', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      conEmailGeneral: {
        type: DataTypes.INTEGER,
        references: {
          model: 'CONFIG_EMAILS',
          key: 'id',
        },
      },
      conEmailFinancial: {
        type: DataTypes.INTEGER,
        references: {
          model: 'CONFIG_EMAILS',
          key: 'id',
        },
      },
      conEmailCommercial: {
        type: DataTypes.INTEGER,
        references: {
          model: 'CONFIG_EMAILS',
          key: 'id',
        },
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
    return queryInterface.dropTable('CONFIG_GENERAL');
  },
};
