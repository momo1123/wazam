![edX](https://img.shields.io/badge/edX-%2302262B.svg?style=for-the-badge&logo=edX&logoColor=white)
![Heroku](https://img.shields.io/badge/heroku-%23430098.svg?style=for-the-badge&logo=heroku&logoColor=white)

![GitHub](https://img.shields.io/github/license/momo1123/wazzam?style=flat-square)
![GitHub language count](https://img.shields.io/github/languages/count/momo1123/wazzam?style=flat-square)
![GitHub top language](https://img.shields.io/github/languages/top/momo1123/wazzam?color=green&style=flat-square)

# Wazzam (DC Comics Blogging Site)

## _Description_

This repository has a web application that uses
[Node.js](https://nodejs.org/en) along with the `MySQL`, `bcrypt`, and `strongpassword` packages in order to manipulate SQL tables and encrypt sensitive information pertaining to login credentials for a DC Comics fan blog. It has multiple valid JS (ES6) files and Handlebar.js files for the front-end; the `server.js` sets up the session and syncs sequelize, and the `schema.sql` file contains the setup for the SQL database. The `seed.js` file is set up with a NPM Script `npm run seed` to initialize the blog with sample entries. The purpose of this repository is to show an ability to provide client solutions using back-end techniques, such as:

-  [Node.js](https://www.npmjs.com/package/bcrypt) External Command Line Interface Module `bcrypt`, used to hash passwords with salting, conducts verification of client typed passwords against hashed passwords, and prevents brute-force-attacks preventing outsiders from viewing sensitive environment variables.
-  [Node.js](https://www.npmjs.com/package/strongpassword) External Command Line Password Module `strongpassword`, used to ensure that a strongpassword is created when registering for an account, show the strength of the chosen password, and implement validation for password creation.

## _Directory Structure_

```md
.
├── config/             // directory for configuration files
   └── connection.js    // javascript file that sets up environment
├── controllers/        // directory for req res control files
   ├── index.js         // javascript file that adds main and user routes
   ├── mainRoutes.js    // javascript file that contains main routes
   └── userRoutes.js    // javascript file that contains user routes
├── db/ 			         // directory for storage of sql db files
   └── schema.sql 		// sql file for creating the wazzam_db database
├── models/             // directory for all of the defined models
├── public/             // directory for front-end files
   ├── assets/          // directory for graphic assets used in animations
   ├── css/             // directory for css files that handle styling
      ├── wazzamSta...  // css file that handles the styling of the start-page
      └── timeLine.css  // css file that handles the styling of the homepage
   └── js/ 		         // directory for storage of javascript files
	   ├── main.js       // javascript file for handling logout functionality
      ├── timeLine.js   // javascript file for handling homepage functionality
   	└── wazzamSt...   // javascript file for handling start-page functionality
├── seeds/              // directory for seed file to populate sql db
├── utils/              // directory for helper functions
├── views/              // directory for handlebar views
├── .env.EXAMPLE
├── .eslintignore
├── .eslintrc.json
├── .gitattributes
├── .gitignore
├── .prettierignore
├── .prettierrc.json
├── LICENSE 
├── package-lock.json
├── package.json
├── README.md
└── server.js 			// sets up the server, starts the app
```

## _Table of Contents_

-  [Description](#description)
-  [Directory Structure](#directory-structure)
-  [Installation Instructions](#installation)
-  [Usage Information](#usage-information)
-  [Test Instructions](#testing)
-  [Contributions Guidelines](#contributing)
-  [Credits](#credits)
-  [Heroku Deployment](#heroku-deployment)
-  [License](#license)
-  [Questions](#questions)

## _Installation_

```bash
git clone https://github.com/momo1123/wazzam.git
cd wazzam
npm install
```

If the client wishes to seed the database and use their own MYSQL server, they should make sure to use a `.env` file for their own credentials. Then use `source` within the MySQL server (after logging in with the credentials) to set up the initial database, and then type the following into the terminal:

```bash
npm run seed
```

Then, when the web app is started, the client will see the web app populated with the sample data. Otherwise, the client can access the application without installation requirements by accessing the [Heroku Deployment](#heroku-deployment).

## _Usage Information_

If the client clones the repository, after navigating to the appropriate directory and
making sure the appropriate dependencies have been installed, the client may type the following
in the terminal:

```bash
npm start
```

The client will be presented with the start-page asking for a selection between 'login' or 'signup' that will render a unique page for either selection. Each page has a nifty animation with an iconic DC Comic hero. 

![MainScreenshot](./readme_assets/nodejsapp.gif)

When the client moves their mouse the iconic DC COmic hero moves in tandem. This animation works with the following snippet of `JS` code:

```js
// adds an event listener that is seeking mouse movements
container.addEventListener('mousemove', (event) => {
   // grabs the speed attribute from Dc Comic hero element
   const speed = superman.getAttribute('data-speed');
   // calculates starting coordinates using the speed and mouse coordinates to dampen the motion
   const x = ((window.innerWidth / 2 - event.clientX * 0.95) * speed) / 100;
   const y = ((window.innerHeight / 2 - event.clientY * 0.95) * speed) / 100;
   // applies a template literal to the transform style attribute
   superman.style.transform = `translateX(${x}px) translateY(${y}px)`;
   });
```

When the client logs in, they are presented with the homepage and a welcome message letting them know they have logged in. The header is also rendered based on whether the user is logged in or not, and if the user is logged in, then the login button in the header is disabled. The dynamic header is displayed using a template engine with the following code:

```handlebars
<!-- the header element contains the whole header for the homepage -->
<header class="w3-container w3-center w3-padding-32">
   <h1 class="animated-header"><b>WAZZAM</b></h1>
   <!-- this paragraph element contains an if statement checking if the user is logged in -->
   <p>Charge your social battery! <i class="fas fa-bolt"></i>
      {{#if username}}
         You are logged in as {{username}}.
      {{else}}
         Please take a moment to login!
      {{/if}}
   </p>
   <!-- this if statement shows a disabled login button when the user is logged in -->
   <!-- or a disabled logout button for when there is not a current user logged in -->
   {{#if username}}
      <a class="w3-button w3-disabled w3-hover-grayscale w3-border" href="/login"><b>LOGIN</b></a>
      <a class="w3-button w3-round w3-white w3-border" id="logout" href="/logout"><b>LOGOUT</b></a>
   {{else}}
      <a class="w3-button w3-round w3-white w3-border" href="/login"><b>LOGIN</b></a>
      <a class="w3-button w3-disabled w3-hover-grayscale w3-border" id="logout" href="/logout"><b>LOGOUT</b></a>
   {{/if}}
</header>
```

## _Testing_

There are no testing guidelines for this project.

## _Contributing_

There are four total branches, `/front-end`, `/back-end`, `/encryption`, and `/sql` for contributors to make improvements. Contributors should make sure to change their working directory before making changes. They may use the `checkout` command to specify the branch they want to work in before making changes.

```bash
git checkout <branch>
```

## _Credits_

First, the EDX and Heroku readme file icons on the top were made by
[Ileriayo](https://github.com/Ileriayo) with a link provided below:
https://github.com/Ileriayo/markdown-badges#badges.

Second, the various parts of this project were authored by four main contributors. The template chosen for the `/front-end` work was selected by [khalilb2000](https://github.com/khalilb2000), the code for the `/back-end` work, as well as the `start`, `login`, and `signup` animations were made by [ktortolini](https://github.com/ktortolini), the implementation of `strongpassword` for the `/encryption` work was done by [momo1123](https://github.com/ktortolini), and the seed data for the `/sql` work was written by [muddabirm](https://github.com/muddabirm).

The css styling was made with help from [W3-Schools](https://www.w3schools.com/), specifically with the documentation about the `W3.CSS` framework available here: https://www.w3schools.com/w3css/defaulT.asp.

Next, the images that were used in the `start`, `login`, and `signup` pages were grabbed from online creative commons resources. I would like to note my appreciation for the images by [TheDigitalArtist](https://pixabay.com/users/thedigitalartist-202249/), specifically the city townscape image found here: https://pixabay.com/photos/town-buildings-houses-townscape-2430571/. I would like to note my appreciation for [solihinkentjana](https://pixabay.com/users/solihinkentjana-13204956/), specifically the superman and deadshot action figure images available on their profile. I would like to note my appreciation for [453169](https://pixabay.com/users/453169-453169/), specifically the background image found here: https://pixabay.com/photos/tourism-city-christmas-decorations-1916629/. I would like to note my appreciation for [Philippsaal](https://pixabay.com/users/philippsaal-8486910/), specifically the image found here: https://pixabay.com/photos/road-vehicles-pedestrian-bus-4103334/.

Also, the animation effect was made with help from the tutorial channel [OnlineTutorialsYT](https://www.youtube.com/@OnlineTutorialsYT), specifically the parallax animation tutorial video found here: https://www.youtube.com/watch?v=dqzZ0SbSgHY.

Lastly, parts of the `HTML`, `CSS`, and `JS` code were created with knowledge gained through EDX, as part of their comprehensive Full Stack Web Development online program. To learn about the online program from EDX visit the link here: https://www.edx.org/learn/full-stack-development.

## _Heroku Deployment_

This web application was deployed on [Heroku](https://blogging-platform-c14-0e7719a9e4b0.herokuapp.com/).

## _License_

Wazzam (DC Comics Blogging Site) is licensed under a GPL v3 License.

## _Questions_

Contact the authors:

- [khalilb2000](https://github.com/khalilb2000) via email ✉ <a>khalilb2000@gmail.com</a>.
- [ktortolini](https://github.com/ktortolini) via email ✉ <a>ktortolini@smu.edu</a>.
- [momo1123](https://github.com/momo1123) via email ✉ <a>momozjunk@gmail.com</a>.
- [muddabirm](https://github.com/muddabirm) via email ✉ <a>muddabirm@gmail.com</a>.


