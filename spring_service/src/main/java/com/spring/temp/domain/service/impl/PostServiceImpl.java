package com.spring.temp.domain.service.impl;

import com.spring.temp.domain.dto.PostDto;
import com.spring.temp.domain.model.Posts;
import com.spring.temp.domain.repository.PostRepository;
import com.spring.temp.domain.service.PostService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class PostServiceImpl implements PostService {

    private final PostRepository  postRepository;

    @Override
    public List<PostDto> getAllPosts() {
        List<Posts> all = postRepository.findAll();
        return List.of(PostDto.builder().id(12L).title("fasdf").build());
    }
}
