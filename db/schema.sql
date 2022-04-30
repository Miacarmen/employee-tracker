DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;

USE employee_db;

CREATE TABLE employees (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT,
  -- reference to another employee that is the manager of the current employee (`null` if the employee has no manager)
  manager_id INT
);

CREATE TABLE roles (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(30),
  salary DECIMAL,
  department_id INT
);

CREATE TABLE departments (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(30) NOT NULL
);


-- update employee managers

-- view employees by manager

-- view employees by department

-- delete departments, roles, and employees

-- view total utilized budget of a department (combined employee salaries)