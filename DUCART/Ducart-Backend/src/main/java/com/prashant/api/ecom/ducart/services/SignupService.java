package com.prashant.api.ecom.ducart.services;

import java.io.IOException;

import java.util.List;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.prashant.api.ecom.ducart.entities.User;
import com.prashant.api.ecom.ducart.modal.SignupDTO;
import com.prashant.api.ecom.ducart.repositories.UserRepo;
import com.prashant.api.ecom.ducart.utils.FileUploadUtil;

@Service
public class SignupService {
  @Autowired
  private UserRepo userRepo;

  // File upload directory
  String uploadDir = FileUploadUtil.getUploadDirFor("users");

  // signup method
  public User signup(SignupDTO signupDTO) {
    User savedUser = new User();
    BeanUtils.copyProperties(signupDTO, savedUser);

    return userRepo.save(savedUser);
  }

  // get user by id
  public User getUserById(Long userid) {
    return userRepo.findById(userid).orElseThrow(() -> new RuntimeException("User not found by id: " + userid));

  }

  // get All users
  public List<User> getAllUsers() {
    return userRepo.findAll();
  }

  // delete user by id
  public void deleteUser(Long id) throws IOException {
    userRepo.findById(id)
        .orElseThrow(() -> new RuntimeException("User not found by id: " + id));
    userRepo.deleteById(id);
  }

}
