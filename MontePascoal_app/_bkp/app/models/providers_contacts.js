'use strict';
module.exports = (sequelize, DataTypes) => {
  const PROVIDERS_CONTACTS = sequelize.define('PROVIDERS_CONTACTS', {
    proId: DataTypes.INTEGER,
    
    conStatus: DataTypes.BOOLEAN,
    conName: DataTypes.STRING,
    conPhone1: DataTypes.STRING,
    conPhone2: DataTypes.STRING,
    conPhone2: DataTypes.STRING,
    conEmail: DataTypes.STRING,
    conObservations: DataTypes.STRING,
  }, {
    // Nome da tabela no banco.
    tableName: "PROVIDERS_CONTACTS",

    timestamps: true,
    freezeTableName: true,

    createdAt: 'conCreated',
    updatedAt: 'conUpdated',
    deletedAt: 'conDeleted',
    paranoid: true,
  });
  PROVIDERS_CONTACTS.associate = function (models) {
    models.PROVIDERS_CONTACTS.belongsTo(models.PROVIDERS, {
      onDelete: "CASCADE",
      foreignKey: "proId",
      targetKey: "id",
      as: 'PROVIDERS'
    });
  };
  return PROVIDERS_CONTACTS;
};