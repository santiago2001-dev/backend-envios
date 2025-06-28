const cors = require("cors");
const express = require("express");
const { swaggerUi, specs } = require('../../docs/swagger');
const { testConnection } = require("../db/configDb");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.autenticationRoute = "/api/auth";
    this.contacsRoute = "/api/contacts";
    this.enterPriseRoute = "/api/enterprises";
    this.licenciaroute = "/api/licencia";
    this.packageRoute = "/api/package";
    this.whaRoutes = "/api/wha";
    this.visitsRoute = "/api/visits";

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
    // this.app.use(this.contacsRoute, require("../routes/contactsRouter"));
    // this.app.use(this.enterPriseRoute, require("../routes/enterpriseRouter"));
    // this.app.use(this.licenciaroute, require("../routes/licenciaRouter"));
    // this.app.use(this.whaRoutes, require("../middelwares/whatssap/botRoutes"));
    // this.app.use(this.packageRoute, require("../routes/packageRouter"));
    // this.app.use(this.visitsRoute, require("../routes/visitsRouter"));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Server is running on port ${this.port}`);
    });
  }
}

module.exports = Server;
