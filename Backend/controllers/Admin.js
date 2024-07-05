const User = require('../models/User');
const Store = require('../models/Store');

exports.getDashboard = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalStores = await Store.countDocuments();
    const totalRatings = await Store.aggregate([{ $unwind: '$ratings' }, { $count: 'total' }]);
    res.json({
      totalUsers,
      totalStores,
      totalRatings: totalRatings[0] ? totalRatings[0].total : 0,
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.addUser = async (req, res) => {
  const { name, email, password, address, role } = req.body;
  try {
    const user = new User({ name, email, password, address, role });
    await user.save();
    res.status(201).json({ message: 'User added successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

