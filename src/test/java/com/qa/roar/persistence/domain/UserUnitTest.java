package com.qa.roar.persistence.domain;

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
	
	
	
}
