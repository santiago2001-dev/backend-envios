const { pool } = require("../../config/db/configDb");

exports.quoteShipping =  async (shipping) => {  
  try {
    const [rows] = await pool.query("CALL CotizarEnvio(?, ?, ?, ?, ?, ?)", [
      shipping.origen, shipping.destino, shipping.peso, shipping.alto, shipping.ancho, shipping.largo
    ]);

    if (rows[0].length === 0) {
       throw  Error({ error: "No hay tarifa disponible" });
    }

    return({ valorCotizado: rows[0][0].valor });
  } catch (error) {
    throw error;
  }
}
exports.createShipping = async (shippingData) => {
  try {
    await pool.query("CALL CrearEnvio(?, ?, ?, ?, ?, ?, ?, ?)", [
      shippingData.userId, shippingData.origen, shippingData.destino, shippingData.peso, shippingData.alto, shippingData.ancho, shippingData.largo,shippingData.quotedValue,
    ]);

    return({ message: "Envío registrado exitosamente" });
  } catch (error) {
    throw error;
    }
}


exports.getStatusById = async (id) => {
  try {
    const [rows] = await pool.query(
      "SELECT estado, fecha FROM envio_estados WHERE envio_id = ? ORDER BY fecha DESC", [id]
    );
    if (rows.length === 0)  throw   Error({ error: "Envío no encontrado" });
    return (rows[0].estado);
  } catch (error) {
    throw error;  }
}