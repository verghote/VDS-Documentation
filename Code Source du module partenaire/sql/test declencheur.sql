

-- passer en mode strict au niveau de la session
set sql_mode='traditional,only_full_group_by';
set sql_mode = 'ansi';

select @@sql_mode;

select * from partenaire;

# test sur l'ajout

-- test des valeurs null

insert into partenaire (nom, url, fichier)
values (null, 'url', 'fichier');
# [45000][1644] #Le nom doit être renseigné

insert into partenaire (nom, url, fichier)
values ('nom', null, 'fichier');
# [45000][1644] #L'url du partenaire doit être référencée

insert into partenaire (nom, url, fichier)
values ('nom', 'http://vds.fr', null);
# 5000][1644] #L'URI du fichier image doit être renseigné


-- test des valeurs vides
insert into partenaire (nom, url, fichier)
values ('', 'url', 'fichier');
# [45000][1644] #Le nom doit comporter entre 3 et 150 caractères

insert into partenaire (nom, url, fichier)
values ('nom', '', 'fichier');
#[45000][1644] L'url du partenaire nn'est pas valide

insert into partenaire (nom, url, fichier)
values ('nom', 'http://vds.fr', '');
# [45000][1644] #L'URI du fichier image n'est pas valide

-- test des valeurs erronées
insert into partenaire (nom, url, fichier)
values ('nom!', 'http://vds.fr', 'test.png');
# [45000][1644] #Le nom comporte des caractères non autorisés : nom!

insert into partenaire (nom, url, fichier)
values ('nom', 'http://vds', 'test.png');
# [45000][1644] L'url du partenaire nn'est pas valide

insert into partenaire (nom, url, fichier)
values ('nom', 'http://vds.fr', 'test.pdf');
# [45000][1644] #L'URI du fichier image n'est pas valide

-- controle d'unicité
select * from partenaire;
insert into partenaire (nom, url, fichier)
values ('courses 80', 'http://vds.fr', 'test.pdf');
# [45000][1644] #Ce partenaire est déjà référencé.

insert into partenaire (nom, url, fichier)
values ('courses', 'https://courses80.fr', 'test.pdf');
# [45000][1644] #Ce partenaire est déjà référencé

insert into partenaire (nom, url, fichier)
values ('courses', 'https://courses.fr', 'courses80.png');
# [45000][1644] #Cette image est déjà référencée

# Test sur la modification
select * from partenaire;


-- test des valeurs null

update partenaire set id = null where id = 1;
# [45000][1644] #L'identifiant ne peut être modifié

update partenaire set nom = null where id = 1;
# [45000][1644] #Le nom doit être renseigné

update partenaire set url = null where id = 1;
# [45000][1644] #L'url du partenaire doit être renseignée

update partenaire set fichier = null where id = 1;
# [45000][1644] #L'URI du fichier image n'est pas modifiable


-- test des valeurs vides

update partenaire set id = '' where id = 1;
# [45000][1644] #L'identifiant ne peut être modifié

update partenaire set nom = '' where id = 1;
# [45000][1644] #Le nom doit comporter entre 3 et 50 caractères

update partenaire set url = '' where id = 1;
# [45000][1644] #L'URL du partenaire n'est pas valide

update partenaire set fichier = '' where id = 1;
# [45000][1644] #L'URI du fichier image n'est pas modifiable



-- test des valeurs erronées
update partenaire set id = 'a' where id = 1;
# [45000][1644] #L'identifiant ne peut être modifié

update partenaire set nom = 'nom!' where id = 1;
# [45000][1644] #Le nom comporte des caractères non autorisés : nom!

update partenaire set url = 'http/test.fr' where id = 1;
# [45000][1644] #L'URL du partenaire n'est pas valide

update partenaire set fichier = 'test.pdf' where id = 1;
# [45000][1644] #L'URI du fichier image n'est pas modifiable

select * from partenaire;