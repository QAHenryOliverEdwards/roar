package com.qa.roar.persistence.domain;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class PostUnitTest {
	
	private Long id = 3L;
	private String body = "This is a test post, please ignore.";
	private Boolean visibility = true;
	private User user = new User("test", "test", "test");
	private Post parent = null;
	private List<Post> children = null;
	
	private Post createPost = new Post(body, user);
	private Post createReply = new Post(body, user, parent);
	private Post updatePost = new Post(id, body, visibility, user);
	private Post updateReply = new Post(id, body, visibility, user, parent);
	
	@Test
	void createPostConstructorTest() throws Exception {
		Post expected = createPost;
		Post result = new Post(body, user);
		assertNotNull(result);
		assertTrue(result instanceof Post);
		assertEquals(expected, result);
	}
	
	@Test
	void createReplyConstructorTest() throws Exception {
		
	}
	
	@Test
	void updatePostConstructorTest() throws Exception {
		
	}
	
	@Test
	void updateReplyConstructorTest() throws Exception {
		
	}
	
}
