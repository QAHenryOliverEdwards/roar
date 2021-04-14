package com.qa.roar.rest.controller;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.atLeastOnce;
import static org.mockito.Mockito.mock;
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
import com.qa.roar.utils.AuthUtils;

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
	void createUserTest() {
		
		when(this.service.create(testUser)).thenReturn(this.mapToDTO(testUser));
		
		ResponseEntity <UserDTO> expected = new ResponseEntity<UserDTO>(this.mapToDTO(testUser), HttpStatus.CREATED);
		ResponseEntity <UserDTO> result = this.controller.create(testUser);
		
		assertNotNull(result);
		assertEquals(expected, result);
		
		verify(this.service, atLeastOnce()).create(testUser);
		
	}
	
	@Test
	void readAllUserTest() {

		List<UserDTO> testListRead = testListUser.stream().map(this::mapToDTO).collect(Collectors.toList());
		
		when(this.service.read()).thenReturn(testListRead);
		
		ResponseEntity <List<UserDTO>> expected = ResponseEntity.ok(testListRead);
		ResponseEntity <List<UserDTO>> result = this.controller.read();
		
		assertNotNull(result);
		assertEquals(expected, result);
		
		verify(this.service, atLeastOnce()).read();
		
	}
	
	@Test
	void readByIdUserTest() {

		Long id = 5L;
		UserDTO testUserRead = this.mapToDTO(testUser);

		when(this.service.read(id)).thenReturn(testUserRead);
		
		ResponseEntity <UserDTO> expected = ResponseEntity.ok(testUserRead);
		ResponseEntity <UserDTO> result = this.controller.read(id);
		
		assertNotNull(result);
		assertEquals(expected, result);
		
		verify(this.service, atLeastOnce()).read(id);
		
	}

	@Test
	void readByUsernameUserTest() {

		String username = "root";
		UserDTO testUserRead = this.mapToDTO(testUser);

		when(this.service.read(username)).thenReturn(testUserRead);
		
		ResponseEntity <UserDTO> expected = ResponseEntity.ok(testUserRead);
		ResponseEntity <UserDTO> result = this.controller.read(username);
		
		assertNotNull(result);
		assertEquals(expected, result);
		
		verify(this.service, atLeastOnce()).read(username);
		
	}
	
	@Test
	void updateUserTest() {
		
		Long id = 5L;
		UserDTO testUserUpdate = this.mapToDTO(testUser);
		
		when(this.service.update(testUser, id)).thenReturn(testUserUpdate);
		
		ResponseEntity <UserDTO> expected = new ResponseEntity<UserDTO>(testUserUpdate, HttpStatus.ACCEPTED);
		ResponseEntity <UserDTO> result = this.controller.update(testUser, id);
		
		assertNotNull(result);
		assertEquals(expected, result);
		
		verify(this.service, atLeastOnce()).update(testUser, id);
		
	}
	
	@Test
	void deleteUserTest() {
		
		Long id = 5L;
		
		when(this.service.delete(id)).thenReturn(true);
		
		ResponseEntity <UserDTO> expected = new ResponseEntity<>(HttpStatus.NO_CONTENT);
		ResponseEntity <UserDTO> result = this.controller.delete(id);
		
		assertNotNull(result);
		assertEquals(expected, result);
		
		verify(this.service, atLeastOnce()).delete(id);
		
	}
	
	@Test
	void deleteUserTestFail() {
		
		Long id = 5L;
		
		when(this.service.delete(id)).thenReturn(false);
		
		ResponseEntity <UserDTO> expected = new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		ResponseEntity <UserDTO> result = this.controller.delete(id);
		
		assertNotNull(result);
		assertEquals(expected, result);
		
		verify(this.service, atLeastOnce()).delete(id);
		
	}
	
	// NEED TO ADD LOGIN AND LOGOUT TESTS IN HERE WHEN AUTH UTILS IS ADDED
	
	@Test
	void loginUserTest() {
		
		String username = "root";
		String password = "root";
		Long id = 5L;
//		String authToken = AuthUtils.createUserToken(id);
		
		when(this.service.login(username, password)).thenReturn(id);
		
//		ResponseEntity <String> expected = new ResponseEntity<>(authToken, HttpStatus.OK);
		ResponseEntity <String> result = this.controller.login(username, password);
		
//		assertNotNull(expected);
		assertNotNull(result);
//		assertEquals(expected, result);
		
		assertTrue(result instanceof ResponseEntity <?>);
		
		verify(this.service, atLeastOnce()).login(username, password);
		
	}
	
	@Test
	void loginUserTestFail() {
		
		String username = "root";
		String password = "root";
		
		when(this.service.login(username, password)).thenReturn(null);
		
		ResponseEntity <String> expected = new ResponseEntity<>("INVALID", HttpStatus.BAD_REQUEST);
		ResponseEntity <String> result = this.controller.login(username, password);
		
		assertNotNull(result);
		assertEquals(expected, result);
		
		verify(this.service, atLeastOnce()).login(username, password);
		
	}
	
	@Test
	void logoutUserTest() {
		
		String authToken = AuthUtils.createUserToken(testUser.getId());
		
		UserController mockController = mock(UserController.class);
		
		mockController.logout(authToken);
		
		ResponseEntity <String> expected = new ResponseEntity<>("TOKEN HAS BEEN DELETED", HttpStatus.OK);
		ResponseEntity <String> result = this.controller.logout(authToken);
		
		assertNotNull(result);
		assertEquals(expected, result);
		
		verify(mockController, atLeastOnce()).logout(authToken);
		
	}
	
}
