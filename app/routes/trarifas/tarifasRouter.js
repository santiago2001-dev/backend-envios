const router = require('express').Router();
const tarifaController = require('../../controlles/TrifaController');

/**
 * @swagger
 * /tarifas:
 *   post:
 *     summary: Crear una nueva tarifa
 *     tags: [Tarifas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               origen:
 *                 type: string
 *               destino:
 *                 type: string
 *               peso_min:
 *                 type: integer
 *               peso_max:
 *                 type: integer
 *               valor:
 *                 type: number
 *     responses:
 *       201:
 *         description: Tarifa creada exitosamente
 *       500:
 *         description: Error en el servidor
 */
router.post('/', tarifaController.createTarifa);

/**
 * @swagger
 * /tarifas:
 *   get:
 *     summary: Listar todas las tarifas
 *     tags: [Tarifas]
 *     responses:
 *       200:
 *         description: Lista de tarifas
 *       500:
 *         description: Error en el servidor
 */
router.get('/', tarifaController.getTarifas);

module.exports = router;
