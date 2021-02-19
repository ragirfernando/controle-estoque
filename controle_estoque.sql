create database controle_estoque;
use controle_estoque;

create table usuario(
	id int not null primary key auto_increment,
    nome varchar(200) not null,
    email varchar(200) unique not null,
    senha varchar(200) not null    
);

create table produto(
	id int not null primary key auto_increment,
    nome varchar(200) not null,
    preco float(8,2) not null,
    quantidade int not null
);

create table movimentacao(
	id int not null primary key auto_increment,
    data_hora datetime not null,
	id_usuario int not null,
	id_produto int not null,
    tipo varchar(200) not null,
    quantidade_old int not null,
    quantidade_new int not null,
    foreign key(id_usuario) references usuario(id),
    foreign key(id_produto) references produto(id)
);

