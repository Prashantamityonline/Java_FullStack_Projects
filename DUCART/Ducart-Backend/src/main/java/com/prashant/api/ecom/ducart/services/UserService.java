package com.prashant.api.ecom.ducart.services;

import java.util.List;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.prashant.api.ecom.ducart.entities.User;
import com.prashant.api.ecom.ducart.modal.UserDTO;
import com.prashant.api.ecom.ducart.repositories.UserRepo;

@Service
public class UserService {
  @Autowired
  private UserRepo userRepo;

  // signup method
  public User signup(UserDTO userDTO) {
    User savedUser = new User();
    BeanUtils.copyProperties(userDTO, savedUser);

    return userRepo.save(savedUser);
  }

  // // login method
  // public User login(String username, String password) {
  // User user = userRepo.findByUsernameAndPassword(username, password);
  // if (user != null) {
  // return user;
  // } else {
  // return null;
  // }
  // }

  // get All users
  public List<User> getAllUsers() {
    return userRepo.findAll();
  }

  // get user by id
  public User getUserById(Long userid) {
    return userRepo.findById(userid).orElseThrow(() -> new RuntimeException("User not found by id: " + userid));

  }
}
