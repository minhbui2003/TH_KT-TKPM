const express = require('express');
const router = express.Router();
const Inventory = require('../models/inventory');

router.post('/update', async (req, res) => {
    try {
        const { productId, quantity } = req.body;
        const inventory = await Inventory.findOneAndUpdate(
            { productId },
            { $inc: { stock: -quantity } },
            { new: true, runValidators: true }
        );
        if (!inventory || inventory.stock < 0) {
            return res.status(400).json({ error: 'Insufficient stock' });
        }
        res.json(inventory);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.get('/:productId', async (req, res) => {
    try {
        const inventory = await Inventory.findOne({ productId: req.params.productId });
        if (!inventory) {
            return res.status(404).json({ error: 'Inventory not found' });
        }
        res.json(inventory);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;