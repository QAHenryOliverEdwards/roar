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
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.qa.roar.persistence.domain.User;
import com.qa.roar.rest.dto.UserDTO;
import com.qa.roar.service.UserService;
import com.qa.roar.utils.AuthUtils;

@RestController
@RequestMapping("/users")
@CrossOrigin // this will need to be specified for security once we're set up on a server
public class UserController {
	
	private UserService service;
	
	@Autowired
	public UserController(UserService service) {
		super();
		this.service = service;
	}
	
	// CREATE
	
	@PostMapping("/create")
	public ResponseEntity<UserDTO> create(@RequestBody User user) {
		return new ResponseEntity<>(
				this.service.create(user),
				HttpStatus.CREATED);
	}
	
	// READ
	
	@GetMapping("/read")
	public ResponseEntity<List<UserDTO>> read() {
		return new ResponseEntity<>(
				this.service.read(),
				HttpStatus.OK);
	}
	
	@GetMapping("/read/{id}")
	public ResponseEntity<UserDTO> read(@PathVariable Long id) {
		return ResponseEntity.ok(this.service.read(id)); // alternate OK because why not?
	}
	
	@GetMapping("/name/{username}") // might want to change this path later
	public ResponseEntity<UserDTO> read(@PathVariable String username) {
		return new ResponseEntity<>(
				this.service.read(username),
				HttpStatus.OK);
	}
	
	// WILL NEED AUTHENTICATION STUFF ADDED HERE LATER
	
	// UPDATE
	
	@PutMapping("/update/{id}")
	public ResponseEntity<UserDTO> update(@RequestBody User user, @PathVariable Long id) {
		return new ResponseEntity<>(
				this.service.update(user, id),
				HttpStatus.ACCEPTED);
	}
	
	// DELETE
	
	@DeleteMapping("/delete/{id}")
	public ResponseEntity<UserDTO> update( @PathVariable Long id) {
		return this.service.delete(id) ? new ResponseEntity<>(HttpStatus.NO_CONTENT)
				: new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
	}
	
	// LOGIN
	@PostMapping("/login")
	public ResponseEntity<String> login(@RequestHeader("username") String username,
			@RequestHeader("password") String password) {
		Long userId = this.service.login(username, password);
		if (userId == null) {
			return new ResponseEntity<>("INVALID", HttpStatus.BAD_REQUEST);
		}
		String loggedIn = AuthUtils.createUserToken(userId);
		return new ResponseEntity<>(loggedIn, HttpStatus.OK);
	}

	
	
	// LOGOUT
	@PostMapping("/logout")
	public ResponseEntity<String> logout(@RequestHeader("token") String token) {
		AuthUtils.deleteUserToken(token);
		return new ResponseEntity<>("TOKEN HAS BEEN DELETED", HttpStatus.OK);
	}
}
