const { quoteShipping } = require("../../repository/shippginRepository");

exports.execute = async (shippingData) => {
    try {
        return await quoteShipping(shippingData);
    } catch (error) {
        throw error;
    }
}