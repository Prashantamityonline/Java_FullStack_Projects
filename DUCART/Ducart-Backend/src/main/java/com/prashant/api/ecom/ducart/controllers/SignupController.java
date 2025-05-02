package com.prashant.api.ecom.ducart.controllers;

import java.io.IOException;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.prashant.api.ecom.ducart.modal.ProfileDTO;
import com.prashant.api.ecom.ducart.modal.ProfileResponseDTO;
import com.prashant.api.ecom.ducart.modal.SignupDTO;
import com.prashant.api.ecom.ducart.modal.SignupResponseDTO;
import com.prashant.api.ecom.ducart.services.UserService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/user")
public class SignupController {

  @Autowired
  private UserService userService;

  @Autowired
  private ObjectMapper objectMapper;

  // Create user (signup)
  @PostMapping
  public ResponseEntity<SignupResponseDTO> signup(@RequestBody @Valid SignupDTO signupDTO) {
    SignupResponseDTO response = userService.signup(signupDTO);
    return ResponseEntity.status(HttpStatus.CREATED).body(response);
  }

  // Get all users
  @GetMapping
  public ResponseEntity<List<SignupResponseDTO>> getAllUsers() {
    return ResponseEntity.ok(userService.getAllUsers());
  }

  // Get user by ID
  @GetMapping("/{userid}")
  public ResponseEntity<SignupResponseDTO> getUserById(@PathVariable Long userid) {
    return ResponseEntity.ok(userService.getUserById(userid));
  }

  // Update profile
  @PutMapping("/{userid}")
  public ResponseEntity<ProfileResponseDTO> updateProfile(
      @PathVariable Long userid,
      @RequestPart("data") String jsonData,
      @RequestPart(value = "pic", required = false) MultipartFile file) throws IOException {

    ProfileDTO profileDTO = objectMapper.readValue(jsonData, ProfileDTO.class);
    ProfileResponseDTO updated = userService.updateProfile(userid, profileDTO, file);
    return ResponseEntity.ok(updated);
  }

  // Delete user by ID
  @DeleteMapping("/{userid}")
  public ResponseEntity<Map<String, Object>> deleteUser(@PathVariable Long userid) throws IOException {
    userService.deleteUser(userid);
    return ResponseEntity.ok(Map.of("message", "User deleted successfully"));
  }
}
