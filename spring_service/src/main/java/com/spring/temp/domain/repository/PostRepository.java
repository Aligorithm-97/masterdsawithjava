package com.spring.temp.domain.repository;

import com.spring.temp.domain.model.Posts;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PostRepository extends JpaRepository<Posts,Long> {
}
