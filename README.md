
# GROUPOMANIA - Réseau social

Ce projet à été réalisé dans le cadre de la formation de Développeur Web d'OpenClassrooms. 
Ce projet consiste à construire un réseau social interne pour les employés de Groupomania facilitant 
ainsi les interactions entre collègues. Le département RH de Groupomania a laissé libre cours à son imagination 
pour les fonctionnalités du réseau et a imaginé plusieurs possibilités pour favoriser les échanges entre collègues.

##### Les contraintes :
- Utilisation d'une base de données relationnelles avec SQL
- Utilisation d'un Framework javascript au choix pour le Front-End

## Fonctionnalitées

Ce réseau social à été créé avec les fonctionnalitées CRUD.

<table border="0" width="100%">
 <tr>
    <td><b style="font-size:30px">Utilisateur :</b></td>
    <td><b style="font-size:30px">Publication :</b></td>
 </tr>
 <tr>
    <td>
      <ul>
        <li>Créer un compte</li>
        <li>Se connecter avec son compte</li>
        <li>Supprimer un compte</li>
        <li>Modifier son profil</li>
        <li>Voir tous les utilisateurs</li>
      </ul>
    </td>
    <td>
      <ul>
        <li>Créer un post</li>
        <li>Modifier un post</li>
        <li>Supprimer un post</li>
        <li>Voir tous les posts</li>
        <li>Voir un seul post</li>
      </ul>
    </td>
 </tr>
  <tr>
    <td><b style="font-size:30px">Commentaires :</b></td>
    <td><b style="font-size:30px">Étant administrateur :</b></td>
 </tr>
 <tr>
    <td>
      <ul>
        <li>Écrire un commentaire</li>
        <li>Modifier un commentaire</li>
        <li>Supprimer un commentaire</li>
        <li>Voir tous les commentaires d'un post</li>
      </ul>
    </td>
    <td>
      <ul>
        <li>Supprimer le compte d'un utilisateur</li>
        <li>Supprimer le post d'un utilisateur</li>
        <li>Supprimer le commentaire d'un utilisateur</li>
      </ul>
    </td>
 </tr>
</table>




## Installation

#### Pré-requis :
- Installer Node.js - <a href="https://nodejs.org/fr/">ici</a>
- Installer NPM - <a href="https://www.npmjs.com/"> ici</a> 

#### En suite...

pour le dossier **Backend** :
```
npm install
```

Assurez-vous d'avoir une base données **SQL** créée et de remplir les champs du fichier **.env.example** et le renommer **.env** puis de créer un dossier **images**

pour démarrer le Back :
```
npm start
```

#### Puis...

pour le dossier **Frontend** :
```
npm install
```

pour démarer le Front :
```
npm run serve
```
