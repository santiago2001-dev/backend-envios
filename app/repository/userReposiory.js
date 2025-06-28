const { pool } = require("../../config/db/configDb");

exports.getAll = async () => {
  try {
    const [rows] = await pool.query("CALL GetAllUsers()");
    return rows[0];
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

exports.getById = async (id) => {
  try {
    const [rows] = await pool.query("CALL GetUserById(?)", [id]);
    if (rows[0].length === 0) throw new Error("User not found");
    return rows[0][0];
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    throw error;
  }
};
exports.create = async (userData) => {
  try {
    const { username, email, password } = userData;
    const [rows] = await pool.query("CALL CreateUser(?, ?, ?)", [
      username,
      email,
      password,
    ]);

    const result = rows[0][0]?.status;

    if (result === "USERNAME_EXISTS") {
      throw new Error("El nombre de usuario ya está en uso");
    } else if (result === "EMAIL_EXISTS") {
      throw new Error("El correo electrónico ya está en uso");
    }

    return { message: "Usuario creado correctamente" };
  } catch (error) {
    console.error("Error creando usuario:", error);
    throw error;
  }
};

exports.findByEmail = async (email) => {
  try {
    const [rows] = await pool.query("CALL FindUserByEmail(?)", [email]);
    if (rows[0].length === 0) return null; // ← safer for validations
    return rows[0][0];
  } catch (error) {
    console.error("Error fetching user by email:", error);
    throw error;
  }

};
