-- create table user (
--     id int not null primary key auto_increment,
--     name varchar(200) not null ,
--     password varchar(20) not null,
--     avatar longblob,
--     token varchar(200)
-- );

CREATE TABLE tags (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255),
  number INT
);

INSERT INTO tags (title, number) VALUES
  ('css', 12),
  ('html', 8),
  ('javascript', 15),
  ('python', 10),
  ('java', 5),
  ('php', 7),
  ('ruby', 3),
  ('c++', 9),
  ('c#', 6),
  ('swift', 2),
  ('typescript', 11),
  ('sql', 13),
  ('mongodb', 4),
  ('react', 16),
  ('angular', 14),
  ('vue', 17),
  ('node.js', 20),
  ('express', 18),
  ('django', 19),
  ('laravel', 1);


CREATE TABLE blogList (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255),
  introduction TEXT,
  author VARCHAR(255),
  imgUrl VARCHAR(255),
  time DATE,
  tag VARCHAR(255)
);

