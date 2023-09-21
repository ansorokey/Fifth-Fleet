'use strict';

let options = {};
if(process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}
options.tableName = 'QuestTypes';

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
   await queryInterface.bulkInsert(options, [
    { type:'Assignment' },
    { type:'Event' },
    { type:'Optional' },
    { type:'Investigation' },
    { type:'Special Assignment' },
    { type:'Arena' }
   ])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete(options);
  }
};
