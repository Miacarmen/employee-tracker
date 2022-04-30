const mysql = require('mysql2');
const inquirer = require('inquirer');
const cTable = require('console.table');

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json());
app.use(expess.urlencoded({ extended: true }));

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