package com.example.springbootbackend.dto.cart;

import java.sql.Timestamp;

public record CartResponseDTO(
        Integer id,
        Boolean isActive,
        Integer account,
        Timestamp createdAt,
        Timestamp updatedAt
) {
}
