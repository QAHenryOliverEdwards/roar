package com.qa.roar.rest.dto;

import java.util.Date;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PostDTO {
	
	private Long id;
	private String body;
	private Boolean visibility;
	private Date created;
	
	// not sure if this will cause recursion
	// might have to change it later
	private List<PostDTO> children;

}
