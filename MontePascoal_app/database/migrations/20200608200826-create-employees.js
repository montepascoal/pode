'use strict';

module.exports = {
  up: (queryInterface, DataTypes) => {
    return queryInterface.createTable('EMPLOYEES', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      comId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: 'COMPANIES',
          key: 'id',
        },
      },
      empStatus: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
      },
      useId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: 'USERS',
          key: 'id',
        },
      },
      empName: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      empDocBirthDate: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      empInfBirthPlaceCouId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: 'CONFIG_COUNTRIES',
          key: 'id',
        },
      },
      empInfBirthPlaceStaId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: 'CONFIG_STATES',
          key: 'id',
        },
      },
      empInfBirthPlaceCitId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: 'CONFIG_CITIES',
          key: 'id',
        },
      },
      empInfMaritalStatus: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      empInfDegreeEducation: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      empInfMother: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      empInfDad: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      empAddCep: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      empAddAddress: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      empAddComplement: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      empAddNumber: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      empAddDistrict: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      empAddCouId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: 'CONFIG_COUNTRIES',
          key: 'id',
        },
      },
      empAddStaId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: 'CONFIG_STATES',
          key: 'id',
        },
      },
      empAddCitId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: 'CONFIG_CITIES',
          key: 'id',
        },
      },
      empDocCpf: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: true,
      },
      empDocRg: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      empDocRgDateExpedition: {
        allowNull: true,
        type: DataTypes.DATE,
      },
      empDocRgExpeditor: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      empDocVoterTitle: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      empDocVoterZone: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      empDocVoterSection: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      empDocReservist: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      empDocReservistCategory: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      empDocCtpsInfo: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
      },
      empDocCtps: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      empDocCtpsSerieUf: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      empDocCtpsDate: {
        allowNull: true,
        type: DataTypes.DATE,
      },
      empDocPis: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      empDocFirstJob: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
      },
      empConPhone1: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      empConPhone2: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      empConEmail: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      empConEmergencyName: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      empConEmergencyPhone: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      empJobAdmissionDate: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      empJobDepId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: 'CONFIG_EMPLOYEES_DEPARTMENTS',
          key: 'id',
        },
      },
      empJobOccId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: 'CONFIG_EMPLOYEES_OCCUPATIONS',
          key: 'id',
        },
      },
      empJobMonthlySalary: {
        allowNull: false,
        type: DataTypes.DOUBLE,
      },
      empJobWeekMondayToFridayH: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      empJobWeekSaturdayH: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      empJobExperienceContract: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
      },
      empJobExperienceContractDays: {
        allowNull: true,
        type: DataTypes.INTEGER,
      },
      empPayBank: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      empPayAgency: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      empPayOperation: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      empPayAccount: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      empPayPix: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      empObservations: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      empCreated: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      empUpdated: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      empDeleted: {
        type: DataTypes.DATE,
      },
    });
  },
  down: (queryInterface, DataTypes) => {
    return queryInterface.dropTable('EMPLOYEES');
  },
};
