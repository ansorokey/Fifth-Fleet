'use strict';
const monsters = require('../../utils/monsters');

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
   await queryInterface.bulkInsert('monsters', monsters);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    const monsterNames = monsters.map(m => m.name);
    const [Op] = Sequelize.Op;
    await queryInterface.bulkDelete('monsters', {
      name: {
        [Op.in]: monsterNames
      }
    });
  }
};
