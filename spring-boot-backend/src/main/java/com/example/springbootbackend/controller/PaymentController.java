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
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.springbootbackend.auth.TokenService;
import com.example.springbootbackend.dto.RequestErrorDTO;
import com.example.springbootbackend.dto.payment.PaymentRequestDTO;
import com.example.springbootbackend.dto.payment.PaymentResponseDTO;
import com.example.springbootbackend.service.payment.PaymentService;

import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/payments")
@Slf4j
public class PaymentController {
    private final PaymentService paymentService;
    private final TokenService tokenService;

    public PaymentController(PaymentService paymentService, TokenService tokenService) {
        this.paymentService = paymentService;
        this.tokenService = tokenService;
    }

    @GetMapping("")
    public List<PaymentResponseDTO> getAllPayments(){
        log.info("Handling GET /payments request");
        return paymentService.getPayments();
    }

    @GetMapping("/{id}")
    public PaymentResponseDTO getPaymentById(@PathVariable int id) {
        log.info("Handling GET /payments/{} request", id);
        return paymentService.getPaymentById(id);
    }

    @PostMapping("")
    public ResponseEntity<?> createPayment(@RequestHeader("Authorization") String token, @RequestBody PaymentRequestDTO payment) {
        log.info("Handling POST /payments request");
        if (!tokenService.validateToken(token)) {
            RequestErrorDTO response = new RequestErrorDTO("401","Invalid token");
            return new ResponseEntity<>(response, HttpStatus.UNAUTHORIZED);
        }
        return new ResponseEntity<>(paymentService.createPayment(payment), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updatePayment(@PathVariable int id, @RequestBody PaymentRequestDTO payment, @RequestHeader("Authorization") String token) {
        log.info("Handling PUT /payments/{} request", id);
        if (!tokenService.validateToken(token)) {
            RequestErrorDTO response = new RequestErrorDTO("401","Invalid token");
            return new ResponseEntity<>(response, HttpStatus.UNAUTHORIZED);
        }
        return new ResponseEntity<>(paymentService.updatePayment(id, payment, token), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletePayment(@PathVariable int id, @RequestHeader("Authorization") String token) {
        log.info("Handling DELETE /payments/{} request", id);
        if (!tokenService.validateToken(token)) {
            RequestErrorDTO response = new RequestErrorDTO("401","Invalid token");
            return new ResponseEntity<>(response, HttpStatus.UNAUTHORIZED);
        }
        paymentService.deletePayment(id, token);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}