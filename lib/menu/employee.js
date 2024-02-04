// Import required modules
const Role = require("../roleClass");
const Employee = require("../employeeClass");
const inquirer = require("inquirer");
const menu = require("./menu");

// View all employees menu
function viewAllEmployeesMenu() {
  const employee = new Employee();

  // Fetch all employees and display them in a table
  employee
    .getAll()
    .then((rows) => {
      console.log(`
      --All Employees--`);
      console.table(rows);
    })
    .then(() => manageEmployeeMenu());
}

// Manage employee menu options
function manageEmployeeMenu() {
  // Prompt user for options related to employees
  inquirer
    .prompt([
      {
        type: "list",
        name: "EmployeeMenu",
        message: "What else would you like to do?",
        choices: [
          "Add a new employee",
          "Update an employee's role",
          "Take me back to the Main Menu",
        ],
      },
    ])
    .then(({ EmployeeMenu }) => {
      switch (EmployeeMenu) {
        case "Add a new employee":
          console.clear();
          addEmployeeMenu();
          break;
        case "Update an employee's role":
          console.clear();
          updateEmployeeRoleMenu();
          break;
        case "Take me back to the Main Menu":
          console.clear();
          menu.mainMenu();
          break;
      }
    });
}

// Add a new employee
function addEmployeeMenu() {
  console.clear();
  const role = new Role();
  const manager = new Employee();

  // Fetch all roles and managers
  role.getAll().then((roles) => {
    manager.getAll().then((managers) => {
      // Generate choices for manager selection, including "None"
      let allManagers = managers.map((m) => {
        return `${m.id} - ${m.first_name} ${m.last_name}`;
      });
      allManagers.push("None");

      // Prompt user for new employee information
      inquirer
        .prompt([
          {
            type: "text",
            name: "firstname",
            message: "Enter first name.",
            validate: (name) => {
              if (!name) {
                console.log("Please enter a first name for this employee");
                return false;
              }
              return true;
            },
          },
          {
            type: "text",
            name: "lastname",
            message: "Enter last name.",
            validate: (name) => {
              if (!name) {
                console.log("Please enter a last name for this employee");
                return false;
              }
              return true;
            },
          },
          {
            type: "list",
            name: "roleid",
            message: "What is the new employee's role?",
            choices: roles.map((r) => {
              return `${r.id} - ${r.title}`;
            }),
          },
          {
            type: "list",
            name: "manid",
            message: "Who is the new employee's manager?",
            choices: allManagers,
          },
        ])
        .then(({ firstname, lastname, roleid, manid }) => {
          // Extracting numeric IDs from user selections
          const newRoleId = parseInt(roleid.split(" ")[0], 10);

          // Correctly handling 'None' selection for manager
          let newManagerId =
            manid === "None" ? null : parseInt(manid.split(" ")[0], 10);

          // Creating an instance of the Employee class with provided information
          const employee = new Employee(
            null,
            firstname,
            lastname,
            newRoleId,
            newManagerId
          );

          // Adding the new employee
          employee.addEmployee();

          // Clearing the console and displaying all employees
          console.clear();
          viewAllEmployeesMenu();

          // Logging a message indicating that the employee has been added
          console.table("Added employee \n");
        });
    });
  });
}

// Update employee's role
function updateEmployeeRoleMenu() {
  console.clear();
  let role = new Role();
  role.getAll().then((roles) => {
    let employee = new Employee();
    employee.getAll().then((employees) => {
      // Prompt user for employee and new role information
      inquirer
        .prompt([
          {
            type: "list",
            name: "employee",
            message: "Which employee's role do you want to update?",
            choices: employees.map((e) => {
              return `${e.id} - ${e.first_name} ${e.last_name}`;
            }),
          },
          {
            type: "list",
            name: "roleselect",
            message: "Which role do you want to assign the selected employee?",
            choices: roles.map((r) => {
              return `${r.id} - ${r.title}`;
            }),
          },
        ])
        .then(({ employee, roleselect }) => {
          // Extracting numeric IDs from user selections
          let employeeid = employee.split(" ");
          let roleId = roleselect.split(" ");

          // Creating an instance of the Employee class with the selected employee ID
          let selectedEmployee = new Employee(employeeid[0]);

          // Fetching the selected employee's details
          selectedEmployee.getEmployeeById().then((selectedEmployee) => {
            selectedEmployee = selectedEmployee[0];

            // Creating an updated instance of the Employee class with new role information
            let updatedEmployee = new Employee(
              selectedEmployee.id,
              selectedEmployee.first_name,
              selectedEmployee.last_name,
              roleId[0],
              selectedEmployee.manager_id
            );

            // Updating the employee's role
            updatedEmployee.updateEmployee().then(() => {
              console.log(`
              Update was successful!`);

              // Displaying all employees after the update
              viewAllEmployeesMenu();
            });
          });
        });
    });
  });
}

// Exporting functions for external use
module.exports = {
  viewAllEmployeesMenu,
  manageEmployeeMenu,
  addEmployeeMenu,
  updateEmployeeRoleMenu,
};
