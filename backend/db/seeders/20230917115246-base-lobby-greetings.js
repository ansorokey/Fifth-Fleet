'use strict';

const greetings = require('../../utils/greetings');

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
    await queryInterface.bulkInsert('greetings', greetings);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    const delMessages = greetings.map(g => g.message);

    const Op = Sequelize.Op;
    await queryInterface.bulkDelete('greetings', {
      message: {
        [Op.in]: delMessages
      }
    });
  }
};
