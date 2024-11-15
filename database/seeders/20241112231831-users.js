"use strict";

const bcrypt = require("bcrypt");
const users = require("./data/users.data");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const saltRounds = 10;

    const usersData = await Promise.all(
      Object.values(users).map(async (user) => ({
        ...user,
        password: await bcrypt.hash(user.password, saltRounds),
        createdAt: new Date(),
        updatedAt: new Date(),
      }))
    );

    await queryInterface.bulkInsert("users", usersData, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("users", null, {});
  },
};
