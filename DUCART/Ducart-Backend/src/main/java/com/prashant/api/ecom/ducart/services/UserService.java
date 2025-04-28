package com.prashant.api.ecom.ducart.services;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.prashant.api.ecom.ducart.entities.User;
import com.prashant.api.ecom.ducart.modal.UserDTO;
import com.prashant.api.ecom.ducart.repositories.UserRepo;
import com.prashant.api.ecom.ducart.utils.FileUploadUtil;

@Service
public class UserService {
  @Autowired
  private UserRepo userRepo;

  // File upload directory
  String uploadDir = FileUploadUtil.getUploadDirFor("users");

  // signup method
  public User signup(UserDTO userDTO) {
    User savedUser = new User();
    BeanUtils.copyProperties(userDTO, savedUser);

    return userRepo.save(savedUser);
  }

  // update user method
  public User updateUser(Long userid, UserDTO userDTO, MultipartFile file) throws IOException {
    User existUser = userRepo.findById(userid)
        .orElseThrow(() -> new RuntimeException("User not found by id: " + userid));
    // update user details
    userDTO.setName(userDTO.getName());
    userDTO.setPhone(userDTO.getPhone());
    userDTO.setAddress(userDTO.getAddress());
    userDTO.setCity(userDTO.getCity());
    userDTO.setState(userDTO.getState());
    userDTO.setPin(userDTO.getPin());
    userDTO.setPic(userDTO.getPic());

    // update user image
    if (file != null && !file.isEmpty()) {
      String relativePath = saveFile(file);
      userDTO.setPic(relativePath);
      if (existUser != null) {
        BeanUtils.copyProperties(userDTO, existUser);

        return userRepo.save(existUser);
      } else {
        throw new RuntimeException("User not found by id: " + userid);
      }

    }
    return existUser;
  }

  // save file method
  public String saveFile(MultipartFile file) throws IOException {
    String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();
    Path filePath = Paths.get(uploadDir, fileName);
    Files.write(filePath, file.getBytes());
    return "/uploads/users/" + fileName;
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
