package com.spring.temp.domain.service;

import com.spring.temp.domain.dto.PostDto;

import java.util.List;

public interface PostService {


    PostDto getPostById(Long id);


    List<PostDto> getPostsByCategory(String category);
}
