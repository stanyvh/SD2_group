// Get the functions in the db.js file to use
const db = require('../services/db');

class Booking {
    DayOfWeek;
    Slot;
    Duration;

    constructor(DayOfWeek, Slot, Duration) {
        this.DayOfWeek = DayOfWeek;
        this.Slot = Slot;
        this.Duration = Duration;
    }

    async getBooking() {
        var sql = "SELECT * from Booking where Book_ID = ?"
        const results = await db.query(sql, [this.id]);
        this.DayOfWeek = results[0].DayOfWeek
        this.Slot = results[0].Slot;
        this.Duration = results[0].Duration;
    }
}

module.exports = {
    Booking
}