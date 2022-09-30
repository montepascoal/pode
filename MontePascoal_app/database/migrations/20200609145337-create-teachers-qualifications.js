'use strict';

module.exports = {
  up: (queryInterface, DataTypes) => {
    return queryInterface.createTable('TEACHERS_QUALIFICATIONS', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      teaId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: 'TEACHERS',
          key: 'id',
        },
      },
      quaUseId: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      quaStatus: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
      },
      quaTitle: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      quaDateStart: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      quaDateEnd: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      quaES: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      quaKnowledge: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      quaFileId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: 'TEACHERS_FILES',
          key: 'id',
        },
      },
      quaFileCheck: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
      },
      quaCreated: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      quaUpdated: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      quaDeleted: {
        type: DataTypes.DATE,
      },
    });
  },
  down: (queryInterface) => {
    return queryInterface.dropTable('TEACHERS_QUALIFICATIONS');
  },
};
