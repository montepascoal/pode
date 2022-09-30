'use strict';
module.exports = (sequelize, DataTypes) => {
  const EMPLOYEES = sequelize.define('EMPLOYEES', {
    useId: DataTypes.INTEGER,
    comId: DataTypes.INTEGER,
    
    empInfBirthPlaceCouId: DataTypes.INTEGER,
    empInfBirthPlaceStaId: DataTypes.INTEGER,
    empInfBirthPlaceCitId: DataTypes.INTEGER,
    empAddCouId: DataTypes.INTEGER,
    empAddStaId: DataTypes.INTEGER,
    empAddCitId: DataTypes.INTEGER,
    empJobDepId: DataTypes.INTEGER,
    empJobOccId: DataTypes.INTEGER,

    empStatus: DataTypes.BOOLEAN,
    empName: DataTypes.STRING,
    empDocBirthDate: DataTypes.DATE,
    empInfMaritalStatus: DataTypes.STRING,
    empInfDegreeEducation: DataTypes.STRING,
    empInfMother: DataTypes.STRING,
    empInfDad: DataTypes.STRING,
    empAddCep: DataTypes.STRING,
    empAddAddress: DataTypes.STRING,
    empAddComplement: DataTypes.STRING,
    empAddNumber: DataTypes.STRING,
    empAddDistrict: DataTypes.STRING,
    empDocCpf: DataTypes.STRING,
    empDocRg: DataTypes.STRING,
    empDocRg: DataTypes.STRING,
    empDocRgDateExpedition: DataTypes.DATE,
    empDocRgExpeditor: DataTypes.STRING,
    empDocVoterTitle: DataTypes.STRING,
    empDocVoterZone: DataTypes.STRING,
    empDocVoterSection: DataTypes.STRING,
    empDocReservist: DataTypes.STRING,
    empDocReservistCategory: DataTypes.STRING,
    empDocCtpsInfo: DataTypes.BOOLEAN,
    empDocCtps: DataTypes.STRING,
    empDocCtpsSerieUf: DataTypes.STRING,
    empDocCtpsDate: DataTypes.DATE,
    empDocPis: DataTypes.STRING,
    empDocFirstJob: DataTypes.BOOLEAN,
    empConPhone1: DataTypes.STRING,
    empConPhone2: DataTypes.STRING,
    empConEmail: DataTypes.STRING,
    empJobAdmissionDate: DataTypes.DATE,
    empJobMonthlySalary: DataTypes.DOUBLE,
    empJobWeekMondayToFridayH: DataTypes.STRING,
    empJobWeekSaturdayH: DataTypes.STRING,
    empJobExperienceContract: DataTypes.BOOLEAN,
    empJobExperienceContractDays: DataTypes.INTEGER,
    empPayBank: DataTypes.STRING,
    empPayAgency: DataTypes.STRING,
    empPayType: DataTypes.STRING,
    empPayAccount: DataTypes.STRING,
    empObservations: DataTypes.STRING,
  }, {
    // Nome da tabela no banco.
    tableName: "EMPLOYEES",

    timestamps: true,
    freezeTableName: true,

    createdAt: 'empCreated',
    updatedAt: 'empUpdated',
    deletedAt: 'empDeleted',
    paranoid: true,
  });
  EMPLOYEES.associate = function (models) {
    models.EMPLOYEES.belongsTo(models.COMPANIES, {
      onDelete: "CASCADE",
      foreignKey: "comId",
      targetKey: "id",
      as: 'COMPANIES'
    });
    models.EMPLOYEES.belongsTo(models.USERS, {
      onDelete: "CASCADE",
      foreignKey: "useId",
      targetKey: "id",
      as: 'USERS'
    });
    models.EMPLOYEES.belongsTo(models.CONFIG_COUNTRIES, {
      onDelete: "CASCADE",
      foreignKey: "empInfBirthPlaceCouId",
      targetKey: "id",
      as: 'CONFIG_COUNTRIES_inf'
    });
    models.EMPLOYEES.belongsTo(models.CONFIG_STATES, {
      onDelete: "CASCADE",
      foreignKey: "empInfBirthPlaceStaId",
      targetKey: "id",
      as: 'CONFIG_STATES_inf'
    });
    models.EMPLOYEES.belongsTo(models.CONFIG_CITIES, {
      onDelete: "CASCADE",
      foreignKey: "empInfBirthPlaceCitId",
      targetKey: "id",
      as: 'CONFIG_CITIES_inf'
    });
    models.EMPLOYEES.belongsTo(models.CONFIG_COUNTRIES, {
      onDelete: "CASCADE",
      foreignKey: "empAddCouId",
      targetKey: "id",
      as: 'CONFIG_COUNTRIES_add'
    });
    models.EMPLOYEES.belongsTo(models.CONFIG_STATES, {
      onDelete: "CASCADE",
      foreignKey: "empAddStaId",
      targetKey: "id",
      as: 'CONFIG_STATES_add'
    });
    models.EMPLOYEES.belongsTo(models.CONFIG_CITIES, {
      onDelete: "CASCADE",
      foreignKey: "empAddCitId",
      targetKey: "id",
      as: 'CONFIG_CITIES_add'
    });
    models.EMPLOYEES.belongsTo(models.CONFIG_EMPLOYEES_DEPARTMENTS, {
      onDelete: "CASCADE",
      foreignKey: "empJobDepId",
      targetKey: "id",
      as: 'CONFIG_EMPLOYEES_DEPARTMENTS'
    });
    models.EMPLOYEES.belongsTo(models.CONFIG_EMPLOYEES_OCCUPATIONS, {
      onDelete: "CASCADE",
      foreignKey: "empJobOccId",
      targetKey: "id",
      as: 'CONFIG_EMPLOYEES_OCCUPATIONS'
    });
    EMPLOYEES.hasMany(models.EMPLOYEES_MEMBERS, {
      onDelete: "CASCADE",
      foreignKey: "empId",
      targetKey: "id"
    });
    EMPLOYEES.hasMany(models.EMPLOYEES_FILES, {
      onDelete: "CASCADE",
      foreignKey: "empId",
      targetKey: "id"
    });
    EMPLOYEES.hasMany(models.EMPLOYEES_SALARY, {
      onDelete: "CASCADE",
      foreignKey: "empId",
      targetKey: "id"
    });
  };
  return EMPLOYEES;
};