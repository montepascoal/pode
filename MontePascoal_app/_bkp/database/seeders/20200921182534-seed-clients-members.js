'use strict';

module.exports = {
  up: (queryInterface, DataTypes) => {
    return queryInterface.bulkInsert("CLIENTS_MEMBERS",
      [
        {
          comId: 1,
          cliId: 1,
          empId: 1,

          conStatus: false,
          conId: null,
          
          memId: '1.1.1.1', // Unidade / Cliente / Colaborador / Membro
          memIdOld: null, // ID system old
          memAudited: false,
          memStatus: true,
          memType:  'Titular', // Titular / Cônjuge / Filho(a)
          memName: "[test] [1] Member 1",
          memDocBirthDate: new Date('09-12-1993'),
          memDocCpf: "00000000011",
          memDocRg: "123456",

          memPcD: false,

          memObservations: "Observações",

          memCreated: new Date(),
          memUpdated: new Date(),
          memDeleted: null,
        },
        {
          comId: 1,
          cliId: 1,
          empId: 1,

          conStatus: false,
          conId: null,
          
          memId: '1.1.1.2', // Unidade / Cliente / Colaborador / Membro
          memIdOld: null, // ID system old
          memAudited: false,
          memStatus: true,
          memType:  'Cônjuge',
          memName: "[test] [1] Member 2",
          memDocBirthDate: new Date('09-12-1993'),
          memDocCpf: null,
          memDocRg: "1341234",

          memPcD: false,

          memObservations: "Observações",

          memCreated: new Date(),
          memUpdated: new Date(),
          memDeleted: null,
        },
        {
          comId: 1,
          cliId: 1,
          empId: 1,

          conStatus: false,
          conId: null,
          
          memId: '1.1.1.3', // Unidade / Cliente / Colaborador / Membro
          memIdOld: null, // ID system old
          memAudited: true,
          memStatus: false,
          memType:  'Filho(a)',
          memName: "[test] [1] Member 3",
          memDocBirthDate: new Date('09-12-1993'),
          memDocCpf: null,
          memDocRg: "65352",

          memPcD: true,

          memObservations: "PcD",

          memCreated: new Date(),
          memUpdated: new Date(),
          memDeleted: null,
        },
        {
          comId: 1,
          cliId: 2,
          empId: 2,

          conStatus: false,
          conId: null,
          
          memId: '1.2.2.4', // Unidade / Cliente / Colaborador / Membro
          memIdOld: null, // ID system old
          memAudited: false,
          memStatus: true,
          memType:  'Filho(a)',
          memName: "[test] [2] Member 1",
          memDocBirthDate: new Date('09-12-1993'),
          memDocCpf: "00000000012",
          memDocRg: "1234567",

          memPcD: false,

          memObservations: "Observações",

          memCreated: new Date(),
          memUpdated: new Date(),
          memDeleted: null,
        },
        {
          comId: 1,
          cliId: 2,
          empId: 2,

          conStatus: false,
          conId: null,
          
          memId: '1.2.2.5', // Unidade / Cliente / Colaborador / Membro
          memIdOld: null, // ID system old
          memAudited: false,
          memStatus: true,
          memType:  'Filho(a)',
          memName: "[test] [2] Member 2",
          memDocBirthDate: new Date('09-12-1993'),
          memDocCpf: "00000000001",
          memDocRg: "1234567890",

          memPcD: false,

          memObservations: "Observações",

          memCreated: new Date(),
          memUpdated: new Date(),
          memDeleted: null,
        },
        {
          comId: 1,
          cliId: 1,
          empId: 1,

          conStatus: false,
          conId: null,
          
          memId: '1.1.1.6', // Unidade / Cliente / Colaborador / Membro
          memIdOld: null, // ID system old
          memAudited: true,
          memStatus: false,
          memType:  'Filho(a)',
          memName: "[test] [1] Member 4",
          memDocBirthDate: new Date('09-12-1993'),
          memDocCpf: '00000000033',
          memDocRg: "6533252",

          memPcD: true,

          memObservations: "PcD",

          memCreated: new Date(),
          memUpdated: new Date(),
          memDeleted: null,
        },
        {
          comId: 1,
          cliId: 2,
          empId: 2,

          conStatus: false,
          conId: null,
          
          memId: '1.2.2.7', // Unidade / Cliente / Colaborador / Membro
          memIdOld: null, // ID system old
          memAudited: false,
          memStatus: true,
          memType:  'Titular',
          memName: "[test] [2] Member 3",
          memDocBirthDate: new Date('09-12-1993'),
          memDocCpf: "00000000301",
          memDocRg: "234325",

          memPcD: false,

          memObservations: "Observações",

          memCreated: new Date(),
          memUpdated: new Date(),
          memDeleted: null,
        },
      ],
      {}
    );
  },
  down: (queryInterface, DataTypes) => {
    return queryInterface.bulkDelete("CLIENTS_MEMBERS", null, {});
  },
};
