const db = require('../services/db');
const { Skills } = require('./skills');
const { Booking } = require('./booking');
const { Subject } = require('./subject');


class Teacher {
    // Attributes
    T_ID;
    Name;
    Image;
    skills = [];
    academicSkills = [];
    recSkills = [];
    booking = [];
    maths = [];
    // Enquiry Messages
    note;

    constructor(T_ID) {
        this.T_ID = T_ID;
    }

    //Get the teacher name from the database
    async getTeacherDetails() {
        if (typeof this.Name !== 'string') {
            var sql = "SELECT * from Teacher where T_ID = ?"
            const results = await db.query(sql, [this.T_ID]);
            this.Name = results[0].Name;
            this.note = results[0].note;
        }
    }

    //Get the teacher name from the database
    async getTeacherImage() {
        if (typeof this.image_path !== 'string') {
            var sql = "SELECT image_path from image where T_ID = ?"
            const results = await db.query(sql, [this.T_ID]);
            this.image_path = results[0].image_path;
        }
    }

    //Get the skills for this teacher
    async getTeacherSkills() {
        var sql = "SELECT Skills.SkillName, Skills.SkillType \
        FROM Teacher \
        JOIN Teaching ON Teacher.T_ID = Teaching.T_ID \
        JOIN Skills ON Skills.Skill_ID = Teaching.Skill_ID \
        WHERE Teacher.T_ID = ?;"
        const results = await db.query(sql, [this.T_ID]);
        for(var row of results) {
            this.skills.push(new Skills(row.SkillName, row.SkillType));
        }
    }

    async getTeacherBookings() {
        var sql = "SELECT Booking.Book_ID, Booking.DayOfWeek, Booking.Slot, Booking.Duration \
        FROM Teacher \
        JOIN Booking ON Booking.T_ID = Teacher.T_ID \
        WHERE Teacher.T_ID = ?;"
        const results = await db.query(sql, [this.T_ID]);
        for (var row of results) {
            this.booking.push(new Booking(row.DayOfWeek, row.Slot, row.Duration));
        }

    }

    async addTeacherNote(note) {
        var sql = "UPDATE Teacher SET note = ? WHERE teacher.T_ID = ?"
        const result = await db.query(sql, [note, this.T_ID]);
        // Ensure the note property in the model is up to date
        this.note = note;
        return result;
    }


}

module.exports = {
    Teacher
}