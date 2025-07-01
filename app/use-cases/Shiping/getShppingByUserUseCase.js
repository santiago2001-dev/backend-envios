const { getAllByUser } = require("../../repository/shippginRepository");

exports.execue =  async  (idUser) => {
    
    try {
        return await getAllByUser(idUser);
    } catch (error) {
        throw error;
    }
}