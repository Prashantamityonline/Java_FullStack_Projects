package com.prashant.hotel.microservice.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.prashant.hotel.microservice.entities.Hotel;

public interface HotelRepository extends JpaRepository<Hotel, Long>  {

}
