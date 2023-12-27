-- Departments
INSERT INTO department (name) VALUES
  ('Finance'),
  ('Marketing'),
  ('IT');

-- Roles
INSERT INTO role (title, salary, department_id) VALUES
  ('Finance Manager', 100000, 1),
  ('Senior Accountant', 85000, 1),
  ('Financial Analyst', 70000, 1),
  ('Marketing Director', 95000, 2),
  ('Digital Marketing Specialist', 75000, 2),
  ('Marketing Coordinator', 55000, 2),
  ('Chief Technology Officer', 120000, 3),
  ('Systems Administrator', 80000, 3),
  ('Help Desk Support', 60000, 3);

-- Employees
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
  ('Emily', 'Johnson', 1, NULL), -- Finance Manager (No manager)
  ('Brandon', 'Martinez', 2, 1), -- Senior Accountant (Manager: Emily)
  ('Olivia', 'Anderson', 3, 1), -- Financial Analyst (Manager: Emily)
  ('Ethan', 'Sullivan', 4, NULL), -- Marketing Director (No manager)
  ('Sophia', 'Davis', 5, 4), -- Digital Marketing Specialist (Manager: Ethan)
  ('Jackson', 'Thompson', 6, 4), -- Marketing Coordinator (Manager: Ethan)
  ('Lily', 'Rodriguez', 7, NULL), -- CTO (No manager)
  ('Caleb', 'Miller', 8, 7), -- Systems Administrator (Manager: Lily)
  ('Ava', 'Taylor', 9, 7); -- Help Desk Support (Manager: Lily)
