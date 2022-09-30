'use strict';
module.exports = (sequelize, DataTypes) => {
  const EMPLOYEES_MEMBERS = sequelize.define('EMPLOYEES_MEMBERS', {
    empId: DataTypes.INTEGER,

    memStatus: DataTypes.BOOLEAN,
    memType: DataTypes.STRING,
    memName: DataTypes.STRING,
    memRg: DataTypes.STRING,
    memDateBirth: DataTypes.DATE,
    memObservations: DataTypes.STRING,
  }, {
    // Nome da tabela no banco.
    tableName: "EMPLOYEES_MEMBERS",

    timestamps: true,
    freezeTableName: true,

    createdAt: 'memCreated',
    updatedAt: 'memUpdated',
    deletedAt: 'memDeleted',
    paranoid: true,
  });
  EMPLOYEES_MEMBERS.associate = function (models) {
    models.EMPLOYEES_MEMBERS.belongsTo(models.EMPLOYEES, {
      onDelete: "CASCADE",
      foreignKey: "empId",
      targetKey: "id",
      as: 'EMPLOYEES'
    });
  };
  return EMPLOYEES_MEMBERS;
};