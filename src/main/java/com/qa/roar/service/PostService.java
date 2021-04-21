package com.qa.roar.service;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.qa.roar.persistence.domain.Post;
import com.qa.roar.persistence.repository.PostRepo;
import com.qa.roar.rest.dto.PostDTO;
import com.qa.roar.utils.BeanUtils;

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
	
	// CREATE
	public PostDTO create(Post post) {
		return this.mapToDTO(this.repo.save(post));
	}
	
	// READ - all
	public List<PostDTO> read() {
		return this.repo.findAll()
				.stream()
				.map(this::mapToDTO)
				.collect(Collectors.toList());
	}
	
	// READ - by id
	public PostDTO read(Long id) {
		return this.mapToDTO(
				this.repo.findById(id)
				.orElseThrow());
	}
	
	// UPDATE
	public PostDTO update(Post post, Long id) {
		Post updateMe = this.repo.findById(id).orElseThrow();
		BeanUtils.mergeNotNull(post, updateMe);
		return this.mapToDTO(
				this.repo.save(updateMe));
	}
	
	// DELETE
	// will return true if deleted
	public Boolean delete(Long id) {
		this.repo.deleteById(id);
		return !this.repo.existsById(id);
	}
	
}
