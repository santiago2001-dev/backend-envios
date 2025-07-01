const userRepository = require("../../repository/userReposiory");
const jwt = require("jsonwebtoken");

const rejexPass = async (req, res, next) => {
    const contrasena = await req.body.Password;
  
    const rta = await rejex(contrasena);
  
    if (rta == false) {
      res.json({
        error:
          "contraseña debe tener Mínimo 6 caracteres, al menos una letra mayúscula, una letra minúscula, un número y un carácter especial ",
      });
    } else {
      next();
    }
  };

  const  validarToken = (req, res, next) => {
    const token = req.headers.authorization;
  
    if (!token) {
      return res.status(401).json({ error: "Token no proporcionado" });
    }
  
    jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
      if (error) {
        return res.status(401).json({ error: "Token inválido o vencido" });
      }
      req.user =  decoded;
  
      next();
    });
  };
  // middlewares/emailExists.js

  const emailExists = async (req, res, next) => {
    try {
      const email = req.body.email || req.body.Email;
  
      if (!email) {
        return res.status(400).json({ error: "The 'email' field is required." });
      }
  
      const user = await  userRepository.findByEmail(email);
  
      if (user) {
        return res.status(400).json({
          error: `The email address ${email} is already registered.`,
        });
      }
  
      next();
    } catch (error) {
      return res.status(500).json({
        error: `Internal server error while validating email: ${error.message}`,
      });
    }
  };

  const rejex = async (pass) => {
    let regxp = /^([a-zA-Z0-9*-]){6,}$/;
  
    return regxp.test(pass);
  };
  module.exports = { rejexPass,emailExists,validarToken};