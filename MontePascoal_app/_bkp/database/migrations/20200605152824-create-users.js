"use strict";

module.exports = {
  up: (queryInterface, DataTypes) => {
    return queryInterface.createTable("USERS", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      useStatus: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
      },
      comId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: 'COMPANIES',
          key: 'id'
        }
      },
      useKeyCompany: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      useKeyType: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      useKeyId: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      useNickname: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      usePassword: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      usePasswordReset: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
      },
      // Permissions
      usePer0000: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
      },
      usePerA001: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
      },
      usePerA002: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
      },
      usePerA003: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
      },
      usePerA004: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
      },
      usePerA005: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
      },
      usePerA006: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
      },
      usePerB001: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
      },
      usePerB002: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
      },
      usePerB003: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
      },
      usePerB004: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
      },
      usePerB005: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
      },
      usePerB006: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
      },
      usePerC001: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
      },
      usePerC002: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
      },
      usePerC003: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
      },
      usePerC004: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
      },
      usePerC005: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
      },
      usePerC006: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
      },
      usePerC007: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
      },
      usePerD001: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
      },
      usePerD002: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
      },
      usePerD003: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
      },
      usePerD004: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
      },
      usePerD005: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
      },
      usePerD006: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
      },
      usePerE001: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
      },
      usePerE002: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
      },
      usePerE003: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
      },
      usePerE004: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
      },
      usePerE005: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
      },
      usePerE006: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
      },
      usePerE007: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
      },      
      usePerF001: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
      },
      usePerF002: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
      },
      usePerF003: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
      },
      usePerF004: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
      },
      usePerF005: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
      },
      usePerF006: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
      },
      usePerF007: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
      },
      usePerF008: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
      },
      usePerZ001: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
      },
      usePerZ002: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
      },
      usePerZ003: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
      },
      usePerZ004: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
      },
      // Control
      useCreated: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      useUpdated: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      useDeleted: {
        type: DataTypes.DATE,
      },
    });
  },
  down: (queryInterface, DataTypes) => {
    return queryInterface.dropTable("USERS");
  },
};
