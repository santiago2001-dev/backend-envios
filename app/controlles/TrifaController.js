const createTarifa = require('../use-cases/tarifas/CreateTarifaUseCase');
const listTarifas = require('../use-cases/tarifas/ListTarifaUseCase');

exports.createTarifa = async (req, res) => {
  try {
    const result = await createTarifa.execute(req.body);
    res.status(201).json({ message: 'Tarifa creada exitosamente' });
  } catch (error) {
    console.error('Error al crear tarifa:', error);
    res.status(500).json({ message: 'Error al crear tarifa', error: error.message });
  }
};

exports.getTarifas = async (req, res) => {
  try {
    const result = await listTarifas.execute();
    res.json(result);
  } catch (error) {
    console.error('Error al obtener tarifas:', error);
    res.status(500).json({ message: 'Error al obtener tarifas', error: error.message });
  }
};
