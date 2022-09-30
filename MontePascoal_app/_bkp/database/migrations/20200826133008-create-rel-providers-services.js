'use strict';
module.exports = {
  up: (queryInterface, DataTypes) => {
    return queryInterface.createTable('REL_PROVIDERS_SERVICES', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      proId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        onDelete: 'CASCADE',
        references: {         // Providers hasMany Services n:n
          model: 'PROVIDERS',
          key: 'id'
        },
      },
      serId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        onDelete: 'CASCADE',
        references: {         // Services hasMany Providers n:n
          model: 'CONFIG_PROVIDERS_SERVICES',
          key: 'id'
        }
      },
      proSerCreated: {
        allowNull: false,
        type: DataTypes.DATE
      },
      proSerUpdated: {
        allowNull: false,
        type: DataTypes.DATE
      },
      proSerDeleted: {
        type: DataTypes.DATE,
      },
    });
  },
  down: (queryInterface, DataTypes) => {
    return queryInterface.dropTable('REL_PROVIDERS_SERVICES');
  }
};