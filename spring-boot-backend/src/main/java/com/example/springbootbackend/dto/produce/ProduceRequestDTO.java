package com.example.springbootbackend.dto.produce;

import java.math.BigDecimal;

public record ProduceRequestDTO(
        String name,
        String type,
        Integer stock,
        BigDecimal unitPrice,
        String sellingUnit,
        String description,
        String status,
        String image,
        BigDecimal ratingScore,
        Integer ratingCumulative,
        Integer ratingCount,
        Integer store
) {
}
