'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Lobby extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Lobby.belongsTo(models.User, {as: 'Host', foreignKey: 'hostId'});
      Lobby.belongsTo(models.QuestType, {foreignKey: 'questTypeId'});
      Lobby.belongsTo(models.LobbyGreeting, {foreignKey: 'messageId'});
      Lobby.belongsTo(models.Monster, {foreignKey: 'targetMonsterId'});
      Lobby.belongsToMany(models.User, {
        through: 'LobbyMembers',
      });
    }
  }
  Lobby.init({
    hostId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      }
  },
    messageId: {
      type: DataTypes.INTEGER
    },
    questTypeId: {
      type: DataTypes.INTEGER
    },
    rankPreference: {
      type: DataTypes.ENUM,
      values: ['low', 'high', 'master']
    },
    targetMonsterId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Monsters',
        key: 'id'
      }
    }
  }, {
    sequelize,
    modelName: 'Lobby'
  });
  return Lobby;
};
