package com.api.ecom.paycard.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.api.ecom.paycard.entities.User;
import com.api.ecom.paycard.model.UserDTO;
import com.api.ecom.paycard.services.UserService;
import jakarta.validation.Valid;

import java.io.IOException;
import java.util.List;

@CrossOrigin(origins = "http://localhost:3000", methods = { RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT,
    RequestMethod.DELETE })
@RestController
@RequestMapping("/api/user")
public class UserController {

  @Autowired
  private UserService userService;

  // GET All Users
  @GetMapping
  public ResponseEntity<List<User>> getAllUsers() {
    return ResponseEntity.status(HttpStatus.OK).body(userService.getAllUsers());
  }

  // Create User
  @PostMapping
  public ResponseEntity<User> createUser(@RequestBody @Valid UserDTO user) {
    System.out.println("User: " + user);
    return ResponseEntity.status(HttpStatus.CREATED).body(userService.createUser(user));
  }

  // Get User by ID
  @GetMapping("/{id}")
  public ResponseEntity<User> getUserById(@PathVariable Long id) {
    return ResponseEntity.status(HttpStatus.OK).body(userService.getUserById(id));
  }

  // // Update User by ID
  @PutMapping("/{userid}")
  public ResponseEntity<UserDTO> updateUser(
      @PathVariable Long userid,
      @RequestPart("data") UserDTO userDTO,
      @RequestPart(value = "pic", required = false) MultipartFile file) {
    try {
      return ResponseEntity.status(HttpStatus.OK).body(userService.updateUser(userid,
          userDTO, file));
    } catch (IOException e) {
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
    }
  }
  // @PutMapping("/{userid}")
  // public ResponseEntity<UserDTO> updateUser(
  // @PathVariable Long userid, // ✅ Corrected Path Variable
  // @RequestPart("data") UserDTO userDTO,
  // @RequestPart(value = "pic", required = false) MultipartFile file) {
  // try {
  // return
  // ResponseEntity.status(HttpStatus.OK).body(userService.updateUser(userid,
  // userDTO, file));
  // } catch (IOException e) {
  // return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
  // }
  // }

  // Delete User by ID
  @DeleteMapping("/{id}")
  public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
    userService.deleteUser(id);
    return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
  }
}
