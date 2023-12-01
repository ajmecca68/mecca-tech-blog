require('dotenv').config();

const express = require('express');
const path = require('path');
const session = require('express-session');
const { engine } = require('express-handlebars');
const currentYear = new Date().getFullYear();

const app = express();
const PORT = process.env.PORT || 3000;
const db = require('./models');
db.sequelize.sync({ force: true }).then(() => {
  console.log("Tables created");
});

// Set views directory to where your templates are
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// Updated Handlebars view engine setup
app.engine('handlebars', engine({ 
    defaultLayout: 'main', 
    extname: '.handlebars',
    layoutsDir: path.join(__dirname, 'views/layouts') // Specify the layouts directory
}));
app.set('view engine', 'handlebars');

// Session middleware setup (add your session configuration)
// Note: Session middleware should be placed before your routes
app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: false,
    // Add more session configurations as needed
}));

// Routes
app.get('/', (req, res) => {
    res.render('home', { pageTitle: 'MecTech Blog', currentYear  });
});

// Render the login page with dynamic data
app.get('/login', (req, res) => {
    res.render('login', { pageTitle: 'Login', currentYear });
});

// Set up additional middleware, routes, and other configurations here

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
