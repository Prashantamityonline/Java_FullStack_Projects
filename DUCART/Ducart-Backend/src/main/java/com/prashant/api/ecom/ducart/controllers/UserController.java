package com.prashant.api.ecom.ducart.controllers;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.databind.ObjectMapper;
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
  public ResponseEntity<User> getUserByID(@PathVariable Long userid) {
    User user = userService.getUserById(userid);
    if (user != null) {
      return ResponseEntity.status(HttpStatus.OK).body(user);
    } else {
      return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }
  }

  // update user by id
  @PutMapping("/{userid}")
  public ResponseEntity<Map<String, Object>> updateUserByID(@PathVariable Long userid,
      @RequestPart("data") String jsonData,
      @RequestPart("pic") MultipartFile file) {
    try {
      // Parse the JSON data to a UserDTO object
      ObjectMapper mapper = new ObjectMapper();
      mapper.readValue(jsonData, UserDTO.class);

      User updatedUser = userService.getUserById(userid);
      Map<String, Object> response = new HashMap<>();
      response.put("message", "User updated successfully");
      response.put("data", updatedUser);
      return ResponseEntity.status(HttpStatus.OK).body(response);
    } catch (IOException e) {
      Map<String, Object> error = new HashMap<>();
      error.put("error", "Error updating user");
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
    }

  }

}
