package com.example.springbootbackend.dto.payment;

import java.math.BigDecimal;
import java.sql.Timestamp;

public record PaymentResponseDTO(
        Integer id,
        Integer orderId,
        BigDecimal totalPrice,
        Timestamp paymentTimestamp,
        String method,
        Timestamp createdAt,
        Timestamp updatedAt
) {
}