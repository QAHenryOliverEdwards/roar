package com.qa.roar.rest.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.qa.roar.persistence.domain.Post;
import com.qa.roar.rest.dto.PostDTO;
import com.qa.roar.service.PostService;

@RestController
@RequestMapping("/posts")
@CrossOrigin // this will need to be specified for security once we're set up on a server
public class PostController {

	private PostService service;
	
	@Autowired
	public PostController(PostService service) {
		super();
		this.service = service;
	}
	
	// CREATE
	
	@PostMapping("/create")
	public ResponseEntity<PostDTO> create(@RequestBody Post post) {
		return new ResponseEntity<>(
				this.service.create(post),
				HttpStatus.CREATED);
	}

	// READ
	
	@GetMapping("/read")
	public ResponseEntity<List<PostDTO>> read() {
		return new ResponseEntity<>(
				this.service.read(),
				HttpStatus.OK);
	}
	
	@GetMapping("/read/{id}")
	public ResponseEntity<PostDTO> read(@PathVariable Long id) {
		return ResponseEntity.ok(this.service.read(id)); // alternate OK because why not?
	}
	
}
