package com.qa.roar.rest.dto;

import com.qa.roar.persistence.domain.Status;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MessageDTO {

	private Long id;
	private String body;
	private Status status;
	
}
