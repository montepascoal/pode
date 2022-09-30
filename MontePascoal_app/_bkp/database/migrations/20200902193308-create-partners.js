"use strict";

module.exports = {
  up: (queryInterface, DataTypes) => {
    return queryInterface.createTable("PARTNERS", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      // comId: {
      //   allowNull: false,
      //   type: DataTypes.INTEGER,
      //   references: {
      //     model: 'COMPANIES',
      //     key: 'id'
      //   }
      // },
      useId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: 'USERS',
          key: 'id'
        }
      },

      parStatus: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
      },
      parInfPerson: {
        allowNull: false,
        type: DataTypes.STRING, // CPF | CNPJ
      },

      parName: {
        allowNull: false,
        type: DataTypes.STRING, // Nome ou Npme Fantasia
      },
      parNameCompany: {
        allowNull: true,
        type: DataTypes.STRING, // Razão Social
      },

      parDocCpfCnpj: {
        allowNull: false,
        type: DataTypes.STRING,
        // unique: true,
      },
      parDocRegistrationStateIndicator: { 
        allowNull: true,
        type: DataTypes.STRING, // Não Contribuinte | Contribuinte | Contribuinte Isento
        
      },
      parDocRegistrationState: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      parDocRegistrationMunicipal: {
        allowNull: true,
        type: DataTypes.STRING,
      },

      parAddCep: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      parAddAddress: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      parAddComplement: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      parAddNumber: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      parAddDistrict: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      parAddCouId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: 'CONFIG_COUNTRIES',
          key: 'id'
        }
      },
      parAddStaId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: 'CONFIG_STATES',
          key: 'id'
        }
      },
      parAddCitId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: 'CONFIG_CITIES',
          key: 'id'
        }
      },

      parConPhone1: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      parConPhone2: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      parConEmail: {
        allowNull: true,
        type: DataTypes.STRING,
      },

      parObservations: {
        allowNull: true,
        type: DataTypes.STRING,
      },

      parCreated: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      parUpdated: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      parDeleted: {
        type: DataTypes.DATE,
      },
    });
  },
  down: (queryInterface, DataTypes) => {
    return queryInterface.dropTable("PARTNERS");
  },
};
