"use strict";

module.exports = {
  up: (queryInterface, DataTypes) => {
    return queryInterface.createTable("PROVIDERS", {
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

      proStatus: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
      },
      proInfPerson: {
        allowNull: false,
        type: DataTypes.STRING, // CPF | CNPJ
      },

      proName: {
        allowNull: false,
        type: DataTypes.STRING, // Nome ou Npme Fantasia
      },
      proNameCompany: {
        allowNull: true,
        type: DataTypes.STRING, // Razão Social
      },

      proDocCpfCnpj: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: true,
      },
      proDocRegistrationStateIndicator: { 
        allowNull: true,
        type: DataTypes.STRING, // Não Contribuinte | Contribuinte | Contribuinte Isento
        
      },
      proDocRegistrationState: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      proDocRegistrationMunicipal: {
        allowNull: true,
        type: DataTypes.STRING,
      },

      proAddCep: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      proAddAddress: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      proAddComplement: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      proAddNumber: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      proAddDistrict: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      proAddCouId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: 'CONFIG_COUNTRIES',
          key: 'id'
        }
      },
      proAddStaId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: 'CONFIG_STATES',
          key: 'id'
        }
      },
      proAddCitId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: 'CONFIG_CITIES',
          key: 'id'
        }
      },

      proConPhone1: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      proConPhone2: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      proConEmail: {
        allowNull: true,
        type: DataTypes.STRING,
      },

      proObservations: {
        allowNull: true,
        type: DataTypes.STRING,
      },

      proCreated: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      proUpdated: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      proDeleted: {
        type: DataTypes.DATE,
      },
    });
  },
  down: (queryInterface, DataTypes) => {
    return queryInterface.dropTable("PROVIDERS");
  },
};
