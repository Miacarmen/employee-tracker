// Dependencies
const mysql = require('mysql2');
const inquirer = require('inquirer');
const cTable = require('console.table');
const express = require('express');
const PORT = process.env.PORT || 3001;

// Middleware
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'password',
        database: 'employee_db',
    },
    console.log('Connected to the employee database')
);


// Routes




// Prompt questions
inquirer
.prompt(
    {
    type: "list",
    name: "start",
    message: "What would you like to do?",
    choices: ["View All Employees", "Add Employee", "Update Employee Role", "View All Roles", "Add Role", "View All Departments", "Add Department"]
    // 
},

{
    type: "",
    name: "",
    message: "",
    choices: []
},

{
    type: "",
    name: "",
    message: "",
    choices: []
},

{
    type: "",
    name: "",
    message: "",
    choices: []
},

{
    type: "",
    name: "",
    message: "",
    choices: []
},

{
    type: "",
    name: "",
    message: "",
    choices: []
},

{
    type: "",
    name: "",
    message: "",
    choices: []
},


);