
# Bibliothèque des Rouleaux de Jutsu - Konoha

## Contributions

- Theivathan THEVARAJ
- Adrien RODRIGUES
- Valentin HUCHET 

## Description

Ce projet est un système de gestion pour la Grande Bibliothèque des Rouleaux de Jutsu de Konoha, permettant de gérer les rouleaux de jutsu, les ninjas, les emprunts et les retours. L'application utilise Node.js, MongoDB et Mongoose pour gérer les données, et fournit une API RESTful documentée avec Swagger.

## Fonctionnalités

1. **Gestion des Rouleaux de Jutsu** : Créer, lire, mettre à jour et supprimer les rouleaux de jutsu avec leurs propriétés (nom, créateur, rang, quantité, etc.).
2. **Gestion des Ninjas** : Créer, lire, mettre à jour et supprimer les profils de ninjas.
3. **Gestion des Emprunts** : Les ninjas peuvent emprunter des rouleaux, et les statuts des emprunts sont suivis (en cours, terminé, en retard). Des alertes de retard sont envoyées automatiquement.
4. **Réservations** : Les ninjas peuvent réserver des rouleaux lorsque ceux-ci ne sont pas disponibles.
5. **Statistiques** : Génération de statistiques sur les emprunts et mise en avant du "Jutsu du Mois" en fonction des données collectées.
6. **Authentification JWT** : Le système utilise une authentification par jetons JWT pour sécuriser certaines routes.

## Prérequis

- **Node.js** (version 14+)
- **MongoDB** (version 4.4+)
- **npm** (version 6+)

## Installation

1. **Cloner le projet** :
   ```bash
   git clone https://github.com/Rederox/ninjakonoha.git
   cd ninjakonoha
   ```

2. **Installer les dépendances** :
   ```bash
   npm install
   ```

3. **Configurer les variables d'environnement** :
   Créez un fichier `.env` à la racine du projet avec les variables suivantes :
   ```env
    PORT=3000
    MONGODB_URI=<URL>
    SECRET_KEY=<SCRET_KEY>
   ```

4. **Démarrer le serveur** :
   ```bash
   npm run start
   ```

5. **Créer des données fictives** :
   Vous pouvez utiliser la commande suivante pour générer des données fictives dans votre base de données :
   ```bash
   npm run migration
   ```

## Documentation de l'API

Le projet utilise Swagger pour documenter l'API. Une fois le serveur démarré, vous pouvez accéder à la documentation complète à l'adresse suivante :
```
http://localhost:3000/api-docs
```

## Structure du Projet

```bash
src/
├── controllers/   # Logique métier pour les différentes entités (ninja, jutsuScroll, emprunt)
├── models/        # Schémas Mongoose pour MongoDB
├── routes/        # Routes API RESTful
├── middleware/    # Middleware comme l'authentification JWT
├── utils/         # Outils utilitaires pour le projet
├── config/        # Configuration MongoDB et variables d'environnement
└── tests/         # Tests unitaires et d'intégration
```

## Partie Implémentée

Nous avons travaillé en équipe pour implémenter les parties suivantes :

### Partie 1 - 5 :
- Configuration initiale et structure du projet.✅
- Connexion à MongoDB et création de la base de données.✅
- Modélisation avancée des données avec des schémas Mongoose.✅
- Implémentation complète des opérations CRUD et routes RESTful.✅
- Gestion des emprunts, réservations, statistiques, et génération automatique des alertes de retard.✅
- Mise en place du système de "Jutsu du Mois".✅

### Partie 7 (Partielle) :
- Authentification par JWT, mais la validation et les mesures de sécurité avancées restent à faire.✅

## Fonctionnalités non terminée

1. **Partie 6** : Optimisation des requêtes et performances. ❌
2. **Partie 7** : Validation robuste des données, gestion avancée des erreurs et sécurité (par exemple, la prévention des injections NoSQL). ❌
3. **Partie 8** : Tests, déploiement et CI/CD. ❌

