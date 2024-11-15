"use strict";

const telemetries = require("./data/telemetries.data");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const telemetriesData = Object.values(telemetries).map((telemetry) => ({
      ...telemetry,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    await queryInterface.bulkInsert("telemetries", telemetriesData, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("telemetries", null, {});
  },
};
