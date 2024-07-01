package com.example.springbootbackend.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.springbootbackend.auth.TokenService;
import com.example.springbootbackend.dto.RequestErrorDTO;
import com.example.springbootbackend.dto.produce.ProduceRequestDTO;
import com.example.springbootbackend.dto.produce.ProduceResponseDTO;
import com.example.springbootbackend.service.produce.ProduceService;

import lombok.extern.slf4j.Slf4j;
import org.springframework.web.multipart.MultipartFile;

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
    public ResponseEntity<List<ProduceResponseDTO>> getAllProduce(
            @RequestParam(required = false) Integer storeId,
            @RequestParam(required = false) Boolean topRated,
            @RequestParam(required = false) Boolean latestCreated,
            @RequestParam(required = false) Boolean latestUpdated
    ) {
        log.info("Handling GET /produce request");
        List<ProduceResponseDTO> produceList;
        if (storeId != null) {
            produceList = produceService.getProduceByStore(storeId);
        } else if (topRated != null && topRated){
            produceList = produceService.getTopRatedProduces();
        } else if (latestCreated != null && latestCreated){
            produceList = produceService.getLatestCreatedProduces();
        } else if (latestUpdated != null && latestUpdated){
            produceList = produceService.getLatestUpdatedProduces();
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

    @PostMapping(value="", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> createProduce(
            @RequestPart("produce") ProduceRequestDTO produce,
            @RequestPart(value = "image", required = false) MultipartFile image,
            @RequestHeader("Authorization") String token
    ) {
        log.info("Handling POST /produce request");
        if (!tokenService.validateToken(token)) {
            RequestErrorDTO response = new RequestErrorDTO("401","Invalid token");
            return new ResponseEntity<>(response, HttpStatus.UNAUTHORIZED);
        }
        return new ResponseEntity<>(produceService.createProduce(produce, token, image), HttpStatus.CREATED);
    }

    @PutMapping(value = "/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> updateProduce(
            @PathVariable int id,
            @RequestPart("produce") ProduceRequestDTO produce,
            @RequestPart(value = "image", required = false) MultipartFile image,
            @RequestHeader("Authorization") String token
    ) {
        log.info("Handling PUT /produce/{} request", id);
        if (!tokenService.validateToken(token)) {
            RequestErrorDTO response = new RequestErrorDTO("401","Invalid token");
            return new ResponseEntity<>(response, HttpStatus.UNAUTHORIZED);
        }
        return new ResponseEntity<>(produceService.updateProduce(id, produce, token, image), HttpStatus.OK);
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
