'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class GuildMember extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  GuildMember.init({
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
    status: {
      allowNull: false,
      type: DataTypes.ENUM,
      values: ['pending', 'member', 'owner'],
      defaultValue: 'pending'
    },
  }, {
    sequelize,
    modelName: 'GuildMember',
  });
  return GuildMember;
};
