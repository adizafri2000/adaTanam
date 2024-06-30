package com.example.springbootbackend.controller;

import com.example.springbootbackend.auth.TokenService;
import com.example.springbootbackend.dto.RequestErrorDTO;
import com.example.springbootbackend.dto.auth.*;
import com.example.springbootbackend.dto.account.AccountResponseDTO;
import com.example.springbootbackend.model.Account;
import com.example.springbootbackend.service.EmailService;
import com.example.springbootbackend.service.account.AccountService;
import com.example.springbootbackend.service.auth.AuthService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@Slf4j
@RequestMapping(path = "/auth")
public class AuthController {

    private final String WEB_URL = System.getenv("WEB_URL");

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

    public record EmailRequestDTO(String to, String subject, String text) {}
    public record ResendConfirmationRequestDTO(String email){}

    // User account sign up/registration endpoint
    @PostMapping(value = "/signup")
    public AccountResponseDTO createAccount(@RequestBody SignupRequestDTO signupRequestDTO) {
        log.info("Handling POST /auth/signup request");
        return authService.signup(signupRequestDTO);
    }

    @GetMapping("/confirm-account")
    public ResponseEntity<String> confirmAccount(@RequestParam("token") String token) {
        log.info("Handling GET /auth/confirm-account request with token: {}", token);
        if (!tokenService.validateConfirmationToken(token)) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid or expired token.");
        }

        String email = tokenService.getEmailFromToken(token);
        AccountResponseDTO account = accountService.getAccountByEmail(email);
        if (account == null || account.isActivated()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid request.");
        }

        if(authService.confirmAccount(email)){
            return ResponseEntity.ok("Account confirmed successfully. You can now log in.");
        }

        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred while confirming your account.");
    }

    @PostMapping("/resend-confirmation")
    public ResponseEntity<String> resendAccountConfirmation(@RequestBody ResendConfirmationRequestDTO resendConfirmationRequestDTO){
        AccountResponseDTO account = accountService.getAccountByEmail(resendConfirmationRequestDTO.email());
        if (account == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Account not found.");
        }

        if (account.isActivated()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Account is already activated.");
        }

        Account accountData = new Account();
        accountData.setEmail(account.email());
        String token = tokenService.generateConfirmationToken(accountData);
        String confirmationLink = WEB_URL + "/confirm-account?token=" + token;
        emailService.sendAccountConfirmationEmail(account.email(), account.name(), confirmationLink);

        return ResponseEntity.ok("Confirmation link has been sent to your email.");
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
    public String sendEmail(@RequestBody EmailRequestDTO request) {
        emailService.sendEmail(request.to(), request.subject(), request.text());
        return "Email sent successfully!";
    }

    @PostMapping("/forgot-password")
    public ResponseEntity<String> forgotPassword(@RequestBody PasswordResetRequestDTO passwordResetRequestDTO) {
        log.info("Handling POST /auth/forgot-password request");
        AccountResponseDTO account = accountService.getAccountByEmail(passwordResetRequestDTO.email());
        if (account == null) {
            return new ResponseEntity<>("User not found", HttpStatus.NOT_FOUND);
        }

        String token = tokenService.generateResetToken(account);
        String resetLink = WEB_URL + "/reset-password?token=" + token;

        emailService.sendPasswordResetEmail(account.email(), resetLink);

        return ResponseEntity.ok("Password reset link has been sent to your email.");
    }

    @PostMapping("/reset-password")
    public ResponseEntity<?> resetPassword(@RequestHeader("Authorization") String token, @RequestBody PasswordUpdateRequestDTO request) {
        log.info("Handling POST /auth/reset-password request");
        if (!tokenService.validateResetToken(token)) {
            RequestErrorDTO response = new RequestErrorDTO("401","Invalid token");
            return new ResponseEntity<>(response, HttpStatus.UNAUTHORIZED);
        }

        String email = tokenService.getEmailFromToken(token);
        authService.updatePassword(email, request);

        return ResponseEntity.ok("Password has been reset successfully.");
    }

}
