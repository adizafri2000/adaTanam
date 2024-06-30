package com.example.springbootbackend.dto.cartitem;

import java.math.BigDecimal;

public record CartItemDetailsResponseDTO(
        Integer cartId,
        Integer accountId,
        Integer produceId,
        String produceName,
        BigDecimal produceUnitPrice,
        String produceSellingUnit,
        Integer produceStore,
        Integer cartItemQuantity,
        Integer storeId,
        String storeName
) {
}
