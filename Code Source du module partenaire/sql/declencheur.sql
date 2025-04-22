use ppe;

drop trigger if exists avantAjoutPartenaire;
drop trigger if exists avantModificationPartenaire;

create trigger avantAjoutPartenaire before insert on partenaire
for each row
begin
    declare msg varchar(255);
    # contrôle de la colonne id
    if new.id not regexp '^[0-9]+$' or exists (select 1 from partenaire where id = new.id) then
        signal sqlstate '45000' set message_text = '#L''identifiant n''est pas valide';
    end if;

    # contrôle de la colonne nom
    if new.nom is null then
        signal sqlstate '45000' set message_text = '#Le nom doit être renseigné';
    end if;
    # le nom doit comporter entre 3  et 50 caractères
    if char_length(new.nom) not between 3 and 50 then
        signal sqlstate '45000' set message_text = '#Le nom doit comporter entre 3 et 50 caractères';
    end if;
    # le nom doit respecter l'expression régulière suivante
    if new.nom not regexp '^[0-9A-Za-zÀÁÂÃÄÅÇÈÉÊËÌÍÎÏÒÓÔÕÖÙÚÛÜÝàáâãäåçèéêëìíîïðòóôõöùúûüýÿ](?:[/,'' \-]?[0-9A-Za-zÀÁÂÃÄÅÇÈÉÊËÌÍÎÏÒÓÔÕÖÙÚÛÜÝàáâãäåçèéêëìíîïðòóôõöùúûüýÿ])*?$' then
        set msg = concat('#Le nom comporte des caractères non autorisés : ', new.nom);
        signal sqlstate '45000' set message_text = msg;
    end if;
    -- On vérifie si le partenaire existe déjà
    if exists(select 1 from partenaire where nom = new.nom) then
        signal sqlstate '45000' set message_text = '#Ce partenaire est déjà référencé.';
    end if;

    # contrôle sur la colonne url
    if new.url is null then
        signal sqlstate '45000' set message_text = '#L\'url du partenaire doit être renseignée';
    end if;
    if new.url not regexp '^http:\/\/|https:\/\/(www.)?(([a-zA-Z0-9-]){2,}\.){1,4}([a-zA-Z]){2,6}(\/([a-zA-Z-_\/\.0-9#:?=&;,]*)?)?' then
        signal sqlstate '45000' set message_text = '#L\'URL du partenaire n''est pas valide';
    end if;

    if exists(select 1 from partenaire where url = new.url) then
        signal sqlstate '45000' set message_text = '#Ce partenaire est déjà référencé';
    end if;

    # contrôle de la colonne fichier
    if new.fichier is null then
        signal sqlstate '45000' set message_text = '#L\'URI du fichier image doit être renseigné';
    end if;
    # contrôle du format du fichier image : des lettres, des chiffres, des espaces et se terminer par une extension jpg, png, webp ou avif'
    if new.fichier not regexp '^[a-z0-9 -]+\\.(jpg|png|webp|avif)$' then
        signal sqlstate '45000' set message_text = '#L\'URI du fichier image n''est pas valide';
    end if;
    if exists(select 1 from partenaire where fichier = new.fichier) then
        signal sqlstate '45000' set message_text = '#Cette image est déjà référencée';
    end if;
end

create trigger avantModificationPartenaire before update on partenaire
for each row
begin
    declare msg varchar(255);
    # L'identifiant n'est pas modifiable
    if new.id is null or new.id != old.id then
        signal sqlstate '45000' set message_text = '#L\'identifiant ne peut être modifié';
    end if;
    # contrôle de la colonne nom
    if new.nom is null then
        signal sqlstate '45000' set message_text = '#Le nom doit être renseigné';
    end if;
    # le nom doit comporter entre 3  et 50 caractères
    if char_length(new.nom) not between 3 and 50 then
        signal sqlstate '45000' set message_text = '#Le nom doit comporter entre 3 et 50 caractères';
    end if;
    # le nom doit respecter l'expression régulière suivante
    if new.nom not regexp '^[0-9A-Za-zÀÁÂÃÄÅÇÈÉÊËÌÍÎÏÒÓÔÕÖÙÚÛÜÝàáâãäåçèéêëìíîïðòóôõöùúûüýÿ](?:[/,'' \-]?[0-9A-Za-zÀÁÂÃÄÅÇÈÉÊËÌÍÎÏÒÓÔÕÖÙÚÛÜÝàáâãäåçèéêëìíîïðòóôõöùúûüýÿ])*?$' then
        set msg = concat('#Le nom comporte des caractères non autorisés : ', new.nom);
        signal sqlstate '45000' set message_text = msg;
    end if;
    if new.nom != old.nom then
        if exists (select 1 from partenaire where nom = new.nom) then
            signal sqlstate '45000' set message_text = '#Un autre partenaire possède déjà ce nom ';
        end if;
    end if;
    # contrôle sur la colonne url
    if new.url is null then
        signal sqlstate '45000' set message_text = '#L\'URL du partenaire doit être renseignée';
    end if;
    if new.url not regexp '^http:\/\/|https:\/\/(www.)?(([a-zA-Z0-9-]){2,}\.){1,4}([a-zA-Z]){2,6}(\/([a-zA-Z-_\/\.0-9#:?=&;,]*)?)?' then
        signal sqlstate '45000' set message_text = '#L\'URL du partenaire n''est pas valide';
    end if;
    if new.url != old.url then
        if exists (select 1 from partenaire where url = new.url) then
            signal sqlstate '45000' set message_text = '#Un autre partenaire possède déjà cette URL ';
        end if;
    end if;
    # contrôle de la colonne fichier
    if new.fichier is null or new.fichier != old.fichier then
        signal sqlstate '45000' set message_text = '#L\'URI du fichier image n''est pas modifiable';
    end if;
end
