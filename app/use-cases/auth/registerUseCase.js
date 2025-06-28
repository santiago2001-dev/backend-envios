const { encript } = require("../../middelwars/encript")
const userRepository = require("../../repository/userReposiory");

exports.register = async (user) => { 
    try {
        const hash  = await encript(user.password);
        const userData = {
            username: user.username,
            password: hash,
            email: user.email
        };

        await userRepository.create(userData);
        
    } catch (error) {
         throw new Error("Error al crear el usuario: " + error.message);
   
    }
}