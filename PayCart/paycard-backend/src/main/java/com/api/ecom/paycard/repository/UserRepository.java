package com.api.ecom.paycard.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.stereotype.Repository;

import com.api.ecom.paycard.entities.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
 
  Boolean existsByEmail(String email);

  Boolean existsByUsername(String username);

}
