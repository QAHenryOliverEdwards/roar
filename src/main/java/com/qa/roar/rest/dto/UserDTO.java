package com.qa.roar.rest.dto;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserDTO {

	private Long id;
	private String username;
	private String name;
	private String email;
	private String password;
	private List<PostDTO> posts;
	
}
