const db = require('../services/db');

class Subject {
    teacherName;

    constructor(TeacherName) {
        this.teacherName = TeacherName;
    }

    async getSubject() {
        var sql = "SELECT * FROM Teaching WHERE Skill_ID = ?";
        const results = await db.query(sql, [this.id]);
        this.teacherName = results[0].TeacherName;
    }
}

module.exports = {
    Subject
}