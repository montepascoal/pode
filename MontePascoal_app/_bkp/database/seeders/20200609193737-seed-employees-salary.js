"use strict";

module.exports = {
  up: (queryInterface, DataTypes) => {
    return queryInterface.bulkInsert(
      "EMPLOYEES_SALARY",
      [
        {
          empId: 1,
          salStatus: true,
          salType: "C",
          salValueCredit: 1000.5, // salValueCredit | salValueDebit
          salObservation: "Salario",
          salCreated: new Date(),
          salUpdated: new Date(),
          salDeleted: null,
        },
        {
          empId: 1,
          salStatus: true,
          salType: "C",
          salValueCredit: 200.25,
          salObservation: "Comissão de Vendas",
          salCreated: new Date(),
          salUpdated: new Date(),
          salDeleted: null,
        },
        {
          empId: 1,
          salStatus: true,
          salType: "D",
          salValueDebit: 125.15,
          salObservation: "Desconto em folha",
          salCreated: new Date(),
          salUpdated: new Date(),
          salDeleted: null,
        },
        {
          empId: 2,
          salStatus: true,
          salType: "C",
          salValueCredit: 2000.3, // salValueCredit | salValueDebit
          salObservation: "Salario",
          salCreated: new Date(),
          salUpdated: new Date(),
          salDeleted: null,
        },
        {
          empId: 2,
          salStatus: true,
          salType: "C",
          salValueCredit: 435,
          salObservation: "Comissão de Vendas",
          salCreated: new Date(),
          salUpdated: new Date(),
          salDeleted: null,
        },
        {
          empId: 2,
          salStatus: true,
          salType: "D",
          salValueDebit: 200.5,
          salObservation: "Desconto em folha",
          salCreated: new Date(),
          salUpdated: new Date(),
          salDeleted: null,
        },
        {
          empId: 3,
          salStatus: true,
          salType: "C",
          salValueCredit: 1000.5, // salValueCredit | salValueDebit
          salObservation: "Salario",
          salCreated: new Date(),
          salUpdated: new Date(),
          salDeleted: null,
        },
        {
          empId: 3,
          salStatus: true,
          salType: "C",
          salValueCredit: 200.25,
          salObservation: "Comissão de Vendas",
          salCreated: new Date(),
          salUpdated: new Date(),
          salDeleted: null,
        },
        {
          empId: 3,
          salStatus: true,
          salType: "D",
          salValueDebit: 125.15,
          salObservation: "Desconto em folha",
          salCreated: new Date(),
          salUpdated: new Date(),
          salDeleted: null,
        },
        {
          empId: 4,
          salStatus: true,
          salType: "C",
          salValueCredit: 2000.3, // salValueCredit | salValueDebit
          salObservation: "Salario",
          salCreated: new Date(),
          salUpdated: new Date(),
          salDeleted: null,
        },
        {
          empId: 4,
          salStatus: true,
          salType: "C",
          salValueCredit: 435,
          salObservation: "Comissão de Vendas",
          salCreated: new Date(),
          salUpdated: new Date(),
          salDeleted: null,
        },
        {
          empId: 4,
          salStatus: true,
          salType: "D",
          salValueDebit: 200.5,
          salObservation: "Desconto em folha",
          salCreated: new Date(),
          salUpdated: new Date(),
          salDeleted: null,
        },
      ],
      {}
    );
  },
  down: (queryInterface, DataTypes) => {
    return queryInterface.bulkDelete("EMPLOYEES_SALARY", null, {});
  },
};
