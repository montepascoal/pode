'use strict';
module.exports = (sequelize, DataTypes) => {
  const LOGS = sequelize.define('LOGS', {
    useId: DataTypes.INTEGER,
    
    logDate: DataTypes.DATE,
    logPermission: DataTypes.STRING,
    logDescription: DataTypes.STRING,
    logText: DataTypes.STRING,
    objId: DataTypes.INTEGER,
  }, {
    // Nome da tabela no banco.
    tableName: "LOGS",

    timestamps: true,
    freezeTableName: true,

    createdAt: 'logCreated',
    updatedAt: 'logUpdated',
    deletedAt: 'logDeleted',
    paranoid: true,
  });
  LOGS.associate = function (models) {
    models.LOGS.belongsTo(models.USERS, {
      onDelete: "CASCADE",
      foreignKey: "useId",
      targetKey: "id",
      as: 'USERS'
    });
  };
  return LOGS;
};