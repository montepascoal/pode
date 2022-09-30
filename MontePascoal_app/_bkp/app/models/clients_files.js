'use strict';
module.exports = (sequelize, DataTypes) => {
  const CLIENTS_FILES = sequelize.define('CLIENTS_FILES', {
    cliId: DataTypes.INTEGER,
    
    filUseId: DataTypes.INTEGER,
    filStatus: DataTypes.BOOLEAN,
    filTitle: DataTypes.STRING,
    filType: DataTypes.STRING,
    filKey: DataTypes.STRING,
  }, {
    // Nome da tabela no banco.
    tableName: "CLIENTS_FILES",

    timestamps: true,
    freezeTableName: true,

    createdAt: 'filCreated',
    updatedAt: 'filUpdated',
    deletedAt: 'filDeleted',
    paranoid: true,
  });
  CLIENTS_FILES.associate = function (models) {
    models.CLIENTS_FILES.belongsTo(models.CLIENTS, {
      onDelete: "CASCADE",
      foreignKey: "cliId",
      targetKey: "id",
      as: 'CLIENTS'
    });
  };
  return CLIENTS_FILES;
};