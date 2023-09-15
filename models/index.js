// imports user and post modules
const Post = require('./Post');
const User = require('./User');
// defines one-to-many
User.hasMany(Post, {
   foreignKey: 'user_id',
});
// defines many-to-one
Post.belongsTo(User, {
   foreignKey: 'user_id',
});

module.exports = { User, Post };
