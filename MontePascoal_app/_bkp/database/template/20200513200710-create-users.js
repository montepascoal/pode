'use strict';

module.exports = {
  up: (queryInterface, DataTypes) => {
    return queryInterface.createTable('USERS', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      depName: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      depDescription: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      useCPF: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      useCEP: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      useLogradouro: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      useComplement: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      useDistrict: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      useCity: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      useState: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      usePhone1: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      usePhone2: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      useEmail: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: true,
        validate: {
          isEmail: true,
        }
      },
      useUser: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: true,
      },
      usePassword: {
        allowNull: false,
        type: DataTypes.STRING,
      },
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
    return queryInterface.dropTable('USERS');
  }
};
