package com.qa.roar.rest.controller;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
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
	
	private PostDTO mapToDTO(Post post) {
		return this.mapper.map(post, PostDTO.class);
	}
	
	@Test
	public void createPostTest() {
		
		Mockito.when(this.service.create(testPost)).thenReturn(this.mapToDTO(testPost));
		
		assertThat(new ResponseEntity<PostDTO>(this.mapToDTO(testPost), HttpStatus.CREATED))
			.isEqualTo(this.controller.create(testPost));
		
	}
}
