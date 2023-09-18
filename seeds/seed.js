const sequelize = require('../config/connection');
const { User, Post, Comment } = require('../models');
// adds a guest user
const userData = [
   {
      name: 'Guest',
      email: 'guest@example.com',
      password: '00000000',
   },
   {
      name: 'SpongeBob',
      email: 'sponge@bob.com',
      password: 'BikiniBottom',
   },
];
// adds a sample post
const postData = [
   {
      time: new Date().toLocaleDateString('en-US', {
         year: 'numeric',
         month: 'long',
         day: 'numeric',
      }),
      message:
         'Superman, the very first super hero, is in a battle like never before, as he confronts his evil twin from a parallel universe. This doppelgänger has the same incredible powers, but uses them to accomplish sinister goals. With the fate of their respective worlds hanging in the balance, Superman must tap into his inner strength and outsmart his malevolent counterpart to restore peace and protect his beloved Earth.',
      title: 'SuperMan vs. SuperMan',
      user_id: 1,
   },
   {
      time: new Date().toLocaleDateString('en-US', {
         year: 'numeric',
         month: 'long',
         day: 'numeric',
      }),
      message:
         'Superman is my favorite superhero. He can leap super high, fly, and has to fight the most despicable villains in the DC universe',
      title: 'SuperMan Rocks!',
      user_id: 2,
   },
   {
      time: new Date().toLocaleDateString('en-US', {
         year: 'numeric',
         month: 'long',
         day: 'numeric',
      }),
      message:
         'Superman is cool and all but Batman is definitely better because he doesnt rely on OP powers. Instead, he uses his superior intellect and gadgets to overpower his adversaries.',
      title: 'BatMan vs SuperMan',
      user_id: 2,
   },
   {
      time: new Date().toLocaleDateString('en-US', {
         year: 'numeric',
         month: 'long',
         day: 'numeric',
      }),
      message:
         'Why do people hate Green Lantern...like I get it, the 2011 movie with Ryan Reynolds was bad, but that doesnt mean you should hate everything Green Lantern.',
      title: 'Green Lantern is Great!',
      user_id: 2,
   },
   {
      time: new Date().toLocaleDateString('en-US', {
         year: 'numeric',
         month: 'long',
         day: 'numeric',
      }),
      message:
         'The Joker is the evilest villain to exist, he does not have an agenda like most villains he exists to create pure chaos and watch everything burn.',
      title: 'The Joker is Scary',
      user_id: 2,
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
