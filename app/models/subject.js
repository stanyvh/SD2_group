const db = require('../services/db');
const { Skills } = require('./skills');
const { Teacher } = require('./teacher');

class Subject {
    Skill_ID;
    subjects = [];

    constructor(Skill_ID) {
        this.Skill_ID = Skill_ID;
    }


    async getSubjectName() {
        var sql = 'SELECT Teacher.T_ID, Teacher.Name FROM Teacher \
        JOIN Teaching ON Teacher.T_ID = Teaching.T_ID \
        JOIN Skills ON Skills.Skill_ID = Teaching.Skill_ID \
        WHERE Skills.Skill_ID = ?;';
        const results = await db.query(sql, [this.Skill_ID]);
        for(var row of results) {
            this.subjects.push(new Subject(row.Skills.Skill_ID, row.Teacher.Name));
        }
    }
}

module.exports = {
    Subject
}