'use strict';
module.exports = (sequelize, DataTypes) => {
  const PARTNERS_CONTACTS = sequelize.define('PARTNERS_CONTACTS', {
    parId: DataTypes.INTEGER,
    
    conStatus: DataTypes.BOOLEAN,
    conName: DataTypes.STRING,
    conPhone1: DataTypes.STRING,
    conPhone2: DataTypes.STRING,
    conPhone2: DataTypes.STRING,
    conEmail: DataTypes.STRING,
    conObservations: DataTypes.STRING,
  }, {
    // Nome da tabela no banco.
    tableName: "PARTNERS_CONTACTS",

    timestamps: true,
    freezeTableName: true,

    createdAt: 'conCreated',
    updatedAt: 'conUpdated',
    deletedAt: 'conDeleted',
    paranoid: true,
  });
  PARTNERS_CONTACTS.associate = function (models) {
    models.PARTNERS_CONTACTS.belongsTo(models.PARTNERS, {
      onDelete: "CASCADE",
      foreignKey: "parId",
      targetKey: "id",
      as: 'PARTNERS'
    });
  };
  return PARTNERS_CONTACTS;
};