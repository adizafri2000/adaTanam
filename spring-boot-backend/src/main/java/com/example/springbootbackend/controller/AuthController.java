package com.example.springbootbackend.controller;

import com.example.springbootbackend.auth.TokenService;
import com.example.springbootbackend.dto.auth.LoginRequestDTO;
import com.example.springbootbackend.dto.account.AccountRequestDTO;
import com.example.springbootbackend.dto.account.AccountResponseDTO;
import com.example.springbootbackend.service.account.AccountService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashMap;
import java.util.Map;

@RestController
@Slf4j
@RequestMapping(path = "/auth")
public class AuthController {

    private final AccountService accountService;
    private final TokenService tokenService;

    public AuthController(AccountService accountService, TokenService tokenService) {
        this.accountService = accountService;
        this.tokenService = tokenService;
    }

    // User account sign up/registration endpoint
    @PostMapping(value = "/signup", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> createAccount(
            @RequestPart(value = "image", required = false) MultipartFile image,
            @RequestPart("account") AccountRequestDTO accountRequestDTO
    ) {
        log.info("Handling POST /auth/signup request");
        AccountResponseDTO createdAccount = accountService.createAccount(accountRequestDTO, image);
        return new ResponseEntity<>(createdAccount, HttpStatus.CREATED);
    }

    // User account login endpoint
    @PostMapping("/login")
    public ResponseEntity<?> loginAccount(@RequestBody LoginRequestDTO loginRequestDTO) {
        log.info("Handling POST /auth/login request");
        Map<String, String> tokens = accountService.loginAccount(loginRequestDTO);
        String accessToken = tokens.get("accessToken");
        String refreshToken = tokens.get("refreshToken");
        AccountResponseDTO accountResponseDto = accountService.getAccountByEmail(loginRequestDTO.email());
        String accountId = accountResponseDto.id().toString();
        String accountType = accountResponseDto.type();
        String accountName = accountResponseDto.name();
        Map<String, String> response = new HashMap<>();
        response.put("accessToken", accessToken);
        response.put("refreshToken", refreshToken);
        response.put("accountId", accountId);
        response.put("accountType", accountType);
        response.put("accountName", accountName);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PostMapping("/refresh")
    public ResponseEntity<?> refreshToken(@RequestBody Map<String, String> tokenMap) {
        log.info("Handling POST /auth/refresh request");
        String refreshToken = tokenMap.get("refreshToken");
        if (tokenService.validateToken(refreshToken)) {
            String email = tokenService.getEmailFromToken(refreshToken);
            AccountResponseDTO account = accountService.getAccountByEmail(email);
            Map<String, String> newTokens = tokenService.generateTokens(account);
            return new ResponseEntity<>(newTokens, HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Invalid refresh token", HttpStatus.UNAUTHORIZED);
        }
    }
}
