package com.prashant.microservices.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.prashant.microservices.entities.User;
import com.prashant.microservices.services.UserService;
import org.springframework.web.bind.annotation.PutMapping;

@RestController
@RequestMapping("/users")
public class UserController {

	@Autowired
	private UserService userService;

	// create
	@PostMapping
	public ResponseEntity<User> createUser(@RequestBody User user) {
		return ResponseEntity.status(HttpStatus.CREATED).body(userService.saveUser(user));
	}

	// single user get by id
	@GetMapping("/{userId}")
	public ResponseEntity<User> getSingleUser(@PathVariable Long userId) {
		return ResponseEntity.status(HttpStatus.OK).body(userService.getUser(userId));
	}

	// update user by id
	@PutMapping("/{userId}")
	public ResponseEntity<User> updateUser(@PathVariable Long userId, @RequestBody User user) {
		return ResponseEntity.status(HttpStatus.OK).body(userService.updateUser(userId));
	}

	// delete user by id

	@DeleteMapping("/{userId}")
	public ResponseEntity<User> deleteUser(@PathVariable Long userId) {
		return ResponseEntity.status(HttpStatus.NO_CONTENT).body(userService.deleteUser(userId));
	}

	// All user get
	@GetMapping
	public ResponseEntity<List<User>> getAllUser() {
		return ResponseEntity.status(HttpStatus.OK).body(userService.getAllUser());
	}
}
