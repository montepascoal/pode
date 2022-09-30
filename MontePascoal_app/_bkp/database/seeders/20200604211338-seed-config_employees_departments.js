'use strict';

module.exports = {
  up: (queryInterface, DataTypes) => {
    return queryInterface.bulkInsert("CONFIG_EMPLOYEES_DEPARTMENTS",
      [
        {
          depStatus: true,
          depName: "TI - Tecnologia da Informação",
          depDescription: "Departamento encarregado de serviços relacionados a TI",
          depCreated: new Date(),
          depUpdated: new Date(),
          depDeleted: null,
        },
        {
          depStatus: true,
          depName: "Comercial",
          depDescription: "Departamento encarregado de assuntos comerciais",
          depCreated: new Date(),
          depUpdated: new Date(),
          depDeleted: null,
        },
        {
          depStatus: true,
          depName: "Administração",
          depDescription: "Departamento encarregado de serviços relacionados a administração",
          depCreated: new Date(),
          depUpdated: new Date(),
          depDeleted: null,
        },
        {
          depStatus: true,
          depName: "Financeiro",
          depDescription: "Departamento encarregado de serviços relacionados ao financeiro",
          depCreated: new Date(),
          depUpdated: new Date(),
          depDeleted: null,
        },
      ],
      {}
    );
  },
  down: (queryInterface, DataTypes) => {
    return queryInterface.bulkDelete("CONFIG_EMPLOYEES_DEPARTMENTS", null, {});
  },
};
