package com.spring.temp.domain.mapper;

import com.spring.temp.domain.dto.UserDto;
import com.spring.temp.domain.model.User;

import java.util.List;

public interface UserMapper {
    UserDto toDto(User user);

    User toEntity(UserDto dto);

    List<UserDto> toDtoList(List<User> users);

    List<User> toEntityList(List<UserDto> dto);
}
