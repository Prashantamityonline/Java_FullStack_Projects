package com.prashant.api.ecom.ducart.services;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.prashant.api.ecom.ducart.entities.User;
import com.prashant.api.ecom.ducart.exception.ResourceNotFoundException;
import com.prashant.api.ecom.ducart.modal.ProfileDTO;
import com.prashant.api.ecom.ducart.modal.ProfileResponseDTO;
import com.prashant.api.ecom.ducart.modal.SignupDTO;
import com.prashant.api.ecom.ducart.modal.SignupResponseDTO;
import com.prashant.api.ecom.ducart.repositories.UserRepo;
import com.prashant.api.ecom.ducart.utils.FileUploadUtil;

@Service
public class UserService {

  @Autowired
  private UserRepo userRepo;

  private final String uploadDir = FileUploadUtil.getUploadDirFor("users");

  // Signup
  public SignupResponseDTO signup(SignupDTO signupDTO) {
    User user = new User();
    BeanUtils.copyProperties(signupDTO, user);
    User savedUser = userRepo.save(user);
    return mapToSignupResponseDTO(savedUser);
  }

  // Get user by ID
  public SignupResponseDTO getUserById(Long userid) {
    User user = userRepo.findById(userid).orElseThrow(() -> new ResourceNotFoundException("User"));
    return mapToSignupResponseDTO(user);
  }

  // Get all users
  public List<SignupResponseDTO> getAllUsers() {
    return userRepo.findAll().stream()
        .map(this::mapToSignupResponseDTO)
        .collect(Collectors.toList());
  }

  // Update profile
  public ProfileResponseDTO updateProfile(Long userid, ProfileDTO profileDTO, MultipartFile file) throws IOException {
    User user = userRepo.findById(userid)
        .orElseThrow(() -> new ResourceNotFoundException("User not found"));

    if (file != null && !file.isEmpty()) {
      String relativePath = saveFile(file);
      profileDTO.setPic(relativePath);
    }
    profileDTO.setName(profileDTO.getName());
    profileDTO.setPhone(profileDTO.getPhone());
    profileDTO.setAddress(profileDTO.getAddress());
    profileDTO.setCity(profileDTO.getCity());
    profileDTO.setState(profileDTO.getState());
    profileDTO.setPic(profileDTO.getPic());
    // Only update fields that are meant to change
    BeanUtils.copyProperties(profileDTO, user,
        "userid", "email", "username", "password", "role");

    User updatedUser = userRepo.save(user);
    return mapToProfileResponseDTO(updatedUser);
  }

  // Delete user
  public void deleteUser(Long id) throws IOException {
    userRepo.findById(id).orElseThrow(() -> new ResourceNotFoundException("User not found"));
    userRepo.deleteById(id);
  }

  // save file Method
  private String saveFile(MultipartFile file) throws IOException {
    String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();
    Path filePath = Path.of(uploadDir, fileName);
    Files.write(filePath, file.getBytes());
    return "/uploads/users/" + fileName;
  }

  // Mapping helpers
  private SignupResponseDTO mapToSignupResponseDTO(User user) {
    SignupResponseDTO responseDTO = new SignupResponseDTO();
    BeanUtils.copyProperties(user, responseDTO);
    return responseDTO;
  }

  private ProfileResponseDTO mapToProfileResponseDTO(User user) {
    ProfileResponseDTO responseDTO = new ProfileResponseDTO();
    BeanUtils.copyProperties(user, responseDTO);
    return responseDTO;
  }
}

// import java.io.IOException;
// import java.nio.file.Path;
// import java.util.List;
// import java.util.stream.Collectors;

// import org.springframework.beans.BeanUtils;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.stereotype.Service;
// import org.springframework.web.multipart.MultipartFile;

// import com.prashant.api.ecom.ducart.entities.User;
// import com.prashant.api.ecom.ducart.modal.ProfileDTO;
// import com.prashant.api.ecom.ducart.modal.ProfileResponseDTO;
// import com.prashant.api.ecom.ducart.modal.SignupDTO;
// import com.prashant.api.ecom.ducart.modal.SignupResponseDTO;
// import com.prashant.api.ecom.ducart.repositories.UserRepo;
// import com.prashant.api.ecom.ducart.utils.FileUploadUtil;

// @Service
// public class UserService {
// @Autowired
// private UserRepo userRepo;

// // File upload directory
// String uploadDir = FileUploadUtil.getUploadDirFor("users");

// // signup method
// public SignupResponseDTO signup(SignupDTO signupDTO) {
// // Convert DTO to Entity
// User user = new User();
// BeanUtils.copyProperties(signupDTO, user);
// // save entity
// User savedUser = userRepo.save(user);
// // convert entity to SignupResponseDTO
// SignupResponseDTO signupResponseDTO = mapToResponseDTO(savedUser);
// return signupResponseDTO;
// }

// // Helper method to map entity to signupResponseDTO
// SignupResponseDTO mapToResponseDTO(User user) {
// SignupResponseDTO signupResponseDTO = new SignupResponseDTO();
// BeanUtils.copyProperties(user, signupResponseDTO);
// return signupResponseDTO;

// }

// // get user by id
// public SignupResponseDTO getUserById(Long userid) {
// User existUser = userRepo.findById(userid)
// .orElseThrow(() -> new RuntimeException("User not found by id: " + userid));
// // Convert enitity to ResponseDTO
// SignupResponseDTO signupResponseDTO = mapToResponseDTO(existUser);
// return signupResponseDTO;

// }

// // get All users
// public List<SignupResponseDTO> getAllUsers() {
// return userRepo.findAll().stream()
// .map(this::mapToResponseDTO)
// .collect(Collectors.toList());
// }

// // update profile
// public ProfileResponseDTO updateProfile(Long userid, ProfileDTO profileDTO,
// MultipartFile file) throws IOException {
// // user find by id
// User existUser = userRepo.findById(userid)
// .orElseThrow(() -> new RuntimeException("user not found by id:" + userid));
// // file upload logic
// if (file != null && !file.isEmpty()) {
// String relativePath = saveFile(file);
// profileDTO.setPic(relativePath);
// }
// profileDTO.setName(profileDTO.getName());
// profileDTO.setPhone(profileDTO.getPhone());
// profileDTO.setAddress(profileDTO.getAddress());
// profileDTO.setPin(profileDTO.getPin());
// profileDTO.setCity(profileDTO.getCity());
// profileDTO.setState(profileDTO.getState());
// profileDTO.setPic(profileDTO.getPic());

// // Convert DTO to entity
// BeanUtils.copyProperties(profileDTO, existUser);
// // save entity
// User updatedUser = userRepo.save(existUser);
// // Convert entity to ResponseDTO
// ProfileResponseDTO profileUpdated = mapTOResponseDTO(updatedUser);

// return profileUpdated;
// }

// // helper method map entity to profile DTO
// ProfileResponseDTO mapTOResponseDTO(User user) {
// ProfileResponseDTO profileresponseDTO = new ProfileResponseDTO();
// BeanUtils.copyProperties(user, profileresponseDTO);
// return profileresponseDTO;
// }

// // save file method
// private String saveFile(MultipartFile file) throws IOException {
// String fileName = System.currentTimeMillis() + "_" +
// file.getOriginalFilename();

// Path filePath = Path.of(uploadDir, fileName);
// file.transferTo(filePath.toFile());

// return "/uploads/users/" + fileName;
// }

// // delete user by id
// public void deleteUser(Long id) throws IOException {
// userRepo.findById(id)
// .orElseThrow(() -> new RuntimeException("User not found by id: " + id));
// userRepo.deleteById(id);
// }

// }
