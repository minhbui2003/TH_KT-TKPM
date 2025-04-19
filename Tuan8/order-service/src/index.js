const express = require('express');
const proxy = require('express-http-proxy');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// Proxy requests to Product Service
app.use('/products', proxy(process.env.PRODUCT_SERVICE_URL, {
	proxyReqPathResolver: (req) => `/products${req.url}`
}));

// Proxy requests to Order Service
app.use('/orders', proxy(process.env.ORDER_SERVICE_URL, {
	proxyReqPathResolver: (req) => `/orders${req.url}`
}));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`API Gateway running on port ${PORT}`);
});