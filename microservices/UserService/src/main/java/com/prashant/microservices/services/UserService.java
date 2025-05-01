package com.prashant.microservices.services;

import java.util.List;

import com.prashant.microservices.entities.User;

public interface UserService {
	// user operations

	// create

	User saveUser(User user);

	// get all user

	List<User> getAllUser();

	// get single user of given userId

	User getUser(Long userId);

	// update user
	User updateUser(Long userId);

	// delete user
	User deleteUser(Long userId);
}
