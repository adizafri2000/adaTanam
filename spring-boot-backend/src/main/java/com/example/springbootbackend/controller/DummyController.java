package com.example.springbootbackend.controller;

import com.example.springbootbackend.dto.DummyDTO;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.logging.Logger;

@RestController
@RequestMapping("/api/dummy")
public class DummyController {

    private static final Logger log = Logger.getLogger(DummyController.class.getName());

    @GetMapping("/")
    public ResponseEntity<?> getDummy() {
        log.info("Handling GET /api/dummy/ request");
        DummyDTO test = new DummyDTO("Hello World!");
        // return ResponseEntity.ok(test);
        return new ResponseEntity<DummyDTO>(test, HttpStatus.OK);
    }


}
