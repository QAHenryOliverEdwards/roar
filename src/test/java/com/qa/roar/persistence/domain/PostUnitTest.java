package com.qa.roar.persistence.domain;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class PostUnitTest {
	
	private Long id = 3L;
	private String body = "This is a test post, please ignore.";
	private Boolean visibility = true;
	private User user = new User("test", "test", "test");
	private Post parent = null;
	
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
		Post expected = createReply;
		Post result = new Post(body, user, parent);
		assertNotNull(result);
		assertTrue(result instanceof Post);
		assertEquals(expected, result);
	}
	
	@Test
	void updatePostConstructorTest() throws Exception {
		Post expected = updatePost;
		Post result = new Post(id, body, visibility, user);
		assertNotNull(result);
		assertTrue(result instanceof Post);
		assertEquals(expected, result);
	}
	
	@Test
	void updateReplyConstructorTest() throws Exception {
		Post expected = updateReply;
		Post result = new Post(id, body, visibility, user, parent);
		assertNotNull(result);
		assertTrue(result instanceof Post);
		assertEquals(expected, result);
	}
	
}
