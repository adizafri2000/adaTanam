package com.example.springbootbackend.controller;

import com.example.springbootbackend.auth.TokenService;
import com.example.springbootbackend.dto.RequestErrorDTO;
import com.example.springbootbackend.dto.order.OrderRequestDTO;
import com.example.springbootbackend.dto.order.OrderResponseDTO;
import com.example.springbootbackend.service.OrderService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/orders")
@Slf4j
public class OrderController {
    private final OrderService orderService;
    private final TokenService tokenService;

    public OrderController(OrderService orderService, TokenService tokenService) {
        this.orderService = orderService;
        this.tokenService = tokenService;
    }

    @GetMapping("")
    public List<OrderResponseDTO> getAllOrders(){
        log.info("Handling GET /orders request");
        return orderService.getOrders();
    }

    @GetMapping("/{id}")
    public OrderResponseDTO getOrderById(@PathVariable int id) {
        log.info("Handling GET /orders/{} request", id);
        return orderService.getOrderById(id);
    }

    @PostMapping("")
    public ResponseEntity<?> createOrder(@RequestBody OrderRequestDTO order) {
        log.info("Handling POST /orders request");
        return new ResponseEntity<>(orderService.createOrder(order), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateOrder(@PathVariable int id, @RequestBody OrderRequestDTO order, @RequestHeader("Authorization") String token) {
        log.info("Handling PUT /orders/{} request", id);
        if (!tokenService.validateToken(token)) {
            RequestErrorDTO response = new RequestErrorDTO("401","Invalid token");
            return new ResponseEntity<>(response, HttpStatus.UNAUTHORIZED);
        }
        return new ResponseEntity<>(orderService.updateOrder(id, order, token), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteOrder(@PathVariable int id, @RequestHeader("Authorization") String token) {
        log.info("Handling DELETE /orders/{} request", id);
        if (!tokenService.validateToken(token)) {
            RequestErrorDTO response = new RequestErrorDTO("401","Invalid token");
            return new ResponseEntity<>(response, HttpStatus.UNAUTHORIZED);
        }
        orderService.deleteOrder(id, token);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
