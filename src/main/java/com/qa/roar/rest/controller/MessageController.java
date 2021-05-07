package com.qa.roar.rest.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.qa.roar.persistence.domain.Message;
import com.qa.roar.rest.dto.MessageDTO;
import com.qa.roar.service.MessageService;

@RestController
@RequestMapping("/messages")
@CrossOrigin
public class MessageController {

	private MessageService service;
	
	@Autowired
	public MessageController(MessageService service) {
		super();
		this.service = service;
	}
	
	// CREATE
	
	@PostMapping("/create")
	public ResponseEntity<MessageDTO> create(@RequestBody Message message) {
		return new ResponseEntity<>(this.service.create(message),HttpStatus.CREATED);
	}

	
	@GetMapping("/read")
	public ResponseEntity<List<MessageDTO>> read() {
		return new ResponseEntity<>(this.service.read(),HttpStatus.OK);
	}
	
	@GetMapping("/read/{id}")
	public ResponseEntity<MessageDTO> read(@PathVariable Long id) {
		return new ResponseEntity<>(this.service.read(id),HttpStatus.OK);
	}
	
	
	@PutMapping("/update/{id}")
	public ResponseEntity<MessageDTO> update(@RequestBody Message message, @PathVariable Long id) {
		return new ResponseEntity<>(this.service.update(message, id),HttpStatus.ACCEPTED);
	}
	
	
	@DeleteMapping("/delete/{id}")
	public ResponseEntity<MessageDTO> delete( @PathVariable Long id) {
		return this.service.delete(id) ? new ResponseEntity<>(HttpStatus.NO_CONTENT)
				: new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
	}
	
}
