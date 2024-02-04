const Department = require("../departmentClass");
const inquirer = require("inquirer");
const menu = require("./menu");

// Displays all departments and then calls the function to manage department-related actions
function viewDepartmentMenu() {
    // Creating an instance of the Department class
    let departmentInstance = new Department();

    // Fetching all departments and displaying them in a table
    departmentInstance.getAll().then((rows) => {
        console.log(
            `
            ---------------
            All Departments
            ---------------
            `
        );
        console.table(rows);
    })
        .then(() => { manageDepartmentMenu(); });
}

// Manages user options related to departments
function manageDepartmentMenu() {
    // Prompting the user for department-related actions
    inquirer
        .prompt([
            {
                type: "list",
                name: "DepartmentMenu",
                message: "Would you like to do anything else?",
                choices: ["Create new department", "Take me back to the Main Menu"],
            }
        ])
        .then(({ DepartmentMenu }) => {
            // Handling user selection
            switch (DepartmentMenu) {
                case "Create new department":
                    console.clear();
                    addDepartmentMenu(); // Calling the function to add a new department
                    break;
                case "Take me back to the Main Menu":
                    console.clear();
                    menu.mainMenu(); // Going back to the main menu
                    break;
            }
        });
}

// Handles the process of adding a new department
function addDepartmentMenu() {
    // Prompting the user for information about the new department
    inquirer
        .prompt([
            {
                type: "text",
                name: "newDepartmentName",
                message: "What is the name of the new department?",
                validate: (departmentName) => {
                    // Ensuring a department name is provided
                    if (!departmentName) {
                        console.log("Please enter a department name!");
                        return false;
                    }
                    return true;
                }
            }
        ])
        .then(({ newDepartmentName }) => {
            // Creating an instance of the Department class with provided information
            const departmentInstance = new Department(null, newDepartmentName);

            // Adding the new department
            departmentInstance.addDepartment();
        });
}

module.exports = { viewDepartmentMenu, addDepartmentMenu, manageDepartmentMenu };
