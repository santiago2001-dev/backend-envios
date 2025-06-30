const tarifaRepository = require('../../repository/tarifaRepository');

class CreateTarifaUseCase {
  async execute(data) {
    return await tarifaRepository.insertarTarifa(data);
  }
}

module.exports = new CreateTarifaUseCase();
