'use strict';
module.exports = (sequelize, DataTypes) => {
  const PROVIDERS = sequelize.define('PROVIDERS', {
    useId: DataTypes.INTEGER,
    // comId: DataTypes.INTEGER,

    proStatus: DataTypes.BOOLEAN,
    proInfPerson: DataTypes.STRING,
    proName: DataTypes.STRING,
    proNameCompany: DataTypes.STRING,

    proDocCpfCnpj: DataTypes.STRING,
    proDocRegistrationStateIndicator: DataTypes.STRING,
    proDocRegistrationState: DataTypes.STRING,
    proDocRegistrationMunicipal: DataTypes.STRING,

    proAddCep: DataTypes.STRING,
    proAddAddress: DataTypes.STRING,
    proAddComplement: DataTypes.STRING,
    proAddNumber: DataTypes.STRING,
    proAddDistrict: DataTypes.STRING,
    proAddCouId: DataTypes.INTEGER,
    proAddStaId: DataTypes.INTEGER,
    proAddCitId: DataTypes.INTEGER,

    proConPhone1: DataTypes.STRING,
    proConPhone2: DataTypes.STRING,
    proConEmail: DataTypes.STRING,

    proObservations: DataTypes.STRING,
    
  }, {
    // Nome da tabela no banco.
    tableName: "PROVIDERS",

    timestamps: true,
    freezeTableName: true,

    createdAt: 'proCreated',
    updatedAt: 'proUpdated',
    deletedAt: 'proDeleted',
    paranoid: true,
  });
  PROVIDERS.associate = function(models) {
    // associations can be defined here
    PROVIDERS.belongsTo(models.USERS, {
      onDelete: "CASCADE",
      foreignKey: "useId",
      targetKey: "id",
      as: 'USERS'
    });
    // PROVIDERS.belongsTo(models.COMPANIES, {
    //   onDelete: "CASCADE",
    //   foreignKey: "comId",
    //   targetKey: "id",
    //   as: 'COMPANIES'
    // });
    PROVIDERS.belongsTo(models.CONFIG_COUNTRIES, {
      onDelete: "CASCADE",
      foreignKey: "proAddCouId",
      targetKey: "id",
      as: 'CONFIG_COUNTRIES'
    });
    PROVIDERS.belongsTo(models.CONFIG_STATES, {
      onDelete: "CASCADE",
      foreignKey: "proAddStaId",
      targetKey: "id",
      as: 'CONFIG_STATES'
    });
    PROVIDERS.belongsTo(models.CONFIG_CITIES, {
      onDelete: "CASCADE",
      foreignKey: "proAddCitId",
      targetKey: "id",
      as: 'CONFIG_CITIES'
    });
    PROVIDERS.belongsToMany(models.CONFIG_PROVIDERS_SERVICES, {
      onDelete: "CASCADE",
      through: 'REL_PROVIDERS_SERVICES', 
      foreignKey: 'proId', 
      as: 'PROVIDERS_SERVICES'
    });
    PROVIDERS.hasMany(models.PROVIDERS_FILES, {
      onDelete: "CASCADE",
      foreignKey: "proId",
      targetKey: "id",
      as: 'PROVIDERS_FILES',
    });
    PROVIDERS.hasMany(models.PROVIDERS_CONTACTS, {
      onDelete: "CASCADE",
      foreignKey: "proId",
      targetKey: "id",
      as: 'PROVIDERS_CONTACTS',
    });
  };
  return PROVIDERS;
};