create table users (
  id int unsigned primary key auto_increment not null,
  email varchar(255) not null unique,
  name varchar(100) not null unique,
  password varchar(255) not null,
  money int unsigned,
  admin boolean default false
);

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
('Ryu', 0, "https://imgur.com/sgsxSU5"),
('Ken', 0, "https://imgur.com/2dG4qdZ"),
('Guile', 50, "https://imgur.com/fYRxHMD"),
('Chun-li', 50, "https://imgur.com/hhz1GBW");