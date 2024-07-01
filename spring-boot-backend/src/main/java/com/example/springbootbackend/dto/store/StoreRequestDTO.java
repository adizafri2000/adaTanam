package com.example.springbootbackend.dto.store;

import java.math.BigDecimal;

public record StoreRequestDTO(
        String name,
        Double longitude,
        Double latitude,
        String bankName,
        String bankNumber,
        BigDecimal ratingScore,
        Integer ratingCumulative,
        Integer ratingCount,
        Integer farmer
) {
}
