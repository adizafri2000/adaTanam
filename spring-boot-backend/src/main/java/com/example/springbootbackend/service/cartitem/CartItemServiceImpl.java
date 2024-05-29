package com.example.springbootbackend.service.cartitem;

import com.example.springbootbackend.auth.TokenService;
import com.example.springbootbackend.dto.cartitem.CartItemRequestDTO;
import com.example.springbootbackend.dto.cartitem.CartItemResponseDTO;
import com.example.springbootbackend.exception.ResourceNotFoundException;
import com.example.springbootbackend.mapper.CartItemMapper;
import com.example.springbootbackend.model.CartItem;
import com.example.springbootbackend.repository.CartItemRepository;
import com.example.springbootbackend.utilities.Utils;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Slf4j
public class CartItemServiceImpl implements CartItemService{
    private final CartItemRepository cartItemRepository;
    private final TokenService tokenService;
    private final CartItemMapper cartItemMapper = CartItemMapper.INSTANCE;

    public CartItemServiceImpl(CartItemRepository cartItemRepository, TokenService tokenService) {
        this.cartItemRepository = cartItemRepository;
        this.tokenService = tokenService;
    }


    @Override
    public List<CartItemResponseDTO> getCartItems() {
        log.info("Getting all cart items");
        return cartItemRepository.findAll().stream().map(cartItemMapper::toResponseDTO).toList();
    }

    @Override
    public List<CartItemResponseDTO> getCartItemByCart(Integer cartId) {
        log.info("Getting cart items by cart id: {}", cartId);
        return cartItemRepository.findByCart(cartId).stream().map(cartItemMapper::toResponseDTO).toList();
    }

    @Override
    public List<CartItemResponseDTO> getCartItemByProduce(Integer produceId) {
        log.info("Getting cart items by produce id: {}", produceId);
        return cartItemRepository.findByProduce(produceId).stream().map(cartItemMapper::toResponseDTO).toList();
    }

    @Override
    public CartItemResponseDTO getCartItemByCartAndProduce(Integer cartId, Integer produceId) {
        log.info("Getting cart item by cart id: {} and produce id: {}", cartId, produceId);
        return cartItemRepository.findByCartAndProduce(cartId, produceId).map(cartItemMapper::toResponseDTO)
                .orElseThrow(() -> new ResourceNotFoundException("Cart item not found with cart id " + cartId + " and produce id " + produceId));
    }

    @Override
    public CartItemResponseDTO createCartItem(CartItemRequestDTO cartItemRequestDTO) {
        log.info("Creating cart item: {}", cartItemRequestDTO);
        CartItem newCartItem = cartItemMapper.toEntity(cartItemRequestDTO);
        if (newCartItem.getCreatedAt() == null) {
            newCartItem.setCreatedAt(Utils.setCurrentTimestamp());
        }
        if (newCartItem.getUpdatedAt() == null) {
            newCartItem.setUpdatedAt(Utils.setCurrentTimestamp());
        }
        return cartItemMapper.toResponseDTO(cartItemRepository.save(newCartItem));
    }

    @Override
    public CartItemResponseDTO updateCartItem(Integer cartId, Integer produceId, CartItemRequestDTO cartItemRequestDTO, String token) {
        log.info("Updating cart item with cart id: {} and produce id: {}", cartId, produceId);

        CartItem cartItemToUpdate = cartItemRepository.findByCartAndProduce(cartId, produceId)
                .orElseThrow(() -> new ResourceNotFoundException("Cart item not found with cart id: " + cartId + " and produce id: " + produceId));

        String email = tokenService.getEmailFromToken(token);
        if (!cartItemToUpdate.getItemCart().getCartAccount().getEmail().equals(email)) {
            throw new AccessDeniedException("You do not have permission to update this cart");
        }

        cartItemToUpdate.setQuantity(cartItemRequestDTO.quantity());
        return cartItemMapper.toResponseDTO(cartItemRepository.save(cartItemToUpdate));
    }

    @Override
    public void deleteCartItem(Integer cartId, Integer produceId, String token) {
        log.info("Deleting cart item with cart id: {} and produce id: {}", cartId, produceId);
        CartItem cartItemToDelete = cartItemRepository.findByCartAndProduce(cartId, produceId)
                .orElseThrow(() -> new ResourceNotFoundException("Cart item not found with cart id: " + cartId + " and produce id: " + produceId));

        String email = tokenService.getEmailFromToken(token);
        if (!cartItemToDelete.getItemCart().getCartAccount().getEmail().equals(email)) {
            throw new AccessDeniedException("You do not have permission to delete this cart");
        }

        cartItemRepository.delete(cartItemToDelete);
    }
}
