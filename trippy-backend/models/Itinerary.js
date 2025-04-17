const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ItinerarySchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  title: {
    type: String,
    required: true
  },
  destination: {
    type: String,
    required: true
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  travelStyle: {
    type: String,
    enum: ['budget', 'moderate', 'luxury'],
    default: 'moderate'
  },
  interests: [String],
  budget: {
    type: Number
  },
  days: [
    {
      day: Number,
      activities: [
        {
          time: String,
          description: String,
          location: String,
          duration: String,
          notes: String
        }
      ],
      accommodation: {
        name: String,
        address: String,
        bookingReference: String
      },
      transportation: [
        {
          type: String,
          from: String,
          to: String,
          departureTime: String,
          arrivalTime: String,
          bookingReference: String
        }
      ]
    }
  ],
  isShared: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = Itinerary = mongoose.model('itineraries', ItinerarySchema);