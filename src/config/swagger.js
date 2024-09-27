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
          },
        },
        Ninja: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              description: 'ID auto-généré du ninja',
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
          },
        },
        Reservation: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              description: 'ID auto-généré de la réservation',
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
