package com.qa.roar.persistence.domain;

import java.util.List;

import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class PostUnitTest {
	
	private Long id = 3L;
	private String body = "This is a test post, please ignore.";
	private Boolean visibility = true;
	private User user = new User("test", "test", "test");
	private Post parent = null;
	private List<Post> children = null;
	
	
	
}
