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
      time: new Date().toLocaleString(),
      message:
         'Superman, the very first super hero, is in a battle like never before, as he confronts his evil twin from a parallel universe. This doppelgänger has the same incredible powers, but uses them to accomplish sinister goals. With the fate of their respective worlds hanging in the balance, Superman must tap into his inner strength and outsmart his malevolent counterpart to restore peace and protect his beloved Earth.',
      title: 'SuperMan vs. Superman',
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
   process.exit(0);
};

seedDatabase();
