'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Comment.belongsTo(models.User, {foreignKey: 'userId'})
      Comment.belongsTo(models.GuildPhoto, {foreignKey: 'photoId'})
    }
  }
  Comment.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      },
      onDelete: 'CASCADE'
    },
    photoId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'guildPhoto',
        key: 'id'
      },
      onDelete: 'CASCADE'
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [1,255],
          msg: 'Comment must be between 1 and 255 character in length'
        }
      }
    },
  }, {
    sequelize,
    modelName: 'Comment',
  });
  return Comment;
};
