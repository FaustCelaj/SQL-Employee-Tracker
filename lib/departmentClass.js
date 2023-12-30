const db = require('../db/connection');

class Department {
    constructor(id, department_name) {
        this.id = id,
            this.department_name = department_name;
    }

    // Method to retrieve all departments from the database
    getAll() {
        const sql = 'SELECT * FROM department;';

        // Returning a promise that executes the query and resolves with the result rows
        return db.promise().query(sql).then(([rows]) => { return rows; });
    }

    // Method to add a new department to the database
    addDepartment() {
        const sql = `INSERT INTO department (name) VALUES ("${this.department_name}");`

        // Returning a promise that executes the query
        return db.promise().query(sql);
    }
}

module.exports = Department;
