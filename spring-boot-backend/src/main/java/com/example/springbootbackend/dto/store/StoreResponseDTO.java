package com.example.springbootbackend.dto.store;

import java.math.BigDecimal;
import java.sql.Timestamp;

public record StoreResponseDTO(
        Integer id,
        String name,
        Double longitude,
        Double latitude,
        String bankName,
        String bankNumber,
        BigDecimal ratingScore,
        Integer ratingCumulative,
        Integer ratingCount,
        Integer farmer,
        Timestamp createdAt,
        Timestamp updatedAt
) {}