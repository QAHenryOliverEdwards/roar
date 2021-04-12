package com.qa.roar.rest.controller;

import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import com.qa.roar.persistence.domain.User;
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
	
}
