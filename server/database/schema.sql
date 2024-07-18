create table users (
  id int unsigned primary key auto_increment not null,
  email varchar(255) not null unique,
  name varchar(100) not null unique,
  password varchar(255) not null,
  money int default 0,
  admin boolean default false
);
INSERT INTO users (email, name, password, money) VALUES 
('test@gmail.com', "test", "test", 0);

create table characters (
  id int unsigned primary key auto_increment not null,
  name varchar(40) not null unique,
  value int unsigned not null,
  image varchar(255) not null
);

create table users_characters (
  users_id int unsigned not null,
  foreign key(users_id) references users(id) on delete cascade,
  characters_id int unsigned not null,
  foreign key(characters_id) references characters(id) on delete cascade
);
INSERT INTO characters (name, value, image) VALUES 
('Ryu', 0, "https://i.imgur.com/sgsxSU5.jpg"),
('Ken', 0, "https://i.imgur.com/2dG4qdZ.jpg"),
('Guile', 50, "https://i.imgur.com/fYRxHMD.jpg"),
('Chun-li', 50, "https://i.imgur.com/hhz1GBW.jpg");