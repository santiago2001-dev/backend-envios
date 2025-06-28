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


const loginUseCase = require('../use-cases/auth/loginUseCase');
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const result = await loginUseCase.loginUser(email, password);
        
        if (result.error) {
            return res.status(400).json({ message: result.error });
        }

        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({
            message: "Error al iniciar sesión",
            error: error.message,
          });
    }
}