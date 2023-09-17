const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
// adds Comment class definition
class Comment extends Model {}
// initializes the Comment
Comment.init(
   {
      // adds the unique id
      id: {
         type: DataTypes.INTEGER,
         allowNull: false,
         primaryKey: true,
         autoIncrement: true,
      },
      // adds the text of the comment
      message: {
         type: DataTypes.STRING,
         allowNull: false,
      },
      // adds a reference to the user
      user_id: {
         type: DataTypes.INTEGER,
         references: {
            model: 'user',
            key: 'id',
         },
      },
      // adds a reference to the post
      post_id: {
         type: DataTypes.INTEGER,
         references: {
            model: 'post',
            key: 'id',
         },
      },
   },
   {
      sequelize,
      underscored: true,
      modelName: 'comment',
      freezeTableName: true,
   },
);

module.exports = Comment;
