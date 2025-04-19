const express = require('express');
const jwt = require('jsonwebtoken');
const rateLimit = require('express-rate-limit');
const axios = require('axios');
const dotenv = require('dotenv');
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
        new winston.transports.File({ filename: 'logs/api-gateway.log' }),
        new winston.transports.Console(),
    ],
});

app.use(express.json());

// Rate Limiter
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests
});
app.use(limiter);

// JWT Authentication
const authenticateJWT = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ error: 'Access token required' });
    }
    try {
        jwt.verify(token, process.env.JWT_SECRET);
        next();
    } catch (error) {
        res.status(403).json({ error: 'Invalid token' });
    }
};

// Login endpoint
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    if (username === 'admin' && password === 'admin123') {
        const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } else {
        res.status(401).json({ error: 'Invalid credentials' });
    }
});

// Proxy routes
const services = {
    products: process.env.PRODUCT_SERVICE_URL,
    orders: process.env.ORDER_SERVICE_URL,
    customers: process.env.CUSTOMER_SERVICE_URL,
    payments: process.env.PAYMENT_SERVICE_URL,
    inventory: process.env.INVENTORY_SERVICE_URL,
    shipments: process.env.SHIPPING_SERVICE_URL,
};

Object.keys(services).forEach((service) => {
    app.use(`/${service}`, authenticateJWT, async (req, res) => {
        try {
            const response = await axios({
                method: req.method,
                url: `${services[service]}${req.originalUrl}`,
                data: req.body,
            });
            res.json(response.data);
        } catch (error) {
            res.status(error.response?.status || 500).json({ error: error.message });
        }
    });
});

app.listen(8000, () => {
    logger.info('API Gateway running on port 8000');
});
