const db = require('../db/connection');

class Role {
    constructor (id, title, salary, department_id) {
        this.id = id,
        this.title = title,
        this.salary = salary,
        this.department_id = department_id
    }
}

module.exports = RoleClass