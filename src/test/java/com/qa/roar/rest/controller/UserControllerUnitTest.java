package com.qa.roar.rest.controller;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.Mockito.atLeastOnce;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.List;
import java.util.stream.Collectors;

import org.junit.jupiter.api.Test;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.qa.roar.persistence.domain.User;
import com.qa.roar.rest.dto.UserDTO;
import com.qa.roar.service.UserService;

@SpringBootTest
public class UserControllerUnitTest {
	
	@Autowired
	private UserController controller;
	
	@MockBean
	private UserService service;
	
	@Autowired
	private ModelMapper mapper;
	
	private final User testUser = new User(5L, "root", "root@test.com", "root");
	
	private final List<User> testListUser = List.of(testUser);
	
	private UserDTO mapToDTO(User user) {
		return this.mapper.map(user, UserDTO.class);
	}
	
	@Test
	public void createUserTest() {
		
		when(this.service.create(testUser)).thenReturn(this.mapToDTO(testUser));
		
		ResponseEntity <UserDTO> expected = new ResponseEntity<UserDTO>(this.mapToDTO(testUser), HttpStatus.CREATED);
		ResponseEntity <UserDTO> result = this.controller.create(testUser);
		
		assertNotNull(result);
		assertEquals(expected, result);
		
		verify(this.service, atLeastOnce()).create(testUser);
		
	}
	
	@Test
	public void readAllUserTest() {

		List<UserDTO> testListRead = testListUser.stream().map(this::mapToDTO).collect(Collectors.toList());
		
		when(this.service.read()).thenReturn(testListRead);
		
		ResponseEntity <List<UserDTO>> expected = ResponseEntity.ok(testListRead);
		ResponseEntity <List<UserDTO>> result = this.controller.read();
		
		assertNotNull(result);
		assertEquals(expected, result);
		
		verify(this.service, atLeastOnce()).read();
		
	}
	
}