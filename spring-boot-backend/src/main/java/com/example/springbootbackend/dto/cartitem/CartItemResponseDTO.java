package com.example.springbootbackend.dto.cartitem;

import java.sql.Timestamp;

public record CartItemResponseDTO(
        Integer cart,
        Integer produce,
        Integer quantity,
        Timestamp createdAt,
        Timestamp updatedAt
) {
}
