package com.prashant.rating.microservice.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.prashant.rating.microservice.entities.Rating;

public interface RatingRepository extends JpaRepository<Rating, Long> {
  // custom finder method
  List<Rating> findByUserId(Long userId);

  List<Rating> findByHotelId(Long hotelId);
}
