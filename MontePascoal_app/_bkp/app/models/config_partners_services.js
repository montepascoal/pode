'use strict';
module.exports = (sequelize, DataTypes) => {
  const CONFIG_PARTNERS_SERVICES = sequelize.define('CONFIG_PARTNERS_SERVICES', {
    serStatus: DataTypes.BOOLEAN,
    serName: DataTypes.STRING,
    serDescription: DataTypes.STRING
  }, {
    // Nome da tabela no banco.
    tableName: "CONFIG_PARTNERS_SERVICES",

    timestamps: true,
    freezeTableName: true,

    createdAt: 'serCreated',
    updatedAt: 'serUpdated',
    deletedAt: 'serDeleted',
    paranoid: true,
  });
  CONFIG_PARTNERS_SERVICES.associate = function(models) {
    // associations can be defined here
    CONFIG_PARTNERS_SERVICES.belongsToMany(models.PARTNERS, {
      onDelete: "CASCADE",
      through: 'REL_PARTNERS_SERVICES', 
      foreignKey: 'serId', 
      as: 'SERVICES_PARTNERS'
    });
  };
  return CONFIG_PARTNERS_SERVICES;
};