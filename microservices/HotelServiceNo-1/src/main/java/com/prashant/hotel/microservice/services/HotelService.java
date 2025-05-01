package com.prashant.hotel.microservice.services;

import java.util.List;

import com.prashant.hotel.microservice.entities.Hotel;

public interface HotelService {

  // create hotel
  Hotel createHotel(Hotel hotel);

  // get All Hotel
  List<Hotel> getAllHotels(Hotel hotel);

  // get single
  Hotel getHotel(Long hotelId);

  // delete hotel
  Hotel deleteHotel(Long hotelId);

  // Update Hotel
  Hotel updateHotel(Long hotelId);

}
