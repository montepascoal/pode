'use strict';
module.exports = (sequelize, DataTypes) => {
  const EMPLOYEES_FILES = sequelize.define('EMPLOYEES_FILES', {
    empId: DataTypes.INTEGER,
    memId: DataTypes.INTEGER,
    
    filUseId: DataTypes.INTEGER,
    filStatus: DataTypes.BOOLEAN,
    filTitle: DataTypes.STRING,
    filType: DataTypes.STRING,
    filKey: DataTypes.STRING,
  }, {
    // Nome da tabela no banco.
    tableName: "EMPLOYEES_FILES",

    timestamps: true,
    freezeTableName: true,

    createdAt: 'filCreated',
    updatedAt: 'filUpdated',
    deletedAt: 'filDeleted',
    paranoid: true,
  });
  EMPLOYEES_FILES.associate = function (models) {
    models.EMPLOYEES_FILES.belongsTo(models.EMPLOYEES, {
      onDelete: "CASCADE",
      foreignKey: "empId",
      targetKey: "id",
      as: 'EMPLOYEES'
    });
  };
  return EMPLOYEES_FILES;
};