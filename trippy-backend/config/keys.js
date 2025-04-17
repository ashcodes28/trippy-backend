module.exports = {
    secretOrKey: process.env.JWT_SECRET || 'your_jwt_secret',
    openAIKey: process.env.OPENAI_API_KEY,
    skyScannerKey: process.env.SKYSCANNER_API_KEY,
  };