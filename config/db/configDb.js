const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: process.env.HOST_DB,
  user: process.env.USER_DB,
  password: process.env.PASS_DB,
  database: process.env.DB,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Función para validar la conexión
const testConnection = async () => {
  try {
    const connection = await pool.getConnection();
    console.log("✅ Conexión a MySQL establecida correctamente");
    connection.release(); // liberar la conexión al pool
  } catch (error) {
    console.error("❌ Error al conectar con MySQL:", error.message);
  }
};

module.exports = {
  pool,
  testConnection
};
