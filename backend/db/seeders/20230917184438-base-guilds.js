'use strict';

const data = [
  {
    name: 'BONKERS',
    hostId: '1',
    about: 'Inspired by the actions of our ancestors, we bel;ieve that all problems in life should be solved by smackng it with the biggest stick one can get their strong, neanderthal hands on',
    greetingId: '10'
  },
  {
    name: 'Katana Clan',
    hostId: '2',
    about: 'The way of the blade is the only way. Slice and dice. Embrace your inner samurai, gaijin-san',
    greetingId: '15'
  },
  {
    name: 'Just testing, no about',
    hostId: '3'
  }
];

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
   await queryInterface.bulkInsert('Guilds', data);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete('Guilds', {
      [Op.or]: data
    })
  }
};
