package com.qa.roar.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.atLeastOnce;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

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
	
	@Test
	void readAllPostTest() {
		
		List<PostDTO> expected = testPostList.stream()
				.map(this::mapToDTO)
				.collect(Collectors.toList());
		
		when(this.repo.findAll()).thenReturn(testPostList);
		
		List<PostDTO> result = this.service.read();
		
		assertEquals(expected, result);
		
		verify(this.repo, atLeastOnce()).findAll();
		
	}
	
	@Test
	void readByIdPostTest() {
		
		Long id = 1L;
		
		PostDTO expected = this.mapToDTO(testPost1);
		
		when(this.repo.findById(id)).thenReturn(Optional.of(testPost1));
		
		PostDTO result = this.service.read(id);
		
		assertEquals(expected, result);
		
		verify(this.repo, atLeastOnce()).findById(id);
		
	}
	
	@Test
	void updatePostTest() {
		
		Long id = 2L;
		
		PostDTO expected = this.mapToDTO(testPost2);
		
		when(this.repo.findById(id)).thenReturn(Optional.of(testPost2));
		
		when(this.repo.save(testPost2)).thenReturn(testPost2);
		
		PostDTO result = this.service.update(testPost2, id);
		
		assertEquals(expected, result);
		
		verify(this.repo, atLeastOnce()).findById(id);
		
		verify(this.repo, atLeastOnce()).save(testPost2);
		
	}
	
	@Test
	void deletePostTest() {
		
		Long id = 1L;
		
		Boolean expected = true;
		
		when(this.repo.existsById(id)).thenReturn(false);
		
		Boolean result = this.service.delete(id);
		
		assertEquals(expected, result);
		
		verify(this.repo, atLeastOnce()).existsById(id);
		
	}
	
	@Test
	void deletePostFailTest() {
		
		Long id = 999L;
		
		Boolean expected = false;
		
		when(this.repo.existsById(id)).thenReturn(true);
		
		Boolean result = this.service.delete(id);
		
		assertEquals(expected, result);
		
		verify(this.repo, atLeastOnce()).existsById(id);
		
	}

}
