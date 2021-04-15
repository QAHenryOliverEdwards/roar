package com.qa.roar.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.atLeastOnce;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.junit.jupiter.api.Test;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.mock.mockito.MockBean;

import com.qa.roar.persistence.domain.User;
import com.qa.roar.persistence.repository.UserRepo;
import com.qa.roar.rest.dto.UserDTO;

public class UserServiceUnitTest {
	
	@Autowired
	private UserService service;
	
	@MockBean
	private UserRepo repo;
	
	@Autowired
	private ModelMapper mapper;
	
	private UserDTO mapToDTO(User user) {
		return this.mapper.map(user, UserDTO.class);
	}
	
	private final User testUser2 = new User(2L,"user2", "user2@test.com", "password");
	private final User testUser3 = new User(3L,"user3", "user3@test.com", "password");
	
	private final List<User> testUserList = List.of(testUser2, testUser3);

	@Test
	void createUserTest() {
		
		UserDTO expected = this.mapToDTO(testUser2);
		
		when(this.repo.save(testUser2)).thenReturn(testUser2);
		
		UserDTO result = this.service.create(testUser2);
		
		assertEquals(expected, result);
		
		verify(this.repo, atLeastOnce()).save(testUser2);
		
	}
	
	@Test
	void readAllUserTest() {
		
		List<UserDTO> expected = testUserList.stream()
				.map(this::mapToDTO)
				.collect(Collectors.toList());
		
		when(this.repo.findAll()).thenReturn(testUserList);
		
		List<UserDTO> result = this.service.read();
		
		assertEquals(expected, result);
		
		verify(this.repo, atLeastOnce()).findAll();
		
	}
	
	@Test
	void readByIdUserTest() {
		
		Long id = 2L;
		
		UserDTO expected = this.mapToDTO(testUser2);
		
		when(this.repo.findById(id)).thenReturn(Optional.of(testUser2));
		
		UserDTO result = this.service.read(id);
		
		assertEquals(expected, result);
		
		verify(this.repo, atLeastOnce()).findById(id);
		
	}
	
	@Test
	void readByUsernameUserTest() {
		
		String username = "user2";
		
		UserDTO expected = this.mapToDTO(testUser2);
		
		when(this.repo.findByUsername(username)).thenReturn(Optional.of(testUser2));
		
		UserDTO result = this.service.read(username);
		
		assertEquals(expected, result);
		
		verify(this.repo, atLeastOnce()).findByUsername(username);
		
	}
	
	@Test
	void updateUserTest() {
		
		Long id = 3L;
		
		UserDTO expected = this.mapToDTO(testUser3);
		
		when(this.repo.findById(id)).thenReturn(Optional.of(testUser3));
		
		when(this.repo.save(testUser3)).thenReturn(testUser3);
		
		UserDTO result = this.service.update(testUser3, id);
		
		assertEquals(expected, result);
		
		verify(this.repo, atLeastOnce()).findById(id);
		
		verify(this.repo, atLeastOnce()).save(testUser3);
		
	}
	
	@Test
	void deleteUserTest() {
		
		Long id = 3L;
		
		Boolean expected = true;
		
		when(this.repo.existsById(id)).thenReturn(false);
		
		Boolean result = this.service.delete(id);
		
		assertEquals(expected, result);
		
		verify(this.repo, atLeastOnce()).existsById(id);
		
	}
	
	@Test
	void deleteUserFailTest() {
		
		Long id = 999L;
		
		Boolean expected = false;
		
		when(this.repo.existsById(id)).thenReturn(true);
		
		Boolean result = this.service.delete(id);
		
		assertEquals(expected, result);
		
		verify(this.repo, atLeastOnce()).existsById(id);
		
	}
	
}
