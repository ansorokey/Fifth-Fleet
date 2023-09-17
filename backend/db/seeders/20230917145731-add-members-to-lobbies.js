'use strict';

const data = [
  {
    lobbyId: 1,
    userId: 1
  },
  {
    lobbyId: 1,
    userId: 2
  },
  {
    lobbyId: 1,
    userId: 3
  },
  {
    lobbyId: 1,
    userId: 4
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
   await queryInterface.bulkInsert('LobbyMembers', data);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete('LobbyMembers', {
      [Op.or]: data
    })
  }
};
