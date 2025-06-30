const cors = require("cors");
const express = require("express");
const { swaggerUi, specs } = require('../../docs/swagger');
const { testConnection } = require("../db/configDb");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.autenticationRoute = "/api/auth";
    this.shipmentsRoute = "/api/shipments";
    this.tarifasRoute = "/api/tarifas";
    this.whatsAppRoute = "/api/whatsapp";


    this.initMiddlewares();
    this.routes();
    this.conexion();
  }

  initMiddlewares() {

    this.app.use(cors({
      origin: '*',
      credentials: true // Solo tiene efecto si el origin es específico, no '*' 
    }));    this.app.use(express.json());
    this.app.use(express.urlencoded({ limit: "50mb" }));
    this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
  }

  conexion() {
    testConnection()
  }

  routes() {
    this.app.use(this.autenticationRoute, require("../../app/routes/auth/authRoutes"));
    this.app.use(this.shipmentsRoute, require("../../app/routes/Shipping/shippingRoutes"));
    this.app.use(this.tarifasRoute, require("../../app/routes/trarifas/tarifasRouter"));
    this.app.use(this.whatsAppRoute, require("../../app/routes/whatssApp/WhatssAppRoutes"));
   
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Server is running on port ${this.port}`);
    });
  }
}

module.exports = Server;
