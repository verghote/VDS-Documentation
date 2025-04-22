use ppe;

set default_storage_engine = innodb;

drop table if exists partenaire;

create table partenaire
(
    id      int          auto_increment primary key,
    nom     varchar(50)  not null unique,
    url     varchar(150) not null unique,
    fichier varchar(70)  not null
);

