// Get the functions in the db.js file to use
const db = require('../services/db');

class Skills {
    skillId;
    skillName;
    skillType;

    constructor(SkillName, SkillType, Skill_ID) {
        this.skillName = SkillName;
        this.skillType = SkillType;
        this.skillId = Skill_ID;
    }

    async getSkillName() {
        var sql = "SELECT * from Skills where Skill_ID = ?"
        const results = await db.query(sql, [this.id]);
        this.skillName = results[0].SkillName;
        this.skillType = results[0].SkillType;
    }

}

module.exports = {
    Skills
}