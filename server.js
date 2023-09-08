// imports modules
const path = require('path');
const express = require('express');
const routes = require('./controllers');
const session = require('express-session');
const helpers = require('./utils/helpers');
const exphbs = require('express-handlebars');
// imports the sequelize connection
const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;
// configures the handling of the session
const sess = {
   secret: '',
   cookie: {},
   resave: false,
   saveUninitialized: true,
   store: new SequelizeStore({
      db: sequelize,
   }),
};

app.use(session(sess));

// sets up Handlebars.js template engine
const hbs = exphbs.create({ helpers });
// designates the engine being used
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
// sets up the routes
app.use(routes);
// syncs the sequelize models and starts the server
sequelize.sync({ force: false }).then(() => {
   app.listen(PORT, () => console.log(`Now listening on ${PORT}`));
});