const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./db');
const productRoutes = require('./routes/product');
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
        new winston.transports.File({ filename: 'logs/product-service.log' }),
        new winston.transports.Console(),
    ],
});

app.use(express.json());
app.use('/products', productRoutes);

connectDB();

app.listen(8001, () => {
    logger.info('Product Service running on port 8001');
});
