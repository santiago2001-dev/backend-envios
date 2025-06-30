const tarifaRepository = require('../../repository/tarifaRepository');

class ListTarifasUseCase {
  async execute() {
    return await tarifaRepository.listarTarifas();
  }
}

module.exports = new ListTarifasUseCase();
