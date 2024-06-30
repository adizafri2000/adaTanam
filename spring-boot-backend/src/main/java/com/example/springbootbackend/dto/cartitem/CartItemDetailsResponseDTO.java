package com.example.springbootbackend.dto.cartitem;

import java.math.BigDecimal;

public record CartItemDetailsResponseDTO(
        Integer cartId,
        Integer accountId,
        String produceName,
        BigDecimal produceUnitPrice,
        String produceSellingUnit,
        Integer produceStore,
        Integer cartItemQuantity
) {
}
