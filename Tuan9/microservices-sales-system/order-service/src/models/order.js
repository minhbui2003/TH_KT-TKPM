const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    customerId: { type: String, required: true },
    items: [{ productId: String, quantity: Number }],
    total: { type: Number, required: true },
    status: { type: String, default: 'pending' },
});

module.exports = mongoose.model('Order', orderSchema);