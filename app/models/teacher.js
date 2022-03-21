const db = require('../services/db');
const { Skills } = require('./skills');

class Teacher {
    // Attributes
    T_ID;
    Name;
    skills = [];
    booking = [];

    constructor(T_ID) {
        this.T_ID = T_ID;
    }

    //Get the teacher name from the database
    async getTeacherName() {
        if (typeof this.Name !== 'string') {
            var sql = "SELECT * from Teacher where T_ID = ?"
            const results = await db.query(sql, [this.T_ID]);
            this.Name = results[0].Name;
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

    }

}

module.exports = {
    Teacher
}