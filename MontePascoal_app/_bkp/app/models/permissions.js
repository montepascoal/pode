'use strict';
module.exports = (sequelize, DataTypes) => {
  const PERMISSIONS = sequelize.define('PERMISSIONS', {
    // id: DataTypes.STRING,
    perCategory: DataTypes.STRING,
    perDescription: DataTypes.STRING,
  }, {
    // Nome da tabela no banco.
    tableName: "PERMISSIONS",

    timestamps: true,
    freezeTableName: true,

    createdAt: 'perCreated',
    updatedAt: 'perUpdated',
    deletedAt: 'perDeleted',
    paranoid: true,
  });
  PERMISSIONS.associate = function (models) {
    // associations can be defined here
  };
  return PERMISSIONS;
};