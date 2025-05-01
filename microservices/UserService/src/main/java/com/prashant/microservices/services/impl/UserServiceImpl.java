package com.prashant.microservices.services.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.prashant.microservices.entities.User;
import com.prashant.microservices.exceptions.ResourceNotFoundException;
import com.prashant.microservices.repositories.UserRepository;
import com.prashant.microservices.services.UserService;

@Service
public class UserServiceImpl implements UserService {
	@Autowired
	private UserRepository userRepository;

	@Override
	public User saveUser(User user) {
		return userRepository.save(user);
	}

	@Override
	public List<User> getAllUser() {

		return userRepository.findAll();
	}

	@Override
	public User getUser(Long userId) {

		return userRepository.findById(userId)
				.orElseThrow(() -> new ResourceNotFoundException("User with given id is not found on Server!!:" + userId));
	}

	@Override
	public User updateUser(Long userId) {
		return userRepository.save(userRepository.findById(userId)
				.orElseThrow(() -> new ResourceNotFoundException("User with given id is not found on Server!!:" + userId)));

	}

	@Override
	public User deleteUser(Long userId) {
		User user = userRepository.findById(userId)
				.orElseThrow(() -> new ResourceNotFoundException("User with given id is not found on Server!!:" + userId));
		return userRepository.save(user);

	}

}
