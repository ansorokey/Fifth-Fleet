'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class LobbyMember extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  LobbyMember.init({
    memberId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    lobbyId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Lobbies',
        key: 'id'
      }
    }
  }, {
    sequelize,
    modelName: 'LobbyMember',
  });
  return LobbyMember;
};
