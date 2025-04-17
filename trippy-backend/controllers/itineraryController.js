const Itinerary = require('../models/Itinerary');
const aiService = require('../services/aiService');

// Generate new itinerary
exports.generateItinerary = async (req, res) => {
  try {
    const { destination, startDate, endDate, travelStyle, interests, budget } = req.body;
    
    // Calculate days for the trip
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    
    if (diffDays <= 0) {
      return res.status(400).json({ message: 'Invalid date range' });
    }
    
    // Generate AI itinerary
    const generatedItinerary = await aiService.generateItinerary({
      destination,
      days: diffDays,
      travelStyle,
      interests,
      budget
    });
    
    // Create new itinerary
    const newItinerary = new Itinerary({
      user: req.user.id,
      title: `Trip to ${destination}`,
      destination,
      startDate,
      endDate,
      travelStyle,
      interests,
      budget,
      days: generatedItinerary.days
    });
    
    await newItinerary.save();
    
    res.json(newItinerary);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Get all itineraries for current user
exports.getItineraries = async (req, res) => {
  try {
    const itineraries = await Itinerary.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(itineraries);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Get single itinerary by ID
exports.getItineraryById = async (req, res) => {
  try {
    const itinerary = await Itinerary.findById(req.params.id);
    
    if (!itinerary) {
      return res.status(404).json({ message: 'Itinerary not found' });
    }
    
    // Check if itinerary belongs to user or is shared
    if (itinerary.user.toString() !== req.user.id && !itinerary.isShared) {
      return res.status(401).json({ message: 'Not authorized' });
    }
    
    res.json(itinerary);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Update itinerary
exports.updateItinerary = async (req, res) => {
  try {
    const { title, days, isShared } = req.body;
    
    const itinerary = await Itinerary.findById(req.params.id);
    
    if (!itinerary) {
      return res.status(404).json({ message: 'Itinerary not found' });
    }
    
    // Check if itinerary belongs to user
    if (itinerary.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }
    
    // Update fields
    if (title) itinerary.title = title;
    if (days) itinerary.days = days;
    if (isShared !== undefined) itinerary.isShared = isShared;
    
    await itinerary.save();
    
    res.json(itinerary);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Delete itinerary
exports.deleteItinerary = async (req, res) => {
  try {
    const itinerary = await Itinerary.findById(req.params.id);
    
    if (!itinerary) {
      return res.status(404).json({ message: 'Itinerary not found' });
    }
    
    // Check if itinerary belongs to user
    if (itinerary.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }
    
    await itinerary.remove();
    
    res.json({ message: 'Itinerary removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
