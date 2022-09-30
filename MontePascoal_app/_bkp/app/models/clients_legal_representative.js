'use strict';
module.exports = (sequelize, DataTypes) => {
  const CLIENTS_LEGAL_REPRESENTATIVE = sequelize.define('CLIENTS_LEGAL_REPRESENTATIVE', {
    cliId: DataTypes.INTEGER,
    
    legStatus: DataTypes.BOOLEAN,
    legName: DataTypes.STRING,
    legDocCpf: DataTypes.STRING,
    legDocRg: DataTypes.STRING,
    legConPhone1: DataTypes.STRING,
    legConPhone2: DataTypes.STRING,
    legConEmail: DataTypes.STRING,
    legObservations: DataTypes.STRING,
  }, {
    // Nome da tabela no banco.
    tableName: "CLIENTS_LEGAL_REPRESENTATIVE",

    timestamps: true,
    freezeTableName: true,

    createdAt: 'legCreated',
    updatedAt: 'legUpdated',
    deletedAt: 'legDeleted',
    paranoid: true,
  });
  CLIENTS_LEGAL_REPRESENTATIVE.associate = function (models) {
    models.CLIENTS_LEGAL_REPRESENTATIVE.belongsTo(models.CLIENTS, {
      onDelete: "CASCADE",
      foreignKey: "cliId",
      targetKey: "id",
      as: 'CLIENTS'
    });
    CLIENTS_LEGAL_REPRESENTATIVE.hasMany(models.CLIENTS_LEGAL_REPRESENTATIVE_FILES, {
      onDelete: "CASCADE",
      foreignKey: "legId",
      targetKey: "id",
      as: 'CLIENTS_LEGAL_REPRESENTATIVE_FILES',
    });
  };
  return CLIENTS_LEGAL_REPRESENTATIVE;
};