package com.example.springbootbackend.service.cartitem;


import com.example.springbootbackend.dto.cartitem.CartItemRequestDTO;
import com.example.springbootbackend.dto.cartitem.CartItemResponseDTO;
import com.example.springbootbackend.dto.cartitem.CartItemDetailsResponseDTO;
import com.example.springbootbackend.model.CartItem;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface CartItemService {
    List<CartItemResponseDTO> getCartItems();
    List<CartItemResponseDTO> getCartItemByCart(Integer cartId);
    List<CartItemResponseDTO> getCartItemByProduce(Integer produceId);
    List<CartItemDetailsResponseDTO> getCartItemDetailsByAccountId(Integer accountId);
    CartItemResponseDTO getCartItemByCartAndProduce(Integer cartId, Integer produceId);
    CartItemResponseDTO createCartItem(CartItemRequestDTO cartItemRequestDTO);
    CartItemResponseDTO updateCartItem(Integer cartId, Integer produceId, CartItemRequestDTO cartItemRequestDTO, String token);
    void deleteCartItem(Integer cartId, Integer produceId, String token);
}
