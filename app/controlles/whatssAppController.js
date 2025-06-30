const { logout, notifyWhatsApp } = require("../middelwars/WhatssApp/WhatssAppService");

exports.logoutWhaJs = async (req, res) => {
    try {
      await logout();
      res.status(200).json({
        message: "sesion cerrada correctamente ",
      });
    } catch (error) {
      console.error("Error en NotificacionDeServicio:", error);
      res.status(500).json({ error: "Error interno del servidor" });
    }
  };
  
  exports.notificacionLlegada = async (req,res) => {
    try {
        const { number, message } = req.body;
        const data = {
            number: number,
            mensaje: message,
            };
        
        res.status(200).json({
            message: await notifyWhatsApp(data)
          });
  
    } catch (error) {
        res.status(500).json({ error: "Error interno del servidor" });
    }
  };