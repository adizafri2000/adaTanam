package com.example.springbootbackend.controller;

import com.example.springbootbackend.dto.account.AccountLoginDTO;
import com.example.springbootbackend.dto.account.AccountRequestDTO;
import com.example.springbootbackend.service.account.AccountService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@Slf4j
@RequestMapping(path = "/auth")
public class AuthController {

    private final AccountService accountService;

    public AuthController(AccountService accountService) {
        this.accountService = accountService;
    }

    // User account sign up/registration endpoint
    @PostMapping("/signup")
    public ResponseEntity<?> createAccount(@RequestBody AccountRequestDTO accountRequestDTO) {
        log.info("Handling POST /api/accounts/signup request");
        return new ResponseEntity<>(accountService.createAccount(accountRequestDTO), HttpStatus.CREATED);
    }

    // User account login endpoint
    @PostMapping("/login")
    public ResponseEntity<?> loginAccount(@RequestBody AccountLoginDTO accountLoginDTO) {
        log.info("Handling POST /api/accounts/login request");
        String token = accountService.loginAccount(accountLoginDTO);
        String accountId = accountService.getAccountByEmail(accountLoginDTO.email()).id().toString();
        Map<String, String> response = new HashMap<>();
        response.put("token", token);
        response.put("accountId", accountId);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
