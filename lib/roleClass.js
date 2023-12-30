const db = require('../db/connection');

class Role {
    constructor(id, title, salary, department_id) {
        this.id = id,
            this.title = title,
            this.salary = salary,
            this.department_id = department_id;
    }

    // Method to retrieve all roles from the database
    getAll() {
        const sql = 'SELECT * FROM role';

        // Returning a promise that executes the query and resolves with the result rows
        return db.promise().query(sql).then(([rows]) => { return rows; });
    }

    // Method to add a new role to the database
    addRole() {
        const sql = `INSERT INTO role (title, salary, department_id) VALUES ("${this.title}", "${this.salary}", "${this.department_id}");`

        // Returning a promise that executes the query
        return db.promise().query(sql);
    }
}

module.exports = Role;
