const createShippingUser = require("../use-cases/Shiping/createShippingUseCase");
const getShippinbByIdUseCase = require("../use-cases/Shiping/getShippingByIdUseCase");
const quoteShippingUser = require("../use-cases/Shiping/quoteShippingUseCase");
exports.createShipping = async (req, res) => {
  try {
    const { origen, destino, peso, alto, ancho, largo , quotedValue,
      userId,numeroNotificacion} = req.body;
    const shippingData = {
      origen,
      destino,
      peso,
      alto,
      ancho,
      largo,
      quotedValue,
      userId,
      numeroNotificacion
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
  try {
    const id = req.params.id;
    const result = await getShippinbByIdUseCase.execute(id);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener el envío",
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
