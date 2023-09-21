'use strict';
const monsters = require('../../utils/monsters');

let options = {};
if(process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}
options.tableName = 'Monsters';

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
   await queryInterface.bulkInsert(options, monsters);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    // const monsterNames = monsters.map(m => m.name);
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete(options, {
      [Op.or]: monsters
    });
  }
};
