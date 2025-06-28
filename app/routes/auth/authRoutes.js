const authController = require('../../controlles/autitenticationController');
const { check } = require("express-validator");
const { validExpress } = require('../../middelwars/validations/validExpress');
const { rejexPass } = require('../../middelwars/validations/loginValidation');

const router = require("express").Router();
/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Endpoints de autenticación y registro
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Registrar nuevo cliente
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *               - username
 *              
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "usuario@empresa.com"
 *               password:
 *                 type: string
 *                 example: "123456"
 *               username:
 *                 type: string
 *                 example: "Usuario1"
 *              
 *     responses:
 *       201:
 *         description: Usuario registrado correctamente
 *       400:
 *         description: Error en los datos o validación
 */
router.post(
    "/register",
    check("email", "Debe proporcionar un email válido").notEmpty().isEmail(),
    check("password", "La contraseña es obligatoria").notEmpty(),
    check("username", "El nombre de Usuario es obligatorio").notEmpty(),
 
    validExpress,
     rejexPass,
  
    authController.register
  );


  /**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Endpoints de autenticación y registro
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: lgin de usuario existente
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *              
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "usuario@empresa.com"
 *               password:
 *                 type: string
 *                 example: "123456"
 *              
 *              
 *     responses:
 *       201:
 *         description: Usuario registrado correctamente
 *       400:
 *         description: Error en los datos o validación
 */

  router.post(
    "/login",
    check("email", "Debe proporcionar un email válido").notEmpty().isEmail(),
    check("password", "La contraseña es obligatoria").notEmpty(),
    authController.login
  );
 
  module.exports = router;