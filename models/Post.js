const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
// adds Post class definition
class Post extends Model {}
// initializes the Post
Post.init(
   {
      // adds the unique id
      id: {
         type: DataTypes.INTEGER,
         allowNull: false,
         primaryKey: true,
         autoIncrement: true,
      },
      // adds the body
      message: {
         type: DataTypes.STRING,
         allowNull: false,
         defaultValue: '',
      },
      // adds the date
<<<<<<< HEAD
      date: {
         type: DataTypes.STRING,
         allowNull: false,
=======
      time: {
         type: DataTypes.STRING,
         allowNull: false,
         defaultValue: '',
>>>>>>> main
      },
      // adds the title of the post
      title: {
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
   },
   {
      sequelize,
      underscored: true,
      modelName: 'post',
      freezeTableName: true,
   }
);

module.exports = Post;
