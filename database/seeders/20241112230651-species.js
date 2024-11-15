"use strict";

const species = require("./data/species.data");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const speciesData = Object.values(species).map((specie) => ({
      ...specie,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    await queryInterface.bulkInsert("species", speciesData, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("species", null, {});
  },
};
