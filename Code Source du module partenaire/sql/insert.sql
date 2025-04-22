use ppe;

set @@sql_mode='ansi';

delete from partenaire;

# remettre le compteur à 1
ALTER TABLE partenaire auto_increment = 1;

insert into partenaire (nom, url, fichier)
values ('Courses 80', 'https://courses80.fr', 'courses80.png'),
       ('Comité départemental d\'athlétisme de la Somme', 'http://cda80.athle.com', 'cd80.png'),
       ('Info Running en Picardie', 'http://info-running-pic.com', 'running.png'),
       ('Klikego', 'https://www.klikego.com', 'klikego.jpg'),
       ('Amiens métropole', 'https://www.amiens.fr/index.php', 'amiens.png'),
       ('Conseil départemental de la Somme', 'https://www.somme.fr/', 'somme.png'),
       ('Région Haut de France', 'https://www.hautsdefrance.fr/', 'hautdefrance.png');



