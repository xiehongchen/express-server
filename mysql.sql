CREATE TABLE people (
  id INT PRIMARY KEY,
  name VARCHAR(255),
  age INT,
  city VARCHAR(255)
);

INSERT INTO people (id, name, age, city)
VALUES (1, 'John Doe', 25, 'New York'),
       (2, 'Jane Smith', 30, 'London'),
       (3, 'Mike Johnson', 35, 'Paris');