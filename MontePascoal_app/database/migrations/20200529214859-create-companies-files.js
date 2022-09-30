'use strict';

module.exports = {
  up: (queryInterface, DataTypes) => {
    return queryInterface.createTable('COMPANIES_FILES', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      comId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: 'COMPANIES',
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
    return queryInterface.dropTable('COMPANIES_FILES');
  },
};
