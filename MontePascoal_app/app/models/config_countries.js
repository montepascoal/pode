'use strict';
module.exports = (sequelize, DataTypes) => {
  const CONFIG_COUNTRIES = sequelize.define(
    'CONFIG_COUNTRIES',
    {
      couNameGlobal: DataTypes.STRING,
      couName: DataTypes.STRING,
      couInitials: DataTypes.STRING,
      couBacen: DataTypes.INTEGER,
    },
    {
      tableName: 'CONFIG_COUNTRIES',

      timestamps: true,
      freezeTableName: true,

      createdAt: 'couCreated',
      updatedAt: 'couUpdated',
      deletedAt: 'couDeleted',
      paranoid: true,
    }
  );
  CONFIG_COUNTRIES.associate = function (models) {
    CONFIG_COUNTRIES.hasMany(models.COMPANIES_MAIN, {
      onDelete: 'CASCADE',
      foreignKey: 'comAddCouId',
      targetKey: 'id',
    });
    CONFIG_COUNTRIES.hasMany(models.COMPANIES, {
      onDelete: 'CASCADE',
      foreignKey: 'comAddCouId',
      targetKey: 'id',
    });
    CONFIG_COUNTRIES.hasMany(models.COMPANIES_REPRESENTATIVES, {
      onDelete: 'CASCADE',
      foreignKey: 'repAddCouId',
      targetKey: 'id',
    });
    CONFIG_COUNTRIES.hasMany(models.EMPLOYEES, {
      onDelete: 'CASCADE',
      foreignKey: 'empInfBirthPlaceCouId',
      targetKey: 'id',
    });
    CONFIG_COUNTRIES.hasMany(models.EMPLOYEES, {
      onDelete: 'CASCADE',
      foreignKey: 'empAddCouId',
      targetKey: 'id',
    });
  };
  return CONFIG_COUNTRIES;
};
