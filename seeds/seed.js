const sequelize = require('../config/connection');
const { User, Post, Comment } = require('../models');
// adds a guest user
const userData = [
   {
      name: 'Guest',
      email: 'guest@example.com',
      password: '00000000',
   },
];
// adds a sample post
const postData = [
   {
      date: new Date().toLocaleString(),
      body: 'Hello World!',
      title: 'First Message',
      user_id: 1,
   },
];
// method for seeding the database
const seedDatabase = async () => {
   await sequelize.sync({ force: true });
   await User.bulkCreate(userData, {
      individualHooks: true,
      returning: true,
   });
   await Post.bulkCreate(postData, {
      returning: true,
   });
   await Comment.bulkCreate(commentData, {
      returning: true,
   });
   process.exit(0);
};

seedDatabase();
