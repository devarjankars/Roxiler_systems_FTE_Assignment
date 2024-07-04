const Store = require('../models/Store');

exports.addStore = async (req, res) => {
  const { name, email, address } = req.body;
  try {
    const store = new Store({ name, email, address, owner: req.user.userId });
    await store.save();
    res.status(201).json({ message: 'Store added successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getStores = async (req, res) => {
  try {
    const stores = await Store.find().populate('owner', 'name email');
    res.json(stores);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.submitRating = async (req, res) => {
  const { storeId, rating } = req.body;
  try {
    const store = await Store.findById(storeId);
    if (!store) return res.status(404).json({ error: 'Store not found' });

    const existingRating = store.ratings.find(r => r.user.toString() === req.user.userId.toString());
    if (existingRating) {
      existingRating.rating = rating;
    } else {
      store.ratings.push({ user: req.user.userId, rating });
    }

    store.rating = store.ratings.reduce((acc, curr) => acc + curr.rating, 0) / store.ratings.length;
    await store.save();
    res.json({ message: 'Rating submitted successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
