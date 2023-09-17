'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class LobbyGreeting extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  LobbyGreeting.init({
    category: {
      type: DataTypes.ENUM,
      values: ['Quests and Expeditions', 'Locale', 'Weapons and Armor', 'Rank', 'Play Style']
    },
    message: {
      type: DataTypes.STRING
    }
  }, {
    sequelize,
    modelName: 'LobbyGreeting',
    defaultScope: {
      attributes: {
        exclude: ['updatedAt', 'createdAt']
      }
    }
  });
  return LobbyGreeting;
};
