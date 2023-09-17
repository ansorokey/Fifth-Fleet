'use strict';

const { query } = require('express');

const data = [
  {
    userId: 1,
    guildId: 1
  },
  {
    userId: 2,
    guildId: 1
  },
  {
    userId: 3,
    guildId: 1
  },
  {
    userId: 1,
    guildId: 2
  },
  {
    userId: 2,
    guildId: 2
  },
  {
    userId: 3,
    guildId: 2
  },
]

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   await queryInterface.bulkInsert('Guildmembers', data);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete('Guildmembers', {
      [Op.or]: data
    });
  }
};
