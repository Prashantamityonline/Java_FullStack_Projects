package com.prashant.rating.microservice.services;

import java.util.List;

import com.prashant.rating.microservice.entities.Rating;

public interface RatingService {
  // crate Rating
  public Rating createRating(Rating rating);

  // get Rating
  public Rating getRating(Long ratingId);

  // update Rating
  public Rating updateRating(Long ratingId);

  // delete Rating
  public Rating deleteRating(Long ratingId);

  // get all Ratings
  public List<Rating> getAllRatings();

  // get all Ratings by userId
  public List<Rating> getAllRatingsByUserId(Long userId);

  // get all Ratings by hotelId
  public List<Rating> getAllRatingsByHotelId(Long hotelId);
}
