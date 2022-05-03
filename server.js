// Dependencies
const mysql = require("mysql2");
const inquirer = require("inquirer");
const express = require("express");
const cTable = require("console.table");
// hide env contents
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
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

// MAIN MENU PROMPT ========
function mainMenu() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "menu",
        message: "What would you like to do?",
        choices: [
          "View All Departments",
          "View All Roles",
          "View All Employees",
          "View All Managers",
          "Add a Department",
          "Add a Role",
          "Add an Employee",
          "Update an Employee Role",
        ],
      },
    ])
    .then((answer) => {
      // switch cases here
      switch (answer.menu) {
        // when view all dept selected
        case "View All Departments":
          // invoke viewDepts()
          viewDepts();
          break;
        case "View All Roles":
          viewRoles();
          break;
        case "View All Employees":
          viewEmployees();
          break;
        case "View All Managers":
          viewManagers();
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

// VIEW ALL DEPARTMENTS ========
// when view all departments in selected
// then display departments table
function viewDepts() {
  console.log("Viewing all departments");
  // query departments table
  let query = "SELECT * FROM departments";

  db.query(query, (err, res) => {
    if (err) {
      console.log(err);
    } else {
      // show table
      console.table(res);
    }
    // then prompt main menu
    mainMenu();
  });
}

// ADD DEPARTMENT ========
// when add a department is selected
// then prompt for name of dept
// add to database
// query to display table and
function addDept() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "department_name",
        message: "What is the name of the department?",
      },
    ])
    .then((answers) => {
      console.log(answers);
      let query = "INSERT INTO departments SET ?";

      db.query(query, answers, (err, res) => {
        if (err) throw err;
        console.table(res);
        console.log("Department was added to table");
        // prompt main menu
        mainMenu();
      });
    });
}

// VIEW ALL ROLES ========
// when view all roles is selected
// then query to display roles table
function viewRoles() {
  let query =
    "SELECT roles.id, roles.title, roles.salary, departments.department_name AS department FROM roles LEFT JOIN departments ON roles.department_id = departments.id;";
  // query to display roles table
  db.query(query, (err, res) => {
    if (err) throw err;
    console.log("Viewing all roles");
    console.table(res);
    // then ask mainmenu again
    mainMenu();
  });
}

// ADD A ROLE ========
// when add a role is selected
// then prompt to get role info and then update db
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

// VIEW MANAGERS ========
function viewManagers() {
  console.log("Viewing all Managers");
  db.query(
    "SELECT id, concat(first_name, ' ', last_name) AS name FROM employees WHERE manager_id IS NULL",
    (err, res) => {
      console.table(res);
      mainMenu();
    }
  );
}

// VIEW EMPLOYEES ========
// when view all employees is selected
// then query to display employees table
function viewEmployees() {
  console.log("Viewing all employees");
  let query =
    "SELECT employees.id, employees.first_name, employees.last_name, roles.title, departments.department_name AS department, roles.salary FROM employees LEFT JOIN roles ON employees.role_id = roles.id LEFT JOIN departments ON roles.department_id = departments.id;";
  db.query(query, (err, res) => {
    if (err) throw err;
    console.table(res);
  });
  // then display main menu
  mainMenu();
}

// ADD AN EMPLOYEE ========
// when add an employee is selected
function addEmployee() {
  // query database first to get accurate current db information
  let query = "SELECT * FROM roles";
  db.query(query, (err, res) => {
    if (err) throw err;
    console.log(res);
    let rolesArr = res.map((role) => ({
      name: role.title,
      value: role.id,
    }));
    console.log(rolesArr);

    let query2 = "SELECT id FROM employees WHERE manager_id is NULL";
    db.query(query2, (err, res) => {
      if (err) throw err;
      console.log(res);
      let managerArr = res.map((man) => ({
        name: `${man.first_name} ${man.last_name}`,
        value: man.id,
      }));

      inquirer
        .prompt([
          {
            type: "input",
            name: "first_name",
            message: "What is the employee's first name?",
          },
          {
            type: "input",
            name: "last_name",
            message: "What is the employee's last name?",
          },
          {
            type: "list",
            name: "role_id",
            message: "What is the employee's role?",
            choices: [rolesArr],
          },
          {
            type: "list",
            name: "manager_id",
            message: "Who is the employee's manager?",
            choices: [managerArr],
          },
        ])
        .then((answers) => {
          console.log(answers);
          let query = "INSERT INTO employees SET ?;";

          db.query(query, answers, (err, res) => {
            if (err) throw err;
            console.log(res);
            console.log("Successfully added employee");
            mainMenu();
          });
        });
    });
  });
}

// UPDATE AN EMPLOYEE ROLE
function updateEmployee() {
  selectEmployee();
}

function selectEmployee() {
  let query =
    "SELECT employee.id, employee.first_name, employee.last_name, roles.title, department.name AS department, roles.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employees JOIN roles ON employees.role_id = roles.id JOIN department ON department.id = roles.department_id JOIN employee manager ON manager.id = employee.manager_id;";

  db.query(query, (err, res) => {
    if (err) throw err;
    let chosenEmployee = res.map(({ id, first_name, last_name }) => ({
      name: `${first_name} ${last_name}`,
      value: id,
    }));
    console.table(res);

    selectRole(chosenEmployee);
  });
}

function selectRole(chosenEmployee) {
  let query = "SELECT roles.id, roles.title, roles.salary FROM roles;";
  db.query(query, (err, res) => {
    if (err) throw err;
    console.log(res);

    let chosenRole = res.map(({ id, title, salary }) => ({
      name: `${title}`,
      value: id,
      salary: `${salary}`,
    }));
    console.table(res);

    update(chosenEmployee, chosenRole);
  });
}

// UPDATE
function update(chosenEmployee, chosenRole) {
  inquirer
    .prompt([
      {
        type: "list",
        name: "emp_update",
        message: "Which employee's role do you want to update?",
        choices: chosenEmployee,
      },
      {
        type: "list",
        name: "role_update",
        message: "Which role do you want to assign the selected employee?",
        choices: chosenRole,
      },
    ])
    .then((answers) => {
      let query = "UPDATE employees SET role_id = ? WHERE id = ?;";

      db.query(query, [answers.emp_update, answers.role_update], (err, res) => {
        if (err) throw err;
        console.log("Successfully updated employee role");
        console.table(res);
        mainMenu();
      });
    });
}

// BONUS Features to add:
// Update employee managers.

// View employees by manager.

// View employees by department.

// Delete departments, roles, and employees.

// View the total utilized budget of a department&mdash;in other words, the combined salaries of all employees in that department.
