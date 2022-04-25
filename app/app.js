// Import express.js
const express = require("express");
// Create express app
var app = express();
// Add static files location
app.use(express.static("static"));

// Use the Pug templating engine
app.set('view engine', 'pug');
app.set('views', './app/views');

// Add the luxon date formatting library
const { DateTime } = require("luxon");

//***********************************************************************************

// We require the db.js file to set up the database connection.
const db = require('./services/db');
app.use(express.urlencoded({ extended: true }));

//Get the models
const { Teacher } = require("./models/teacher");
const { User } = require("./models/user");

// Get the programmes dropdown menu
const getskills = require("./models/getskills");

//***********************************************************************************

// Set the sessions
var session = require('express-session');
app.use(session({
  secret: 'secretkeysdfjsflyoifasd',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));

// Recieving S-Teacher notes
app.post('/add-note', function (req, res) {
    // Get the submitted values
    params = req.body;
    // Note that we need the id to get update the correct Teacher
    var teacher = new Teacher(params.T_ID)
    // Adding a try/catch block which will be useful later when we add to the database
    try {
        teacher.addTeacherNote(params.note).then(result => {
            // Just a little output for now
            res.send('Message Sent! Please wait for a response within 24 hours.');
        })
     } catch (err) {
         console.error(`Error while adding note `, err.message);
     }
});

// Create a route for root - /
app.get("/", function(req, res) {
    res.render('homepage');
});

// Route for 'homepage.pug'
app.get('/homepage', function (req, res) {
    res.render('homepage');
});

// Create a route for 'index'
app.get("/index", function(req, res) {
    res.render("index",
        {'title':'Profile Page', 'heading': 'heading'});
});


// Create a route for testing the db
app.get("/all-teachers", function(req, res) {
    // Prepare an SQL query that will return all rows from the teacher_table
    var sql = 'select * from Teacher';
    db.query(sql).then(results => {
        res.render('all-teachers', {data:results});
    });
});



// Route for Maths Teachers
app.get('/maths', function (req, res) {
    var sql = 'SELECT Teacher.T_ID, Teacher.Name FROM Teacher JOIN Teaching ON Teacher.T_ID = Teaching.T_ID JOIN Skills ON Skills.Skill_ID = Teaching.Skill_ID WHERE Skills.Skill_ID = 123;';
    db.query(sql).then(results => {
        res.render('subject', {data:results});
    });
});

// Route for Education Teachers
app.get('/education', function (req, res) {
    var sql = 'SELECT Teacher.T_ID, Teacher.Name FROM Teacher JOIN Teaching ON Teacher.T_ID = Teaching.T_ID JOIN Skills ON Skills.Skill_ID = Teaching.Skill_ID WHERE Skills.Skill_ID = 114;';
    db.query(sql).then(results => {
        res.render('subject', {data:results});
    });
});

// Route for Writing Teachers
app.get('/writing', function (req, res) {
    var sql = 'SELECT Teacher.T_ID, Teacher.Name FROM Teacher JOIN Teaching ON Teacher.T_ID = Teaching.T_ID JOIN Skills ON Skills.Skill_ID = Teaching.Skill_ID WHERE Skills.Skill_ID = 107;';
    db.query(sql).then(results => {
        res.render('subject', {data:results});
    });
});

// Route for 'register.pug'
app.get('/register', function (req, res) {
    res.render('register');
});

// Route for 'account.pug'
app.get('/account', function (req, res) {
    res.render('account');
});

// Set password route
app.post('/set-password', async function (req, res) {
    params = req.body;
    var user = new User(params.email);
    try {
        uId = await user.getIdFromEmail();
        if (uId) {
            // If a valid, existing user is found, set the password and redirect to the users single-student page
            await user.setUserPassword(params.password);
            res.redirect('/single-teacher/' + uId);
        }
        else {
            // If no existing user is found, add a new one
            newId = await user.addUser(params.email);
            res.send('Perhaps a page where a new user sets a programme would be good here');
        }
    } catch (err) {
        console.error(`Error while adding password `, err.message);
    }
});

// Route for 'login.pug'
app.get('/login', function (req, res) {
    res.render('login');
});

// Check submitted email and password pair
app.post('/authenticate', async function (req, res) {
    params = req.body;
    var user = new User(params.email);
    try {
        uId = await user.getIdFromEmail();
        if (uId) {
            match = await user.authenticate(params.password);
            if (match) {
                // Set the session for the user
                req.session.uid = uId;
                req.session.loggedIn = true;
                console.log(req.session);
                res.redirect('/single-teacher/' + uId);
            }
            else {
                // TODO improve the user journey here
                res.send('invalid password');
            }
        }
        else {
            res.send('invalid email');
        }
    } catch (err) {
        console.error(`Error while comparing `, err.message);
    }
});

// Route for Logout
app.get('/logout', function (req, res) {
    req.session.destroy();
    res.redirect('/login');
  });


app.get("/single-teacher/:id", async function(req, res) {
    var tId = req.params.id;
    //Create a teacher class with ID passed
    var teacher = new Teacher(tId);
    await teacher.getTeacherDetails();
    await teacher.getTeacherImage();
    await teacher.getTeacherSkills();
    await teacher.getTeacherBookings();
    resultSkills = await getskills.getAllSkills();
    res.render('teacher', {'teacher':teacher, 'Skills':resultSkills});
});

// Create route for the calendar
// Here we have a page which demonstrates how to both input dates and display dates
app.get("/teacher", async function(req, res) {
    // Get all the dates from the db to display
    // NB Move this to a model that is appropriate to your project
    sql = "SELECT * from test_booking";
    // We could format dates either in the template or in the backend
    dates = [];
    results = await db.query(sql);
    // Loop through the results from the database
    for (var row of results) {
        // For some reason the dates are fomatted as jsDates. I think thats the Mysql2 library at work!
        dt = DateTime.fromJSDate(row['date']);
        // Format the date and push it to the row ready for the template
        // NB Formatting could also be done in the template
        // NB date formats are usually set up to work throughout your app, you would not usually set this in every row.
        // you could put this in your model.
        dates.push(dt.toLocaleString(DateTime.DATE_HUGE));
    }
    // Render the calendar template, injecting the dates array as a variable.
    res.render('teacher', {dates: dates});
});

// Capture the date input and save to the db
app.post('/set-date', async function (req, res) {
    params = req.body.date;
    console.log(params);
    //construct a date object from the submitted value - use a library
    var inputDate = DateTime.fromFormat(params, 'yyyy-M-dd');
    console.log(inputDate);
    // Add the date: NB this should be in a model somewhere
    sql = "INSERT into test_booking (date) VALUES (?)";
    try {
        await db.query(sql, [inputDate.toSQLDate()]);
    } catch (err) {
        console.error(`Error while adding date `, err.message);
        res.send('sorry there was an error');
    }
    res.send('date added');
});

//*********************************************************************************

// Create a route for /goodbye
// Responds to a 'GET' request
app.get("/goodbye", function(req, res) {
    res.send("Goodbye world!");
});

// Create a dynamic route for /hello/<name>, where name is any value provided by user
// At the end of the URL
// Responds to a 'GET' request
app.get("/hello/:name", function(req, res) {
    // req.params contains any parameters in the request
    // We can examine it in the console for debugging purposes
    console.log(req.params);
    //  Retrieve the 'name' parameter and use it in a dynamically generated page
    res.send("Hello " + req.params.name);
});


//**********************************************************************************

// Start server on port 3000
app.listen(3000,function(){
    console.log(`Server running at http://127.0.0.1:3000/`);
});