const db = require('../services/db');

class Messages {
    Note_ID;
    T_ID;
    Note;

    constructor(T_ID) {
        this.T_ID = T_ID;
    }

    async addTeacherNote(Note) {
        var sql = "INSERT INTO Messages (T_ID, Note) Values ( ?, ?)";
        console.log(this.T_ID);
        console.log(Note);
        const result = await db.query(sql, [this.T_ID, Note]);
        // Ensure the note property in the model is up to date
        this.Note = Note;
        return result;
    }

}

module.exports = {
    Messages
}
