const express = require('express');
const router = express.Router();
const itineraryController = require('../../controllers/itineraryController');
const auth = require('../../middleware/auth');

// @route   POST api/itinerary/generate
// @desc    Generate an AI itinerary
// @access  Private
router.post('/generate', auth, itineraryController.generateItinerary);

// @route   GET api/itinerary
// @desc    Get all itineraries for current user
// @access  Private
router.get('/', auth, itineraryController.getItineraries);

// @route   GET api/itinerary/:id
// @desc    Get itinerary by ID
// @access  Private
router.get('/:id', auth, itineraryController.getItineraryById);

// @route   PUT api/itinerary/:id
// @desc    Update itinerary
// @access  Private
router.put('/:id', auth, itineraryController.updateItinerary);

// @route   DELETE api/itinerary/:id
// @desc    Delete itinerary
// @access  Private
router.delete('/:id', auth, itineraryController.deleteItinerary);

module.exports = router;