package com.prashant.microservices.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.prashant.microservices.entities.User;

public interface UserRepository extends JpaRepository<User, Long> {

  // if you want to implement any custom method or query

}
