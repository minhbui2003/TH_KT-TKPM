const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./db');
const inventoryRoutes = require('./routes/inventory');
const winston = require('winston');
const amqp = require('amqplib');

dotenv.config();
const app = express();

// Logger
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
    ),
    transports: [
        new winston.transports.File({ filename: 'logs/inventory-service.log' }),
        new winston.transports.Console(),
    ],
});

app.use(express.json());
app.use('/inventory', inventoryRoutes);

// RabbitMQ Consumer
const startConsumer = async () => {
    try {
        const conn = await amqp.connect(process.env.RABBITMQ_URL);
        const channel = await conn.createChannel();
        await channel.assertQueue('inventory_queue');
        channel.consume('inventory_queue', async (msg) => {
            if (msg) {
                const { productId, quantity } = JSON.parse(msg.content.toString());
                try {
                    const inventory = await Inventory.findOneAndUpdate(
                        { productId },
                        { $inc: { stock: -quantity } },
                        { new: true }
                    );
                    if (inventory && inventory.stock >= 0) {
                        channel.ack(msg);
                    }
                } catch (error) {
                    logger.error('Error processing inventory update:', error);
                }
            }
        });
    } catch (error) {
        logger.error('RabbitMQ connection error:', error);
    }
};

connectDB();
startConsumer();

app.listen(8005, () => {
    logger.info('Inventory Service running on port 8005');
});
