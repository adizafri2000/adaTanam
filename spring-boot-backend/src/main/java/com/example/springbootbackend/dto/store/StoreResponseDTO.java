package com.example.springbootbackend.dto.store;

import java.sql.Timestamp;

public record StoreResponseDTO(
        Integer id,
        String name,
        Double longitude,
        Double latitude,
        String bankName,
        String bankNumber,
        Integer farmer,
        Timestamp createdAt,
        Timestamp updatedAt
) {}