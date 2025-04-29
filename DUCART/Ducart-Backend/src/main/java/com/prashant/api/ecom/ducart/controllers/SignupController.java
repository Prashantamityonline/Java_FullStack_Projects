package com.prashant.api.ecom.ducart.controllers;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;

import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import com.prashant.api.ecom.ducart.entities.User;
import com.prashant.api.ecom.ducart.modal.SignupDTO;
import com.prashant.api.ecom.ducart.services.SignupService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/user")
public class SignupController {
  @Autowired
  private SignupService userService;

  // signup method
  @PostMapping
  public ResponseEntity<User> signup(@RequestBody @Valid SignupDTO signupDTO) {
    User savedUser = userService.signup(signupDTO);
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

  // @PutMapping("/{userid}")
  // public ResponseEntity<Map<String, Object>> updateUserByID(
  // @PathVariable Long userid,
  // @RequestPart("data") String jsonData,
  // @RequestPart(value = "pic", required = false) MultipartFile file) {
  // try {
  // // Parse JSON data properly
  // ObjectMapper mapper = new ObjectMapper();
  // UserDTO userDTO = mapper.readValue(jsonData, UserDTO.class);

  // // Call the updateUser service
  // User updatedUser = userService.updateUser(userid, userDTO, file);

  // // Prepare response
  // Map<String, Object> response = new HashMap<>();
  // response.put("message", "User updated successfully");
  // response.put("data", updatedUser);

  // return ResponseEntity.status(HttpStatus.OK).body(response);
  // } catch (IOException e) {
  // Map<String, Object> error = new HashMap<>();
  // error.put("error", "Error updating user");
  // return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
  // }
  // }

  // delete user by id
  @DeleteMapping("/{userid}")
  public ResponseEntity<Map<String, Object>> deleteUserByID(@PathVariable Long userid) {
    try {
      userService.deleteUser(userid);
      Map<String, Object> response = new HashMap<>();
      response.put("message", "User deleted successfully");
      return ResponseEntity.status(HttpStatus.OK).body(response);
    } catch (IOException e) {
      Map<String, Object> error = new HashMap<>();
      error.put("error", "Error deleting user");
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
    }
  }
}
