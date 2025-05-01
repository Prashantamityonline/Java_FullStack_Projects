package com.prashant.rating.microservice.services.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.prashant.rating.microservice.entities.Rating;
import com.prashant.rating.microservice.repository.RatingRepository;
import com.prashant.rating.microservice.services.RatingService;

@Service
public class RatingServiceImpl implements RatingService {

	@Autowired
	private RatingRepository ratingRepository;

	@Override
	public Rating createRating(Rating rating) {
		return ratingRepository.save(rating);
	}

	@Override
	public Rating getRating(Long ratingId) {

		return ratingRepository.findById(ratingId).get();
	}

	@Override
	public Rating updateRating(Long ratingId) {

		return ratingRepository.findById(ratingId).get();
	}

	@Override
	public Rating deleteRating(Long ratingId) {
		return ratingRepository.findById(ratingId).get();
	}

	@Override
	public List<Rating> getAllRatings() {

		return ratingRepository.findAll();
	}

	@Override
	public List<Rating> getAllRatingsByUserId(Long userId) {
		return ratingRepository.findByUserId(userId);
	}

	@Override
	public List<Rating> getAllRatingsByHotelId(Long hotelId) {
		return ratingRepository.findByHotelId(hotelId);
	}

}
