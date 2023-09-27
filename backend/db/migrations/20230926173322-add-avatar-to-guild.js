'use strict';
let options = {};
if(process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}
options.tableName = 'Guilds';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addColumn(options, 'avatarUrl', {
      type: Sequelize.STRING,
      defaultValue: 'https://res.cloudinary.com/dzntryr5a/image/upload/v1695749810/Monster%20Hunter%20Icons/Profile%20Pictures/jive-sgroup-default-portrait-large_idk3mb.png'
    });
    await queryInterface.addColumn(options, 'bannerUrl', {
      type: Sequelize.STRING,
      defaultValue: 'https://res.cloudinary.com/dzntryr5a/image/upload/v1695750068/Monster%20Hunter%20Icons/Profile%20Pictures/MHW-Astera_Artwork_001_ylxulv.webp'
    })

  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */

    await queryInterface.removeColumn(options, 'avatarUrl');
    await queryInterface.removeColumn(options, 'bannerUrl');
  }
};
