'use strict';
module.exports = (sequelize, DataTypes) => {
  const CLIENTS_MEMBERS_FILES = sequelize.define('CLIENTS_MEMBERS_FILES', {
    memId: DataTypes.INTEGER,
    
    filUseId: DataTypes.INTEGER,
    filStatus: DataTypes.BOOLEAN,
    filTitle: DataTypes.STRING,
    filType: DataTypes.STRING,
    filKey: DataTypes.STRING,
  }, {
    // Nome da tabela no banco.
    tableName: "CLIENTS_MEMBERS_FILES",

    timestamps: true,
    freezeTableName: true,

    createdAt: 'filCreated',
    updatedAt: 'filUpdated',
    deletedAt: 'filDeleted',
    paranoid: true,
  });
  CLIENTS_MEMBERS_FILES.associate = function (models) {
    models.CLIENTS_MEMBERS_FILES.belongsTo(models.CLIENTS_MEMBERS, {
      onDelete: "CASCADE",
      foreignKey: "memId",
      targetKey: "id",
      as: 'CLIENTS_MEMBERS'
    });
  };
  return CLIENTS_MEMBERS_FILES;
};