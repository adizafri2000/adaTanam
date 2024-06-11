package com.example.springbootbackend.dto.store;

public record StoreRequestDTO(
        String name,
        Double longitude,
        Double latitude,
        String bankName,
        String bankNumber,
        Integer farmer
) {
}
