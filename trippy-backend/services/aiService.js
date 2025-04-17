const { Configuration, OpenAIApi } = require('openai');
const keys = require('../config/keys');

const configuration = new Configuration({
  apiKey: keys.openAIKey,
});
const openai = new OpenAIApi(configuration);

exports.generateItinerary = async ({ destination, days, travelStyle, interests, budget }) => {
  try {
    // Create a prompt for GPT-4
    const prompt = `Generate a detailed ${days}-day travel itinerary for ${destination} with a ${travelStyle} travel style. 
    The traveler is interested in ${interests.join(', ')} and has a budget of approximately ${budget}.
    For each day, include morning, afternoon, and evening activities, suggested accommodation, and transportation options.
    Format the response as JSON with the following structure:
    {
      "days": [
        {
          "day": 1,
          "activities": [
            {
              "time": "Morning",
              "description": "Visit X",
              "location": "Address or area",
              "duration": "2 hours",
              "notes": "Additional information"
            },
            // more activities
          ],
          "accommodation": {
            "name": "Hotel name",
            "address": "Hotel address"
          },
          "transportation": [
            {
              "type": "Bus",
              "from": "A",
              "to": "B",
              "departureTime": "10:00 AM",
              "arrivalTime": "11:00 AM"
            }
            // more transportation
          ]
        }
        // more days
      ]
    }`;

    const response = await openai.createCompletion({
      model: "gpt-4",
      prompt,
      max_tokens: 2000,
      temperature: 0.7,
    });

    // Parse the response and return structured itinerary
    const itineraryText = response.data.choices[0].text.trim();
    const itineraryData = JSON.parse(itineraryText);
    
    return itineraryData;
  } catch (error) {
    console.error('AI Service Error:', error);
    // Fallback to a simple template if AI generation fails
    return generateFallbackItinerary(destination, days, travelStyle);
  }
};

// Fallback function in case AI generation fails
const generateFallbackItinerary = (destination, days, travelStyle) => {
  const itinerary = {
    days: []
  };
  
  for (let i = 1; i <= days; i++) {
    itinerary.days.push({
      day: i,
      activities: [
        {
          time: "Morning",
          description: `Explore ${destination} downtown area`,
          location: "City Center",
          duration: "3 hours",
          notes: "Start with the main attractions"
        },
        {
          time: "Afternoon",
          description: "Local cuisine experience",
          location: "Local restaurants",
          duration: "2 hours",
          notes: "Try popular local dishes"
        },
        {
          time: "Evening",
          description: "Relaxation time",
          location: "Hotel or nearby park",
          duration: "2 hours",
          notes: "Rest and prepare for the next day"
        }
      ],
      accommodation: {
        name: `${travelStyle.charAt(0).toUpperCase() + travelStyle.slice(1)} Hotel`,
        address: `${destination} Central Area`
      },
      transportation: [
        {
          type: "Walking",
          from: "Hotel",
          to: "City Center",
          departureTime: "09:00 AM",
          arrivalTime: "09:15 AM"
        }
      ]
    });
  }
  
  return itinerary;
};