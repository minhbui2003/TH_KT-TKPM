const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./db');
const paymentRoutes = require('./routes/payment');
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
        new winston.transports.File({ filename: 'logs/payment-service.log' }),
        new winston.transports.Console(),
    ],
});

app.use(express.json());
app.use('/payments', paymentRoutes);

connectDB();

app.listen(8004, () => {
    logger.info('Payment Service running on port 8004');
});