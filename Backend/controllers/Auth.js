
const User = require('../models/User');

const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');

exports.signup = async (req, res) => {
    console.log("hello backend ", req.body);
  const { name, email, password, address } = req.body;
       if( !name || !email|| !password|| !address){
        return res.status(400).
        json({ error: "Please check credential",
               status:false
        });
       }
  try {
    const user = new User({ name, email, password, address });
    await user.save();
    res.status(201)
    .json({ message: 'User created successfully',
           status :true
     });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  if( !email|| !password){
    return res.status(400).
    json({ error: "Please check credential",
           status:false
    });
}
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ userId: user._id, role: user.role }, 'your_jwt_secret', { expiresIn: '1h' });
    res.json({ token, user });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    res.json({ user });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
