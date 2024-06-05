package com.example.springbootbackend.dto.payment;

import java.math.BigDecimal;
import java.sql.Timestamp;

public record PaymentRequestDTO(
        Integer orderId,
        BigDecimal totalPrice,
        Timestamp paymentTimestamp,
        String method
) {
}