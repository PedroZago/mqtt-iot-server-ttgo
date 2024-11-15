"use strict";

const notifications = require("./data/notifications.data");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const notificationsData = Object.values(notifications).map(
      (notification) => ({
        ...notification,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
    );

    await queryInterface.bulkInsert("notifications", notificationsData, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("notifications", null, {});
  },
};
