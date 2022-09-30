'use strict';
module.exports = (sequelize, DataTypes) => {
  const REL_PROVIDERS_SERVICES = sequelize.define('REL_PROVIDERS_SERVICES', {
    proId: DataTypes.INTEGER,
    serId: DataTypes.INTEGER
  }, {
    // Nome da tabela no banco.
    tableName: "REL_PROVIDERS_SERVICES",

    timestamps: true,
    freezeTableName: true,

    createdAt: 'proSerCreated',
    updatedAt: 'proSerUpdated',
    deletedAt: 'proSerDeleted',
    paranoid: true,
  });
  REL_PROVIDERS_SERVICES.associate = (models) => {
    // associations can be defined here
    // REL_PROVIDERS_SERVICES.belongsTo(models.PROVIDERS, {
    //   onDelete: "CASCADE",
    //   foreignKey: 'proId', 
    // });
    REL_PROVIDERS_SERVICES.belongsTo(models.CONFIG_PROVIDERS_SERVICES, {
      onDelete: "CASCADE",
      foreignKey: 'serId', 
      as: 'PROVIDERS_SERVICES'
    });
  };
  return REL_PROVIDERS_SERVICES;
};