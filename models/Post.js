const { Model, DataTypes } = require('sequelize');

class Post extends Model {}
Post.init({
    post_id:{
        type: DataTypes.INTERGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    message:{
        type: DataTypes.STRING,
    },
    user_id:{
        type: DataTypes.INTERGER,
        references: {
            model: 'Users',
            key: 'id',
        },
    },
});

module.exports = Post;
