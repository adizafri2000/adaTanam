package com.example.springbootbackend.dto.auth;

public record TokenRefreshDTO(String accessToken, String refreshToken){}