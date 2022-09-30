'use strict';
module.exports = (sequelize, DataTypes) => {
  const CONFIG_EMPLOYEES_OCCUPATIONS = sequelize.define(
    'CONFIG_EMPLOYEES_OCCUPATIONS',
    {
      depId: DataTypes.INTEGER,

      occStatus: DataTypes.BOOLEAN,
      occName: DataTypes.STRING,
      occDescription: DataTypes.STRING,
    },
    {
      tableName: 'CONFIG_EMPLOYEES_OCCUPATIONS',

      timestamps: true,
      freezeTableName: true,

      createdAt: 'occCreated',
      updatedAt: 'occUpdated',
      deletedAt: 'occDeleted',
      paranoid: true,
    }
  );
  CONFIG_EMPLOYEES_OCCUPATIONS.associate = function (models) {
    CONFIG_EMPLOYEES_OCCUPATIONS.belongsTo(
      models.CONFIG_EMPLOYEES_DEPARTMENTS,
      {
        onDelete: 'CASCADE',
        foreignKey: 'depId',
        targetKey: 'id',
        as: 'CONFIG_EMPLOYEES_DEPARTMENTS',
      }
    );
    CONFIG_EMPLOYEES_OCCUPATIONS.hasMany(models.EMPLOYEES, {
      onDelete: 'CASCADE',
      foreignKey: 'empJobOccId',
      targetKey: 'id',
    });
  };
  return CONFIG_EMPLOYEES_OCCUPATIONS;
};
