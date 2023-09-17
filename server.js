// imports the following modules
const path = require('path');
const express = require('express');
const routes = require('./controllers');
const session = require('express-session');
// imports handlebar and helpers

const exphbs = require('express-handlebars');
// imports the sequelize connection
const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;

// configures the handling of the session
const sess = {
   secret: 'Secret',
   cookie: {},
   resave: false,
   saveUninitialized: true,
   store: new SequelizeStore({
      db: sequelize,
   }),
};

// sets up Handlebars.js template engine
const hbs = exphbs.create({});
// designates the engine being used
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json()); //converts to json
app.use(express.urlencoded({ extended: true })); //decrypts
app.use(express.static(path.join(__dirname, 'public')));
app.use(session(sess));

// sets up the routes
app.use(routes);

// syncs the sequelize models and starts the server
sequelize.sync({ force: false }).then(() => {
   app.listen(PORT, () =>
      console.log(`Now listening on http://localhost:${PORT}`),
   );
});
