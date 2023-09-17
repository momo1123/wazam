// imports user and post modules
const Post = require('./Post');
const User = require('./User');
const Comment = require('./Comment');
// defines one-to-many
User.hasMany(Post, {
   foreignKey: 'user_id',
});
// defines many-to-one
Post.belongsTo(User, {
   foreignKey: 'user_id',
});

Post.hasMany(Comment, {
   foreignKey: 'post_id',
});

Comment.belongsTo(Post, {
   foreignKey: 'post_id',
});

module.exports = { User, Post, Comment };
