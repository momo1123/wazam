// imports express module and user, post
const router = require('express').Router();
const { User, Post, Comment } = require('../models');
const withAuth = require('../utils/auth');

// get the root page
router.get('/', (req, res) => {
   res.render('start');
});

// get all posts for homepage
router.get('/home', async (req, res) => {
   console.log('session', req.session);
   try {
      //  user_id: 1,

      const data = await Post.findAll({
         include: [
            {
               model: User,
            },
            {
               model: Comment,
            },
         ],
      });

      const postsFlat = data.map((post) => post.get({ plain: true }));

      if (!req.session.user_id) {
         res.render('home', {
            posts: postsFlat,
         });
      } else {
         console.log('2');

         res.render('home', {
            posts: postsFlat,
            user_id: req.session.user_id,
            username: req.session.user_name,
         });
      }
   } catch (err) {
      console.log(err);
      res.status(500).json(err);
   }
});

router.get('/post/:id', async (req, res) => {
   try {
      const data = await Post.findByPk(req.params.id);

      const post = data.get({ plain: true });

      res.render('post', { post });
   } catch (err) {
      console.log(err);
      res.status(500).json(err);
   }
});

router.get('/create-post', (req, res) => {
   res.render('create-post');
});

router.post('/post', async (req, res) => {
   console.log('is data coming in', req.body);
   try {
      const data = await Post.create(req.body);

      const post = data.get({ plain: true });

      res.redirect('/home');
   } catch (err) {
      console.log(err);
      res.status(500).json(err);
   }
});

router.get('/create-comment/:post_id', async (req, res) => {
   try {
      const data = await Post.findByPk(req.params.post_id, {
         include: {
            model: Comment,
         },
      });
      const post = data.get({ plain: true });

      console.log('post:', post);

      res.render('create-comment', {
         comments: post.comments,
         post_id: req.params.post_id,
      });

      //const postsFlat = data.map((post) => post.get({ plain: true }));
   } catch (err) {
      console.log(err);
      res.status(500).json(err);
   }
});

router.get('/comment/:post_id', async (req, res) => {
   try {
      const data = await Post.findByPk(req.params.post_id, {
         include: {
            model: Comment,
         },
      });

      //const postsFlat = data.map((post) => post.get({ plain: true }));

      res.json(data);
   } catch (err) {
      console.log(err);
      res.status(500).json(err);
   }
});

router.post('/comment', async (req, res) => {
   console.log('is data coming in', req.body);
   try {
      const data = await Comment.create(req.body);

      const comment = data.get({ plain: true });

      res.redirect('/home');
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
// User signup route if already existed
router.get('/signup', (req, res) => {
   // If the user is already logged in, redirect the request to another route
   if (req.session.exists) {
      res.redirect('/home');
      return;
   }

   res.render('signup');
});
module.exports = router;
