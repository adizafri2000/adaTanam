package com.example.springbootbackend.dto;

public record AccountGetDTO(
        Integer id,
        String email,
        String name,
        String phone,
        String bankNumber,
        String bankName,
        String type,
        Boolean isActive
) {}
