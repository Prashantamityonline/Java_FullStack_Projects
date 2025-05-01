package com.prashant.hotel.microservice.services.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.prashant.hotel.microservice.entities.Hotel;
import com.prashant.hotel.microservice.exception.ResourceNotFoundException;
import com.prashant.hotel.microservice.repository.HotelRepository;
import com.prashant.hotel.microservice.services.HotelService;

@Service
public class HotelServiceImpl implements HotelService {

	@Autowired
	private HotelRepository hotelRepository;

	@Override
	public Hotel createHotel(Hotel hotel) {
		return hotelRepository.save(hotel);
	}

	@Override
	public List<Hotel> getAllHotels(Hotel hotel) {
		return hotelRepository.findAll();
	}

	@Override
	public Hotel getHotel(Long hotelId) {
		return hotelRepository.findById(hotelId)
				.orElseThrow(() -> new ResourceNotFoundException("Hotel not found with id:" + hotelId));
	}

	@Override
	public Hotel deleteHotel(Long hotelId) {
		return hotelRepository.findById(hotelId)
				.orElseThrow(() -> new ResourceNotFoundException("Hotel not found with id:" + hotelId));

	}

	@Override
	public Hotel updateHotel(Long hotelId) {
		return hotelRepository.findById(hotelId)
				.orElseThrow(() -> new ResourceNotFoundException("Hotel not found with id:" + hotelId));
	}

}
