package com.spring.temp.domain.service;

import com.spring.temp.domain.dto.PostDto;


public interface PostWriteService {

    PostDto createPost(PostDto postDto);

    PostDto updatePost(Long id, PostDto postDto);

    void deletePost(Long id);

}
