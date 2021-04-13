package com.qa.roar.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.atLeastOnce;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.List;

import org.junit.jupiter.api.Test;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import com.qa.roar.persistence.domain.Post;
import com.qa.roar.persistence.domain.User;
import com.qa.roar.persistence.repository.PostRepo;
import com.qa.roar.rest.dto.PostDTO;

@SpringBootTest
public class PostServiceUnitTest {
	
	@Autowired
	private PostService service;
	
	@MockBean
	private PostRepo repo;
	
	@Autowired
	private ModelMapper mapper;
	
	private PostDTO mapToDTO(Post post) {
		return this.mapper.map(post, PostDTO.class);
	}
	
	private final Post testPost1 = new Post(1L, "test post body", true, new User(1L, " ", " ", " "));
	private final Post testPost2 = new Post(2L, "test post body 2", true, new User(1L, " ", " ", " "));
	
	private final List<Post> testPostList = List.of(testPost1, testPost2);
	
	@Test
	void createPostTest() {
		
		PostDTO expected = this.mapToDTO(testPost1);
		
		when(this.repo.save(testPost1)).thenReturn(testPost1);
		
		PostDTO result = this.service.create(testPost1);
		
		assertEquals(expected, result);
		
		verify(this.repo, atLeastOnce()).save(testPost1);
		
	}

}
