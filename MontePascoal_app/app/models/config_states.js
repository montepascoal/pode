'use strict';
module.exports = (sequelize, DataTypes) => {
  const CONFIG_STATES = sequelize.define(
    'CONFIG_STATES',
    {
      couId: DataTypes.INTEGER,
      staName: DataTypes.STRING,
      staInitials: DataTypes.STRING,
      staIbge: DataTypes.INTEGER,
      staDDD: DataTypes.ARRAY(DataTypes.STRING),
    },
    {
      tableName: 'CONFIG_STATES',

      timestamps: true,
      freezeTableName: true,

      createdAt: 'staCreated',
      updatedAt: 'staUpdated',
      deletedAt: 'staDeleted',
      paranoid: true,
    }
  );
  CONFIG_STATES.associate = function (models) {
    CONFIG_STATES.hasMany(models.COMPANIES_MAIN, {
      onDelete: 'CASCADE',
      foreignKey: 'comAddStaId',
    });
    CONFIG_STATES.hasMany(models.COMPANIES, {
      onDelete: 'CASCADE',
      foreignKey: 'comAddStaId',
      targetKey: 'id',
    });
    CONFIG_STATES.hasMany(models.COMPANIES_REPRESENTATIVES, {
      onDelete: 'CASCADE',
      foreignKey: 'repAddStaId',
      targetKey: 'id',
    });
    CONFIG_STATES.hasOne(models.CONFIG_CITIES, {
      onDelete: 'CASCADE',
      foreignKey: 'staId',
      targetKey: 'id',
    });
    CONFIG_STATES.hasMany(models.EMPLOYEES, {
      onDelete: 'CASCADE',
      foreignKey: 'empInfBirthPlaceStaId',
      targetKey: 'id',
    });
    CONFIG_STATES.hasMany(models.EMPLOYEES, {
      onDelete: 'CASCADE',
      foreignKey: 'empAddStaId',
      targetKey: 'id',
    });
  };

  return CONFIG_STATES;
};
