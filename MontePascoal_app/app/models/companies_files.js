'use strict';
module.exports = (sequelize, DataTypes) => {
  const COMPANIES_FILES = sequelize.define(
    'COMPANIES_FILES',
    {
      comId: DataTypes.INTEGER,

      filUseId: DataTypes.INTEGER,
      filStatus: DataTypes.BOOLEAN,
      filTitle: DataTypes.STRING,
      filType: DataTypes.STRING,
      filKey: DataTypes.STRING,
    },
    {
      tableName: 'COMPANIES_FILES',

      timestamps: true,
      freezeTableName: true,

      createdAt: 'filCreated',
      updatedAt: 'filUpdated',
      deletedAt: 'filDeleted',
      paranoid: true,
    }
  );
  COMPANIES_FILES.associate = function (models) {
    COMPANIES_FILES.belongsTo(models.COMPANIES, {
      onDelete: 'CASCADE',
      foreignKey: 'comId',
      targetKey: 'id',
      as: 'COMPANIES',
    });
  };
  return COMPANIES_FILES;
};
