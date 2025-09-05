package com.spring.temp.domain.controller;

import com.spring.temp.domain.dto.PostDto;
import com.spring.temp.domain.service.PostService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("post")
public class PostController {

    private final PostService postService;

    @GetMapping("/getPosts")
    public List<PostDto> getAllPosts(){
        return postService.getAllPosts();
    }

}
