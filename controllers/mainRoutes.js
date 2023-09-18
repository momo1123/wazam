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
   // this is for debugging purposes
   console.log('async (req, res) => {...}', req.session);
   try {
      // finds all of the posts
      const data = await Post.findAll({
         // includes user and comment
         include: [
            {
               model: User,
            },
            {
               model: Comment,
            },
         ],
      });
      // converts the posts into a plain object
      const postsFlat = data.map((post) => post.get({ plain: true }));
      // checks if the user is logged in
      if (!req.session.user_id) {
         res.render('home', {
            posts: postsFlat,
         });
      } else {
         // this is for debugging purposes
         console.log('if () {...} else {...}');
         // renders the homepage and user info
         res.render('home', {
            posts: postsFlat,
            user_id: req.session.user_id,
            username: req.session.user_name,
         });
      }
   } catch (err) {
      // logs any errors
      console.log(err);
      res.status(500).json(err);
   }
});
// get a single post for the create post page
router.get('/post/:id', async (req, res) => {
   try {
      const data = await Post.findByPk(req.params.id);
      // converts the post into a plain object
      const post = data.get({ plain: true });
      // renders the create post page
      res.render('post', { post });
   } catch (err) {
      // logs any errors
      console.log(err);
      res.status(500).json(err);
   }
});
// gets the create post page
router.get('/create-post', (req, res) => {
   // finds all of the users
   res.render('create-post', {
      user_id: req.session.user_id,
      username: req.session.user_name,
   });
});
// posts a new post to the database
router.post('/post', async (req, res) => {
   // this is for debugging purposes
   console.log('async (req, res) => {...}', req.body);
   try {
      const data = await Post.create(req.body);
      // info: can be passed into the template
      // converts the post into a plain object
      const post = data.get({ plain: true });
      // redirects to the homepage
      res.redirect('/home');
   } catch (err) {
      // logs any errors
      console.log(err);
      res.status(500).json(err);
   }
});
// gets the create comment page for a selected post
router.get('/create-comment/:post_id', async (req, res) => {
   try {
      // finds the post with the selected id, includes comments
      const data = await Post.findByPk(req.params.post_id, {
         include: [
            {
               model: Comment,
            },
            {
               model: User,
            },
         ],
      });
      // converts the post into a plain object
      const post = data.get({ plain: true });
      // this is for debugging purposes
      console.log('data.get({ plain: true })', post);
      // renders the create comment page
      res.render('create-comment', {
         comments: post.comments,
         post_id: req.params.post_id,
         user_id: req.session.user_id,
         username: req.session.user_name,
      });
   } catch (err) {
      // logs any errors
      console.log(err);
      res.status(500).json(err);
   }
});
// gets the comments for a selected post
router.get('/comment/:post_id', async (req, res) => {
   try {
      // finds the post with the selected id
      const data = await Post.findByPk(req.params.post_id, {
         include: {
            model: Comment,
         },
      });
      // gets data for template
      res.json(data);
   } catch (err) {
      // logs any errors
      console.log(err);
      res.status(500).json(err);
   }
});
// posts a new comment
router.post('/comment', async (req, res) => {
   // this is for debugging purposes
   console.log('async (req, res) => {...}', req.body);
   try {
      const data = await Comment.create(req.body);
      // info: can be passed into the template
      // converts the post into a plain object
      const comment = data.get({ plain: true });
      // redirects to the homepage
      res.redirect('/home');
   } catch (err) {
      // logs any errors
      console.log(err);
      res.status(500).json(err);
   }
});
// gets one user with the selected id
router.get('/users/:id', async (req, res) => {
   try {
      // finds the current user with the selected id
      const data = await User.findByPk(req.params.id);
      // converts the user into a plain object
      const user = data.get({ plain: true });
      // renders the user page with current user
      res.render('user', { user });
   } catch (err) {
      // logs any errors
      console.log(err);
      res.status(500).json(err);
   }
});
// todo: check if this route is needed
router.get('/login', (req, res) => {
   if (req.session.logged_in) {
      res.redirect('/home');
      return;
   }
   res.render('login');
});
// todo: check if this route is needed
router.get('/signup', (req, res) => {
   if (req.session.exists) {
      res.redirect('/home');
      return;
   }
   res.render('signup');
});

module.exports = router;
