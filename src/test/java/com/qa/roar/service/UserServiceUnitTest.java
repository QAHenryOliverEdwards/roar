package com.qa.roar.service;

import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.mock.mockito.MockBean;

import com.qa.roar.persistence.domain.User;
import com.qa.roar.persistence.repository.PostRepo;
import com.qa.roar.rest.dto.UserDTO;

public class UserServiceUnitTest {
	
	@Autowired
	private UserService service;
	
	@MockBean
	private PostRepo repo;
	
	@Autowired
	private ModelMapper mapper;
	
	private UserDTO mapToDTO(User user) {
		return this.mapper.map(user, UserDTO.class);
	}
	
	private final User testUser2 = new User(2L,"user2", "user2@test.com", "password");
	private final User testUser3 = new User(3L,"user3", "user3@test.com", "password");
	
	private final List<User> testUserList = List.of(testUser2, testUser3);

}
