const express = require('express');
const router = express.Router();
const reviewController = require('../../controllers/reviewController');
const auth = require('../../middleware/auth');

// @route   POST api/review
// @desc    Create a new review
// @access  Private
router.post('/', auth, reviewController.createReview);

// @route   GET api/review/place/:placeId
// @desc    Get all reviews for a place
// @access  Private
router.get('/place/:placeId', auth, reviewController.getReviewsByPlace);

// @route   GET api/review/user
// @desc    Get all reviews by current user
// @access  Private
router.get('/user', auth, reviewController.getUserReviews);

// @route   DELETE api/review/:id
// @desc    Delete a review
// @access  Private
router.delete('/:id', auth, reviewController.deleteReview);

module.exports = router;
