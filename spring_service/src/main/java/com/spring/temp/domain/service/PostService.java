package com.spring.temp.domain.service;

import com.spring.temp.domain.dto.PostDto;

import java.util.List;

public interface PostService {

    PostDto createPost(PostDto postDto);

    PostDto getPostById(Long id);

    PostDto updatePost(Long id, PostDto postDto);

    void deletePost(Long id);

    List<PostDto> getPostsByCategory(String category);
}
