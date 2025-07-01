const {   getStatusById } = require("../../repository/shippginRepository");

exports.execute =async (id) => {
    
    try {
        return await getStatusById(id);
      
    } catch (error) {
        throw error;
    }
    }