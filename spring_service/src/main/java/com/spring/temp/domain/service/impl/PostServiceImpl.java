package com.spring.temp.domain.service.impl;

import com.spring.temp.domain.dto.PostDto;
import com.spring.temp.domain.service.PostService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class PostServiceImpl implements PostService {


    @Override
    public List<PostDto> getAllPosts() {

        return List.of();
    }
}
