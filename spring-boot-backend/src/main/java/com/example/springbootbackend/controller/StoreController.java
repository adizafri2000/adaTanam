package com.example.springbootbackend.controller;

import com.example.springbootbackend.auth.TokenService;
import com.example.springbootbackend.dto.RequestErrorDTO;
import com.example.springbootbackend.dto.store.StoreRequestDTO;
import com.example.springbootbackend.dto.store.StoreResponseDTO;
import com.example.springbootbackend.service.store.StoreService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "/stores")
@Slf4j
public class StoreController {

    private final StoreService storeService;
    private final TokenService tokenService;

    public StoreController(StoreService storeService, TokenService tokenService) {
        this.storeService = storeService;
        this.tokenService = tokenService;
    }

    @GetMapping
    public ResponseEntity<?> getStores(@RequestParam(required = false) Integer farmerId) {
        log.info("Handling GET /stores request with farmerId: {}", farmerId);

        if (farmerId != null) {
            StoreResponseDTO store = storeService.getStoreByFarmer(farmerId);
            return new ResponseEntity<>(store, HttpStatus.OK);
        } else {
            List<StoreResponseDTO> stores = storeService.getStores();
            return new ResponseEntity<>(stores, HttpStatus.OK);
        }
    }

    @GetMapping(value = "/{id}")
    public StoreResponseDTO getStoreById(@PathVariable int id) {
        log.info("Handling GET /stores/{} request", id);
        return storeService.getStoreById(id);
    }

    @PostMapping(value = "")
    public ResponseEntity<?> createStore(@RequestBody StoreRequestDTO store) {
        log.info("Handling POST /stores request");
        return new ResponseEntity<>(storeService.createStore(store), HttpStatus.CREATED);
    }

    @PutMapping(value = "/{id}")
    public ResponseEntity<?> updateStore(@PathVariable int id, @RequestBody StoreRequestDTO store, @RequestHeader("Authorization") String token) {
        log.info("Handling PUT /stores/{} request", id);
        if (!tokenService.validateToken(token)) {
            RequestErrorDTO response = new RequestErrorDTO("401","Invalid token");
            return new ResponseEntity<>(response, HttpStatus.UNAUTHORIZED);
        }
        return new ResponseEntity<>(storeService.updateStore(id, store, token), HttpStatus.OK);
    }

    @DeleteMapping(value = "/{id}")
    public ResponseEntity<?> deleteStore(@PathVariable int id, @RequestHeader("Authorization") String token) {
        log.info("Handling DELETE /stores/{} request", id);
        if (!tokenService.validateToken(token)) {
            RequestErrorDTO response = new RequestErrorDTO("401","Invalid token");
            return new ResponseEntity<>(response, HttpStatus.UNAUTHORIZED);
        }
        storeService.deleteStore(id, token);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

}
