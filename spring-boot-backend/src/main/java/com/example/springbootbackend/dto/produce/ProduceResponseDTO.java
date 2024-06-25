package com.example.springbootbackend.dto.produce;

import java.math.BigDecimal;
import java.sql.Timestamp;

public record ProduceResponseDTO(
        Integer id,
        String name,
        String type,
        Integer stock,
        BigDecimal unitPrice,
        String sellingUnit,
        String description,
        String status,
        String image,
        Integer store,
        Timestamp createdAt,
        Timestamp updatedAt
) {
}
