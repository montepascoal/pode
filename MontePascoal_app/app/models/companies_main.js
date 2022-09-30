'use strict';
module.exports = (sequelize, DataTypes) => {
  const COMPANIES_MAIN = sequelize.define(
    'COMPANIES_MAIN',
    {
      comAddCouId: DataTypes.INTEGER,
      comAddStaId: DataTypes.INTEGER,
      comAddCitId: DataTypes.INTEGER,

      comStatus: DataTypes.BOOLEAN,
      comName: DataTypes.STRING,
      comNameCompany: DataTypes.STRING,
      comCpfCnpj: DataTypes.STRING,
      comRegistrationState: DataTypes.STRING,
      comRegistrationMunicipal: DataTypes.STRING,
      comAddCep: DataTypes.STRING,
      comAddAddress: DataTypes.STRING,
      comAddComplement: DataTypes.STRING,
      comAddNumber: DataTypes.STRING,
      comAddDistrict: DataTypes.STRING,
      comConPhone1: DataTypes.STRING,
      comConPhone2: DataTypes.STRING,
      comConEmail: DataTypes.STRING,
      comConMediaWebsite: DataTypes.STRING,
      comConMediaWhatsApp: DataTypes.STRING,
      comConMediaFacebook: DataTypes.STRING,
      comConMediaInstagram: DataTypes.STRING,
      comConMediaTikTok: DataTypes.STRING,
      comConMediaLinkedin: DataTypes.STRING,
      comConMediaYoutube: DataTypes.STRING,
      comConMediaTwitter: DataTypes.STRING,
      comConMediaOther1: DataTypes.STRING,
      comConMediaOther2: DataTypes.STRING,
      comObservations: DataTypes.STRING,
    },
    {
      tableName: 'COMPANIES_MAIN',

      timestamps: true,
      freezeTableName: true,

      createdAt: 'comCreated',
      updatedAt: 'comUpdated',
      deletedAt: 'comDeleted',
      paranoid: true,
    }
  );
  COMPANIES_MAIN.associate = function (models) {
    COMPANIES_MAIN.belongsTo(models.CONFIG_COUNTRIES, {
      onDelete: 'CASCADE',
      foreignKey: 'comAddCouId',
      targetKey: 'id',
      as: 'CONFIG_COUNTRIES',
    });
    COMPANIES_MAIN.belongsTo(models.CONFIG_STATES, {
      onDelete: 'CASCADE',
      foreignKey: 'comAddStaId',
      targetKey: 'id',
      as: 'CONFIG_STATES',
    });
    COMPANIES_MAIN.belongsTo(models.CONFIG_CITIES, {
      onDelete: 'CASCADE',
      foreignKey: 'comAddCitId',
      targetKey: 'id',
      as: 'CONFIG_CITIES',
    });
  };
  return COMPANIES_MAIN;
};
