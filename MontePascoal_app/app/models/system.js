'use strict';
module.exports = (sequelize, DataTypes) => {
  const SYSTEM = sequelize.define(
    'SYSTEM',
    {
      sysKey: DataTypes.STRING,
      sysValue: DataTypes.STRING,
    },
    {
      tableName: 'SYSTEM',

      timestamps: true,
      freezeTableName: true,

      createdAt: 'sysCreated',
      updatedAt: 'sysUpdated',
      deletedAt: 'sysDeleted',
      paranoid: true,
    }
  );

  return SYSTEM;
};
