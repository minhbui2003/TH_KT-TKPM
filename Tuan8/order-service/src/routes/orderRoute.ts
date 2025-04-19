import express, { Request, Response } from 'express';
import amqp from 'amqplib';
import Order from '../models/Order';

const router = express.Router();

async function publishToQueue(queue: string, message: any) {
    const connection = await amqp.connect(process.env.RABBITMQ_URL);
    const channel = await connection.createChannel();
    await channel.assertQueue(queue, { durable: true });
    channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)), { persistent: true });
    await channel.close();
    await connection.close();
}

// Create an order
router.post('/', async (req: Request, res: Response) => {
    try {
        const order = new Order(req.body);
        await order.save();

        // Send message to RabbitMQ to update stock in Product Service
        const message = {
            productId: order.productId,
            quantity: order.quantity,
        };
        await publishToQueue('update_stock', message);

        res.status(201).json(order);
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
});

// Get an order by ID
router.get('/:id', async (req: Request, res: Response) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order) return res.status(404).json({ error: 'Order not found' });
        res.json(order);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

// Update an order
router.put('/:id', async (req: Request, res: Response) => {
    try {
        const order = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!order) return res.status(404).json({ error: 'Order not found' });
        res.json(order);
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
});

// Delete an order
router.delete('/:id', async (req: Request, res: Response) => {
    try {
        const order = await Order.findByIdAndDelete(req.params.id);
        if (!order) return res.status(404).json({ error: 'Order not found' });
        res.json({ message: 'Order deleted' });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

export default router;