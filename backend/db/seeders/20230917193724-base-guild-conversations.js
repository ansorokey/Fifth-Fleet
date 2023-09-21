'use strict';

let options = {};
if(process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}
options.tableName = 'GuildMessages';

const convo1 = [
  {
    userId: 1,
    guildId: 1,
    content: 'Anyone wanna help me slice some Vaal Hazak tail?'
  },
  {
    userId: 2,
    guildId: 1,
    content: 'yep'
  },
  {
    userId: 3,
    guildId: 1,
    content: 'yep'
  },
  {
    userId: 4,
    guildId: 1,
    content: 'yep'
  }
];
const convo2 = [
  {
    userId: 4,
    guildId: 2,
    content: 'y\'all see the trailer for the new update monster Opp\'Dag?'
  },
  {
    userId: 3,
    guildId: 2,
    content: 'No, I can\'t find it anywhere. Whats Opp\'Dag?'
  },
  {
    userId: 4,
    guildId: 2,
    content: 'Nothing much, what\'s up with you?'
  },
  {
    userId: 3,
    guildId: 2,
    content: 'USER HAS LEFT THE GUILD'
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
    });
    await queryInterface.bulkDelete(options, {
      [Op.or]: convo2
    })
  }
};
