const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./db');
const orderRoutes = require('./routes/order');
const winston = require('winston');

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
        new winston.transports.File({ filename: 'logs/order-service.log' }),
        new winston.transports.Console(),
    ],
});

app.use(express.json());
app.use('/orders', orderRoutes);

connectDB();

app.listen(8002, () => {
    logger.info('Order Service running on port 8002');
});