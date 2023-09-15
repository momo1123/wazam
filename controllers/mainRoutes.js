// imports express module and user, post
const router = require('express').Router();
const { User, Post } = require('../models');
<<<<<<< HEAD
const sequelize = require('../config/connection');
=======
const withAuth = require('../utils/auth');
>>>>>>> main

// get all posts for homepage
router.get('/', async (req, res) => {
   try {
      const data = await Post.findAll({
<<<<<<< HEAD
         include: [
            {
               model: Post,
               attributes: ['username', 'time-stamp', 'message'],
               include: {
                  model: User,
                  attributes: ['username'],
               },
            },
         ],
=======
         include: {
            model: User,
         },
>>>>>>> main
      });

      const postsFlat = data.map((post) => post.get({ plain: true }));

      if (!req.session.user) {
         res.render('home', {
            posts: postsFlat,
         });
      } else {
         res.render('home', {
            posts: postsFlat,
            user: req.session.user,
         });
      }
   } catch (err) {
      console.log(err);
      res.status(500).json(err);
   }
});

// gets one user
router.get('/users/:id', async (req, res) => {
   try {
      const data = await User.findByPk(req.params.id);

      const user = data.get({ plain: true });

      res.render('user', { user });
   } catch (err) {
      console.log(err);
      res.status(500).json(err);
   }
});

module.exports = router;
