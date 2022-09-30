'use strict';
module.exports = (sequelize, DataTypes) => {
  const NOAUTH = sequelize.define('NOAUTH', {
    useId: DataTypes.INTEGER,

    noaName: DataTypes.STRING,
    noaType: DataTypes.STRING,
    
  }, {
    // Nome da tabela no banco.
    tableName: "NOAUTH",

    timestamps: true,
    freezeTableName: true,

    createdAt: 'noaCreated',
    updatedAt: 'noaUpdated',
    deletedAt: 'noaDeleted',
    paranoid: true,
  });
  NOAUTH.associate = function (models) {
    models.NOAUTH.belongsTo(models.USERS, {
      onDelete: "CASCADE",
      foreignKey: "useId",
      targetKey: "id",
      as: 'USERS'
    });
  };
  return NOAUTH;
};