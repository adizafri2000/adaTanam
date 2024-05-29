package com.example.springbootbackend.dto.cart;

public record CartRequestDTO(
        Boolean isActive,
        Integer account
) {
}
