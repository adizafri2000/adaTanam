package com.example.springbootbackend.dto.cartitem;

public record CartItemRequestDTO(
        Integer cart,
        Integer produce,
        Integer quantity,
        Integer rating,
        String review
) {
}
