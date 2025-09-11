package com.spring.temp.domain.service.impl;

import com.spring.temp.domain.dto.PostDto;
import com.spring.temp.domain.model.Post;
import com.spring.temp.domain.repository.PostRepository;
import com.spring.temp.domain.service.PostService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;


@Service
@Transactional(readOnly = true)
public class PostServiceImpl implements PostService {

    private final PostRepository postRepository;

    public PostServiceImpl(PostRepository postRepository) {
        this.postRepository = postRepository;
    }

    @Transactional
    @Override
    public PostDto createPost(PostDto postDto) {
        Post post = toEntity(postDto);
        return toDto(postRepository.save(post));
    }

    @Override
    public PostDto getPostById(Long id) {
        Post post = postRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Post not found with id " + id));
        return toDto(post);
    }

    @Override
    public PostDto updatePost(Long id, PostDto postDto) {
        Post post = postRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Post not found with id " + id));
        post.setTitle(postDto.getTitle());
        post.setBlocks(postDto.getBlocks());
        return toDto(postRepository.save(post));
    }

    @Override
    public void deletePost(Long id) {
        if (!postRepository.existsById(id)) {
            throw new RuntimeException("Post not found with id " + id);
        }
        postRepository.deleteById(id);
    }

    @Override
    public List<PostDto> getPostsByCategory(String category) {
        List<Post> posts = postRepository.findByCategory(category);
        return posts.stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    public PostDto toDto(Post post) {
        if (post == null) {
            return null;
        }

        PostDto dto = new PostDto();
        dto.setId(post.getId());
        dto.setTitle(post.getTitle());
        dto.setSummary(post.getSummary());
        dto.setBlocks(post.getBlocks());
        dto.setCategory(post.getCategory());
        dto.setDate(post.getDate());
        dto.setSubscriberOnly(post.getSubscriberOnly());
        return dto;
    }

    public Post toEntity(PostDto postDto) {
        if (postDto == null) {
            return null;
        }

        Post post = new Post();
        post.setId(postDto.getId());
        post.setTitle(postDto.getTitle());
        post.setSummary(postDto.getSummary());
        post.setBlocks(postDto.getBlocks());
        post.setCategory(postDto.getCategory());
        post.setDate(postDto.getDate());
        post.setSubscriberOnly(postDto.getSubscriberOnly());
        return post;
    }
}
