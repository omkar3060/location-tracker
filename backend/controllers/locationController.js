const Location = require('../models/location');

exports.saveLocation = async (req, res) => {
  const { latitude, longitude, userId } = req.body; // Include userId here

  try {
    if (!userId) {
      return res.status(400).json({ message: 'userId is required' });
    }

    const newLocation = new Location({ latitude, longitude, userId }); // Add userId to the model
    await newLocation.save();
    res.status(201).json({ message: 'Location saved successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to save location', error: error.message });
  }
};
