require('dotenv').config();

const express = require('express');
const path = require('path');
const session = require('express-session');
const { engine } = require('express-handlebars');
const helpers = require('./utils/helpers');
// const currentYear = new Date().getFullYear();

const app = express();
const PORT = process.env.PORT || 3001;

const sequelize = require('./config/config');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const sess = {
    secret: 'Super secret secret',
    cookie: {
        maxAge: 300000,
        httpOnly: true,
        secure: false,
        sameSite: 'strict',
    },
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
};

app.use(session(sess));