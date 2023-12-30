const Role = require("../roleClass");
const Department = require("../departmentClass");
const inquirer = require("inquirer");
const menu = require("./menu");

// Displays all roles and then calls the function to manage role-related actions
function viewAllRolesMenu() {
    // Creating an instance of the Role class
    const roleInstance = new Role();

    // Fetching all roles and displaying them in a table
    roleInstance.getAll().then((rows) => {
        console.log("--All Roles--");
        console.table(rows);
    })
        .then(() => manageRoleMenu());
}

// Manages user options related to roles
function manageRoleMenu() {
    // Prompting the user for role-related actions
    inquirer
        .prompt([
            {
                type: "list",
                name: "RoleMenu",
                message: "What else would you like to do?",
                choices: ["Create a new role", "Take me back to the Main Menu"],
            },
        ])
        .then(({ RoleMenu }) => {
            // Handling user selection
            switch (RoleMenu) {
                case "Create a new role":
                    console.clear();
                    addRoleMenu(); // Calling the function to add a new role
                    break;
                case "Take me back to the Main Menu":
                    console.clear();
                    menu.mainMenu(); // Going back to the main menu
                    break;
            }
        });
}

// Handles the process of adding a new role
function addRoleMenu() {
    // Creating an instance of the Department class
    const departmentInstance = new Department();

    // Fetching all departments
    departmentInstance.getAll().then((departments) => {
        // Prompting the user for information about the new role
        inquirer
            .prompt([
                {
                    type: "text",
                    name: "newRoleName",
                    message: "Please enter the name of the new role.",
                    validate: (roleName) => {
                        // Ensuring a role name is provided
                        if (!roleName) {
                            console.log("Please enter a name for the role.");
                            return false;
                        }
                        return true;
                    },
                },
                {
                    type: "text",
                    name: "roleSalary",
                    message: "What is the salary for this role?",
                    validate: (salary) => {
                        // Ensuring a salary is provided
                        if (!salary) {
                            console.log("Please enter a salary for the role.");
                            return false;
                        }
                        return true;
                    },
                },
                {
                    type: "list",
                    name: "newRoleDepartment",
                    message: "What department does this role belong to?",
                    choices: departments.map((d) => {
                        return `${d.id}--${d.department_name}`;
                    }),
                },
            ])
            .then(({ newRoleName, roleSalary, newRoleDepartment }) => {
                // Assuming the department ID is a number; adjust as needed
                let newId = parseInt(newRoleDepartment);

                // Creating an instance of the Role class with provided information
                const roleInstance = new Role(null, newRoleName, roleSalary, newId);

                // Adding the new role
                roleInstance.addRole();

                // Clearing the console and displaying all roles
                console.clear();
                viewAllRolesMenu();

                // Logging a message indicating that the role has been added
                console.log("Added role");
            });
    });
}

module.exports = { viewAllRolesMenu, addRoleMenu };
