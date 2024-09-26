// swagger.js
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

// Configuration de Swagger
// swagger.js
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
            title: {
              type: 'string',
              description: 'Title of the jutsu scroll',
            },
            description: {
              type: 'string',
              description: 'Description of the jutsu scroll',
            },
          },
        },
      },
    },
  },
  apis: ['./src/routes/*.js'],
};


const swaggerDocs = swaggerJSDoc(swaggerOptions);

export { swaggerUi, swaggerDocs };