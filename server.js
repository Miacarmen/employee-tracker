// Dependencies
const mysql = require("mysql2");
const inquirer = require("inquirer");
const cTable = require("console.table");
require("dotenv").config();

// establishing connection parameters
const db = mysql.createConnection(
  {
    host: "localhost",
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
  },
  console.log("Connected to the employee database")
);

// connect to db and initialize main menu
db.connect(function (err) {
  if (err) throw err;
  mainMenu();
});

// Main Menu Prompt

function mainMenu() {
  console.log("Welcome!");
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
        default:
          // "else"
          db.end();
          break;
      }
    });
}

// Prompt Questions

// when view all departments in selected
function viewDepts() {
  console.log("Viewing all departments");
  let query = "SELECT * FROM departments";

  db.query(query, (err, res) => {
    if (err) {
      console.log(err);
    } else {
      console.table(res);
    }
    mainMenu();
  });
}

// when add a department is selected
function addDept() {
  inquirer
    .prompt({
      type: "input",
      name: "department_name",
      message: "What is the name of the department?",
    })
    .then((answers) => {
      console.log(answers);
      let query = "INSERT INTO departments SET ?";

      db.query(query, answers, (err, res) => {
        if (err) throw err;
        console.log(res);
        console.log("Department was added to table");
        mainMenu();
      });
    });
}

// when view all roles is selected
function viewRoles() {
  console.log("Viewing all roles");
  let query =
    "SELECT roles.id, roles.title, roles.salary, departments.department_name AS department FROM roles LEFT JOIN departments ON roles.department_id = departments.id";
  // query to display roles table
  db.query(query, (err, res) => {
    if (err) throw err;
    console.table(res);
    // then ask mainmenu again
    mainMenu();
  });
}

// when add a role is selected
function addRole() {
  // query database to get accurate current information
  let query = "SELECT * FROM departments";
  db.query(query, (err, res) => {
    if (err) throw err;
    console.log(res);
    let departmentArr = res.map((dpt) => ({
      name: dpt.department_name,
      value: dpt.id,
    }));
    console.log(departmentArr);

    inquirer
      .prompt([
        {
          type: "input",
          name: "title",
          message: "What is the name of the role?",
        },
        {
          type: "number",
          name: "salary",
          message: "What is the salary for the role?",
        },
        {
          type: "list",
          name: "department_id",
          message: "What department does the role belong to?",
          choices: departmentArr,
        },
      ])
      .then((answers) => {
        console.log(answers);
        let query = "INSERT INTO roles SET ?";
        // answers replaces the escape ?
        db.query(query, answers, (err, res) => {
          if (err) throw err;
          console.log(res);
          console.log("Successfully added role");
          mainMenu();
        });
      });
  });
}

// when view all employees is selected
function viewEmployees() {
  console.log("Viewing all employees");
  let query =
    "SELECT employees.id, employees.first_name, employees.last_name, roles.title, departments.department_name AS department, roles.salary FROM employees LEFT JOIN roles ON employees.role_id = roles.id LEFT JOIN departments ON roles.department_id = departments.id;";
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
      choices: ["None", ""],
      // then add employee to database
    }
  );
}

// when update an employee role is selected
function updateEmployee() {
  inquirer
    .prompt([
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
        // then add updated employee's data in the database
      },
    ])
    .then((answers) => {

    });
}
