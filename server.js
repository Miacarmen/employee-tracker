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

// Prompt questions
inquirer.prompt({
  type: "list",
  name: "start",
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
  when: (answers) => {
    // when view all departments is selected
    if (answers.choices === "View All Departments") {
      // then display the departments table
    }
    // when view all roles is selected
    else if (answers.choices === "View All Roles") {
      // then display the roles table
    } 
    // when view all employees is selected
    else if (answers.choices === "View All Employees") {
        // then display the employee_data table
    } 
    // when add a department is selected
    else if (answers.choices === "Add a Department") {
        // then prompt to enter name of department
        inquirer.prompt({
            type: "input",
            name: "department",
            message: "What is the name of the department?"
        }).then((answer) =>{
            // then add to the database
            console.log('Added Service to the Database');
        });
        
    }
    // when add a role is selected
    else if(answers.choices === "Add a Role") {
        // then prompt to enter the name, salary, and department for the role
        // then add to the database
    }
    // when add an employee is selected
    else if(answers.choices === "Add an Employee") {
        // then prompt to enter first_name, last_name, role, and manager
        // then add employee to database
    }
    // when update an employee role is selected
    else if(answers.choices === "Update an Employee Role") {
        // then prompt to select an employee to update
        // then add updated employee_data in the database
    }
  }
  
})
.then((answers) => {

});


