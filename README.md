# blog-api
API de blog en Node.js /Express avec SQlite et documentation Swagger
# 📝 Blog API

## Description
Ce projet est une **API backend pour un blog** développée avec Node.js et Express.  
Tout le code est regroupé dans un seul fichier principal (`server.js`).  
L’API permet de gérer des articles et leurs commentaires via des endpoints REST simples.

---

##  Fonctionnalités
- Créer un article
-  Lire la liste des articles
-  Mettre à jour un article
- 🗑️ Supprimer un article
-  Ajouter et gérer des commentaires

---

##  Technologies utilisées
-  Node.js  
-  Express.js  
- SQLite (base de données légère)  
-  Swagger pour la documentation  

---

##  Installation et utilisation

### 1️Cloner le dépôt
```bash
git clone https://github.com/Mirandalahon/Blog-api.git
cd Blog-api
    2 Installer les dependances
npm install
    3 Lancer le serveur
node server.js
Le serveur démarre sur http://localhost:3000.
    DOCUMENTATION SWAGGER
L interface est disponible sur:http://localhost:3000/api-docs

## Créer un article
http
POST /articles
Content-Type: application/json

{
  "title": "Mon premier article",
  "content": "Ceci est le contenu de l'article."
}
Reponse attendue:{
  "id": 1,
  "title": "Mon premier article",
  "content": "Ceci est le contenu de l'article."
}
Auteur

Projet réalisé par Galyeu De Honba Miranda Brunilde dans le cadre du devoir TAF 1.
Ce projet illustre la mise en place d’une API REST simple et fonctionnelle.
✅ Conclusion

Ce projet démontre la création d’une API complète dans un seul fichier, avec :

    Gestion CRUD des articles

    Documentation Swagger

    Déploiement sur GitHub avec README détaillé
