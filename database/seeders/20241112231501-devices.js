"use strict";

const devices = require("./data/devices.data");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const devicesData = Object.values(devices).map((device) => ({
      ...device,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    await queryInterface.bulkInsert("devices", devicesData, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("devices", null, {});
  },
};
