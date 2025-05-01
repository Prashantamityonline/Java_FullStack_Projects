package com.prashant.hotel.microservice.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.prashant.hotel.microservice.entities.Hotel;
import com.prashant.hotel.microservice.services.HotelService;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/hotels")
public class HotelController {

  @Autowired
  private HotelService hotelService;

  // create hotel
  @PostMapping
  public ResponseEntity<Hotel> createHotel(@RequestBody Hotel hotel) {
    return ResponseEntity.status(HttpStatus.CREATED).body(hotelService.createHotel(hotel));
  }

  // get all hotels
  @GetMapping
  public ResponseEntity<List<Hotel>> getAllHotels(@RequestBody Hotel hotel) {
    return ResponseEntity.status(HttpStatus.OK).body(hotelService.getAllHotels(hotel));
  }

  // get single hotel
  @GetMapping("/{hotelId}")
  public ResponseEntity<Hotel> getHotel(@PathVariable Long hotelId) {
    return ResponseEntity.status(HttpStatus.OK).body(hotelService.getHotel(hotelId));

  }

  // delete hotel
  @DeleteMapping("/{hotelId}")
  public ResponseEntity<Hotel> deleteHotel(@PathVariable Long hotelId) {
    return ResponseEntity.status(HttpStatus.NO_CONTENT).body(hotelService.deleteHotel(hotelId));

  }

  // update hotel
  @PutMapping("/{hotelId}")
  public ResponseEntity<Hotel> updateHotel(@PathVariable Long hotelId) {
    return ResponseEntity.status(HttpStatus.OK).body(hotelService.updateHotel(hotelId));
  }

}
