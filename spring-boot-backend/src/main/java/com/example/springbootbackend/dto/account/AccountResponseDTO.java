package com.example.springbootbackend.dto.account;

public record AccountResponseDTO(
        Integer id,
        String email,
        String name,
        String phone,
        String bankNumber,
        String bankName,
        String image,
        String type,
        Boolean isActive,
        Boolean isActivated
) {}
