const { check } = require("express-validator");
const { validExpress } = require("../../middelwars/validations/validExpress");
const {
  createShipping,
  getShippingById,
  quoteShipping,
} = require("../../controlles/ShippingController");

const router = require("express").Router();

/**
 * @swagger
 * tags:
 *   name: Shipments
 *   description: Endpoints para gestión de envíos
 */

/**
 * @swagger
 * /shipments/quote:
 *   post:
 *     summary: Cotizar un envío
 *     tags: [Shipments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - origen
 *               - destino
 *               - peso
 *               - alto
 *               - ancho
 *               - largo
 *             properties:
 *               origen:
 *                 type: string
 *                 example: "Bogotá"
 *               destino:
 *                 type: string
 *                 example: "Medellín"
 *               peso:
 *                 type: number
 *                 example: 3.5
 *               alto:
 *                 type: number
 *                 example: 10
 *               ancho:
 *                 type: number
 *                 example: 15
 *               largo:
 *                 type: number
 *                 example: 20
 *     responses:
 *       200:
 *         description: Valor cotizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 valorCotizado:
 *                   type: number
 *                   example: 25000
 *       400:
 *         description: Error de validación o sin tarifa disponible
 */

router.post(
  "/quote",
  check("destino", "El destino es obligatorio").notEmpty(),
  check("origen", "El origen es obligatorio").notEmpty(),
  check("peso", "El peso es obligatorio").notEmpty(),
  check("alto", "El alto es obligatorio").notEmpty(),
  check("ancho", "El ancho es obligatorio").notEmpty(),
  check("largo", "El largo es obligatorio").notEmpty(),
  check("peso", "el peso no debe ser menor a 0").isFloat({ gt: 0 }),
  check("alto", "el alto no debe ser menor a 0").isFloat({ gt: 0 }),
  check("ancho", "el ancho no debe ser menor a 0").isFloat({ gt: 0 }),
  validExpress,
  quoteShipping
);

/**
 * @swagger
 * /shipments:
 *   post:
 *     summary: Crear un envío previamente cotizado
 *     tags: [Shipments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - origen
 *               - destino
 *               - peso
 *               - alto
 *               - ancho
 *               - largo
 *               - quotedValue
 *               - userId
 *               - numeroNotificacion
 *             properties:
 *               origen:
 *                 type: string
 *                 description: Ciudad de origen del envío.
 *                 example: "Bogotá"
 *               destino:
 *                 type: string
 *                 description: Ciudad de destino del envío.
 *                 example: "Medellín"
 *               peso:
 *                 type: number
 *                 description: Peso del paquete en kilogramos.
 *                 example: 3.5
 *               alto:
 *                 type: number
 *                 description: Altura del paquete en centímetros.
 *                 example: 10
 *               ancho:
 *                 type: number
 *                 description: Ancho del paquete en centímetros.
 *                 example: 15
 *               largo:
 *                 type: number
 *                 description: Largo del paquete en centímetros.
 *                 example: 20
 *               quotedValue:
 *                 type: number
 *                 description: Valor cotizado para el envío.
 *                 example: 25000
 *               userId:
 *                 type: string
 *                 description: Identificador único del usuario.
 *                 example: "12345"
 *               numeroNotificacion:
 *                 type: string
 *                 description: Número de teléfono para notificaciones en formato internacional.
 *                 example: "+573001234567"
 *     responses:
 *       201:
 *         description: Envío creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Envío creado exitosamente."
 *       400:
 *         description: Error de validación en los datos enviados
 *       500:
 *         description: Error interno del servidor
 */

router.post(
  "/",
  check("destino", "El destino es obligatorio").notEmpty(),
  check("origen", "El origen es obligatorio").notEmpty(),
  check("peso", "El peso es obligatorio").notEmpty(),
  check("alto", "El alto es obligatorio").notEmpty(),
  check("ancho", "El ancho es obligatorio").notEmpty(),
  check("largo", "El largo es obligatorio").notEmpty(),
  check("peso", "el peso no debe ser menor a 0").isFloat({ gt: 0 }),
  check("alto", "el alto no debe ser menor a 0").isFloat({ gt: 0 }),
  check("ancho", "el ancho no debe ser menor a 0").isFloat({ gt: 0 }),
  validExpress,
  createShipping
);

/**
 * @swagger
 * /shipments/status/{id}:
 *   get:
 *     summary: Consultar estado del envío por ID
 *     tags: [Shipments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Estados del envío retornados exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 historialEstados:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       status:
 *                         type: string
 *                         example: "En espera"
 *                       date:
 *                         type: string
 *                         format: date-time
 *                         example: "2025-06-29T21:00:00.000Z"
 *       404:
 *         description: Envío no encontrado
 */

router.get("/status/:id", getShippingById);

module.exports = router;
