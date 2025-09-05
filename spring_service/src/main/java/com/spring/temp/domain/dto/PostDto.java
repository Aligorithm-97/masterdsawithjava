package com.spring.temp.domain.dto;


import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PostDto {

    private Long id;
    private String title;
    private String summary;
    private String blocks;
    private String category;
    private String date;



}
