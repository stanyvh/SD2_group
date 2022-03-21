// Get the functions in the db.js file to use
const db = require('../services/db');

class Booking {
    Book_ID;
    T_ID;
    DayOfWeek;
    Slot;
    Duration;

    constructor(Book_ID, T_ID, DayOfWeek, Slot, Duration) {
        this.Book_ID = Book_ID;
        this.T_ID = T_ID;
        this.DayOfWeek = DayOfWeek;
        this.Slot = Slot;
        this.Duration = Duration;
    }

    async getBooking() {
        if (typeof this.Book_ID !== 'string') {
            var sql = "SELECT * from Booking where Book_ID = ?"
            const results = await db.query(sql, [this.Book_ID]);
            this.T_ID = results[0].T_ID;
            this.DayOfWeek = results[0].DayOfWeek;
            this.Slot = results[0].Slot;
            this.Duration = results[0].Duration;
        }
    }
}

module.exports = {
    Booking
}