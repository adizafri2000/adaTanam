package com.example.springbootbackend.dto.order;

import com.example.springbootbackend.dto.cartitem.CartItemDetailsResponseDTO;
import com.example.springbootbackend.dto.payment.PaymentResponseDTO;

import java.util.List;

public record OrderDetailsResponseDTO(OrderResponseDTO order, PaymentResponseDTO payment, List<CartItemDetailsResponseDTO> orderItems) {
}
