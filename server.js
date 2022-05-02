// Dependencies
const mysql = require("mysql2");
const inquirer = require("inquirer");
const cTable = require("console.table");
const express = require("express");
const PORT = process.env.PORT || 3001;

// Middleware
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

const db = mysql.createConnection(
  {
    host: "localhost",
    user: "root",
    password: "password",
    database: "employee_db",
  },
  console.log("Connected to the employee database")
);

// Routes

// Main Menu Prompt
function mainMenu() {
  inquirer.prompt(
    {
      type: "list",
      name: "action",
      message: "What would you like to do?",
      choices: [
        "View All Departments",
        "View All Roles",
        "View All Employees",
        "Add a Department",
        "Add a Role",
        "Add an Employee",
        "Updated an Employee Role",
      ],
    }.then((answers) => {
      // when view all departments is selected
      if (answers.action === "View all Departments") {
        let query = "SELECT * FROM company_employees.departments";
        // display the departments table
        db.query(query, (err, res) => {
          if (err) throw err;
          console.table(res);
          mainMenu();
        });
        // when view all roles is selected
      } else if (answers.action === "View all Roles") {
        let query = "SELECT * FROM company_employees.roles";
        // display the roles table
        db.query(query, (err, res) => {
          if (err) throw err;
          console.table(res);
          mainMenu();
        });
        // when view all employees is selected
      } else if (answers.action === "View all Employees") {
        let query = "SELECT * FROM company_employees.employees";
        // display the employees table
        db.query(query, (err, res) => {
          if (err) throw err;
          console.table(res);
          mainMenu();
        });
      }
    })
  );
}

function actions () {};

// Prompt Questions
function addDepartment() {
  inquirer.prompt(
    {
      // prompt to enter name of department
      type: "input",
      name: "dept_name",
      message: "What is the name of the department?",
      // when add a department is selected
      when: (answers) => answers.mainmenu === "Add a Department",
      // then add to the database
    }.then((answers) => {
      // then ask mainmenu again
      mainmenu();
    })
  );
}

function addRole() {
  inquirer.prompt(
    {
      // prompt to enter role name
      type: "input",
      name: "role_name",
      message: "What is the name of the role?",
      // when add a role is selected
      when: (answers) => answers.mainmenu === "Add a Role",
      // then add to the database
    },

    {
      // prompt to enter role salary
      type: "input",
      name: "role_salary",
      message: "What is the salary for the role?",
      // when add a role is selected
      when: (answers) => answers.mainmenu === "Add a Role",
    },

    {
      // prompt to enter role department
      type: "list",
      name: "role_dept",
      message: "What department does the role belong to?",
      choices: [Engineering, Finance, Legal, Sales, Service],
      // when add a role is selected
      when: (answers) => answers.mainmenu === "Add a Role",
      // then add to the database
    }.then((answers) => {
      mainmenu();
    })
  );
}

function addEmployee() {
  inquirer.prompt(
    {
      // prompt to enter employee first_name, last_name, role, and manager
      type: "input",
      name: "emp_firstname",
      message: "What is the employee's first name?",
      // when add an employee is selected
      when: (answers) => answers.mainmenu === "Add an employee",
    },

    {
      // prompt to enter employee last_name
      type: "input",
      name: "emp_lastname",
      message: "What is the employee's last name?",
      // when add an employee is selected
      when: (answers) => answers.mainmenu === "Add an employee",
    },

    {
      // prompt to enter employee role
      type: "list",
      name: "emp_role",
      message: "What is the employee's role?",
      choices: [
        "Sales Lead",
        "Salesperson",
        "Lead Engineer",
        "Software Engineer",
        "Account Manager",
        "Accountant",
        "Legal Team Lead",
        "Lawyer",
        "Customer Service",
      ],
      // when add an employee is selected
      when: (answers) => answers.mainmenu === "Add an employee",
    },

    {
      // prompt to enter employee's manager
      type: "list",
      name: "emp_manager",
      message: "Who is the employee's manager?",
      choices: ["None"],
      // when add an employee is selected
      when: (answers) => answers.mainmenu === "Add an employee",
      // then add employee to database
    }
  );
}

function updateEmployee() {
  inquirer.prompt(
    {
      // prompt to select an employee to update
      type: "list",
      name: "update",
      message: "Which employee's role do you want to update?",
      choices: [],
      // when update an employee role is selected
      when: (answers) => answers.mainmenu === "Update an Employee Role",
    },

    {
      // prompt to update employee role
      type: "list",
      name: "role_update",
      message: "Which role do you want to assign the selected employee?",
      choices: [],
      // when update an employee role is selected
      when: (answers) => answers.mainmenu === "Update an Employee Role",
      // then add updated employee_data in the database
    }.then((answers) => {})
  );
}
