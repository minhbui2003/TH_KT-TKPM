const mongoose = require('mongoose');

const shipmentSchema = new mongoose.Schema({
    orderId: { type: String, required: true },
    status: { type: String, default: 'pending' },
});

module.exports = mongoose.model('Shipment', shipmentSchema);