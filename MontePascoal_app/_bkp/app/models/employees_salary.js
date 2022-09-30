'use strict';
module.exports = (sequelize, DataTypes) => {
  const EMPLOYEES_SALARY = sequelize.define('EMPLOYEES_SALARY', {
    empId: DataTypes.INTEGER,

    salStatus: DataTypes.BOOLEAN,
    salType: DataTypes.STRING,
    salValueCredit: DataTypes.DOUBLE,
    salValueDebit: DataTypes.DOUBLE,
    salObservation: DataTypes.STRING,
  }, {
    // Nome da tabela no banco.
    tableName: "EMPLOYEES_SALARY",

    timestamps: true,
    freezeTableName: true,

    createdAt: 'salCreated',
    updatedAt: 'salUpdated',
    deletedAt: 'salDeleted',
    paranoid: true,
  });
  EMPLOYEES_SALARY.associate = function (models) {
    models.EMPLOYEES_SALARY.belongsTo(models.EMPLOYEES, {
      onDelete: "CASCADE",
      foreignKey: "empId",
      targetKey: "id",
      as: 'EMPLOYEES'
    });
  };
  return EMPLOYEES_SALARY;
};