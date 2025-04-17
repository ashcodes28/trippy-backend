const Booking = require('../models/Booking');
const bookingService = require('../services/bookingService');
const { v4: uuidv4 } = require('uuid');

// Search for transportation options
exports.searchTransportation = async (req, res) => {
  try {
    const { from, to, date, passengers, transportType } = req.body;
    
    const options = await bookingService.searchTransportation(
      from,
      to,
      date,
      passengers,
      transportType
    );
    
    res.json(options);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Search for accommodation options
exports.searchAccommodation = async (req, res) => {
  try {
    const { location, checkIn, checkOut, guests, roomType, priceRange } = req.body;
    
    const options = await bookingService.searchAccommodation(
      location,
      checkIn,
      checkOut,
      guests,
      roomType,
      priceRange
    );
    
    res.json(options);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Book transportation or accommodation
exports.createBooking = async (req, res) => {
  try {
    const {
      itineraryId,
      type,
      serviceProvider,
      details,
      price,
      isCombo
    } = req.body;
    
    const bookingReference = uuidv4().substring(0, 8).toUpperCase();
    
    // Calculate discount for combo bookings
    let appliedDiscount = 0;
    if (isCombo) {
      appliedDiscount = price.amount * 0.1; // 10% discount
    }
    
    const newBooking = new Booking({
      user: req.user.id,
      itinerary: itineraryId,
      type,
      serviceProvider,
      details,
      price: {
        amount: price.amount - appliedDiscount,
        currency: price.currency
      },
      status: 'confirmed', // Mock confirmation for demo purposes
      bookingReference,
      isCombo,
      appliedDiscount
    });
    
    await newBooking.save();
    
    res.json(newBooking);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Get all bookings for current user
exports.getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.id })
      .sort({ createdAt: -1 })
      .populate('itinerary', 'title destination startDate endDate');
    
    res.json(bookings);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Cancel booking
exports.cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    
    // Check if booking belongs to user
    if (booking.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }
    
    booking.status = 'cancelled';
    await booking.save();
    
    res.json(booking);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};