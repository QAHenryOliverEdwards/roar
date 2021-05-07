package com.qa.roar.rest.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MessageDTO {

	private Long id;
	private String body;
	private enum status{SENT,DELIVERED,OPENED};
	
}
