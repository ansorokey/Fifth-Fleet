'use strict';

let options = {};
if(process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}
options.tableName = 'Lobbies';

const data = [
  {
    hostId: 1,
    messageId: 1,
    questTypeId: 1,
    rankPreference: 'low',
    targetMonsterId: 1,
    sessionCode: 'ABCDEFGH1234'
  },
  {
    hostId: 2,
    messageId: 2,
    questTypeId: 2,
    rankPreference: 'high',
    targetMonsterId: 2,
    sessionCode: 'ZYXWVUQP9021'
  },
  {
    hostId: 3,
    messageId: 3,
    questTypeId: 3,
    rankPreference: 'master',
    targetMonsterId: 3,
    sessionCode: 'uaif234LkmdD'
  }
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
