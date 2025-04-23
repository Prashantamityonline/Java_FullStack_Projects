package com.api.ecom.paycard.services;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.api.ecom.paycard.entities.User;
import com.api.ecom.paycard.model.UserDTO;
import com.api.ecom.paycard.repository.UserRepository;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

@Service
public class UserService {

  @Autowired
  private UserRepository userRepository;

  private static final String UPLOAD_DIR = System.getProperty("user.dir") + "/uploads/users/";

  public UserService() {
    // Ensure the upload directory exists
    File directory = new File(UPLOAD_DIR);
    if (!directory.exists() && !directory.mkdirs()) {
      throw new RuntimeException("Could not create upload directory: " + UPLOAD_DIR);
    }
  }

  // Create a new user
  public User createUser(UserDTO userDTO) {
    if (userRepository.existsByUsername(userDTO.getUsername())) {
      throw new IllegalArgumentException("Username is already taken");
    }
    if (userRepository.existsByEmail(userDTO.getEmail())) {
      throw new IllegalArgumentException("Email is already registered");
    }

    User user = new User();
    BeanUtils.copyProperties(userDTO, user);
    return userRepository.save(user);
  }

  // all users
  public List<User> getAllUsers() {
    return userRepository.findAll();
  }

  // Retrieve a user by ID
  public User getUserById(Long userid) {
    return userRepository.findById(userid)
        .orElseThrow(() -> new RuntimeException("User not found with ID: " + userid));
  }

  public UserDTO updateUser(Long userid, UserDTO userDTO, MultipartFile file) throws IOException {
    User existingUser = userRepository.findById(userid)
        .orElseThrow(() -> new RuntimeException("User not found"));

    existingUser.setName(userDTO.getName());
    existingUser.setUsername(userDTO.getUsername());
    existingUser.setEmail(userDTO.getEmail());
    existingUser.setPhone(userDTO.getPhone());
    existingUser.setPassword(userDTO.getPassword());
    existingUser.setRole(userDTO.getRole() != null ? userDTO.getRole() : "Buyer");
    existingUser.setAddress(userDTO.getAddress());
    existingUser.setCity(userDTO.getCity());
    existingUser.setState(userDTO.getState());
    existingUser.setPin(userDTO.getPin());

    // Handle file upload
    if (file != null && !file.isEmpty()) {
      String relativePath = saveFile(file);
      existingUser.setPic(relativePath); // ✅ Update `existingUser`
    }

    User updatedUser = userRepository.save(existingUser);
    UserDTO updatedUserDTO = new UserDTO();
    BeanUtils.copyProperties(updatedUser, updatedUserDTO);
    return updatedUserDTO;
  }

  // // Update an existing user
  // public UserDTO updateUser(Long id, UserDTO userDTO, MultipartFile file)
  // throws IOException {
  // User existingUser = userRepository.findById(id).orElseThrow(() -> new
  // RuntimeException("User not found"));

  // // Update user details
  // existingUser.setName(userDTO.getName());
  // existingUser.setUsername(userDTO.getUsername());
  // existingUser.setEmail(userDTO.getEmail());
  // existingUser.setPhone(userDTO.getPhone());
  // existingUser.setPassword(userDTO.getPassword());
  // existingUser.setRole(userDTO.getRole() != null ? userDTO.getRole() :
  // "Buyer");
  // existingUser.setAddress(userDTO.getAddress());
  // existingUser.setCity(userDTO.getCity());
  // existingUser.setState(userDTO.getState());
  // existingUser.setPin(userDTO.getPin());

  // // Handle file upload
  // if (file != null && !file.isEmpty()) {
  // String relativePath = saveFile(file);
  // userDTO.setPic(relativePath);
  // }

  // User updatedUser = userRepository.save(existingUser);
  // UserDTO updatedUserDTO = new UserDTO();
  // BeanUtils.copyProperties(updatedUser, updatedUserDTO);
  // return updatedUserDTO;
  // }

  // save the file and return the relative file path
  private String saveFile(MultipartFile file) throws IOException {
    String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();
    Path filePath = Paths.get(UPLOAD_DIR, fileName);
    Files.write(filePath, file.getBytes());

    return "/uploads/users/" + fileName;
  }

  // Delete a user by ID
  public void deleteUser(Long id) {
    if (!userRepository.existsById(id)) {
      throw new RuntimeException("User not found with ID: " + id);
    }
    userRepository.deleteById(id);
  }
}
