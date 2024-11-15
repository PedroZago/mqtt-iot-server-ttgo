"use strict";

const breeds = require("./data/breeds.data");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const breedsData = Object.values(breeds).map((breed) => ({
      ...breed,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    await queryInterface.bulkInsert("breeds", breedsData, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("breeds", null, {});
  },
};
