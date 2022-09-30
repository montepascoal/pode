'use strict';

module.exports = {
  up: (queryInterface, DataTypes) => {
    return queryInterface.createTable('TEACHERS', {
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
      teaStatus: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
      },
      teaCoordinator: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
      },
      teaComplete: {
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
      teaName: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      teaNameNickName: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      teaPhoto: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      teaAddCep: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      teaAddAddress: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      teaAddComplement: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      teaAddDistrict: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      teaAddNumber: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      teaAddCouId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: 'CONFIG_COUNTRIES',
          key: 'id',
        },
      },
      teaAddStaId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: 'CONFIG_STATES',
          key: 'id',
        },
      },
      teaAddCitId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: 'CONFIG_CITIES',
          key: 'id',
        },
      },
      teaDocBirthDate: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      teaDocBirthPlaceCouId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: 'CONFIG_COUNTRIES',
          key: 'id',
        },
      },
      teaDocBirthPlaceStaId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: 'CONFIG_STATES',
          key: 'id',
        },
      },
      teaDocBirthPlaceCitId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: 'CONFIG_CITIES',
          key: 'id',
        },
      },
      teaDocCpf: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: true,
      },
      teaDocRg: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      teaDocRgExpeditor: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      teaDocRgDateExpedition: {
        allowNull: true,
        type: DataTypes.DATE,
      },
      teaDocGender: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: true,
      },
      teaDocMaritialStatus: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: true,
      },
      teaDocMother: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: true,
      },
      teaDocDad: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: true,
      },
      teaConWhatsApp: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      teaConPhone1: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      teaConPhone2: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      teaConEmail1: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      teaConEmail2: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      teaConEmergencyName: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      teaConEmergencyPhone: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      teaJobDegree: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      teaPayBank: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      teaPayAgency: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      teaPayOperation: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      teaPayAccount: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      teaPayPix: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      teaPayReceiverName: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      teaPayReceiverCpfCnpj: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      teaPayObservations: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      teaCurriculumLattes: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      teaObservations: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      teaFileProofResidence: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      teaFileProofResidenceCheck: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
      },
      teaFileProofDocumentation: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      teaFileProofDocumentationCheck: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
      },
      teaFileProofMainOrganization: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      teaFileProofMainNumber: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      teaFileProofMainNumber: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      teaFileProofMainCheck: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
      },
      teaCreated: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      teaUpdated: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      teaDeleted: {
        type: DataTypes.DATE,
      },
    });
  },
  down: (queryInterface) => {
    return queryInterface.dropTable('TEACHERS');
  },
};
