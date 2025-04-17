const Review = require('../models/Review');

// Create a new review
exports.createReview = async (req, res) => {
  try {
    const { itineraryId, placeId, placeName, rating, title, content, images, tags } = req.body;
    
    const newReview = new Review({
      user: req.user.id,
      itinerary: itineraryId,
      placeId,
      placeName,
      rating,
      title,
      content,
      images,
      tags
    });
    
    await newReview.save();
    
    res.json(newReview);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Get all reviews by place
exports.getReviewsByPlace = async (req, res) => {
  try {
    const { placeId } = req.params;
    
    const reviews = await Review.find({ placeId })
      .sort({ createdAt: -1 })
      .populate('user', 'name avatar');
      
    res.json(reviews);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Get all reviews by user
exports.getUserReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ user: req.user.id })
      .sort({ createdAt: -1 })
      .populate('itinerary', 'title destination');
      
    res.json(reviews);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Delete review
exports.deleteReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    
    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }
    
    // Check if review belongs to user
    if (review.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }
    
    await review.remove();
    
    res.json({ message: 'Review removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};