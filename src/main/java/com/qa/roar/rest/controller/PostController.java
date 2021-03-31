package com.qa.roar.rest.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
	
}
