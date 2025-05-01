package com.prashant.rating.microservice.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.prashant.rating.microservice.entities.Rating;
import com.prashant.rating.microservice.services.RatingService;

@RestController
@RequestMapping("/ratings")
public class RatingController {
  @Autowired
  private RatingService ratingService;

  // create rating
  @PostMapping
  public ResponseEntity<Rating> createRating(@RequestBody Rating rating) {
    return ResponseEntity.status(HttpStatus.CREATED).body(ratingService.createRating(rating));

  }

  // get rating
  @GetMapping("/{ratingId}")
  public ResponseEntity<Rating> getRating(@PathVariable Long ratingId) {
    return ResponseEntity.status(HttpStatus.OK).body(ratingService.getRating(ratingId));
  }

  // delete rating
  @DeleteMapping("/{ratingId}")
  public ResponseEntity<Rating> deleteRating(@PathVariable Long ratingId) {
    return ResponseEntity.status(HttpStatus.NO_CONTENT).body(ratingService.deleteRating(ratingId));
  }

  // get all ratings
  @GetMapping
  public ResponseEntity<List<Rating>> getAllRatings() {
    return ResponseEntity.status(HttpStatus.OK).body(ratingService.getAllRatings());
  }

  // get all User ratings
  @GetMapping("/users/{userId}")
  public ResponseEntity<List<Rating>> getRatingByUserId(@PathVariable Long userId) {
    return ResponseEntity.status(HttpStatus.OK).body(ratingService.getAllRatingsByUserId(userId));

  }

  // get all Hotel ratings
  @GetMapping("/hotels/{hotelId}")
  public ResponseEntity<List<Rating>> getRatingByHotelId(@PathVariable Long hotelId) {
    return ResponseEntity.status(HttpStatus.OK).body(ratingService.getAllRatingsByHotelId(hotelId));
  }

}
