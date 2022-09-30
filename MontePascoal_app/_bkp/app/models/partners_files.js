'use strict';
module.exports = (sequelize, DataTypes) => {
  const PARTNERS_FILES = sequelize.define('PARTNERS_FILES', {
    parId: DataTypes.INTEGER,
    
    filUseId: DataTypes.INTEGER,
    filStatus: DataTypes.BOOLEAN,
    filTitle: DataTypes.STRING,
    filType: DataTypes.STRING,
    filKey: DataTypes.STRING,
  }, {
    // Nome da tabela no banco.
    tableName: "PARTNERS_FILES",

    timestamps: true,
    freezeTableName: true,

    createdAt: 'filCreated',
    updatedAt: 'filUpdated',
    deletedAt: 'filDeleted',
    paranoid: true,
  });
  PARTNERS_FILES.associate = function (models) {
    models.PARTNERS_FILES.belongsTo(models.PARTNERS, {
      onDelete: "CASCADE",
      foreignKey: "parId",
      targetKey: "id",
      as: 'PARTNERS'
    });
  };
  return PARTNERS_FILES;
};