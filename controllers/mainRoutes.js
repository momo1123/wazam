// imports express module and user, post
const router = require('express').Router();
const { User, Post } = require('../models');
const withAuth = require('../utils/auth');

// get the root page
router.get('/', (req, res) => {
   res.render('start');
});

// get all posts for homepage
router.get('/home', async (req, res) => {
   try {
      const data = await Post.findAll({
         include: {
            model: User,
         },
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

router.get('/loginPage', (req, res) => {
   // If the user is already logged in, redirect the request to another route
   if (req.session.logged_in) {
     res.redirect('/home');
     return;
   }
 
   res.render('login');
 });

module.exports = router;
