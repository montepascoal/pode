'use strict';

module.exports = {
  up: (queryInterface, DataTypes) => {
    return queryInterface.createTable('EMPLOYEES_FILES', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      empId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: 'EMPLOYEES',
          key: 'id',
        },
      },
      filUseId: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      filStatus: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
      },
      filTitle: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      filType: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      filKey: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      filCreated: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      filUpdated: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      filDeleted: {
        type: DataTypes.DATE,
      },
    });
  },
  down: (queryInterface, DataTypes) => {
    return queryInterface.dropTable('EMPLOYEES_FILES');
  },
};
