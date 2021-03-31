package com.qa.roar.service;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.qa.roar.persistence.domain.User;
import com.qa.roar.persistence.repository.UserRepo;
import com.qa.roar.rest.dto.UserDTO;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor(onConstructor = @__(@Autowired))
public class UserService {

	private final UserRepo repo;
	private final ModelMapper mapper;
	
	// map to DTO
	private UserDTO mapToDTO(User user) {
		return this.mapper.map(user, UserDTO.class);
	}
	
	// map from DTO
	private User mapFromDTO(UserDTO userDTO) {
		return this.mapper.map(userDTO, User.class);
	}
	
	// CREATE
	public UserDTO create(User user) {
		return this.mapToDTO(this.repo.save(user));
	}
	
	// READ - all
	
	// READ - one
	
	// UPDATE
	
	// DELETE
}
