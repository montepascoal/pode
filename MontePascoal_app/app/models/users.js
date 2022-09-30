'use strict';
module.exports = (sequelize, DataTypes) => {
  const USERS = sequelize.define(
    'USERS',
    {
      comId: DataTypes.INTEGER,

      useStatus: DataTypes.BOOLEAN,
      useKeyCompany: DataTypes.STRING,
      useKeyType: DataTypes.STRING,
      useKeyId: DataTypes.INTEGER,
      useNickname: DataTypes.STRING,
      usePassword: DataTypes.STRING,
      usePasswordReset: DataTypes.BOOLEAN,

      usePer0000: DataTypes.BOOLEAN,
      usePerA001: DataTypes.BOOLEAN,
      usePerA002: DataTypes.BOOLEAN,
      usePerA003: DataTypes.BOOLEAN,
      usePerA004: DataTypes.BOOLEAN,
      usePerA005: DataTypes.BOOLEAN,
      usePerA006: DataTypes.BOOLEAN,
      usePerB001: DataTypes.BOOLEAN,
      usePerB002: DataTypes.BOOLEAN,
      usePerB003: DataTypes.BOOLEAN,
      usePerB004: DataTypes.BOOLEAN,
      usePerB005: DataTypes.BOOLEAN,
      usePerB006: DataTypes.BOOLEAN,
      usePerC001: DataTypes.BOOLEAN,
      usePerC002: DataTypes.BOOLEAN,
      usePerC003: DataTypes.BOOLEAN,
      usePerC004: DataTypes.BOOLEAN,
      usePerC005: DataTypes.BOOLEAN,
      usePerC006: DataTypes.BOOLEAN,
      usePerC007: DataTypes.BOOLEAN,
      usePerD001: DataTypes.BOOLEAN,
      usePerD002: DataTypes.BOOLEAN,
      usePerD003: DataTypes.BOOLEAN,
      usePerD004: DataTypes.BOOLEAN,
      usePerD005: DataTypes.BOOLEAN,
      usePerD006: DataTypes.BOOLEAN,
      usePerE001: DataTypes.BOOLEAN,
      usePerE002: DataTypes.BOOLEAN,
      usePerE003: DataTypes.BOOLEAN,
      usePerE004: DataTypes.BOOLEAN,
      usePerE005: DataTypes.BOOLEAN,
      usePerE006: DataTypes.BOOLEAN,
      usePerE007: DataTypes.BOOLEAN,
      usePerF001: DataTypes.BOOLEAN,
      usePerF002: DataTypes.BOOLEAN,
      usePerF003: DataTypes.BOOLEAN,
      usePerF004: DataTypes.BOOLEAN,
      usePerF005: DataTypes.BOOLEAN,
      usePerF006: DataTypes.BOOLEAN,
      usePerF007: DataTypes.BOOLEAN,
      usePerF008: DataTypes.BOOLEAN,
      usePerZ001: DataTypes.BOOLEAN,
      usePerZ002: DataTypes.BOOLEAN,
      usePerZ003: DataTypes.BOOLEAN,
      usePerZ004: DataTypes.BOOLEAN,
    },
    {
      tableName: 'USERS',

      timestamps: true,
      freezeTableName: true,

      createdAt: 'useCreated',
      updatedAt: 'useUpdated',
      deletedAt: 'useDeleted',
      paranoid: true,
    }
  );
  USERS.associate = function (models) {
    USERS.hasMany(models.LOGS, {
      onDelete: 'CASCADE',
      foreignKey: 'useId',
      targetKey: 'id',
    });
    USERS.belongsTo(models.COMPANIES, {
      onDelete: 'CASCADE',
      foreignKey: 'comId',
      targetKey: 'id',
      as: 'COMPANIES',
    });
    USERS.hasMany(models.EMPLOYEES, {
      onDelete: 'CASCADE',
      foreignKey: 'useId',
      targetKey: 'id',
    });
  };
  return USERS;
};
