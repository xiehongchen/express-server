create table user (
    id int not null primary key auto_increment,
    name varchar(200) not null ,
    password varchar(20) not null,
    avatar longblob,
    token varchar(200)
);