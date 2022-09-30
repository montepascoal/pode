'use strict';
module.exports = (sequelize, DataTypes) => {
  const PERMISSIONS = sequelize.define(
    'PERMISSIONS',
    {
      perCategory: DataTypes.STRING,
      perDescription: DataTypes.STRING,
    },
    {
      tableName: 'PERMISSIONS',

      timestamps: true,
      freezeTableName: true,

      createdAt: 'perCreated',
      updatedAt: 'perUpdated',
      deletedAt: 'perDeleted',
      paranoid: true,
    }
  );

  return PERMISSIONS;
};
