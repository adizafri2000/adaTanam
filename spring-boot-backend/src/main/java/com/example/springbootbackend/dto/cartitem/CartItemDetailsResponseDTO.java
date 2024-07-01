package com.example.springbootbackend.dto.cartitem;

import java.math.BigDecimal;

public record CartItemDetailsResponseDTO(
        Integer cartId,
        Integer accountId,
        Integer produceId,
        String produceName,
        BigDecimal produceUnitPrice,
        String produceSellingUnit,
        Integer storeId,
        Integer cartItemQuantity,
        String storeName
) {
}
