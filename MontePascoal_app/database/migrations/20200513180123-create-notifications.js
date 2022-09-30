'use strict';

module.exports = {
  up: (queryInterface, DataTypes) => {
    return queryInterface.createTable('NOTIFICATIONS', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      notUseId: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      notStatus: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
      },
      notTitle: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      notDescription: {
        allowNull: false,
        type: DataTypes.STRING,
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
    return queryInterface.dropTable('NOTIFICATIONS');
  },
};
