'use strict';
module.exports = (sequelize, DataTypes) => {
  const CONFIG_EMPLOYEES_DEPARTMENTS = sequelize.define(
    'CONFIG_EMPLOYEES_DEPARTMENTS',
    {
      depStatus: DataTypes.BOOLEAN,
      depName: DataTypes.STRING,
      depDescription: DataTypes.STRING,
    },
    {
      tableName: 'CONFIG_EMPLOYEES_DEPARTMENTS',

      timestamps: true,
      freezeTableName: true,

      createdAt: 'depCreated',
      updatedAt: 'depUpdated',
      deletedAt: 'depDeleted',
      paranoid: true,
    }
  );
  CONFIG_EMPLOYEES_DEPARTMENTS.associate = function (models) {
    CONFIG_EMPLOYEES_DEPARTMENTS.hasMany(models.EMPLOYEES, {
      onDelete: 'CASCADE',
      foreignKey: 'empJobDepId',
      targetKey: 'id',
    });
  };
  return CONFIG_EMPLOYEES_DEPARTMENTS;
};
