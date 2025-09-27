package com.spring.temp.domain.controller;

import com.spring.temp.domain.dto.PostDto;
import com.spring.temp.domain.service.PostWriteService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("postWrite")
public class PostWriteController {

    private final PostWriteService postWriteService;

    public PostWriteController(PostWriteService postWriteService) {
        this.postWriteService = postWriteService;
    }


    @PostMapping
    public PostDto createPost(@RequestBody PostDto postDto) {
        return postWriteService.createPost(postDto);
    }

    @PutMapping("/{id}")
    public PostDto updatePost(@PathVariable Long id, @RequestBody PostDto postDto) {
        return postWriteService.updatePost(id, postDto);
    }

    @DeleteMapping("/{id}")
    public void deletePost(@PathVariable Long id) {
        postWriteService.deletePost(id);
    }


}
