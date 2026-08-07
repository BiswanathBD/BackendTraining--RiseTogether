-- create table with type
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    age INT,
    -- foreign key reference to country table
    Country INTEGER REFERENCES country(country_id)
);

CREATE TABLE country (
    country_id SERIAL PRIMARY KEY,
    country_name TEXT NOT NULL
);

--delete table
DROP TABLE users;
DROP TABLE country;

-- insert data into country table
INSERT INTO country (country_name)
VALUES 
('Bangladesh'),
('India'),
('USA'),
('Canada'),
('UK'),
('Australia');

-- insert data into the table
INSERT INTO users (name, email, age, Country)
VALUES 
('Rakib', 'rakib@gmail.com', 35, 1)
('Babu', 'babu@gmail.com', 25, 1),
('Habu', 'habu@gmail.com', 30, 2),
('Kabu', 'kabu@gmail.com', 35, 3),
('Labu', 'labu@gmail.com', 40, 4),
('Mabu', 'mabu@gmail.com', 45, 5);

-- get all data from users/country table
SELECT * FROM users;
SELECT * FROM country;

-- join users and country table
SELECT users.name, users.email, users.age, country.country_name
FROM users
JOIN country ON users.Country = country.country_id;

-- update data in user table
UPDATE users
SET
name = 'Babu Updated',
email = 'babu.updated@gmail.com',
age = 26,
Country = 1
WHERE user_id = 1;

-- delete data from user table
DELETE FROM users
WHERE name = 'Habu'; --it's case sensitive
-- WHERE user_id = 2;

-- and operator
SELECT * FROM users
WHERE age > 30 AND Country = 3;

-- or operator
SELECT * FROM users
WHERE age < 30 OR Country = 4;

-- not operator
SELECT * FROM users
WHERE NOT age = 25;

-- between operator
SELECT * FROM users
WHERE age BETWEEN 30 AND 40;

-- search by like include
SELECT * FROM users
WHERE name like '%b%'; --case sensitive

-- search by Ilike include
SELECT * FROM users
WHERE name Ilike '%B%'; --case insensitive

-- search by Ilike start with
SELECT * FROM users
WHERE name like 'B%';

-- search by like end with
SELECT * FROM users
WHERE name like '%b';

-- sorting
SELECT * FROM users
ORDER BY age desc

-- limit (pagination use)
SELECT * FROM users
LIMIT 2
OFFSET 1

-- aggregate (count)
SELECT COUNT(*) FROM users

-- aggregate (sum)
SELECT SUM(age) FROM users

-- aggregate (average)
SELECT AVG(age) FROM users

-- aggregate (count)
SELECT MAX(age) FROM users

-- group
SELECT
    c.country_name,
    COUNT(*) AS total_users
FROM users u
JOIN country c
ON u.country = c.country_id
GROUP BY c.country_name;
SELECT MAX(age) FROM users

-- having
SELECT age,
COUNT (*) FROM users
GROUP BY age
HAVING COUNT(*)>1

--  aliases
SELECT name as User_Name, age as Age FROM users

-- inner join
SELECT
    u.name,
    c.country_name
FROM users u
INNER JOIN country c
ON u.country = c.country_id;

-- left join
SELECT
    u.name,
    c.country_name
FROM users u
LEFT JOIN country c
ON u.country = c.country_id;

-- right join
SELECT
    u.name,
    c.country_name
FROM users u
RIGHT JOIN country c
ON u.country = c.country_id;

-- full join
SELECT
    u.name,
    c.country_name
FROM users u
FULL JOIN country c
ON u.country = c.country_id;

