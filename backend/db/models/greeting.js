'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Greeting extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Greeting.init({
    category: {
      type: DataTypes.ENUM('Quests and Expeditions', 'Locale', 'Weapons and Armor', 'Rank', 'Playstyle'),
    },
    message: {
      type: DataTypes.STRING
    }
  }, {
    sequelize,
    modelName: 'Greeting',
    defaultScope: {
      attributes: {
        exclude: ['updatedAt', 'createdAt']
      }
    }
  });
  return Greeting;
};
