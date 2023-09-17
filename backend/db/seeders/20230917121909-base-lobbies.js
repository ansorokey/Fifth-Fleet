'use strict';

const data = [
  {
    hostId: '1',
    messageId: '1',
    questTypeId: '1',
    rankPreference: 'low',
    targetMonsterId: '1'
  },
  {
    hostId: '2',
    messageId: '2',
    questTypeId: '2',
    rankPreference: 'high',
    targetMonsterId: '2'
  },
  {
    hostId: '3',
    messageId: '3',
    questTypeId: '3',
    rankPreference: 'master',
    targetMonsterId: '3'
  },
  // {
  //   hostId: '1',
  // }
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
   await queryInterface.bulkInsert('Lobbies', data);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('lobbies', {
      [Op.or]: data
    })
  }
};
