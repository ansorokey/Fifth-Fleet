'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class LobbyMessage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  LobbyMessage.init({
    senderId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      },
      onDelete: "CASCADE"
    },
    lobbyId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Lobbies',
        key: 'id'
      },
      onDelete: "CASCADE"
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [1,255],
          msg: 'Max character limit exceeded'
        }
      }
    },
  }, {
    sequelize,
    modelName: 'LobbyMessage',
  });
  return LobbyMessage;
};
