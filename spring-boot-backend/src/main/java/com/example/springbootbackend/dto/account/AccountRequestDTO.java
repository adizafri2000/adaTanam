package com.example.springbootbackend.dto.account;

public record AccountRequestDTO(
        String email,
        String name,
        String phone,
        String image,
        String bankNumber,
        String bankName,
        String type,
        Boolean isActive
) {}
