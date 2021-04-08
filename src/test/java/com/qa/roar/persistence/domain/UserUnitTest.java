package com.qa.roar.persistence.domain;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class UserUnitTest {
	
	private Long id = 3L;
	private String username = "root";
//	private String name = "test name";
	private String email = "root@test.com";
	private String password = "root";
	
	private User createUser = new User(username, email, password);
	private User updateUser = new User(id, username, email, password);
	
	
	@Test
	void createUserConstructorTest() throws Exception {
		User expected = createUser;
		User result = new User(username, email, password);
		assertNotNull(result);
		assertTrue(result instanceof User);
		assertEquals(expected, result);
	}
	
	@Test
	void updateUserConstructorTest() throws Exception {
		User expected = updateUser;
		User result = new User(id, username, email, password);
		assertNotNull(result);
		assertTrue(result instanceof User);
		assertEquals(expected, result);
	}
	
}
