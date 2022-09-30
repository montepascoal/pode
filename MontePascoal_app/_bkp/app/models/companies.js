'use strict';
module.exports = (sequelize, DataTypes) => {
  const COMPANIES = sequelize.define('COMPANIES', {
    comAddCouId: DataTypes.INTEGER,
    comAddStaId: DataTypes.INTEGER,
    comAddCitId: DataTypes.INTEGER,

    comStatus: DataTypes.BOOLEAN,
    comName: DataTypes.STRING,
    comNameCompany: DataTypes.STRING,
    comCnpj: DataTypes.STRING,
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
    comObservations: DataTypes.STRING,
  }, {
    // Nome da tabela no banco.
    tableName: "COMPANIES",

    timestamps: true,
    freezeTableName: true,

    createdAt: 'comCreated',
    updatedAt: 'comUpdated',
    deletedAt: 'comDeleted',
    paranoid: true,
  });
  COMPANIES.associate = function (models) {
    COMPANIES.hasMany(models.USERS, {
      onDelete: "CASCADE",
      foreignKey: "comId",
      targetKey: "id"
    });
    COMPANIES.hasMany(models.EMPLOYEES, {
      onDelete: "CASCADE",
      foreignKey: "comId",
      targetKey: "id"
    });
    // COMPANIES.hasMany(models.PROVIDERS, {
    //   onDelete: "CASCADE",
    //   foreignKey: "comId",
    //   targetKey: "id",
    //   as: 'PROVIDERS',
    // });
    // COMPANIES.hasMany(models.PARTNERS, {
    //   onDelete: "CASCADE",
    //   foreignKey: "comId",
    //   targetKey: "id",
    //   as: 'PARTNERS',
    // });
    COMPANIES.hasMany(models.CLIENTS, {
      onDelete: "CASCADE",
      foreignKey: "comId",
      targetKey: "id",
      as: 'CLIENTS',
    });
    COMPANIES.hasMany(models.CLIENTS_EMPLOYEES, {
      onDelete: "CASCADE",
      foreignKey: "comId",
      targetKey: "id",
      as: 'CLIENTS_EMPLOYEES',
    });
    // COMPANIES.hasMany(models.CLIENTS_MEMBERS, {
    //   onDelete: "CASCADE",
    //   foreignKey: "memId",
    //   targetKey: "id",
    //   as: 'CLIENTS_MEMBERS',
    // });
    models.COMPANIES.belongsTo(models.CONFIG_COUNTRIES, {
      onDelete: "CASCADE",
      foreignKey: "comAddCouId",
      targetKey: "id",
      as: 'CONFIG_COUNTRIES'
    });
    models.COMPANIES.belongsTo(models.CONFIG_STATES, {
      onDelete: "CASCADE",
      foreignKey: "comAddStaId",
      targetKey: "id",
      as: 'CONFIG_STATES'
    });
    models.COMPANIES.belongsTo(models.CONFIG_CITIES, {
      onDelete: "CASCADE",
      foreignKey: "comAddCitId",
      targetKey: "id",
      as: 'CONFIG_CITIES'
    });
  };
  return COMPANIES;
};