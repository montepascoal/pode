'use strict';
module.exports = (sequelize, DataTypes) => {
  const COMPANIES_REPRESENTATIVES = sequelize.define(
    'COMPANIES_REPRESENTATIVES',
    {
      comId: DataTypes.INTEGER,
      repAddCouId: DataTypes.INTEGER,
      repAddStaId: DataTypes.INTEGER,
      repAddCitId: DataTypes.INTEGER,

      repName: DataTypes.STRING,
      repStatus: DataTypes.BOOLEAN,
      repAddCep: DataTypes.STRING,
      repAddAddress: DataTypes.STRING,
      repAddComplement: DataTypes.STRING,
      repAddDistrict: DataTypes.STRING,

      repDocCpf: DataTypes.STRING,
      repDocRg: DataTypes.STRING,
      repDocRgDateExpedition: DataTypes.STRING,
      repDocRgExpeditor: DataTypes.STRING,
      repConPhone1: DataTypes.STRING,
      repConPhone2: DataTypes.STRING,
      repConEmail: DataTypes.STRING,
      repConEmergencyName: DataTypes.STRING,
      repConEmergencyPhone: DataTypes.STRING,
      repObservations: DataTypes.STRING,
    },
    {
      tableName: 'COMPANIES_REPRESENTATIVES',

      timestamps: true,
      freezeTableName: true,

      createdAt: 'repCreated',
      updatedAt: 'repUpdated',
      deletedAt: 'repDeleted',
      paranoid: true,
    }
  );
  COMPANIES_REPRESENTATIVES.associate = function (models) {
    COMPANIES_REPRESENTATIVES.belongsTo(models.CONFIG_COUNTRIES, {
      onDelete: 'CASCADE',
      foreignKey: 'repAddCouId',
      targetKey: 'id',
      as: 'CONFIG_COUNTRIES',
    });
    COMPANIES_REPRESENTATIVES.belongsTo(models.CONFIG_STATES, {
      onDelete: 'CASCADE',
      foreignKey: 'repAddStaId',
      targetKey: 'id',
      as: 'CONFIG_STATES',
    });
    COMPANIES_REPRESENTATIVES.belongsTo(models.CONFIG_CITIES, {
      onDelete: 'CASCADE',
      foreignKey: 'repAddCitId',
      targetKey: 'id',
      as: 'CONFIG_CITIES',
    });
    COMPANIES_REPRESENTATIVES.belongsTo(models.COMPANIES, {
      onDelete: 'CASCADE',
      foreignKey: 'comId',
      targetKey: 'id',
      as: 'COMPANIES',
    });
  };

  return COMPANIES_REPRESENTATIVES;
};
