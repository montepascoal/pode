'use strict';

module.exports = {
  up: (queryInterface, DataTypes) => {
    return queryInterface.createTable('USERS_NOTIFICATIONS', {
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
          key: 'id',
        },
      },
      notId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: 'NOTIFICATIONS',
          key: 'id',
        },
      },
      notRead: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
      },
      notReadDate: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      notCreated: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      notUpdated: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      notDeleted: {
        type: DataTypes.DATE,
      },
    });
  },
  down: (queryInterface) => {
    return queryInterface.dropTable('USERS_NOTIFICATIONS');
  },
};
