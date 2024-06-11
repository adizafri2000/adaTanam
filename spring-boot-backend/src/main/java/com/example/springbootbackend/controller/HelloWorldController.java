package com.example.springbootbackend.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping(path = "/")
@Slf4j
public class HelloWorldController {
    @GetMapping(path = {"", "helloworld", "hello"})
    public Map<String, String> helloWorld() {
        log.info("Handling GET / request");
        return Map.of("message", "Hello, World!");
    }
}
