'use strict';
const {
  Model, Validator
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsTo(models.Weapon, { foreignKey: 'favWeaponId'});
      User.belongsToMany(models.Lobby, { through: 'LobbyMembers', foreignKey: 'userId', otherKey: 'lobbyId'});
      User.belongsToMany(models.Guild, { through: 'GuildMembers', foreignKey: 'userId', otherKey: 'guildId'});
    }
  }
  User.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [4, 30],
        isNotEmail(value){
          if(Validator.isEmail(value)){
            throw new Error('Username cannot be an email');
          }
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [3, 256],
        isEmail: true
      }
    },
    hashedPassword: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [60, 60]
      }
    },
    favWeaponId: {
      type: DataTypes.INTEGER,
      references: {
        model: "Weapons",
        key: 'id'
      }
    }
  }, {
    sequelize,
    modelName: 'User',
    defaultScope: {
      attributes: {
        exclude: ['hashedPassword', 'createdAt', 'updatedAt']
      }
    }
  });
  return User;
};
