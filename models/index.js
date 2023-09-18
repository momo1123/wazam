const Post = require('./Post');
const Users = require('./Users');

Post.hasOne(Users, {
    foreignKey: 'user_id'
});
module.exports = {Users, Post};