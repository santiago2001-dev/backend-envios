const createShippingUser = require("../use-cases/Shiping/createShippingUseCase");
const getShippinbByIdUseCase = require("../use-cases/Shiping/getShippingByIdUseCase");
const quoteShippingUser = require("../use-cases/Shiping/quoteShippingUseCase");
const getStatusByIdUseCase = require("../use-cases/Shiping/getShippingByIdUseCase");
exports.createShipping = async (req, res) => {
  try {
    const {
      origen,
      destino,
      peso,
      alto,
      ancho,
      largo,
      quotedValue,
      userId,
      numeroNotificacion,
    } = req.body;
    const shippingData = {
      origen,
      destino,
      peso,
      alto,
      ancho,
      largo,
      quotedValue,
      userId,
      numeroNotificacion,
    };
    const result = await createShippingUser.execute(shippingData);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({
      message: "Error al crear el envío",
      error: error.message,
    });
  }
};
exports.getShippingById = async (req, res) => {
  res.writeHead(200, {
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
    Connection: "keep-alive",
  });
  const intervalId = setInterval(async () => {
    try {
      const id = req.params.id;
      const result = await   getStatusByIdUseCase.execute(id);
      res.write(`data: ${result}\n\n`);
    } catch (error) {
      res.write(`data: ${JSON.stringify({ error: error.message })}\n\n`);
    }
  }, 5000);

  // Manejar cierre de conexión para evitar fugas de memoria
  req.on("close", () => {
    clearInterval(intervalId);
    res.end();
  });

 
};


exports.getAllByUserId = async (req, res) => {
  try {
    const idUser = req.params.userId;
    console.log("ID del usuario:", idUser);
    const result = await getShippinbByIdUseCase.execute(idUser);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener los envíos del usuario",
      error: error.message,
    });
  }
};
exports.quoteShipping = async (req, res) => {
  try {
    const { origen, destino, peso, alto, ancho, largo } = req.body;
    const shippingData = {
      origen,
      destino,
      peso,
      alto,
      ancho,
      largo,
    };

    const result = await quoteShippingUser.execute(shippingData);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      message: "Error al cotizar el envío",
      error: error.message,
    });
  }
};
