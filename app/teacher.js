class Teacher {
    // Attributes
    teachID;
    firstName;
    lastName;

    constructor(T_ID, firstName, lastName) {
        this.teachID = teachID;
        this.firstName = firstName;
        this.lastName = lastName;
    }

    getFormattedName() {
        return this.firstName + ' ' + this.lastName;
    }

    get firstName() {
        return this.#firstName;
    }

    get lastName() {
        return this.#lastName
    }

    set firstName(firstName) {
        this.#firstName = firstName;
    }

    set lastName(lastName) {
        this.#lastName = lastName;
    }

}

module.exports = {
    Teacher
}