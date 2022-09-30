'use strict';

module.exports = {
  up: (queryInterface, DataTypes) => {
    return queryInterface.bulkInsert("CONFIG_PARTNERS_SERVICES",
      [
        {
          serStatus: true,
          serName: "Drogaria",
          serDescription: "Empresa destinada a venda de artigos de farmácia",
          serCreated: new Date(),
          serUpdated: new Date(),
          serDeleted: null,
        },
        {
          serStatus: true,
          serName: "Supermercado",
          serDescription: "Supermercados em geral",
          serCreated: new Date(),
          serUpdated: new Date(),
          serDeleted: null,
        },
        {
          serStatus: true,
          serName: "Papelaria",
          serDescription: "Empresa destinada a venda de produtos de papelária",
          serCreated: new Date(),
          serUpdated: new Date(),
          serDeleted: null,
        },
        {
          serStatus: true,
          serName: "Clínicas",
          serDescription: "Clinicas de saúde em geral",
          serCreated: new Date(),
          serUpdated: new Date(),
          serDeleted: null,
        },
      ],
      {}
    );
  },
  down: (queryInterface, DataTypes) => {
    return queryInterface.bulkDelete("CONFIG_PARTNERS_SERVICES", null, {});
  },
};
