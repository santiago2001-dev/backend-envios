
const userRepository = require("../../repository/userReposiory");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.loginUser = async (email, password) => {
    try {
      const user = await userRepository.findByEmail(email);
  
      if (!user) {
        return { error: "Usuario no encontrado" };
      }
  
      const hash = user.password;
      const validationPass = bcrypt.compareSync(
        password,
        hash
      );
  
      if (!validationPass) {
        return { error: "Contraseña incorrecta" };
      }
  
      const token = jwt.sign(
        {
          usuario: user,
        
        },
        process.env.JWT_SECRET
      );
  
      return {
        expires_in: "2025-01-12T22:14:45.9539299Z",
        token_type: "Bearer",
        access_token: token,
      };
    } catch (error) {
      throw new Error("Error en el inicio de sesión: " + error.message);
    }
  };