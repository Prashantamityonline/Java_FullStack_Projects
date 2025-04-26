package com.prashant.api.ecom.ducart.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.prashant.api.ecom.ducart.entities.User;

public interface UserRepo extends JpaRepository<User, Long> {

  User findByUsernameAndPassword(String username, String password);

}
