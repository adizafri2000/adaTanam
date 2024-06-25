package com.example.springbootbackend.auth;

import com.example.springbootbackend.dto.account.AccountResponseDTO;
import com.example.springbootbackend.model.Account;
import com.exampl.springbootbackend.dto.auth.*;

import java.util.Map;

public interface TokenService {
    boolean validateToken(String token);
    TokenRefreshDTO generateTokens(Account account);
    TokenRefreshDTO generateTokens(AccountResponseDTO accountResponseDTO);
    String getEmailFromToken(String token);
}