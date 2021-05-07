package com.qa.roar.service;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.qa.roar.persistence.domain.Message;
import com.qa.roar.persistence.repository.MessageRepo;
import com.qa.roar.rest.dto.MessageDTO;
import com.qa.roar.utils.BeanUtils;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor(onConstructor = @__(@Autowired))
public class MessageService { 
	
	private final MessageRepo repo;
	private final ModelMapper mapper;
	
	
	private MessageDTO mapToDTO(Message message) {
		return this.mapper.map(message, MessageDTO.class);
	}
	
	
	public MessageDTO create(Message message) {
		return this.mapToDTO(this.repo.save(message));
	}
	
	public List<MessageDTO> read() {
		return this.repo.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
	}
	
	public MessageDTO read(Long id) {
		return this.mapToDTO(this.repo.findById(id).orElseThrow());
	}
	
	public MessageDTO update(Message message, Long id) {
		Message updated = this.repo.findById(id).orElseThrow();
		BeanUtils.mergeNotNull(message, updated);
		return this.mapToDTO(this.repo.save(updated));
	}
	
	public Boolean delete(Long id) {
		this.repo.deleteById(id);
		return !this.repo.existsById(id);
	}
	
}
