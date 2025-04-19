const express = require('express');
const router = express.Router();
const Shipment = require('../models/shipment');

router.post('/', async (req, res) => {
    try {
        const shipment = new Shipment(req.body);
        await shipment.save();
        res.status(201).json(shipment);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const shipment = await Shipment.findById(req.params.id);
        if (!shipment) {
            return res.status(404).json({ error: 'Shipment not found' });
        }
        res.json(shipment);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const shipment = await Shipment.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!shipment) {
            return res.status(404).json({ error: 'Shipment not found' });
        }
        res.json(shipment);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;