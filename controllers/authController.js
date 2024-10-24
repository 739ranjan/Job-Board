const jwt = require('jsonwebtoken');
const User = require('../models/User');
const bcrypt = require('bcryptjs');

// Register a new user (job seeker or recruiter)
exports.register = async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: 'User already exists' });

    const user = new User({ name, email, password, role });
    await user.save();
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: '1h'
    });

    res.status(201).json({ token });

    // res.send('User registered successfully\n', user, '\n', "token: ",token);
    console.log('User registered successfully\n', user, '\n', "token: ",token);
  } catch (error) {
    res.status(500).json({ message: 'Error registering user', error });
  }
};

// Login user
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: '1h'
    });

    res.status(200).json({ token });

    // res.send(`${email} : loggedIn \n token: ${token}`);
    console.log(`${email} : loggedIn \n token: ${token}`);
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error });
  }
};
