package com.qa.roar.rest.controller;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.jdbc.Sql;
import org.springframework.test.context.jdbc.Sql.ExecutionPhase;
import org.springframework.test.web.servlet.MockMvc;

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
}
