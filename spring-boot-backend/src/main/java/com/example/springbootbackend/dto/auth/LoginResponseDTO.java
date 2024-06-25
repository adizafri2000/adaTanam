package com.example.springbootbackend.dto.auth;

public record LoginResponseDTO(
        String accessToken,
        String refreshToken,
        Integer accountId,
        String accountType,
        String accountName
) {
}
