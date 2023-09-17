'use strict';

const { User } = require('../models');

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
    const allUsers = await User.findAll();
    for(let i = 0; i <= allUsers.length; i++) {
      if(allUsers[i]) {
        console.log(allUsers[i]);
        allUsers[i].favWeaponId = i + 1;
        await allUsers[i].save();
      }
    }
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    const allUsers = await User.findAll();
    for(let i = 0; i < allUsers.length; i++) {
      allUsers[i].favWeaponId = null;
      await allUsers[i].save();
    }
  }
};
