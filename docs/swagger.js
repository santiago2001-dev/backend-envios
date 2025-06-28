const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API de envios',
      version: '1.0.0',
      description: 'Documentación de la API REST sin prefijo Bearer',
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT}/api`,
      },
    ],
    
    
    components: {
      securitySchemes: {
        Authorization: {
          type: 'apiKey',
          in: 'header',
          name: 'Authorization',
        },
      },
    },
    security: [
      {
        Authorization: [],
      },
    ],
  },
  apis: [
    './app/routes/auth/authRoutes.js',
    
    // './routes/contactsRouter.js',
    // './routes/enterpriseRouter.js',
    // './routes/licenciaRouter.js',
    // './middelwares/whatssap/botRoutes.js',
    // './routes/packageRouter.js',
    // './routes/visitsRouter.js',
  ],
};

const specs = swaggerJsdoc(options);

module.exports = {
  swaggerUi,
  specs,
};
