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

db.connect(function (err) {
  if (err) throw err;
  mainMenu();
});

// Main Menu Prompt
function mainMenu() {
  inquirer
    .prompt({
      type: "list",
      name: "menu",
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
    })
    .then((answer) => {
      // switch cases here
      switch (answer.menu) {
        case "View All Departments":
          viewDepts();
          break;
        case "View All Roles":
          viewRoles();
          break;
        case "View All Employees":
          viewEmployees();
          break;
        case "Add a Department":
          addDept();
          break;
        case "Add a Role":
          addRole();
          break;
        case "Add an Employee":
          addEmployee();
          break;
        case "Update an Employee Role":
          updateEmployee();
          break;
      }
    });
}

function viewDepts() {
  console.log("Viewing all departments");
  let query = "SELECT * FROM company_db.departments";

  db.query(query, (err, res) => {
    if (err) {
      console.log(err);
    } else {
      console.table(res);
    }
    mainMenu();
  });
}

// Prompt Questions
function addDept() {
  inquirer.prompt(
    {
      type: "input",
      name: "dept_name",
      message: "What is the name of the department?",
    }.then((answers) => {
      // then ask mainmenu again
      mainmenu();
    })
  );
}

function viewRoles() {
  console.log("Viewing all roles");
  let query =
    "SELECT roles.id, roles.title, roles.salary, department.name AS department FROM company_db.roles";
  // query to display roles table
  db.query(query, (err, res) => {
    if (err) throw err;
    console.table(res);
  });
  mainMenu();
}

function addRole() {
  inquirer
    .prompt(
      {
        // prompt to enter role title
        type: "input",
        name: "role_name",
        message: "What is the name of the role?",
        // then add to the database
      },

      {
        // prompt to enter role salary
        type: "input",
        name: "role_salary",
        message: "What is the salary for the role?",
      },

      {
        // prompt to enter role department
        type: "list",
        name: "role_dept",
        message: "What department does the role belong to?",
        choices: [
          Engineering,
          Finance,
          Legal,
          Operations,
          Management,
          Marketing,
          Sales,
          Service,
        ],
      }
    )
    .then((answers) => {
      mainmenu();
    });
}

function viewEmployees() {
  console.log("Viewing all employees");
  let query =
    "SELECT employees.id, employees.first_name, employees.last_name, roles.title, department_name AS department, roles.salary";
  db.query(query, (err, res) => {
    if (err) throw err;
    console.table(res);
  });
  mainMenu();
}

// when add an employee is selected
function addEmployee() {
  inquirer.prompt(
    {
      type: "input",
      name: "emp_firstname",
      message: "What is the employee's first name?",
    },

    {
      type: "input",
      name: "emp_lastname",
      message: "What is the employee's last name?",
    },

    {
      type: "list",
      name: "emp_role",
      message: "What is the employee's role?",
      choices: [
        "Sr Software Engineer",
        "Jr Software Engineer",
        "Cybersecurity",
        "Accounts Manager",
        "Accountant",
        "Legal Team Lead",
        "Lawyer",
        "HR",
        "Operations Manager",
        "Marketing Director",
        "Brand Manager",
        "Sales Lead",
        "Sales Consultant",
        "Customer Service",
      ],
    },

    {
      type: "list",
      name: "emp_manager",
      message: "Who is the employee's manager?",
      choices: ["None"],
      // then add employee to database
    }
  );
}

// when update an employee role is selected
function updateEmployee() {
  inquirer.prompt(
    {
      type: "list",
      name: "update",
      message: "Which employee's role do you want to update?",
      choices: [],
    },
    {
      type: "list",
      name: "role_update",
      message: "Which role do you want to assign the selected employee?",
      choices: [],
      // then add updated employee_data in the database
    }.then((answers) => {})
  );
}
