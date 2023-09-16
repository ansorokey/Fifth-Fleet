'use strict';

const { User } = require('../models');
const bcrypt = require('bcryptjs');

// Append the database schema to tablename in production
let options = {};
if(process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

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

    await queryInterface.bulkInsert('Users', [
      {
        username: 'demouser',
        email: 'demo@email.com',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        username: 'the_handler',
        email: 'handler@email.com',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        username: 'the_admiral',
        email: 'admiral@email.com',
        hashedPassword: bcrypt.hashSync('password')
      }
    ], {validate: true})
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    options.tableName = 'Users';
    const Op = Sequelize.Op;
    return await queryInterface.bulkDelete('Users', {
      username: {
        [Op.in]: ['demouser', 'the_handler', 'the_admiral']
      }
    }, {});
  }
};
