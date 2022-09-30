'use strict';
module.exports = (sequelize, DataTypes) => {
  const CLIENTS = sequelize.define('CLIENTS', {
    cliIdOld: DataTypes.STRING,

    comId: DataTypes.INTEGER,
    useId: DataTypes.INTEGER,
    empId: DataTypes.INTEGER,

    conStatus: DataTypes.BOOLEAN,
    conId: DataTypes.STRING,

    cliStatus: DataTypes.BOOLEAN,
    cliName: DataTypes.STRING,
    cliNameCompany: DataTypes.STRING,
    
    cliInfPerson: DataTypes.STRING,
    cliDocBirthDate: DataTypes.DATE,
    cliInfMaritalStatus: DataTypes.STRING,
    cliDocCpfCnpj: DataTypes.STRING,
    cliDocRg: DataTypes.STRING,
    cliDocRegistrationStateIndicator: DataTypes.STRING,
    cliDocRegistrationState: DataTypes.STRING,
    cliDocRegistrationMunicipal: DataTypes.STRING,

    cliAddCep: DataTypes.STRING,
    cliAddAddress: DataTypes.STRING,
    cliAddComplement: DataTypes.STRING,
    cliAddNumber: DataTypes.STRING,
    cliAddDistrict: DataTypes.STRING,
    cliAddCouId: DataTypes.INTEGER,
    cliAddStaId: DataTypes.INTEGER,
    cliAddCitId: DataTypes.INTEGER,

    cliConPhone1: DataTypes.STRING,
    cliConPhone2: DataTypes.STRING,
    cliConEmail: DataTypes.STRING,

    cliObservations: DataTypes.STRING,
    
  }, {
    // Nome da tabela no banco.
    tableName: "CLIENTS",

    timestamps: true,
    freezeTableName: true,

    createdAt: 'cliCreated',
    updatedAt: 'cliUpdated',
    deletedAt: 'cliDeleted',
    paranoid: true,
  });
  CLIENTS.associate = function(models) {
    // associations can be defined here
    CLIENTS.belongsTo(models.COMPANIES, {
      onDelete: "CASCADE",
      foreignKey: "comId",
      targetKey: "id",
      as: 'COMPANIES'
    });
    CLIENTS.belongsTo(models.USERS, {
      onDelete: "CASCADE",
      foreignKey: "useId",
      targetKey: "id",
      as: 'USERS'
    });
    CLIENTS.belongsTo(models.CONFIG_COUNTRIES, {
      onDelete: "CASCADE",
      foreignKey: "cliAddCouId",
      targetKey: "id",
      as: 'CONFIG_COUNTRIES'
    });
    CLIENTS.belongsTo(models.CONFIG_STATES, {
      onDelete: "CASCADE",
      foreignKey: "cliAddStaId",
      targetKey: "id",
      as: 'CONFIG_STATES'
    });
    CLIENTS.belongsTo(models.CONFIG_CITIES, {
      onDelete: "CASCADE",
      foreignKey: "cliAddCitId",
      targetKey: "id",
      as: 'CONFIG_CITIES'
    });
    CLIENTS.hasMany(models.CLIENTS_FILES, {
      onDelete: "CASCADE",
      foreignKey: "cliId",
      targetKey: "id",
      as: 'CLIENTS_FILES',
    });
    CLIENTS.hasMany(models.CLIENTS_EMPLOYEES, {
      onDelete: "CASCADE",
      foreignKey: "cliId",
      targetKey: "id",
      as: 'CLIENTS_EMPLOYEES',
    });
    CLIENTS.hasMany(models.CLIENTS_MEMBERS, {
      onDelete: "CASCADE",
      foreignKey: "cliId",
      targetKey: "id",
      as: 'CLIENTS_MEMBERS',
    });
    // CLIENTS.hasMany(models.CLIENTS_LEGAL_REPRESENTATIVE, {
    //   onDelete: "CASCADE",
    //   foreignKey: "cliIdId",
    //   targetKey: "id",
    //   as: 'CLIENTS_LEGAL_REPRESENTATIVE',
    // });
  };
  return CLIENTS;
};