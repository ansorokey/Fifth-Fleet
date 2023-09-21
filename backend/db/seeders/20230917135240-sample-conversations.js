'use strict';

let options = {};
if(process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}
options.tableName = 'LobbyMessages';

const convo1 = [
  {
    senderId: 2,
    lobbyId: 1,
    content: 'Hey'
  },
  {
    senderId: 3,
    lobbyId: 1,
    content: 'What\'s up?'
  },
  {
    senderId: 2,
    lobbyId: 1,
    content: 'r u free 2 hunt tobi?'
  },
  {
    senderId: 3,
    lobbyId: 1,
    content: 'Yep! Hopping on right now!'
  },
  {
    senderId: 2,
    lobbyId: 1,
    content: 'sweet'
  }
]

const convo2 = [
  {
    senderId: 1,
    lobbyId: 2,
    content: 'DUDE'
  },
  {
    senderId: 1,
    lobbyId: 2,
    content: 'DID YOU SEE?'
  },
  {
    senderId: 1,
    lobbyId: 2,
    content: 'MONSTER HUNTER NOW IS OUT'
  },
  {
    senderId: 1,
    lobbyId: 2,
    content: 'I JUST HIT RANK 3 MONSTERS'
  },
  {
    senderId: 2,
    lobbyId: 2,
    content: 'Does it have all the weapons?'
  },
  {
    senderId: 1,
    lobbyId: 2,
    content: 'Sadly, no dual blades...'
  },
  {
    senderId: 2,
    lobbyId: 2,
    content: 'Garbage'
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
   await queryInterface.bulkInsert(options, convo1);
   await queryInterface.bulkInsert(options, convo2);

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
      [Op.or]: convo1
    })
  }
};
