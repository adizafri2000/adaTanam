package com.example.springbootbackend.auth;

import com.example.springbootbackend.dto.account.AccountResponseDTO;
import com.example.springbootbackend.model.Account;
import com.example.springbootbackend.dto.auth.*;

import java.util.Map;

public interface TokenService {
    boolean validateToken(String token);
    TokenRefreshDTO generateTokens(Account account);
    TokenRefreshDTO generateTokens(AccountResponseDTO accountResponseDTO);
    String generateResetToken(AccountResponseDTO accountResponseDTO);
    boolean validateResetToken(String token);
    String getEmailFromToken(String token);
    String generateConfirmationToken(Account account);
    boolean validateConfirmationToken(String token);
}