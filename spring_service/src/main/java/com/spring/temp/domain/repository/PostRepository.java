package com.spring.temp.domain.repository;

import com.spring.temp.domain.model.Post;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PostRepository extends JpaRepository<Post, Long> {
    List<Post> findByCategoryAndSubscriberOnly(String category, Integer sub);
}
