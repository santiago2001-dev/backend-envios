const {  getAllByUser } = require("../../repository/shippginRepository");

exports.execute =async (id) => {
    
    try {
        return await getAllByUser(id);
      
    } catch (error) {
        throw error;
    }
    }