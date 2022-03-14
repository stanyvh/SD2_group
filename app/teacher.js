class Teacher {
    // Attributes
    teachID;
    firstName;
    lastName;
    skills;

    constructor(T_ID, firstName, lastName) {
        this.teachID = teachID;
        this.firstName = firstName;
        this.lastName = lastName;
        this.skills = [];
    }

    getFormattedName() {
        return this.firstName + ' ' + this.lastName;
    }

    getfirstName() {
        return this.#firstName;
    }

    getlastName() {
        return this.#lastName
    }

    setfirstName(firstName) {
        this.#firstName = firstName;
    }

    setlastName(lastName) {
        this.#lastName = lastName;
    }

}

module.exports = {
    Teacher
}