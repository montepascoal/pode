'use strict';
module.exports = (sequelize, DataTypes) => {
  const SYSTEM = sequelize.define('SYSTEM', {
    // id: DataTypes.STRING,
    sysKey: DataTypes.STRING,
    sysValue: DataTypes.STRING,
  }, {
    // Nome da tabela no banco.
    tableName: "SYSTEM",

    timestamps: true,
    freezeTableName: true,

    createdAt: 'sysCreated',
    updatedAt: 'sysUpdated',
    deletedAt: 'sysDeleted',
    paranoid: true,
  });
  SYSTEM.associate = function (models) {
    // associations can be defined here
  };
  return SYSTEM;
};