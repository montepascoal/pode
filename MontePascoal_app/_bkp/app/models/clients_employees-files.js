'use strict';
module.exports = (sequelize, DataTypes) => {
  const CLIENTS_EMPLOYEES_FILES = sequelize.define('CLIENTS_EMPLOYEES_FILES', {
    empId: DataTypes.INTEGER,
    
    filUseId: DataTypes.INTEGER,
    filStatus: DataTypes.BOOLEAN,
    filTitle: DataTypes.STRING,
    filType: DataTypes.STRING,
    filKey: DataTypes.STRING,
  }, {
    // Nome da tabela no banco.
    tableName: "CLIENTS_EMPLOYEES_FILES",

    timestamps: true,
    freezeTableName: true,

    createdAt: 'filCreated',
    updatedAt: 'filUpdated',
    deletedAt: 'filDeleted',
    paranoid: true,
  });
  CLIENTS_EMPLOYEES_FILES.associate = function (models) {
    models.CLIENTS_EMPLOYEES_FILES.belongsTo(models.CLIENTS_EMPLOYEES, {
      onDelete: "CASCADE",
      foreignKey: "empId",
      targetKey: "id",
      as: 'CLIENTS_EMPLOYEES'
    });
  };
  return CLIENTS_EMPLOYEES_FILES;
};