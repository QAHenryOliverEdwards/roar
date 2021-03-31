package com.qa.roar.persistence.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.qa.roar.persistence.domain.Post;

@Repository
public interface PostRepo extends JpaRepository<Post, Long>{

}
