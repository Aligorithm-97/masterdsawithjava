package com.spring.temp.domain.service.impl;

import com.spring.temp.domain.dto.UserDto;
import com.spring.temp.domain.mapper.UserMapper;
import com.spring.temp.domain.model.User;
import com.spring.temp.domain.repository.UserRepository;
import com.spring.temp.domain.service.UserService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;

    private final UserMapper userMapper;

    public UserServiceImpl(UserRepository userRepository, UserMapper userMapper) {
        this.userRepository = userRepository;
        this.userMapper = userMapper;
    }

    @Override
    public List<UserDto> getUsers() {
        List<User> all = userRepository.findAll();
        return userMapper.toDtoList(all);
    }
}
