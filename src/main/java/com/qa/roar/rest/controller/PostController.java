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
		return new ResponseEntity<>(
				this.service.read(id),
				HttpStatus.OK);
	}
	
	// UPDATE
	
	@PutMapping("/update/{id}")
	public ResponseEntity<PostDTO> update(@RequestBody Post post, @PathVariable Long id) {
		return new ResponseEntity<>(
				this.service.update(post, id),
				HttpStatus.ACCEPTED);
	}
	
	// DELETE
	
	@DeleteMapping("/delete/{id}")
	public ResponseEntity<PostDTO> update( @PathVariable Long id) {
		return this.service.delete(id) ? new ResponseEntity<>(HttpStatus.NO_CONTENT)
				: new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
	}
	
}
