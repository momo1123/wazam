// imports express module and user, post
const router = require('express').Router();
const { User, Post } = require('../models');
const sequelize = require('../config/connection');

// get all posts for homepage
router.get('/posts', async (req, res) => {
	try {
		const data = await Post.findAll({
			include: [
				{
					model: Post,
					attributes: ['username', 'time-stamp', 'message'],
					include: {
						model: User,
						attributes: ['username'],
					}
				},
			],
		});

		const posts = data.map((post) =>
			post.get({ plain: true }),
		);

		res.render('homepage', {
			posts,
			user: req.session.user
		});
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
