package com.example.springbootbackend.auth;

import com.example.springbootbackend.model.Account;

public interface TokenService {
    boolean validateToken(String token);
    String generateToken(Account account);
    String getEmailFromToken(String token);
}