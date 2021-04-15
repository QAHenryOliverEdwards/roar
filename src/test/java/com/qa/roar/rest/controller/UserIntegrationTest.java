package com.qa.roar.rest.controller;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.junit.Assert.assertTrue;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.io.UnsupportedEncodingException;
import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.RequestBuilder;
import org.springframework.test.web.servlet.ResultMatcher;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.qa.roar.persistence.domain.Post;
import com.qa.roar.persistence.domain.User;
import com.qa.roar.rest.dto.PostDTO;
import com.qa.roar.rest.dto.UserDTO;


@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
public class UserIntegrationTest {
	@Autowired
	private MockMvc mvc;
	@Autowired
	private ObjectMapper jsonify;
	private ModelMapper mapper=new ModelMapper();
	
	private UserDTO mapToDTO(User user) {
		return this.mapper.map(user,UserDTO.class);
	}
	private PostDTO mapToPostDTO(Post post) {
		return this.mapper.map(post, PostDTO.class);
	}
	
	private String URI="/users";
	private String token="";
	//Prepopulated records
	private final User testUser1=new User(1L,"testUser1", "Test name 1","test1@email.com","testPassword1");
	private final UserDTO testUser1Dto=this.mapToDTO(testUser1);
	private final UserDTO testUser2Dto=this.mapToDTO(new User(2L,"testUser2", "Test name 2","test2@email.com","testPassword2"));
	private final PostDTO testPost1=this.mapToPostDTO(new Post(1L,"Test Post 1",true,testUser1));
	private final PostDTO testPost2=this.mapToPostDTO(new Post(2L,"Test Post 2",true,testUser1));
	private final List<PostDTO> testPosts=List.of(testPost1,testPost2);
	
	@BeforeEach
	public void loginBefore() throws UnsupportedEncodingException, Exception {
		RequestBuilder req=post(URI+"/login").header("username", "testUser1").header("password", "testPassword1");
		this.token=this.mvc.perform(req).andReturn().getResponse().getContentAsString();
	}
	@Test
	public void testCreate() throws Exception {
		UserDTO toCreateDto=this.mapToDTO(new User("user", "Name","email@email.com","pass"));
		UserDTO expectedDto=toCreateDto;
		expectedDto.setId(3L);
		String toCreateAsJson=this.jsonify.writeValueAsString(toCreateDto);
		String expectedAsJson=this.jsonify.writeValueAsString(expectedDto);
		
		RequestBuilder req=post(URI+"/create").contentType(MediaType.APPLICATION_JSON).content(toCreateAsJson);
		ResultMatcher checkStatus=status().isCreated();
		ResultMatcher checkBody=content().json(expectedAsJson);
		
		this.mvc.perform(req).andExpect(checkStatus).andExpect(checkBody);
	}
	
	@Test
	public void testReadAll() throws Exception{
		String testUser1AsJson=this.jsonify.writeValueAsString(testUser1Dto);
		testUser1AsJson=setPostsToArray(testUser1AsJson);
		String testUser2AsJson=this.jsonify.writeValueAsString(testUser2Dto);
		testUser2AsJson=setPostsToEmptyArray(testUser2AsJson);
		String expectedAsJson="["+testUser1AsJson+","+testUser2AsJson+"]";
		RequestBuilder req=get(URI+"/read");
		ResultMatcher checkStatus=status().isOk();
		ResultMatcher checkBody=content().json(expectedAsJson);
		
		this.mvc.perform(req).andExpect(checkBody).andExpect(checkStatus);
	}
	
	@Test
	public void testReadById() throws Exception{
		String testUser1AsJson=this.jsonify.writeValueAsString(testUser1Dto);
		testUser1AsJson=setPostsToArray(testUser1AsJson);
		RequestBuilder req=get(URI+"/read/1");
		ResultMatcher checkStatus=status().isOk();
		ResultMatcher checkBody=content().json(testUser1AsJson);

		this.mvc.perform(req).andExpect(checkBody).andExpect(checkStatus);
	}
	
	@Test
	public void testLogin() throws Exception{
		RequestBuilder req=post(URI+"/login").header("username", "testUser1").header("password", "testPassword1");
		String token1=this.mvc.perform(req).andReturn().getResponse().getContentAsString();
		boolean correctSize=token1.length()==20; //also checks that it's not "INVALID"
		System.out.println(token1 + correctSize);
		assertTrue(token1.matches("[A-Za-z0-9]+")&&correctSize);
	}

	@Test
	public void testLogout() throws Exception{
		System.out.println(token);
		RequestBuilder req=post(URI+"/logout").header("token",token);
		ResultMatcher checkStatus=status().isOk();
		ResultMatcher checkBody=content().string("TOKEN HAS BEEN DELETED");
		
		this.mvc.perform(req).andExpect(checkBody).andExpect(checkStatus).andReturn().getResponse();
	}
	@Test
	public void testUpdate() throws Exception{
		User toUpdate=new User();
		toUpdate.setUsername("updatedUsername");
		UserDTO toUpdateDto=this.mapToDTO(toUpdate);
		String toUpdateAsJson=this.jsonify.writeValueAsString(toUpdateDto);
		UserDTO expectedDto=this.mapToDTO(new User(1L,"updatedUsername", "Test name 1","test1@email.com","testPassword1"));
		String expectedAsJson=this.jsonify.writeValueAsString(expectedDto);
		expectedAsJson=setPostsToArray(expectedAsJson);
		RequestBuilder req=put(URI+"/update/1").header("token", token).contentType(MediaType.APPLICATION_JSON).content(toUpdateAsJson);
		ResultMatcher checkStatus=status().isAccepted();
		ResultMatcher checkBody=content().json(expectedAsJson);
		this.mvc.perform(req).andExpect(checkBody).andExpect(checkStatus);
	}
	@Test
	public void testDelete() throws Exception{
		RequestBuilder req=delete(URI+"/delete/1").header("token", token);
		ResultMatcher checkStatus=status().isNoContent();
		this.mvc.perform(req).andExpect(checkStatus);
	}
	public String setPostsToArray(String jsonString) throws JsonProcessingException {
		String postsAsJson=this.jsonify.writeValueAsString(testPosts);
		postsAsJson=setChildrenToEmptyArray(postsAsJson);
		return jsonString.replace("\"posts\":null", "\"posts\":"+postsAsJson);
	}
	public String setPostsToEmptyArray(String jsonString) {
		return jsonString.replace("\"posts\":null", "\"posts\":[]");
	}
	public String setChildrenToEmptyArray(String jsonString) {
		return jsonString.replace("\"children\":null", "\"children\":[]");
	}
	
}
