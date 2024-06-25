package com.example.springbootbackend.dto.auth;

// equivalent response is AccountResponseDTO
public record SignupRequestDTO(
        String email,
        String password,
        String name,
        String phone,
        String image,
        String bankNumber,
        String bankName,
        String type,
        Boolean isActive
) {
}
