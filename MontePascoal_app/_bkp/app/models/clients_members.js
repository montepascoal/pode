'use strict';
module.exports = (sequelize, DataTypes) => {
  const CLIENTS_MEMBERS = sequelize.define('CLIENTS_MEMBERS', {
    comId: DataTypes.INTEGER,
    cliId: DataTypes.INTEGER,
    empId: DataTypes.INTEGER,
    
    conStatus: DataTypes.BOOLEAN,
    conId: DataTypes.STRING,
    
    memId: DataTypes.STRING,
    memIdOld: DataTypes.STRING,
    memAudited: DataTypes.BOOLEAN,
    memStatus: DataTypes.BOOLEAN,
    memType: DataTypes.STRING,
    memName: DataTypes.STRING,
    memDocBirthDate: DataTypes.DATE,
    memDocCpf: DataTypes.STRING,
    memDocRg: DataTypes.STRING,
    memPcD: DataTypes.BOOLEAN,
    memObservations: DataTypes.STRING,

    auditId: DataTypes.INTEGER,
    auditDate: DataTypes.DATE,
  }, {
    // Nome da tabela no banco.
    tableName: "CLIENTS_MEMBERS",

    timestamps: true,
    freezeTableName: true,

    createdAt: 'memCreated',
    updatedAt: 'memUpdated',
    deletedAt: 'memDeleted',
    paranoid: true,
  });
  CLIENTS_MEMBERS.associate = function (models) {
    models.CLIENTS_MEMBERS.belongsTo(models.COMPANIES, {
      onDelete: "CASCADE",
      foreignKey: "comId",
      targetKey: "id",
      as: 'COMPANIES'
    });
    models.CLIENTS_MEMBERS.belongsTo(models.CLIENTS, {
      onDelete: "CASCADE",
      foreignKey: "cliId",
      targetKey: "id",
      as: 'CLIENTS'
    });
    models.CLIENTS_MEMBERS.belongsTo(models.CLIENTS_EMPLOYEES, {
      onDelete: "CASCADE",
      foreignKey: "empId",
      targetKey: "id",
      as: 'CLIENTS_EMPLOYEES'
    });
    CLIENTS_MEMBERS.hasMany(models.CLIENTS_MEMBERS_FILES, {
      onDelete: "CASCADE",
      foreignKey: "memId",
      targetKey: "id",
      as: 'CLIENTS_MEMBERS_FILES',
    });
  };
  return CLIENTS_MEMBERS;
};