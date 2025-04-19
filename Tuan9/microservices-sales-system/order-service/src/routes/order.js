const express = require('express');
const router = express.Router();
const Order = require('../models/order');
const amqp = require('amqplib');
const CircuitBreaker = require('opossum');
const axios = require('axios');

const connectRabbitMQ = async () => {
    const conn = await amqp.connect(process.env.RABBITMQ_URL);
    const channel = await conn.createChannel();
    await channel.assertQueue('inventory_queue');
    await channel.assertQueue('shipping_queue');
    return channel;
};

// Circuit Breaker for Inventory Service
const breakerOptions = {
    timeout: 3000,
    errorThresholdPercentage: 50,
    resetTimeout: 10000,
};
const inventoryBreaker = new CircuitBreaker(async (data) => {
    const response = await axios.post('http://inventory-service:8005/inventory/update', data);
    return response.data;
}, breakerOptions);

router.post('/', async (req, res) => {
    try {
        const order = new Order(req.body);
        await order.save();

        // Send message to Inventory and Shipping via RabbitMQ
        const channel = await connectRabbitMQ();
        const inventoryMsg = { productId: req.body.items[0].productId, quantity: req.body.items[0].quantity };
        channel.sendToQueue('inventory_queue', Buffer.from(JSON.stringify(inventoryMsg)));

        // Call Inventory Service with Circuit Breaker
        await inventoryBreaker.fire(inventoryMsg);

        const shippingMsg = { orderId: order._id, status: 'pending' };
        channel.sendToQueue('shipping_queue', Buffer.from(JSON.stringify(shippingMsg)));

        res.status(201).json(order);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order) {
            return res.status(404).json({ error: 'Order not found' });
        }
        res.json(order);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const order = await Order.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!order) {
            return res.status(404).json({ error: 'Order not found' });
        }
        res.json(order);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const order = await Order.findByIdAndDelete(req.params.id);
        if (!order) {
            return res.status(404).json({ error: 'Order not found' });
        }
        res.json({ message: 'Order deleted' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;
