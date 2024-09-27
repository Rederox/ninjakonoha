import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

// Configuration de Swagger
const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'API Ninja Library',
      version: '1.0.0',
      description: 'API pour la gestion des rouleaux de jutsu, des ninjas et des emprunts',
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
    components: {
      schemas: {
        JutsuScroll: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              description: 'ID auto-généré du rouleau de jutsu',
            },
            title: {
              type: 'string',
              description: 'Titre du rouleau de jutsu',
            },
            description: {
              type: 'string',
              description: 'Description du rouleau de jutsu',
            },
            jutsuType: {
              type: 'string',
              description: 'Type de jutsu (ex: Ninjutsu, Genjutsu, Taijutsu)',
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'Date de création du rouleau',
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
              description: 'Date de dernière mise à jour du rouleau',
            },
          },
        },
        Ninja: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              description: 'ID auto-généré du ninja',
            },
            name: {
              type: 'string',
              description: 'Nom du ninja',
            },
            rank: {
              type: 'string',
              description: 'Rang du ninja (ex: Genin, Chunin, Jonin)',
            },
            age: {
              type: 'integer',
              description: 'Âge du ninja',
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'Date de création du ninja',
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
              description: 'Date de dernière mise à jour du ninja',
            },
          },
        },
        Emprunt: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              description: 'ID auto-généré de l\'emprunt',
            },
            userId: {
              type: 'string',
              description: 'ID de l\'utilisateur qui emprunte',
            },
            bookId: {
              type: 'string',
              description: 'ID du livre ou du rouleau emprunté',
            },
            dateEmprunt: {
              type: 'string',
              format: 'date',
              description: 'Date de l\'emprunt',
            },
            dateRetour: {
              type: 'string',
              format: 'date',
              description: 'Date prévue de retour',
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'Date de création de l\'emprunt',
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
              description: 'Date de dernière mise à jour de l\'emprunt',
            },
          },
        },
        Reservation: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              description: 'ID auto-généré de la réservation',
            },
            userId: {
              type: 'string',
              description: 'ID de l\'utilisateur qui réserve',
            },
            jutsuScrollId: {
              type: 'string',
              description: 'ID du rouleau de jutsu réservé',
            },
            reservationDate: {
              type: 'string',
              format: 'date-time',
              description: 'Date de la réservation',
            },
            isNotified: {
              type: 'boolean',
              description: 'Indique si l\'utilisateur a été notifié',
            },
          },
        },
        JutsuOfTheMonth: {
          type: 'object',
          properties: {
            jutsuTitle: {
              type: 'string',
              description: 'Le titre du jutsu du mois',
            },
            jutsuType: {
              type: 'string',
              description: 'Type de jutsu (ex: Ninjutsu, Genjutsu, Taijutsu)',
            },
            borrowCount: {
              type: 'integer',
              description: 'Nombre d\'emprunts de ce jutsu durant le mois',
            },
            jutsuScrollId: {
              type: 'string',
              description: 'ID du rouleau de jutsu correspondant',
            },
          },
        },
      },
    },
  },
  apis: ['./src/routes/*.js'], // Chemin vers vos fichiers de routes où Swagger JSDoc extrait les annotations
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);

export { swaggerUi, swaggerDocs };
