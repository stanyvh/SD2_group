const db = require('./services/db');

class Teacher {
    // Attributes
    teachID;
    firstName;
    lastName;
    skills;

    constructor(T_ID, firstName, lastName, skills) {
        this.teachID = teachID;
        this.firstName = firstName;
        this.lastName = lastName;
        this.skills = skills;
    }

    //Get the teacher name from the database
    async getTeacherName() {
        if (typeof this.firstName !== 'string') {
            var sql = "SELECT * Teacher where id = ?"
            const results = await db.query(sql, [this.id]);
            this.firstName = results[0].name;
        }
    }
}

module.exports = {
    Teacher
}