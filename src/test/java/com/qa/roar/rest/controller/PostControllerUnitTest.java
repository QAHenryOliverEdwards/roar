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

import com.qa.roar.persistence.domain.Post;
import com.qa.roar.persistence.domain.User;
import com.qa.roar.rest.dto.PostDTO;
import com.qa.roar.service.PostService;

@SpringBootTest
public class PostControllerUnitTest {

	@Autowired
	private PostController controller;
	
	@MockBean
	private PostService service;
	
	@Autowired
	private ModelMapper mapper;
	
	private final Post testPost = new Post(6L, "test post body", true, new User("test", "test", "test"));
	
	private final List<Post> testListPost = List.of(testPost);	
	
	private PostDTO mapToDTO(Post post) {
		return this.mapper.map(post, PostDTO.class);
	}
	
	@Test
	public void createPostTest() {
		
		when(this.service.create(testPost)).thenReturn(this.mapToDTO(testPost));
		
		ResponseEntity <PostDTO> expected = new ResponseEntity<PostDTO>(this.mapToDTO(testPost), HttpStatus.CREATED);
		ResponseEntity <PostDTO> result = this.controller.create(testPost);
		
		assertNotNull(result);
		assertEquals(expected, result);
		
		verify(this.service, atLeastOnce()).create(testPost);
		
//		assertThat(new ResponseEntity<PostDTO>(this.mapToDTO(testPost), HttpStatus.CREATED))
//			.isEqualTo(this.controller.create(testPost));
		
	}
	
	@Test
	public void readAllPostTest() {
		
		List<PostDTO> testListRead = testListPost.stream().map(this::mapToDTO).collect(Collectors.toList());
		
		when(this.service.read()).thenReturn(testListRead);
		
		ResponseEntity <List<PostDTO>> expected = ResponseEntity.ok(testListRead);
		ResponseEntity <List<PostDTO>> result = this.controller.read();
		
		assertNotNull(result);
		assertEquals(expected, result);
		
		verify(this.service, atLeastOnce()).read();
	}
}
