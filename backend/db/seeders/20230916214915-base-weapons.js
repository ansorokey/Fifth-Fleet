'use strict';
const { Weapon } = require('../models');

let options = {};
if(process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

const data = [
  {
    name: 'Great Sword',
    iconUrl: 'https://monsterhunterworld.wiki.fextralife.com/file/Monster-Hunter-World/rare-1-greatsword-mhw_tree.png'
  },
  {
    name: 'Sword & Shield',
    iconUrl: 'https://monsterhunterworld.wiki.fextralife.com/file/Monster-Hunter-World/rare-1-sword-shield-mhw_tree.png'
  },
  {
    name: 'Dual Blades',
    iconUrl: 'https://monsterhunterworld.wiki.fextralife.com/file/Monster-Hunter-World/rare-1-dual-blades-mhw_tree.png'
  },
  {
    name: 'Long Sword',
    iconUrl: 'https://monsterhunterworld.wiki.fextralife.com/file/Monster-Hunter-World/rare-1-longsword-mhw_tree.png'
  },
  {
    name: 'Hammer',
    iconUrl: 'https://monsterhunterworld.wiki.fextralife.com/file/Monster-Hunter-World/rare-1-hammer-mhw_tree.png'
  },
  {
    name: 'Hunting Horn',
    iconUrl: 'https://monsterhunterworld.wiki.fextralife.com/file/Monster-Hunter-World/rare-1-hunting-horn-mhw_tree.png'
  },
  {
    name: 'Lance',
    iconUrl: 'https://monsterhunterworld.wiki.fextralife.com/file/Monster-Hunter-World/rare-1-lance-mhw_tree.png'
  },
  {
    name: 'Gunlance',
    iconUrl: 'https://monsterhunterworld.wiki.fextralife.com/file/Monster-Hunter-World/rare-1-gunlance-mhw_tree.png'
  },
  {
    name: 'Switch Axe',
    iconUrl: 'https://monsterhunterworld.wiki.fextralife.com/file/Monster-Hunter-World/rare-1-switch-axe-mhw_tree.png'
  },
  {
    name: 'Charge Blade',
    iconUrl: 'https://monsterhunterworld.wiki.fextralife.com/file/Monster-Hunter-World/rare-1-charge-blade-mhw_tree.png'
  },
  {
    name: 'Insect Glaive',
    iconUrl: 'https://monsterhunterworld.wiki.fextralife.com/file/Monster-Hunter-World/rare-1-insect-glaive-mhw_tree_tree.png'
  },
  {
    name: 'Bow',
    iconUrl: 'https://monsterhunterworld.wiki.fextralife.com/file/Monster-Hunter-World/rare-1-bow-mhw_tree.png'
  },
  {
    name: 'Light Bowgun',
    iconUrl: 'https://monsterhunterworld.wiki.fextralife.com/file/Monster-Hunter-World/rare-1-light-bowgun-mhw_tree.png'
  },
  {
    name: 'Heavy Bowgun',
    iconUrl: 'https://monsterhunterworld.wiki.fextralife.com/file/Monster-Hunter-World/rare-1-heavy-bowgun-mhw_tree.png'
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
   await Weapon.bulkCreate(data);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    options.tableName = 'Weapons'
    await queryInterface.bulkDelete(options);
  }
};
