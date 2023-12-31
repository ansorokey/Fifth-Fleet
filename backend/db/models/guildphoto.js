'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class GuildPhoto extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      GuildPhoto.belongsTo(models.User, {foreignKey: 'userId'});
      GuildPhoto.hasMany(models.Comment, {foreignKey: 'photoId'})
    }
  }
  GuildPhoto.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      },
      onDelete: "CASCADE"
    },
    guildId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Guilds',
        key: 'id'
      },
      onDelete: "CASCADE"
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: false
    },
    caption: {
      type: DataTypes.STRING
    },
  }, {
    sequelize,
    modelName: 'GuildPhoto',
  });
  return GuildPhoto;
};
