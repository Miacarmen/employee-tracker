DROP DATABASE IF EXISTS company_db;
CREATE DATABASE company_db;

USE company_db;

CREATE TABLE departments (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  department_name VARCHAR(30)
);

CREATE TABLE roles (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(50),
  salary DECIMAL(10, 1),
  department_id INT,
  
  FOREIGN KEY (department_id)
  REFERENCES departments(id)
  ON DELETE SET NULL
);

CREATE TABLE employees (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(100),
  last_name VARCHAR(30),
  role_id INT,
  manager_id INT,

  FOREIGN KEY (role_id)
  REFERENCES roles(id)
  ON DELETE SET NULL,
   
  FOREIGN KEY (manager_id) 
  REFERENCES employees(id)
  ON DELETE SET NULL
);




-- * Bonus features to add
-- update employee managers

-- view employees by manager

-- view employees by department

-- delete departments, roles, and employees

-- view total utilized budget of a department (combined employee salaries)