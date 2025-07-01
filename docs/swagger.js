const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API de envios",
      version: "1.0.0",
      description: "Documentación de la API REST sin prefijo Bearer",
    },
    servers: [
      {

        //url local
        //url: `${process.env.SERVER}:${process.env.PORT}/api`,
        //url server
          url: `${process.env.SERVER}/api`,
      },
    ],

    components: {
      securitySchemes: {
        Authorization: {
          type: "apiKey",
          in: "header",
          name: "Authorization",
        },
      },
    },
    security: [
      {
        Authorization: [],
      },
    ],
  },
  apis: ["./app/routes/auth/authRoutes.js", "./app/routes/Shipping/shippingRoutes.js","./app/routes/trarifas/tarifasRouter.js", 
    "./app/routes/whatssApp/WhatssAppRoutes.js"]
  
};

const specs = swaggerJsdoc(options);

module.exports = {
  swaggerUi,
  specs,
};
