package com.example.springbootbackend.dto.account;

public record AccountPostDTO(
        String email,
        String passwordHash,
        String name,
        String phone,
        String bankNumber,
        String bankName,
        String type,
        Boolean isActive
) {}
