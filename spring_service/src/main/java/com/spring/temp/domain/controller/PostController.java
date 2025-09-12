package com.spring.temp.domain.controller;

import com.spring.temp.domain.dto.PostDto;
import com.spring.temp.domain.model.Post;
import com.spring.temp.domain.service.PostService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("post")
public class PostController {

    private final PostService postService;

    public PostController(PostService postService) {
        this.postService = postService;
    }


    @GetMapping("/{id}")
    public PostDto getPostById(@PathVariable Long id) {
        return postService.getPostById(id);
    }

    @GetMapping
    public List<PostDto> getPostsByCategory(@RequestParam String category) {
        return postService.getPostsByCategory(category);
    }


}
