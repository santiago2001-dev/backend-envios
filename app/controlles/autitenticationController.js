const registerUseCase = require('../use-cases/auth/registerUseCase');
exports.register = async (req, res) => {
    try {
        const { username, password ,email} = req.body;
        const user = {
            username,
            password,
            email
        };

    await registerUseCase.register(user);
        res.status(201).json({
            message: "Usuario creado correctamente",
        });
    } catch (error) {
        res.status(500).json({
            message: "Error al crear el usuario",
            error: error.message,
          });
    }

} 