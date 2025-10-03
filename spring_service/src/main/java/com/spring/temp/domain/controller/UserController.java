package com.spring.temp.domain.controller;

import com.spring.temp.domain.dto.UserDto;
import com.spring.temp.domain.service.UserService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    public List<UserDto> getUsers() {
        return userService.getUsers();
    }

}
