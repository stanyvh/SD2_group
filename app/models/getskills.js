const db = require('../services/db');
const { Skills } = require('./skills');

async function getAllSkills() {
    var sql = "SELECT * from Skills"
    const results = await db.query(sql);
    var rows = [];
    for (var row of results) {
    	    // Use our Programme class to neatly format the object going to the template
        rows.push(new Skills(row.SkillName, row.SkillType));
    }
    return rows;
}

module.exports = {
    getAllSkills,
 }