// Express App
const express = require("express");
const app = express();
const dotenv = require 
const session = require("express-session");
const db = require("./models");
const PORT = process.env.PORT || 8080;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Static directory
app.use(express.static("public"));

// Static directory
app.use(express.static('public'));

var exphbs = require('express-handlebars');

app.engine('handlebars', exphbs({ 
    defaultLayout: 'main',
    helpers: {
        ifCond: function(v1, v2, options){
            if(v1 == v2) {
                return options.fn(this);
            } else {
                return options.inverse(this);
            }
        }
    } 
}));
app.set('view engine', 'handlebars');

// Session secret
require("dotenv").config();
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 2 * 60 * 60 * 1000
    }
}))

// Controllers
const indexController = require("./controllers/indexController");
const authController = require("./controllers/authController");
const podController = require("./controllers/podController");
const kidController = require("./controllers/kidController");
app.use(indexController);
app.use(authController);
app.use("/api/pods/",podController);
app.use("/api/kids/",kidController);
 
// Start App
db.sequelize.sync({ force: true }).then(() => {
    app.listen(PORT, () => {
    console.log("App listening on PORT " + PORT);
    });
});