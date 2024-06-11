package com.example.springbootbackend.controller;

import com.example.springbootbackend.auth.TokenService;
import com.example.springbootbackend.dto.RequestErrorDTO;
import com.example.springbootbackend.dto.account.AccountResponseDTO;
import com.example.springbootbackend.dto.account.AccountLoginDTO;
import com.example.springbootbackend.dto.account.AccountRequestDTO;
import com.example.springbootbackend.service.account.AccountService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping(path = "/accounts")
@Slf4j
public class AccountController {

    private final AccountService accountService;
    private final TokenService tokenService;

    public AccountController(AccountService accountService, TokenService tokenService) {
        this.accountService = accountService;
        this.tokenService = tokenService;
    }

    @GetMapping("")
    public ResponseEntity<?> getAccounts() {
        log.info("Handling GET /api/accounts request");
        List<AccountResponseDTO> dtoList = accountService.getAccounts();
        Map<String, List<AccountResponseDTO>> listResponse = new HashMap<>();
        listResponse.put("accounts", dtoList);
        return new ResponseEntity<>(listResponse, HttpStatus.OK);
    }

    @GetMapping(path = "/{id}")
    public AccountResponseDTO getAccountById(@PathVariable Integer id) {
        log.info("Handling GET /api/accounts/{} request", id);
        return accountService.getAccountById(id);
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
        Map<String, String> response = new HashMap<>();
        response.put("token", token);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateAccount(@PathVariable Integer id, @RequestBody AccountRequestDTO accountRequestDTO, @RequestHeader("Authorization") String token){
        log.info("Handling PUT /api/accounts/{} request", id);
        if (!tokenService.validateToken(token)) {
            RequestErrorDTO response = new RequestErrorDTO("401","Invalid token");
            return new ResponseEntity<>(response, HttpStatus.UNAUTHORIZED);
        }
        return new ResponseEntity<>(accountService.updateAccount(id, accountRequestDTO, token), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteAccount(@PathVariable Integer id, @RequestHeader("Authorization") String token) {
        log.info("Handling DELETE /api/accounts/{} request", id);
        if (!tokenService.validateToken(token)) {
            RequestErrorDTO response = new RequestErrorDTO("401","Invalid token");
            return new ResponseEntity<>(response, HttpStatus.UNAUTHORIZED);
        }
        accountService.deleteAccount(id, token);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

}
