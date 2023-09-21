'use strict';

let options = {};
if(process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}
options.tableName = 'GuildPhotos';

const data =  [
  {
    userId: 1,
    guildId: 1,
    imageUrl: 'https://steamuserimages-a.akamaihd.net/ugc/793136464417352375/0A7299136CA7975C8A541F2FC8858CB86631BD29/?imw=1024&imh=576&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=true'
  },
  {
    userId: 1,
    guildId: 1,
    imageUrl: 'https://assets.vg247.com/current//2018/07/monster_hunter_world_summer_twilight_festival-7-600x338.jpg'
  },
  {
    userId: 1,
    guildId: 1,
    imageUrl: 'https://pbs.twimg.com/media/DVj54lyU0AAAAX6.jpg'
  }
 ];

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
   await queryInterface.bulkInsert(options, data)
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
    })
  }
};
