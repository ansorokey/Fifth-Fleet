'use strict';

let options = {};
if(process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}
options.tableName = 'GuildMembers';


const data = [
  // on second thought, hosts don't need a membership status right now
  // {
  //   userId: 1,
  //   guildId: 1,
  //   status: 'owner'
  // },
  {
    userId: 2,
    guildId: 1,
    status: 'pending'
  },
  {
    userId: 3,
    guildId: 1,
    status: 'pending'
  },
  {
    userId: 1,
    guildId: 2,
    status: 'pending'
  },
  // {
  //   userId: 2,
  //   guildId: 2,
  //   status: 'owner'
  // },
  {
    userId: 3,
    guildId: 2,
    status: 'pending'
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
