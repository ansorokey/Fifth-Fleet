'use strict';

let options = {};
if(process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Lobbies', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      hostId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id'
        },
        onDelete: "CASCADE"
      },
      messageId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Greetings',
          key: 'id'
        }
      },
      questTypeId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'QuestTypes',
          key: 'id'
        }
      },
      rankPreference: {
        type: Sequelize.ENUM,
        values: ['low', 'high', 'master']
      },
      targetMonsterId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Monsters',
          key: 'id'
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    }, options);
  },
  async down(queryInterface, Sequelize) {
    options.tableName = 'Lobbies'
    await queryInterface.dropTable(options);
  }
};
