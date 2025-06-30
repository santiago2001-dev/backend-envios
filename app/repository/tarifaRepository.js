const { pool } = require("../../config/db/configDb");

class TarifaRepository {
  async insertarTarifa({ origen, destino, peso_min, peso_max, valor }) {
    const [result] = await pool.query(
      'CALL InsertarTarifa(?, ?, ?, ?, ?)',
      [origen, destino, peso_min, peso_max, valor]
    );
    return result;
  }

  async listarTarifas() {
    const [rows] = await pool.query('CALL ListarTarifas()');
    return rows[0];
  }
}

module.exports = new TarifaRepository();
