package com.example.springbootbackend.service.cart;

import com.example.springbootbackend.dto.cart.CartRequestDTO;
import com.example.springbootbackend.dto.cart.CartResponseDTO;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface CartService {
    List<CartResponseDTO> getCarts();
    CartResponseDTO getCartById(Integer id);
    CartResponseDTO createCart(CartRequestDTO cart);
    CartResponseDTO updateCart(Integer id, CartRequestDTO cart, String token);
    void deleteCart(Integer id, String token);
}
