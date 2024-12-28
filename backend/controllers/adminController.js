const User = require('../models/user');
const Location = require('../models/location');

// Get all users (Admin View)
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, '-password');  // Exclude passwords
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch users', error: error.message });
  }
};

// Get user locations by userId
exports.getUserLocations = async (req, res) => {
  const { userId } = req.params;

  try {
    const locations = await Location.find({ userId });
    res.status(200).json(locations);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch location logs', error: error.message });
  }
};
