package com.qa.roar.rest.controller;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.List;

import org.junit.jupiter.api.Test;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.jdbc.Sql;
import org.springframework.test.context.jdbc.Sql.ExecutionPhase;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.RequestBuilder;
import org.springframework.test.web.servlet.ResultMatcher;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.qa.roar.persistence.domain.Post;
import com.qa.roar.persistence.domain.User;
import com.qa.roar.rest.dto.PostDTO;
import com.qa.roar.rest.dto.UserDTO;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
@Sql(
		scripts={"classpath:roar-schema.sql","classpath:roar-data.sql"},
		executionPhase=ExecutionPhase.BEFORE_TEST_METHOD
		)
public class PostIntegrationTest {
	@Autowired
	private MockMvc mvc;
	@Autowired
	private ObjectMapper jsonify;
	private ModelMapper mapper=new ModelMapper();
	
	private PostDTO mapToDTO(Post post) {
		return this.mapper.map(post,PostDTO.class);
	}
	
	private String URI="/posts";
	
	//Prepopulated records
	private final User testUser1=new User(1L,"testUser1", "Test name 1","test1@email.com","testPass1");
	private final PostDTO testPost1=this.mapToDTO(new Post(1L,"Test Post 1",true,testUser1));
	private final PostDTO testPost2=this.mapToDTO(new Post(2L,"Test Post 2",true,testUser1));
	private final List<PostDTO> testPosts=List.of(testPost1,testPost2);
	
	@Test
	public void testCreate() throws Exception{
		PostDTO toCreateDto=this.mapToDTO(new Post("New post",testUser1));
		PostDTO expectedDto=toCreateDto;
		expectedDto.setId(3L);
		String toCreateAsJson=this.jsonify.writeValueAsString(toCreateDto);
		String expectedAsJson=this.jsonify.writeValueAsString(expectedDto);
		
		
		RequestBuilder req=post(URI+"/create").contentType(MediaType.APPLICATION_JSON).content(toCreateAsJson);
		ResultMatcher checkStatus=status().isCreated();
		ResultMatcher checkBody=content().json(expectedAsJson);
		
		this.mvc.perform(req).andExpect(checkBody).andExpect(checkStatus);
	}
	
	@Test
	public void testReadAll() throws Exception{
		String testPostsAsJson=this.jsonify.writeValueAsString(testPosts);
		RequestBuilder req=get(URI+"/read");
		ResultMatcher checkStatus=status().isOk();
		ResultMatcher checkBody=content().json(testPostsAsJson);
		this.mvc.perform(req).andExpect(checkBody).andExpect(checkStatus);
	}
	
	@Test
	public void testReadById() throws Exception{
		String testPost1AsJson=this.jsonify.writeValueAsString(testPost1);
		RequestBuilder req=get(URI+"/read/1");
		ResultMatcher checkStatus=status().isOk();
		ResultMatcher checkBody=content().json(testPost1AsJson);
		this.mvc.perform(req).andExpect(checkBody).andExpect(checkStatus);
	}
	
}
