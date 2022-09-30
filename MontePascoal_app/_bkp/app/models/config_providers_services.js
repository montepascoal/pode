'use strict';
module.exports = (sequelize, DataTypes) => {
  const CONFIG_PROVIDERS_SERVICES = sequelize.define('CONFIG_PROVIDERS_SERVICES', {
    serStatus: DataTypes.BOOLEAN,
    serName: DataTypes.STRING,
    serDescription: DataTypes.STRING
  }, {
    // Nome da tabela no banco.
    tableName: "CONFIG_PROVIDERS_SERVICES",

    timestamps: true,
    freezeTableName: true,

    createdAt: 'serCreated',
    updatedAt: 'serUpdated',
    deletedAt: 'serDeleted',
    paranoid: true,
  });
  CONFIG_PROVIDERS_SERVICES.associate = function(models) {
    // associations can be defined here
    CONFIG_PROVIDERS_SERVICES.belongsToMany(models.PROVIDERS, {
      onDelete: "CASCADE",
      through: 'REL_PROVIDERS_SERVICES', 
      foreignKey: 'serId', 
      as: 'SERVICES_PROVIDERS'
    });
  };
  return CONFIG_PROVIDERS_SERVICES;
};