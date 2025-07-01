const router = require('express').Router();
const tarifaController = require('../../controlles/TrifaController');
const { validarToken } = require('../../middelwars/validations/loginValidation');

/**
 * @swagger
 * /tarifas:
 *   post:
 *     summary: Crear una nueva tarifa
 *     tags: [Tarifas]
 *     security:
 *       - Authorization: []  # Indica que este endpoint requiere el token en el header
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - peso_max
 *               - valor
 *             properties:
 *               peso_max:
 *                 type: integer
 *                 description: Peso máximo permitido para la tarifa.
 *                 example: 50
 *               valor:
 *                 type: number
 *                 description: Valor de la tarifa.
 *                 example: 10000
 *     responses:
 *       201:
 *         description: Tarifa creada exitosamente
 *       500:
 *         description: Error en el servidor
 */
router.post('/', validarToken, tarifaController.createTarifa);

/**
 * @swagger
 * /tarifas:
 *   get:
 *     summary: Listar todas las tarifas
 *     tags: [Tarifas]
 *     security:
 *       - Authorization: []  # Indica que este endpoint requiere el token en el header
 *     responses:
 *       200:
 *         description: Lista de tarifas
 *       500:
 *         description: Error en el servidor
 */
router.get('/', validarToken, tarifaController.getTarifas);

module.exports = router;
