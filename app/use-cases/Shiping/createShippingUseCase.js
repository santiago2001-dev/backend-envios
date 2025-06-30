const { notificacionLlegada } = require("../../controlles/whatssAppController");
const {
  notifyWhatsApp,
} = require("../../middelwars/WhatssApp/WhatssAppService");
const { createShipping } = require("../../repository/shippginRepository");

const createNotificationMessage = (body) => {
  const { origen, destino, peso, alto, ancho, largo, quotedValue, userId } =
    body;

  const message = `📦 Estimado usuario ${userId}, su envío ha sido registrado exitosamente. 
  ✈️ Detalles del envío:
  - 🌍 Origen: ${origen}
  - 📍 Destino: ${destino}
  - ⚖️ Peso: ${peso} kg
  - 📏 Dimensiones: ${alto} cm x ${ancho} cm x ${largo} cm
  - 💰 Valor cotizado: $${quotedValue}.
  
  🙏 Gracias por utilizar nuestro servicio.`;

  return message;
};

exports.execute = async (shippingData) => {
  try {
    const message = createNotificationMessage(shippingData);
    const data = {
      number: shippingData.numeroNotificacion,
      mensaje: message,
    };
    await notifyWhatsApp(data);
    return await createShipping(shippingData);
  } catch (error) {
    throw error;
  }
};
