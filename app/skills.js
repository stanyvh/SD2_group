class Skills {
    //subject No
    skillId;
    skillName;
    skillType;

    constructor(skillId, skillName, skillType) {
        this.skillId = skillId;
        this.skillName = skillName;
        this.skillType = skillType;
    }

    get skillName() {
        return this.#skillName;
    }

    get firstName() {
        return this.#firstType;
    }
}

module.exports = {
    Skills
}