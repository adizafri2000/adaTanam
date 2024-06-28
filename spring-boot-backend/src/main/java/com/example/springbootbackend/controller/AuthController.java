package com.example.springbootbackend.controller;

import com.example.springbootbackend.auth.TokenService;
import com.example.springbootbackend.dto.auth.*;
import com.example.springbootbackend.dto.account.AccountRequestDTO;
import com.example.springbootbackend.dto.account.AccountResponseDTO;
import com.example.springbootbackend.service.EmailService;
import com.example.springbootbackend.service.account.AccountService;
import com.example.springbootbackend.service.auth.AuthService;
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
    private final AuthService authService;
    private final EmailService emailService;

    public AuthController(AccountService accountService, TokenService tokenService, AuthService authService, EmailService emailService) {
        this.accountService = accountService;
        this.tokenService = tokenService;
        this.authService = authService;
        this.emailService = emailService;
    }

    public record EmailRequest(String to, String subject, String text) {}

    // User account sign up/registration endpoint
    @PostMapping(value = "/signup", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public AccountResponseDTO createAccount(
            @RequestPart(value = "image", required = false) MultipartFile image,
            @RequestPart("account") SignupRequestDTO signupRequestDTO
    ) {
        log.info("Handling POST /auth/signup request");
        return authService.signup(signupRequestDTO, image);
    }

    // User account login endpoint
    @PostMapping("/login")
    public LoginResponseDTO loginAccount(@RequestBody LoginRequestDTO loginRequestDTO) {
        log.info("Handling POST /auth/login request");
        TokenRefreshDTO tokens = authService.login(loginRequestDTO);
        AccountResponseDTO accountResponseDto = accountService.getAccountByEmail(loginRequestDTO.email());
        Integer accountId = accountResponseDto.id();
        String accountType = accountResponseDto.type();
        String accountName = accountResponseDto.name();
        String accountImage = accountResponseDto.image();
        return new LoginResponseDTO(
            tokens.accessToken(),
            tokens.refreshToken(),
            accountId,
            accountType,
            accountName,
            accountImage
        );
    }

    @PostMapping("/refresh")
    public ResponseEntity<?> refreshToken(@RequestBody TokenRefreshDTO tokenMap) {
        log.info("Handling POST /auth/refresh request");
        String refreshToken = tokenMap.refreshToken();
        if (tokenService.validateToken(refreshToken)) {
            String email = tokenService.getEmailFromToken(refreshToken);
            AccountResponseDTO account = accountService.getAccountByEmail(email);
            TokenRefreshDTO newTokens = tokenService.generateTokens(account);
            return new ResponseEntity<>(newTokens, HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Invalid refresh token", HttpStatus.UNAUTHORIZED);
        }
    }

    @PostMapping("/sendmail")
    public String sendEmail(@RequestBody EmailRequest request) {
        emailService.sendEmail(request.to(), request.subject(), request.text());
        return "Email sent successfully!";
    }
}
