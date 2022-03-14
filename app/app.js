// Import express.js
const express = require("express");

// Create express app
var app = express();

app.use(express.static("static"));

// Make sure we get the POST parameters
app.use(express.urlencoded({ extended: true }))

// Create a post route to handle the form submission of the option list

app.use('/bootstrap', express.static('node_modules/bootstrap/dist'));

// Use the Pug templating engine
app.set('view engine', 'pug');
app.set('views', './app/views');

// Add static files location
app.use(express.static("static"));

// Get the functions in the db.js file to use
const db = require('./services/db');

const { Teacher } = require('./teacher.js')

// Create a route for root - /
app.get("/", function(req, res) {
    res.render("index");
});


// Create a route for testing the db
app.get("/teacher", function(req, res) {
    // Assumes a table called test_table exists in your database
    sql = 'select * from Teacher';
    db.query(sql).then(results => {
        console.log(results);
        res.send(results)
    });
});

app.get("/skills", function(req, res) {
    // Assumes a table called test_table exists in your database
    sql = 'select * from Skills';
    db.query(sql).then(results => {
        console.log(results);
        res.send(results)
    });
});

// Create a single teacher page
app.get("/single-teacher/:id", async function (req, res) {
    var T_ID = req.params.id;
    var teacher = new Teacher(T_ID);
    await teacher.getTeacherName();
    console.log(teacher);
    res.render('teacher', {teacher:teacher});
});

// Start server on port 3000
app.listen(3000,function(){
    console.log(`Server running at http://127.0.0.1:3000/`);
});