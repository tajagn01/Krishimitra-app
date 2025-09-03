const express = require('express');
const router = express.Router();
const Price = require('../models/Price');

// Get all prices
router.get('/', async (req, res) => {
  try {
    const location = req.query.location;
    const query = location ? { location } : {};
    
    const prices = await Price.find(query).sort({ lastUpdated: -1 });
    res.json(prices);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get prices by crop name
router.get('/:cropName', async (req, res) => {
  try {
    const prices = await Price.find({ 
      name: req.params.cropName 
    }).sort({ lastUpdated: -1 });
    
    if (prices.length === 0) {
      return res.status(404).json({ message: 'Crop not found' });
    }
    res.json(prices);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add new price
router.post('/', async (req, res) => {
  const price = new Price({
    name: req.body.name,
    price: req.body.price,
    change: req.body.change,
    location: req.body.location
  });

  try {
    const newPrice = await price.save();
    res.status(201).json(newPrice);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update price
router.patch('/:id', async (req, res) => {
  try {
    const price = await Price.findById(req.params.id);
    
    if (!price) {
      return res.status(404).json({ message: 'Price not found' });
    }

    if (req.body.price != null) {
      const oldPrice = price.price;
      price.price = req.body.price;
      price.change = req.body.price - oldPrice;
    }
    
    price.lastUpdated = Date.now();
    const updatedPrice = await price.save();
    res.json(updatedPrice);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
