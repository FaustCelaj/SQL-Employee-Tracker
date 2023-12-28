const db = require('../db/connection');

class Department {
    constructor(id, department_name) {
        this.id = id,
            this.department_name = department_name
    }

    GetAll() {
        const sql = 'SELECT * FROM department;';
        return db.promise().query(sql).then(([rows]) => { return rows; })
    }

    addDepartment() {
        const sql = `INSERT INTO department (name) VALUES ('${this.department_name}');`
        return db.promise().query(sql);
    }
}

module.exports = DepartmentClass