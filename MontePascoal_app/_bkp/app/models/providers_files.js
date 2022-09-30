'use strict';
module.exports = (sequelize, DataTypes) => {
  const PROVIDERS_FILES = sequelize.define('PROVIDERS_FILES', {
    proId: DataTypes.INTEGER,
    
    filUseId: DataTypes.INTEGER,
    filStatus: DataTypes.BOOLEAN,
    filTitle: DataTypes.STRING,
    filType: DataTypes.STRING,
    filKey: DataTypes.STRING,
  }, {
    // Nome da tabela no banco.
    tableName: "PROVIDERS_FILES",

    timestamps: true,
    freezeTableName: true,

    createdAt: 'filCreated',
    updatedAt: 'filUpdated',
    deletedAt: 'filDeleted',
    paranoid: true,
  });
  PROVIDERS_FILES.associate = function (models) {
    models.PROVIDERS_FILES.belongsTo(models.PROVIDERS, {
      onDelete: "CASCADE",
      foreignKey: "proId",
      targetKey: "id",
      as: 'PROVIDERS'
    });
  };
  return PROVIDERS_FILES;
};