package com.example.springbootbackend.auth;

import com.example.springbootbackend.dto.account.AccountResponseDTO;
import com.example.springbootbackend.model.Account;

import java.util.Map;

public interface TokenService {
    boolean validateToken(String token);
    Map<String, String> generateTokens(Account account);
    Map<String, String> generateTokens(AccountResponseDTO accountResponseDTO);
    String getEmailFromToken(String token);
}