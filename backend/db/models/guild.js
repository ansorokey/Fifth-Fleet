'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Guild extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Guild.belongsTo(models.User, { as: 'Host', foreignKey: 'hostId'});
      Guild.belongsTo(models.Greeting, { foreignKey: 'greetingId'});
      Guild.belongsToMany(models.User, { as: 'Members', through: 'GuildMembers', foreignKey: 'guildId', otherKey: 'userId'});
      Guild.hasMany(models.GuildPhoto, { as: 'Photos', foreignKey: 'guildId', otherKey: 'userId'});
      Guild.hasMany(models.GuildMember, {as: 'Membership', foreignKey: 'guildId', otherKey: 'userId'})
    }
  }
  Guild.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [5, 40],
          msg: 'Guild name must be between 5 and 40 characters'
        }
      }
    },
    hostId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      refereces: {
        model: 'Users',
        key: 'id'
      }
    },
    about: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [0, 255],
          msg: 'Max character limit exceeded'
        }
      }
    },
    greetingId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Greetings',
        key: 'id'
      }
    },
    avatarUrl: {
      type: DataTypes.STRING,
      defaultValue: 'https://res.cloudinary.com/dzntryr5a/image/upload/v1695749810/Monster%20Hunter%20Icons/Profile%20Pictures/jive-sgroup-default-portrait-large_idk3mb.png'
    },
    bannerUrl: {
      type: DataTypes.STRING,
      defaultValue: 'https://res.cloudinary.com/dzntryr5a/image/upload/v1695750068/Monster%20Hunter%20Icons/Profile%20Pictures/MHW-Astera_Artwork_001_ylxulv.webp'
    }
  }, {
    sequelize,
    modelName: 'Guild',
  });
  return Guild;
};
