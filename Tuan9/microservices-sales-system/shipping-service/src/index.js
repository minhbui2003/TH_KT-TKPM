const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./db');
const shipmentRoutes = require('./routes/shipment');
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
        new winston.transports.File({ filename: 'logs/shipping-service.log' }),
        new winston.transports.Console(),
    ],
});

app.use(express.json());
app.use('/shipments', shipmentRoutes);

// RabbitMQ Consumer
const startConsumer = async () => {
    try {
        const conn = await amqp.connect(process.env.RABBITMQ_URL);
        const channel = await conn.createChannel();
        await channel.assertQueue('shipping_queue');
        channel.consume('shipping_queue', async (msg) => {
            if (msg) {
                const { orderId, status } = JSON.parse(msg.content.toString());
                try {
                    await Shipment.create({ orderId, status });
                    channel.ack(msg);
                } catch (error) {
                    logger.error('Error processing shipment:', error);
                }
            }
        });
    } catch (error) {
        logger.error('RabbitMQ connection error:', error);
    }
};

connectDB();
startConsumer();

app.listen(8006, () => {
    logger.info('Shipping Service running on port 8006');
});
