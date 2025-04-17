const axios = require('axios');
const keys = require('../config/keys');

// Mock data for demo - in a real app, this would use the Skyscanner API
const mockFlights = require('../data/mockFlights.json');
const mockHotels = require('../data/mockHotels.json');
const mockTrains = require('../data/mockTrains.json');
const mockBuses = require('../data/mockBuses.json');

// Search for transportation options
exports.searchTransportation = async (from, to, date, passengers, transportType) => {
  try {
    // In a real app, we would call the Skyscanner API here
    /*
    const response = await axios.get('https://skyscanner-api/search', {
      params: {
        apiKey: keys.skyScannerKey,
        from,
        to,
        date,
        passengers,
        transportType
      }
    });
    return response.data;
    */
    
    // For demo purposes, return mock data
    switch (transportType) {
      case 'flight':
        return mockFlights;
      case 'train':
        return mockTrains;
      case 'bus':
        return mockBuses;
      default:
        return [...mockFlights, ...mockTrains, ...mockBuses];
    }
  } catch (error) {
    console.error('Booking Service Error:', error);
    throw new Error('Failed to fetch transportation options');
  }
};

// Search for accommodation options
exports.searchAccommodation = async (location, checkIn, checkOut, guests, roomType, priceRange) => {
  try {
    // In a real app, we would call the Skyscanner or similar API here
    /*
    const response = await axios.get('https://skyscanner-api/hotels', {
      params: {
        apiKey: keys.skyScannerKey,
        location,
        checkIn,
        checkOut,
        guests,
        roomType,
        minPrice: priceRange?.min,
        maxPrice: priceRange?.max
      }
    });
    return response.data;
    */
    
    // For demo purposes, return mock data
    let filteredHotels = mockHotels;
    
    // Apply filters
    if (priceRange && priceRange.min !== undefined && priceRange.max !== undefined) {
      filteredHotels = filteredHotels.filter(
        hotel => hotel.price >= priceRange.min && hotel.price <= priceRange.max
      );
    }
    
    if (roomType) {
      filteredHotels = filteredHotels.filter(
        hotel => hotel.roomTypes.includes(roomType)
      );
    }
    
    return filteredHotels;
  } catch (error) {
    console.error('Booking Service Error:', error);
    throw new Error('Failed to fetch accommodation options');
  }
};