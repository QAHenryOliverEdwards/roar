package com.qa.roar.service;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.qa.roar.persistence.domain.Post;
import com.qa.roar.persistence.repository.PostRepo;
import com.qa.roar.rest.dto.PostDTO;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor(onConstructor = @__(@Autowired))
public class PostService {
	
	private final PostRepo repo;
	private final ModelMapper mapper;
	
	// map to DTO
	private PostDTO mapToDTO(Post post) {
		return this.mapper.map(post, PostDTO.class);
	}
	
	// map from DTO
	// this will be used after the SonarQube
	// Static Analysis re-factor
//	private Post mapFromDTO(PostDTO postDTO) {
//		return this.mapper.map(postDTO, Post.class);
//	}
	
}
