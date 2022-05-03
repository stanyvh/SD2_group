const db = require('../services/db');
const { Skills } = require('./skills');
const { Booking } = require('./booking');
const { Subject } = require('./subject');
const { Teaching } = require('./teaching');
const { Teacher } = require('./teacher');
const { User } = require('./user');

class register {
    // Attributes
    T_ID;
    Name;
    Image;
    skills = []
    academicSkills = []
    booking = []

    constructor(Name) {
        this.Name = Name;
    }
    async addTeacher() {
        var sql = "INSERT INTO Teacher(Name) Values(?)"
        console.log(result.insertName);
        this.Name = result.insertName;
        return this.Name;
    }
}