const { login } = require("../../../config/WhatssApp/WhatssAppConexion");
const { logoutWhaJs, notificacionLlegada } = require("../../controlles/whatssAppController");
const { validarToken } = require("../../middelwars/validations/loginValidation");
const { notifyWhatsApp } = require("../../middelwars/WhatssApp/WhatssAppService");

const router = require("express").Router();

/**
 * @swagger
 * tags:
 *   name: WhatsApp
 *   description: Endpoints para la gestión de WhatsApp
 */

/**
 * @swagger
 * /whatsapp/login:
 *   get:
 *     summary: Iniciar sesión en WhatsApp
 *     tags: [WhatsApp]
 *     responses:
 *       200:
 *         description: Sesión iniciada exitosamente
 *       500:
 *         description: Error interno del servidor
 */
router.get("/login", login);

/**
 * @swagger
 * /whatsapp/logout:
 *   get:
 *     summary: Cerrar sesión en WhatsApp
 *     tags: [WhatsApp]
 *     responses:
 *       200:
 *         description: Sesión cerrada exitosamente
 *       500:
 *         description: Error interno del servidor
 */

router.get("/logout", logoutWhaJs);

/**
 * @swagger
 * /whatsapp/send:
 *   post:
 *     summary: Enviar notificación por WhatsApp
 *     tags: [WhatsApp]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - number
 *               - mensaje
 *             properties:
 *               number:
 *                 type: string
 *                 description: Número de teléfono del destinatario en formato internacional.
 *                 example: "573001234567"
 *               mensaje:
 *                 type: string
 *                 description: Mensaje que se enviará al destinatario.
 *                 example: "Hola, este es un mensaje de prueba."
 *     responses:
 *       200:
 *         description: Notificación enviada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Notificación enviada exitosamente."
 *       400:
 *         description: Error de validación en los datos enviados
 *       500:
 *         description: Error interno del servidor
 */
router.post("/send",validarToken, notificacionLlegada);

module.exports = router;