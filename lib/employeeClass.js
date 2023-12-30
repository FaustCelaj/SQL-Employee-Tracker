const db = require('../db/connection');

class Employee {
    constructor(id, first_name, last_name, role_id, manager_id) {
        this.id = id,
            this.first_name = first_name,
            this.last_name = last_name,
            this.role_id = role_id,
            this.manager_id = manager_id;
    }

    // Method to retrieve all employees from the database
    getAll() {
        const sql = 'SELECT * FROM employee;';

        // Returning a promise that executes the query and resolves with the result rows
        return db.promise().query(sql).then(([rows]) => { return rows; });
    }

    // Method to add a new employee to the database
    addEmployee() {
        const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?);`;
        const params = [this.first_name, this.last_name, this.role_id, this.manager_id];

        // Returning a promise that executes the query with parameters
        return db.promise().query(sql, params);
    }

    // Method to retrieve an employee by ID from the database
    getEmployeeByID() {
        const sql = `SELECT * FROM employee WHERE id = "${this.id}"`;

        // Returning a promise that executes the query and resolves with the result row
        return db.promise().query(sql).then(([row]) => { return row; });
    }

    // Method to update the role of an employee in the database
    updateEmployee() {
        const sql = `UPDATE employee SET role_id = ? WHERE id = "${this.id}"`;
        const params = [this.role_id];

        // Returning a promise that executes the query with parameters and resolves with the result rows
        return db.promise().query(sql, params).then(([rows]) => { return rows; });
    }
}

module.exports = Employee;
