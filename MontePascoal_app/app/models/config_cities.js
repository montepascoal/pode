'use strict';
module.exports = (sequelize, DataTypes) => {
  const CONFIG_CITIES = sequelize.define(
    'CONFIG_CITIES',
    {
      staId: DataTypes.INTEGER,
      citName: DataTypes.STRING,
      citIbge: DataTypes.INTEGER,
      citGeoLat: DataTypes.DOUBLE,
      citGeoLng: DataTypes.DOUBLE,
      citTom: DataTypes.INTEGER,
    },
    {
      tableName: 'CONFIG_CITIES',

      timestamps: true,
      freezeTableName: true,
      createdAt: 'citCreated',
      updatedAt: 'citUpdated',
      deletedAt: 'citDeleted',
      paranoid: true,
    }
  );

  CONFIG_CITIES.associate = function (models) {
    CONFIG_CITIES.hasMany(models.COMPANIES_MAIN, {
      onDelete: 'CASCADE',
      foreignKey: 'comAddCitId',
      targetKey: 'id',
    });
    CONFIG_CITIES.hasMany(models.COMPANIES, {
      onDelete: 'CASCADE',
      foreignKey: 'comAddCitId',
      targetKey: 'id',
    });
    CONFIG_CITIES.hasMany(models.COMPANIES_REPRESENTATIVES, {
      onDelete: 'CASCADE',
      foreignKey: 'repAddCitId',
      targetKey: 'id',
    });
    CONFIG_CITIES.belongsTo(models.CONFIG_STATES, {
      onDelete: 'CASCADE',
      foreignKey: 'staId',
      targetKey: 'id',
      as: 'CONFIG_STATES',
    });
    CONFIG_CITIES.hasMany(models.EMPLOYEES, {
      onDelete: 'CASCADE',
      foreignKey: 'empInfBirthPlaceCitId',
      targetKey: 'id',
    });
    CONFIG_CITIES.hasMany(models.EMPLOYEES, {
      onDelete: 'CASCADE',
      foreignKey: 'empAddCitId',
      targetKey: 'id',
    });
  };

  return CONFIG_CITIES;
};
