package com.qa.roar.persistence.domain;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
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
public class User {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@NotNull
	@Size(max = 24)
	@Column(unique = true)
	private String username;
	
	@NotNull
	@Size(max = 36)
	private String name;
	
	@NotNull
	@Size(max = 36)
	@Column(unique = true)
	private String email;
	
	@NotNull
	@Size(max = 36)
	private String password;
	
	@OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
	private List<Post> posts;
	
	// account creation constructor
	public User(String username,String email, String password) {
		this.username = username;
		this.email = email;
		this.password = password;
	}
	
	// account update constructor
	public User(Long id, String username, String email, String password) {
		this.id = id;
		this.username = username;
		this.email = email;
		this.password = password;
	}

	public User(Long id, @NotNull @Size(max = 24) String username, @NotNull @Size(max = 36) String name,
			@NotNull @Size(max = 36) String email, @NotNull @Size(max = 36) String password) {
		super();
		this.id = id;
		this.username = username;
		this.name = name;
		this.email = email;
		this.password = password;
	}

	public User(@NotNull @Size(max = 24) String username, @NotNull @Size(max = 36) String name,
			@NotNull @Size(max = 36) String email, @NotNull @Size(max = 36) String password) {
		super();
		this.username = username;
		this.name = name;
		this.email = email;
		this.password = password;
	}
	
}
