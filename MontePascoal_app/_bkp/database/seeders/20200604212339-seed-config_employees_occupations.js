'use strict';

module.exports = {
  up: (queryInterface, DataTypes) => {
    return queryInterface.bulkInsert("CONFIG_EMPLOYEES_OCCUPATIONS",
      [
        {
          occStatus: true,
          depId: 1,
          occName: "Desenvolvimento de Sistemas",
          occDescription: "Desenvolvimento e manutenção do sistema",
          occCreated: new Date(),
          occUpdated: new Date(),
          occDeleted: null,
        },
        {
          occStatus: true,
          depId: 1,
          occName: "Manutenção de Computadores",
          occDescription: "Manutenção de componentes relacionados a informática",
          occCreated: new Date(),
          occUpdated: new Date(),
          occDeleted: null,
        },
        {
          occStatus: true,
          depId: 2,
          occName: "Vendedor Efetivo",
          occDescription: "Vendedor Efetivo",
          occCreated: new Date(),
          occUpdated: new Date(),
          occDeleted: null,
        },
        {
          occStatus: true,
          depId: 2,
          occName: "Vendedor Freelancer",
          occDescription: "Vendedor Freelancer",
          occCreated: new Date(),
          occUpdated: new Date(),
          occDeleted: null,
        },
        {
          occStatus: true,
          depId: 3,
          occName: "Gerente Geral",
          occDescription: "Gerente geral",
          occCreated: new Date(),
          occUpdated: new Date(),
          occDeleted: null,
        },
        {
          occStatus: true,
          depId: 4,
          occName: "Caixa",
          occDescription: "Operador de caixa",
          occCreated: new Date(),
          occUpdated: new Date(),
          occDeleted: null,
        },
      ],
      {}
    );
  },
  down: (queryInterface, DataTypes) => {
    return queryInterface.bulkDelete("CONFIG_EMPLOYEES_OCCUPATIONS", null, {});
  },
};
