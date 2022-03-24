// Import express.js
const express = require("express");
// Create express app
var app = express();
// Add static files location
app.use(express.static("static"));

// Add the luxon date formatting library
const { DateTime } = require("luxon");

// Use the Pug templating engine
app.set('view engine', 'pug');
app.set('views', './app/views');

//***********************************************************************************

// We require the db.js file to set up the database connection.
const db = require('./services/db');

//Get the models
const { Teacher } = require("./models/teacher");

// Get the programmes dropdown menu
const getskills = require("./models/getskills");

//***********************************************************************************

// Create a route for root - /
app.get("/", function(req, res) {
    res.render("index",
        {'title':'Profile Page', 'heading': 'Teacher Profile'});
});


// Create a route for testing the db
app.get("/all-teachers", function(req, res) {
    // Prepare an SQL query that will return all rows from the test_table
    var sql = 'select * from Teacher';
    db.query(sql).then(results => {
        res.render('all-teachers', {data:results});
    });
});


app.get("/single-teacher/:id", async function(req, res) {
    var tId = req.params.id;
    //Create a teacher class with ID passed
    var teacher = new Teacher(tId);
    await teacher.getTeacherName();
    await teacher.getTeacherSkills();
    await teacher.getTeacherBookings();
    resultSkills = await getskills.getAllSkills();
    console.log(resultSkills);
    res.render('teacher', {'teacher':teacher, 'Skills':resultSkills});
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