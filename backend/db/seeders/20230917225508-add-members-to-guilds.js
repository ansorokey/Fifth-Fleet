'use strict';

let options = {};
if(process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}
options.tableName = 'Guildmembers';


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
   await queryInterface.bulkInsert(options, data);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete(options, {
      [Op.or]: data
    });
  }
};
