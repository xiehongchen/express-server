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

CREATE TABLE classList (
  id INT AUTO_INCREMENT PRIMARY KEY,
  imgUrl VARCHAR(255),
  title VARCHAR(255),
  number INT
);

CREATE TABLE blogList (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255),
  introduction VARCHAR(255),
  author VARCHAR(255),
  imgUrl VARCHAR(255),
  time VARCHAR(255),
  tag VARCHAR(255)
);


INSERT INTO classList (imgUrl, title, number)
VALUES
  ('image1.jpg', 'Python', 10),
  ('image2.jpg', 'CSS', 15),
  ('image3.jpg', 'JavaScript', 8),
  ('image4.jpg', 'HTML', 12),
  ('image5.jpg', 'Java', 20),
  ('image6.jpg', 'C++', 5),
  ('image7.jpg', 'SQL', 18),
  ('image8.jpg', 'Ruby', 9),
  ('image9.jpg', 'PHP', 14),
  ('image10.jpg', 'Swift', 7),
  ('image11.jpg', 'R', 11),
  ('image12.jpg', 'Angular', 16),
  ('image13.jpg', 'React', 3),
  ('image14.jpg', 'Node.js', 19),
  ('image15.jpg', 'TypeScript', 6),
  ('image16.jpg', 'C#', 13),
  ('image17.jpg', 'Scala', 17),
  ('image18.jpg', 'Kotlin', 4),
  ('image19.jpg', 'Go', 2),
  ('image20.jpg', 'Ruby on Rails', 1);

INSERT INTO blogList (id, title, introduction, author, imgUrl, time, tag)
VALUES
  (1, '123', '只要卡住这个17毫秒，每隔17毫秒进行操作，就能确保动画丝滑dsad大大大大adddd啊实打实大师大师d啊实打实大师dddddddddsad撒啊实打实大师大多asdasss', 'xie', '@/assets/vue.svg', '2000-10-1', 'abc,bda,dada'),
  (2, '123', '只要卡住这个17毫秒，每隔17毫秒进行操作，就能确保动画丝滑', 'xie', '@/assets/vue.svg', '2000-10-1', 'abc,bda,dada'),
  (3, '123', '只要卡住这个17毫秒，每隔17毫秒进行操作，就能确保动画丝滑', 'xie', '@/assets/vue.svg', '2000-10-1', 'abc,bda,dada'),
  (4, '123', '只要卡住这个17毫秒，每隔17毫秒进行操作，就能确保动画丝滑', 'xie', '@/assets/vue.svg', '2000-10-1', 'abc,bda,dada'),
  (5, '123', '只要卡住这个17毫秒，每隔17毫秒进行操作，就能确保动画丝滑', 'xie', '@/assets/vue.svg', '2000-10-1', 'abc,bda,dada'),
  (6, '123', '只要卡住这个17毫秒，每隔17毫秒进行操作，就能确保动画丝滑', 'xie', '@/assets/vue.svg', '2000-10-1', 'abc,bda,dada'),
  (7, '123', '只要卡住这个17毫秒，每隔17毫秒进行操作，就能确保动画丝滑', 'xie', '@/assets/vue.svg', '2000-10-1', 'abc,bda,dada'),
  (8, '123', '只要卡住这个17毫秒，每隔17毫秒进行操作，就能确保动画丝滑', 'xie', '@/assets/vue.svg', '2000-10-1', 'abc,bda,dada'),
  (9, '123', '只要卡住这个17毫秒，每隔17毫秒进行操作，就能确保动画丝滑', 'xie', '@/assets/vue.svg', '2000-10-1', 'abc,bda,dada'),
  (10, '123', '只要卡住这个17毫秒，每隔17毫秒进行操作，就能确保动画丝滑', 'xie', '@/assets/vue.svg', '2000-10-1', 'abc,bda,dada'),
  (11, '11', '只要卡住这个17毫秒，每隔17毫秒进行操作，就能确保动画丝滑', 'xie', '@/assets/vue.svg', '2000-10-1', 'abc,bda,dada');

