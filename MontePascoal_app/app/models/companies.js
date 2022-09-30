'use strict';
module.exports = (sequelize, DataTypes) => {
  const COMPANIES = sequelize.define(
    'COMPANIES',
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
    },
    {
      tableName: 'COMPANIES',

      timestamps: true,
      freezeTableName: true,

      createdAt: 'comCreated',
      updatedAt: 'comUpdated',
      deletedAt: 'comDeleted',
      paranoid: true,
    }
  );
  COMPANIES.associate = function (models) {
    COMPANIES.hasMany(models.USERS, {
      onDelete: 'CASCADE',
      foreignKey: 'comId',
      targetKey: 'id',
    });
    COMPANIES.hasMany(models.EMPLOYEES, {
      onDelete: 'CASCADE',
      foreignKey: 'comId',
      targetKey: 'id',
    });
    COMPANIES.hasMany(models.COMPANIES_REPRESENTATIVES, {
      onDelete: 'CASCADE',
      foreignKey: 'comId',
      targetKey: 'id',
    });
    COMPANIES.hasMany(models.COMPANIES_FILES, {
      onDelete: 'CASCADE',
      foreignKey: 'comId',
      targetKey: 'id',
    });
    COMPANIES.belongsTo(models.CONFIG_COUNTRIES, {
      onDelete: 'CASCADE',
      foreignKey: 'comAddCouId',
      targetKey: 'id',
      as: 'CONFIG_COUNTRIES',
    });
    COMPANIES.belongsTo(models.CONFIG_STATES, {
      onDelete: 'CASCADE',
      foreignKey: 'comAddStaId',
      targetKey: 'id',
      as: 'CONFIG_STATES',
    });
    COMPANIES.belongsTo(models.CONFIG_CITIES, {
      onDelete: 'CASCADE',
      foreignKey: 'comAddCitId',
      targetKey: 'id',
      as: 'CONFIG_CITIES',
    });
  };
  return COMPANIES;
};
