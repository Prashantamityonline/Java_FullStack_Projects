package com.prashant.microservices.entities;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Rating {

  private Long ratingId;
  private Long userId;
  private Long hotelId;
  private Integer rating;
  private String feedback;
}
