"use strict";

const animals = require("./data/animals.data");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const animalsData = Object.values(animals).map((animal) => ({
      ...animal,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    await queryInterface.bulkInsert("animals", animalsData, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("animals", null, {});
  },
};
