'use strict';
module.exports = {
  up: (queryInterface, DataTypes) => {
    return queryInterface.createTable('REL_PARTNERS_SERVICES', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      parId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        onDelete: 'CASCADE',
        references: {         // Providers hasMany Services n:n
          model: 'PARTNERS',
          key: 'id'
        }
      },
      serId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        onDelete: 'CASCADE',
        references: {         // Services hasMany Providers n:n
          model: 'CONFIG_PARTNERS_SERVICES',
          key: 'id'
        }
      },
      parSerCreated: {
        allowNull: false,
        type: DataTypes.DATE
      },
      parSerUpdated: {
        allowNull: false,
        type: DataTypes.DATE
      },
      parSerDeleted: {
        type: DataTypes.DATE,
      },
    });
  },
  down: (queryInterface, DataTypes) => {
    return queryInterface.dropTable('REL_PARTNERS_SERVICES');
  }
};