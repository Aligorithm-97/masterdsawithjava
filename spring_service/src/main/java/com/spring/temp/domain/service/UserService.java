package com.spring.temp.domain.service;

import com.spring.temp.domain.dto.UserDto;

import java.util.List;

public interface UserService {
    List<UserDto> getUsers();
}
