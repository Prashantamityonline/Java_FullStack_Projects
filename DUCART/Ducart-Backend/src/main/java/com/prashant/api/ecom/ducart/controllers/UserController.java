package com.prashant.api.ecom.ducart.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import com.prashant.api.ecom.ducart.entities.User;
import com.prashant.api.ecom.ducart.modal.UserDTO;
import com.prashant.api.ecom.ducart.services.UserService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/user")
public class UserController {
  @Autowired
  private UserService userService;

  // signup method
  @PostMapping
  public ResponseEntity<User> signup(@RequestBody @Valid UserDTO userDTO) {
    User savedUser = userService.signup(userDTO);
    return ResponseEntity.status(HttpStatus.CREATED).body(savedUser);
  }

  // get all users
  @GetMapping
  public ResponseEntity<List<User>> getAllUsers() {
    List<User> users = userService.getAllUsers();
    return ResponseEntity.status(HttpStatus.OK).body(users);
  }

  // get user by id
  @GetMapping("/{userid}")
  public ResponseEntity<User> getUserById(@PathVariable Long userid) {
    User user = userService.getUserById(userid);
    return ResponseEntity.status(HttpStatus.OK).body(user);
  }
}
