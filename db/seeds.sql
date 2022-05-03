
INSERT INTO departments (department_name)
VALUES 
("Engineering"),
("Finance"),
("Legal"),
("Operations"),
("Marketing"),
("Sales"),
("Service");


INSERT INTO roles (title, salary, department_id)
VALUES ("Sr Software Engineer", 120000, 1),
("Jr Software Engineer", 85000, 1),
("Cybersecurity", 98000, 1),
("Accounts Manager", 123000, 2),
("Accountant", 65000, 2),
("Legal Team Lead", 87000, 3),
("Lawyer", 162000, 3),
("HR", 58000, 4),
("Operations Manager", 118000, 4),
("Marketing Director", 115000, 5),
("Brand Manager", 110000, 5),
("Sales Lead", 55000, 6),
("Sales Consultant", 61000, 6),
("Customer Service", 40000, 7);


INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES 
("Louis", "Bloom", 1, null),
("Robert", "Graysmith", 2, 1),
("Jack", "Twist", 3, null),
("Brian", "Taylor", 4, null),
("Naomi", "Lapaglia", 5, 4),
("Tony", "Hastings", 5, 4),
("Jane", "Smith", 6, null),
("Jamie", "Randall", 7, 6),
("Jimmy", "Livingston", 8, null),
("Sara", "Wayland", 9, null),
("Billy", "Hope", 10, null),
("Evelyn", "Salt", 11, 9),
("Lisa", "Rowe", 12, 10);