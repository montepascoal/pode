'use strict';
module.exports = (sequelize, DataTypes) => {
  const CLIENTS_EMPLOYEES = sequelize.define('CLIENTS_EMPLOYEES', {
    comId: DataTypes.INTEGER,
    cliId: DataTypes.INTEGER,
    memId: DataTypes.INTEGER,
    
    empStatus: DataTypes.BOOLEAN,
    empName: DataTypes.STRING,
    empDocBirthDate: DataTypes.DATE,
    empInfMaritalStatus: DataTypes.STRING,
    empDocCpf: DataTypes.STRING,
    empDocRg: DataTypes.STRING,
    empDocCtps: DataTypes.STRING,
    empJobOccupation: DataTypes.STRING,
    empJobDate: DataTypes.DATE,
    empConPhone1: DataTypes.STRING,
    empConPhone2: DataTypes.STRING,
    empConEmail: DataTypes.STRING,
    empObservations: DataTypes.STRING,
  }, {
    // Nome da tabela no banco.
    tableName: "CLIENTS_EMPLOYEES",

    timestamps: true,
    freezeTableName: true,

    createdAt: 'empCreated',
    updatedAt: 'empUpdated',
    deletedAt: 'empDeleted',
    paranoid: true,
  });
  CLIENTS_EMPLOYEES.associate = function (models) {
    models.CLIENTS_EMPLOYEES.belongsTo(models.COMPANIES, {
      onDelete: "CASCADE",
      foreignKey: "comId",
      targetKey: "id",
      as: 'COMPANIES'
    });
    models.CLIENTS_EMPLOYEES.belongsTo(models.CLIENTS, {
      onDelete: "CASCADE",
      foreignKey: "cliId",
      targetKey: "id",
      as: 'CLIENTS'
    });
    CLIENTS_EMPLOYEES.hasMany(models.CLIENTS_MEMBERS, {
      onDelete: "CASCADE",
      foreignKey: "empId",
      targetKey: "id",
      as: 'CLIENTS_MEMBERS',
    });
  };
  return CLIENTS_EMPLOYEES;
};