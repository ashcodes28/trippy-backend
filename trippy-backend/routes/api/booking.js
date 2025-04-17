const express = require('express');
const router = express.Router();
const bookingController = require('../../controllers/bookingController');
const auth = require('../../middleware/auth');

// @route   POST api/booking/search/transportation
// @desc    Search for transportation options
// @access  Private
router.post('/search/transportation', auth, bookingController.searchTransportation);

// @route   POST api/booking/search/accommodation
// @desc    Search for accommodation options
// @access  Private
router.post('/search/accommodation', auth, bookingController.searchAccommodation);

// @route   POST api/booking
// @desc    Create a new booking
// @access  Private
router.post('/', auth, bookingController.createBooking);

// @route   GET api/booking
// @desc    Get all bookings for current user
// @access  Private
router.get('/', auth, bookingController.getBookings);

// @route   PUT api/booking/:id/cancel
// @desc    Cancel a booking
// @access  Private
router.put('/:id/cancel', auth, bookingController.cancelBooking);

module.exports = router;