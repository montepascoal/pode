'use strict';
module.exports = (sequelize, DataTypes) => {
  const REL_PARTNERS_SERVICES = sequelize.define('REL_PARTNERS_SERVICES', {
    parId: DataTypes.INTEGER,
    serId: DataTypes.INTEGER
  }, {
    // Nome da tabela no banco.
    tableName: "REL_PARTNERS_SERVICES",

    timestamps: true,
    freezeTableName: true,

    createdAt: 'parSerCreated',
    updatedAt: 'parSerUpdated',
    deletedAt: 'parSerDeleted',
    paranoid: true,
  });
  REL_PARTNERS_SERVICES.associate = function(models) {
    // associations can be defined here
    // REL_PARTNERS_SERVICES.belongsTo(models.PARTNERS, {
    //   onDelete: "CASCADE",
    //   foreignKey: 'parId', 
    // });
    REL_PARTNERS_SERVICES.belongsTo(models.CONFIG_PARTNERS_SERVICES, {
      onDelete: "CASCADE",
      foreignKey: 'serId',
      as: 'PARTNERS_SERVICES' 
    });
  };
  return REL_PARTNERS_SERVICES;
};