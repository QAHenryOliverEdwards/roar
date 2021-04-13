package com.qa.roar.rest.controller;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
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
import com.qa.roar.persistence.domain.User;
import com.qa.roar.rest.dto.UserDTO;


@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
@Sql(
		scripts={"classpath:roar-data.sql","classpath:roar-schema.sql"},
		executionPhase=ExecutionPhase.BEFORE_TEST_METHOD
		)
public class UserIntegrationTest {
	@Autowired
	private MockMvc mvc;
	@Autowired
	private ObjectMapper jsonify;
	private ModelMapper mapper=new ModelMapper();
	
	private UserDTO mapToDTO(User user) {
		return this.mapper.map(user,UserDTO.class);
	}
	
	private String URI="/users";
	//Prepopulated records
	private final UserDTO testUser1=this.mapToDTO(new User(1L,"testUser1", "Test name 1","test1@email.com","testPass1"));
	private final UserDTO testUser2=this.mapToDTO(new User(1L,"testUser2", "Test name 2","test2@email.com","testPass2"));
	private final List<UserDTO> testUsers=List.of(testUser1,testUser2);
	
	
	@Test
	public void testCreate() throws Exception {
		UserDTO toCreateDto=this.mapToDTO(new User("user", "Name","email@email.com","pass"));
		UserDTO expectedDto=toCreateDto;
		expectedDto.setId(1L);
		String toCreateAsJson=this.jsonify.writeValueAsString(toCreateDto);
		String expectedAsJson=this.jsonify.writeValueAsString(expectedDto);
		
		RequestBuilder req=post(URI+"/create").contentType(MediaType.APPLICATION_JSON).content(toCreateAsJson);
		ResultMatcher checkStatus=status().isCreated();
		ResultMatcher checkBody=content().json(expectedAsJson);
		
		this.mvc.perform(req).andExpect(checkStatus).andExpect(checkBody);
	}
	
	@Test
	public void testReadAll() throws Exception{
		String testUsersAsJson=this.jsonify.writeValueAsString(testUsers);
		
		RequestBuilder req=get(URI+"/read");
		ResultMatcher checkStatus=status().isOk();
		ResultMatcher checkBody=content().json(testUsersAsJson);
		
		this.mvc.perform(req).andExpect(checkBody).andExpect(checkStatus);
	}
	
}
