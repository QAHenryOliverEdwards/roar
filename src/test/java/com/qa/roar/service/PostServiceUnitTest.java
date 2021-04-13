package com.qa.roar.service;

import java.util.List;

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
	
	private ModelMapper mapper;
	
	private PostDTO mapToDTO(Post post) {
		return this.mapper.map(post, PostDTO.class);
	}
	
	private final Post testPost1 = new Post(1L, "test post body", true, new User("test", "test", "test"));
	private final Post testPost2 = new Post(2L, "test post body 2", true, new User("test", "test", "test"));
	
	private final List<Post> testPostList = List.of(testPost1, testPost2);
	
}
