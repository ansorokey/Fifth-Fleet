'use strict';

const { User } = require('../models');
const bcrypt = require('bcryptjs');

let options = {};
if(process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}
options.tableName = 'Users';

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
   await User.bulkCreate([
    {
      username: 'aiden',
      email: 'aiden@email.com',
      hashedPassword: bcrypt.hashSync('password')
    }
   ], {validate: true});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    const Op = Sequelize.Op;
    return await queryInterface.bulkDelete(options, {
      username: {
        [Op.in]: ['aiden']
      }
    }, {});
  }
};
