'use strict';
module.exports = (sequelize, DataTypes) => {
  const CLIENTS_LEGAL_REPRESENTATIVE_FILES = sequelize.define('CLIENTS_LEGAL_REPRESENTATIVE_FILES', {
    legId: DataTypes.INTEGER,
    
    filUseId: DataTypes.INTEGER,
    filStatus: DataTypes.BOOLEAN,
    filTitle: DataTypes.STRING,
    filType: DataTypes.STRING,
    filKey: DataTypes.STRING,
  }, {
    // Nome da tabela no banco.
    tableName: "CLIENTS_LEGAL_REPRESENTATIVE_FILES",

    timestamps: true,
    freezeTableName: true,

    createdAt: 'filCreated',
    updatedAt: 'filUpdated',
    deletedAt: 'filDeleted',
    paranoid: true,
  });
  CLIENTS_LEGAL_REPRESENTATIVE_FILES.associate = function (models) {
    models.CLIENTS_LEGAL_REPRESENTATIVE_FILES.belongsTo(models.CLIENTS_LEGAL_REPRESENTATIVE, {
      onDelete: "CASCADE",
      foreignKey: "legId",
      targetKey: "id",
      as: 'CLIENTS_LEGAL_REPRESENTATIVE'
    });
  };
  return CLIENTS_LEGAL_REPRESENTATIVE_FILES;
};