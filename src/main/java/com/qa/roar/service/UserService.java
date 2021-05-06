package com.qa.roar.service;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.qa.roar.persistence.domain.User;
import com.qa.roar.persistence.repository.UserRepo;
import com.qa.roar.rest.dto.UserDTO;
import com.qa.roar.utils.BeanUtils;

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
	// this will be used after the SonarQube
	// Static Analysis re-factor
//	private User mapFromDTO(UserDTO userDTO) {
//		return this.mapper.map(userDTO, User.class);
//	}
	
	// CREATE
	public UserDTO create(User user) {
		return this.mapToDTO(this.repo.save(user));
	}
	
	// READ - all
	public List<UserDTO> read() {
		return this.repo.findAll()
				.stream()
				.map(this::mapToDTO)
				.collect(Collectors.toList());
	}
	
	// READ - by id
	public UserDTO read(Long id) {
		return this.mapToDTO(
				this.repo.findById(id)
				.orElseThrow());
	}
	
	// READ - by username
	public  UserDTO read(String username) {
		if (this.repo.existsByUsername(username)) {
			return this.mapToDTO(
					this.repo.findByUsername(username)
							.orElseThrow());
		} else {
			return null;
		}
	}
	
	// UPDATE
	public UserDTO update(User user, Long id) {
		User updateMe = this.repo.findById(id).orElseThrow();
		BeanUtils.mergeNotNull(user, updateMe);
		return this.mapToDTO(
				this.repo.save(updateMe));
	}
	
	// DELETE
	// will return true if deleted
	public Boolean delete(Long id) {
		this.repo.deleteById(id);
		return !this.repo.existsById(id);
	}

	// LOGIN
	
//	public Long login(String username, String password) {
//		List<UserDTO> account = this.repo.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
//		for (UserDTO thisUser: account) {
//			if (thisUser.getUsername().equals(username) && thisUser.getPassword().equals(password)) {
//				return thisUser.getId();
//			}
//		}
//		return null;
//	}
	
	public Long login(String username, String password) {

		UserDTO user = read(username);

		if (user == null) {
			return null;
		}
		
		if (user.getPassword().equals(password)) {
			return user.getId();
		}

		return null;
	}
	
}
