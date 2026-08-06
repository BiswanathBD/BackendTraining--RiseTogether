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

-- insert data into the table
INSERT INTO users (name, email, age, Country)
VALUES 
('Babu', 'babu@gmail.com', 25, 1),
('Habu', 'habu@gmail.com', 30, 2),
('Kabu', 'kabu@gmail.com', 35, 3),
('Labu', 'labu@gmail.com', 40, 4),
('Mabu', 'mabu@gmail.com', 45, 5);

-- insert data into country table
INSERT INTO country (country_name)
VALUES 
('India'),
('USA'),
('Canada'),
('UK'),
('Australia');

-- get all data from users table
SELECT * FROM users;

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

