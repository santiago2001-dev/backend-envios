const { client } = require("../../../config/WhatssApp/WhatssAppConexion");
const storage = require('node-persist'); // Asegúrate de que storage esté importado

exports.notifyWhatsApp = async (infoMessage) => {
  try {
    const { number, mensaje } = infoMessage;
    const chatId = `${number}@c.us`;

    const response = await client.sendMessage(chatId, mensaje);
    if (response.id.fromMe) {
      return "Mensaje enviado con éxito";
    }
  } catch (error) {
    console.error("Error al enviar el mensaje al conductor:", error);
    //throw error;
  }
};
exports.logout = async() => {
    try {
        await client.logout();
        console.log('Sesión cerrada exitosamente');

        // Actualizamos el estado de la sesión en el almacenamiento
        const newSession = {
            message: "Sesión cerrada",
            status: false,
        };
        await storage.setItem('session', newSession);

        return true;
    } catch (error) {
        console.error('Error al cerrar la sesión:', error);
        return false;
    }
}