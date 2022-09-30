'use strict';

module.exports = {
  up: (queryInterface, DataTypes) => {
    return queryInterface.bulkInsert("CONFIG_PROVIDERS_SERVICES",
      [
        {
          serStatus: true,
          serName: "Informática",
          serDescription: "Serviços / Produtos relacionados a informática",
          serCreated: new Date(),
          serUpdated: new Date(),
          serDeleted: null,
        },
        {
          serStatus: true,
          serName: "Gráfica",
          serDescription: "Serviços / Produtos relacionados a impressões",
          serCreated: new Date(),
          serUpdated: new Date(),
          serDeleted: null,
        },
        {
          serStatus: true,
          serName: "Papelaria",
          serDescription: "Serviços / Produtos relacionados a artigos de papelarias",
          serCreated: new Date(),
          serUpdated: new Date(),
          serDeleted: null,
        },
        {
          serStatus: true,
          serName: "Limpeza",
          serDescription: "Serviços / Produtos relacionados a limpeza",
          serCreated: new Date(),
          serUpdated: new Date(),
          serDeleted: null,
        },
      ],
      {}
    );
  },
  down: (queryInterface, DataTypes) => {
    return queryInterface.bulkDelete("CONFIG_PROVIDERS_SERVICES", null, {});
  },
};
