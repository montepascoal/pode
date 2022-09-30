'use strict';
module.exports = (sequelize, DataTypes) => {
  const PARTNERS = sequelize.define('PARTNERS', {
    useId: DataTypes.INTEGER,
    // comId: DataTypes.INTEGER,

    parStatus: DataTypes.BOOLEAN,
    parInfPerson: DataTypes.STRING,
    parName: DataTypes.STRING,
    parNameCompany: DataTypes.STRING,

    parDocCpfCnpj: DataTypes.STRING,
    parDocRegistrationStateIndicator: DataTypes.STRING,
    parDocRegistrationState: DataTypes.STRING,
    parDocRegistrationMunicipal: DataTypes.STRING,

    parAddCep: DataTypes.STRING,
    parAddAddress: DataTypes.STRING,
    parAddComplement: DataTypes.STRING,
    parAddNumber: DataTypes.STRING,
    parAddDistrict: DataTypes.STRING,
    parAddCouId: DataTypes.INTEGER,
    parAddStaId: DataTypes.INTEGER,
    parAddCitId: DataTypes.INTEGER,

    parConPhone1: DataTypes.STRING,
    parConPhone2: DataTypes.STRING,
    parConEmail: DataTypes.STRING,

    parObservations: DataTypes.STRING,
    
  }, {
    // Nome da tabela no banco.
    tableName: "PARTNERS",

    timestamps: true,
    freezeTableName: true,

    createdAt: 'parCreated',
    updatedAt: 'parUpdated',
    deletedAt: 'parDeleted',
    paranoid: true,
  });
  PARTNERS.associate = function(models) {
    // associations can be defined here
    PARTNERS.belongsTo(models.USERS, {
      onDelete: "CASCADE",
      foreignKey: "useId",
      targetKey: "id",
      as: 'USERS'
    });
    // PARTNERS.belongsTo(models.COMPANIES, {
    //   onDelete: "CASCADE",
    //   foreignKey: "comId",
    //   targetKey: "id",
    //   as: 'COMPANIES'
    // });
    PARTNERS.belongsTo(models.CONFIG_COUNTRIES, {
      onDelete: "CASCADE",
      foreignKey: "parAddCouId",
      targetKey: "id",
      as: 'CONFIG_COUNTRIES'
    });
    PARTNERS.belongsTo(models.CONFIG_STATES, {
      onDelete: "CASCADE",
      foreignKey: "parAddStaId",
      targetKey: "id",
      as: 'CONFIG_STATES'
    });
    PARTNERS.belongsTo(models.CONFIG_CITIES, {
      onDelete: "CASCADE",
      foreignKey: "parAddCitId",
      targetKey: "id",
      as: 'CONFIG_CITIES'
    });
    PARTNERS.belongsToMany(models.CONFIG_PARTNERS_SERVICES, {
      onDelete: "CASCADE",
      through: 'REL_PARTNERS_SERVICES', 
      foreignKey: 'parId', 
      as: 'PARTNERS_SERVICES'
    });
    PARTNERS.hasMany(models.PARTNERS_FILES, {
      onDelete: "CASCADE",
      foreignKey: "parId",
      targetKey: "id",
      as: 'PARTNERS_FILES',
    });
    PARTNERS.hasMany(models.PARTNERS_CONTACTS, {
      onDelete: "CASCADE",
      foreignKey: "parId",
      targetKey: "id",
      as: 'PARTNERS_CONTACTS',
    });
  };
  return PARTNERS;
};