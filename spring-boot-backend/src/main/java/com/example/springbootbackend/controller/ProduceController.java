package com.example.springbootbackend.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.springbootbackend.auth.TokenService;
import com.example.springbootbackend.dto.RequestErrorDTO;
import com.example.springbootbackend.dto.produce.ProduceRequestDTO;
import com.example.springbootbackend.dto.produce.ProduceResponseDTO;
import com.example.springbootbackend.service.produce.ProduceService;

import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/produce")
@Slf4j
public class ProduceController {
    private final ProduceService produceService;
    private final TokenService tokenService;

    public ProduceController(ProduceService produceService, TokenService tokenService) {
        this.produceService = produceService;
        this.tokenService = tokenService;
    }

    @GetMapping("")
    public ResponseEntity<List<ProduceResponseDTO>> getAllProduce(@RequestParam(required = false) Integer storeId) {
        log.info("Handling GET /produce request");
        List<ProduceResponseDTO> produceList;
        if (storeId != null) {
            produceList = produceService.getProduceByStore(storeId);
        } else {
            produceList = produceService.getProduces();
        }
        return ResponseEntity.ok(produceList);
    }


    @GetMapping("/{id}")
    public ProduceResponseDTO getProduceById(@PathVariable int id) {
        log.info("Handling GET /produce/{} request", id);
        return produceService.getProduceById(id);
    }

    @PostMapping("")
    public ResponseEntity<?> createProduce(@RequestBody ProduceRequestDTO produce) {
        log.info("Handling POST /produce request");
        return new ResponseEntity<>(produceService.createProduce(produce), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateProduce(@PathVariable int id, @RequestBody ProduceRequestDTO produce, @RequestHeader("Authorization") String token) {
        log.info("Handling PUT /produce/{} request", id);
        if (!tokenService.validateToken(token)) {
            RequestErrorDTO response = new RequestErrorDTO("401","Invalid token");
            return new ResponseEntity<>(response, HttpStatus.UNAUTHORIZED);
        }
        return new ResponseEntity<>(produceService.updateProduce(id, produce, token), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteProduce(@PathVariable int id, @RequestHeader("Authorization") String token) {
        log.info("Handling DELETE /produce/{} request", id);
        if (!tokenService.validateToken(token)) {
            RequestErrorDTO response = new RequestErrorDTO("401","Invalid token");
            return new ResponseEntity<>(response, HttpStatus.UNAUTHORIZED);
        }
        produceService.deleteProduce(id, token);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

}
