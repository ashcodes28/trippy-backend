const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BookingSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users',
    required: true
  },
  itinerary: {
    type: Schema.Types.ObjectId,
    ref: 'itineraries'
  },
  type: {
    type: String,
    enum: ['flight', 'hotel', 'train', 'bus', 'combo'],
    required: true
  },
  serviceProvider: {
    name: String,
    confirmation: String
  },
  details: {
    departureLocation: String,
    arrivalLocation: String,
    departureDate: Date,
    arrivalDate: Date,
    passengers: [
      {
        name: String,
        type: String // adult, child, infant
      }
    ],
    accommodation: {
      checkIn: Date,
      checkOut: Date,
      roomType: String,
      guests: Number
    }
  },
  price: {
    amount: Number,
    currency: String
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'cancelled'],
    default: 'pending'
  },
  bookingReference: {
    type: String,
    unique: true
  },
  isCombo: {
    type: Boolean,
    default: false
  },
  appliedDiscount: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = Booking = mongoose.model('bookings', BookingSchema);