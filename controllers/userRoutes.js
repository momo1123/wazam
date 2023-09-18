const router = require('express').Router();
const { User } = require('../models');

router.post('/', async (req, res) => {
   try {
      const userData = await User.create(req.body);

      req.session.save(() => {
         req.session.user_id = userData.id;
         req.session.logged_in = true;

         res.status(200).json(userData);
      });
   } catch (err) {
      res.status(400).json(err);
   }
});

router.get('/login', (req, res) => {
   res.render('login');
});

router.post('/login', async (req, res) => {
   try {
      const userData = await User.findOne({ where: { email: req.body.email } });
      // this is for debugging purposes
      console.log('userData', userData);
      if (!userData) {
         res.status(400).json({
            message: 'Incorrect email or password, please try again',
         });
         return;
      }
      const validPassword = await userData.checkPassword(req.body.password);
      // this is for debugging purposes
      console.log('validPassword', validPassword);
      if (!validPassword) {
         res.status(400).json({
            message: 'Incorrect email or password, please try again',
         });
         return;
      }

      req.session.save(() => {
         req.session.user_id = userData.id;
         req.session.user_name = userData.name;
         req.session.logged_in = true;

         //res.json({ user: userData, message: 'You are now logged in!' });
         res.redirect('/home');
      });
   } catch (err) {
      res.status(400).json(err);
   }
});

router.post('/signup', async (req, res) => {
   try {
      // create a new user with the form data
      const user = await User.create({
         email: req.body.email,
         name: req.body.username,
         password: req.body.password,
      });

      // sets up a session
      req.session.user = user;

      // send a message with success feedback
      // res.status(200).json({ message: 'Signup successful!' });
      res.redirect('/');
      // this is for debugging purposes
   } catch (err) {
      // this is for debugging purposes
      console.log(`catch (${err.message})`);
      res.status(500).json({ message: 'Server error' });
   }
});

router.post('/logout', (req, res) => {
   try {
      if (req.session.logged_in) {
         req.session.destroy(() => {
            res.status(204).end();
         });
      }
   } catch (err) {
      // this is for debugging purposes
      console.log(`catch (${err.message})`);
      res.status(500).json(err);
   }
});

module.exports = router;
