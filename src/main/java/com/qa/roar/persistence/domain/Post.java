package com.qa.roar.persistence.domain;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Post {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@NotNull
	@Size(max = 280)
	private String body;
	
	@NotNull
	private Boolean visibility;
	
	@ManyToOne
	private User user;
	
	@ManyToOne
	private Post parent;
	
	@OneToMany(mappedBy = "parent", cascade = CascadeType.ALL)
	private List<Post> children;
	
	// constructor for creating post
	public Post(String body, User user) {
		this.body = body;
		this.user = user;
	}
	
	// constructor for creating reply
	public Post(String body, User user, Post parent) {
		this.body = body;
		this.user = user;
		this.parent = parent;
	}
	
	// constructor for updating post
	public Post(Long id, String body, Boolean visibility, User user) {
		this.id = id;
		this.body = body;
		this.visibility = visibility;
		this.user = user;
	}
	
	// constructor for updating reply
	public Post(Long id, String body, Boolean visibility, User user, Post parent) {
		this.id = id;
		this.body = body;
		this.visibility = visibility;
		this.user = user;
		this.parent = parent;
	}
	
}
