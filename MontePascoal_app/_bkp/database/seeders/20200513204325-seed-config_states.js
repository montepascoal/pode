"use strict";

module.exports = {
  up: (queryInterface, DataTypes) => {
    return queryInterface.bulkInsert(
      "CONFIG_STATES",
      [
        {
          staName: "Acre",
          staInitials: "AC",
          staIbge: 12,
          couId: 1,
          staDDD: [68],
          staCreated: new Date(),
          staUpdated: new Date(),
          staDeleted: null,
        },
        {
          staName: "Alagoas",
          staInitials: "AL",
          staIbge: 27,
          couId: 1,
          staDDD: [82],
          staCreated: new Date(),
          staUpdated: new Date(),
          staDeleted: null,
        },
        {
          staName: "Amazonas",
          staInitials: "AM",
          staIbge: 13,
          couId: 1,
          staDDD: [97, 92],
          staCreated: new Date(),
          staUpdated: new Date(),
          staDeleted: null,
        },
        {
          staName: "Amapá",
          staInitials: "AP",
          staIbge: 16,
          couId: 1,
          staDDD: [96],
          staCreated: new Date(),
          staUpdated: new Date(),
          staDeleted: null,
        },
        {
          staName: "Bahia",
          staInitials: "BA",
          staIbge: 29,
          couId: 1,
          staDDD: [77, 75, 73, 74, 71],
          staCreated: new Date(),
          staUpdated: new Date(),
          staDeleted: null,
        },
        {
          staName: "Ceará",
          staInitials: "CE",
          staIbge: 23,
          couId: 1,
          staDDD: [88, 85],
          staCreated: new Date(),
          staUpdated: new Date(),
          staDeleted: null,
        },
        {
          staName: "Distrito Federal",
          staInitials: "DF",
          staIbge: 53,
          couId: 1,
          staDDD: [61],
          staCreated: new Date(),
          staUpdated: new Date(),
          staDeleted: null,
        },
        {
          staName: "Espírito Santo",
          staInitials: "ES",
          staIbge: 32,
          couId: 1,
          staDDD: [28, 27],
          staCreated: new Date(),
          staUpdated: new Date(),
          staDeleted: null,
        },
        {
          staName: "Goiás",
          staInitials: "GO",
          staIbge: 52,
          couId: 1,
          staDDD: [62, 64, 61],
          staCreated: new Date(),
          staUpdated: new Date(),
          staDeleted: null,
        },
        {
          staName: "Maranhão",
          staInitials: "MA",
          staIbge: 21,
          couId: 1,
          staDDD: [99, 98],
          staCreated: new Date(),
          staUpdated: new Date(),
          staDeleted: null,
        },
        {
          staName: "Minas Gerais",
          staInitials: "MG",
          staIbge: 31,
          couId: 1,
          staDDD: [34, 37, 31, 33, 35, 38, 32],
          staCreated: new Date(),
          staUpdated: new Date(),
          staDeleted: null,
        },
        {
          staName: "Mato Grosso do Sul",
          staInitials: "MS",
          staIbge: 50,
          couId: 1,
          staDDD: [67],
          staCreated: new Date(),
          staUpdated: new Date(),
          staDeleted: null,
        },
        {
          staName: "Mato Grosso",
          staInitials: "MT",
          staIbge: 51,
          couId: 1,
          staDDD: [65, 66],
          staCreated: new Date(),
          staUpdated: new Date(),
          staDeleted: null,
        },
        {
          staName: "Pará",
          staInitials: "PA",
          staIbge: 15,
          couId: 1,
          staDDD: [91, 94, 93],
          staCreated: new Date(),
          staUpdated: new Date(),
          staDeleted: null,
        },
        {
          staName: "Paraíba",
          staInitials: "PB",
          staIbge: 25,
          couId: 1,
          staDDD: [83],
          staCreated: new Date(),
          staUpdated: new Date(),
          staDeleted: null,
        },
        {
          staName: "Pernambuco",
          staInitials: "PE",
          staIbge: 26,
          couId: 1,
          staDDD: [81, 87],
          staCreated: new Date(),
          staUpdated: new Date(),
          staDeleted: null,
        },
        {
          staName: "Piauí",
          staInitials: "PI",
          staIbge: 22,
          couId: 1,
          staDDD: [89, 86],
          staCreated: new Date(),
          staUpdated: new Date(),
          staDeleted: null,
        },
        {
          staName: "Paraná",
          staInitials: "PR",
          staIbge: 41,
          couId: 1,
          staDDD: [43, 41, 42, 44, 45, 46],
          staCreated: new Date(),
          staUpdated: new Date(),
          staDeleted: null,
        },
        {
          staName: "Rio de Janeiro",
          staInitials: "RJ",
          staIbge: 33,
          couId: 1,
          staDDD: [24, 22, 21],
          staCreated: new Date(),
          staUpdated: new Date(),
          staDeleted: null,
        },
        {
          staName: "Rio Grande do Norte",
          staInitials: "RN",
          staIbge: 24,
          couId: 1,
          staDDD: [84],
          staCreated: new Date(),
          staUpdated: new Date(),
          staDeleted: null,
        },
        {
          staName: "Rondônia",
          staInitials: "RO",
          staIbge: 11,
          couId: 1,
          staDDD: [69],
          staCreated: new Date(),
          staUpdated: new Date(),
          staDeleted: null,
        },
        {
          staName: "Roraima",
          staInitials: "RR",
          staIbge: 14,
          couId: 1,
          staDDD: [95],
          staCreated: new Date(),
          staUpdated: new Date(),
          staDeleted: null,
        },
        {
          staName: "Rio Grande do Sul",
          staInitials: "RS",
          staIbge: 43,
          couId: 1,
          staDDD: [53, 54, 55, 51],
          staCreated: new Date(),
          staUpdated: new Date(),
          staDeleted: null,
        },
        {
          staName: "Santa Catarina",
          staInitials: "SC",
          staIbge: 42,
          couId: 1,
          staDDD: [47, 48, 49],
          staCreated: new Date(),
          staUpdated: new Date(),
          staDeleted: null,
        },
        {
          staName: "Sergipe",
          staInitials: "SE",
          staIbge: 28,
          couId: 1,
          staDDD: [79],
          staCreated: new Date(),
          staUpdated: new Date(),
          staDeleted: null,
        },
        {
          staName: "São Paulo",
          staInitials: "SP",
          staIbge: 35,
          couId: 1,
          staDDD: [11, 12, 13, 14, 15, 16, 17, 18, 19],
          staCreated: new Date(),
          staUpdated: new Date(),
          staDeleted: null,
        },
        {
          staName: "Tocantins",
          staInitials: "TO",
          staIbge: 17,
          couId: 1,
          staDDD: [63],
          staCreated: new Date(),
          staUpdated: new Date(),
          staDeleted: null,
        },
      ],
      {}
    );
  },

  down: (queryInterface, DataTypes) => {
    return queryInterface.bulkDelete("CONFIG_STATES", null, {});
  },
};
