// imports express module
const router = require('express').Router();
// imports the main routes file
// todo: code here if more routes
const mainRoutes = require('./main-routes.js');
// calls use() for all of the routes
// todo: code here if more routes
router.use('/', mainRoutes);

module.exports = router;
