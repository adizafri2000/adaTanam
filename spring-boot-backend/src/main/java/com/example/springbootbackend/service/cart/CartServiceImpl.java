package com.example.springbootbackend.service.cart;

import com.example.springbootbackend.auth.TokenService;
import com.example.springbootbackend.dto.cart.CartRequestDTO;
import com.example.springbootbackend.dto.cart.CartResponseDTO;
import com.example.springbootbackend.exception.ResourceNotFoundException;
import com.example.springbootbackend.mapper.CartMapper;
import com.example.springbootbackend.model.Cart;
import com.example.springbootbackend.repository.CartRepository;
import com.example.springbootbackend.utilities.Utils;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Slf4j
public class CartServiceImpl implements CartService{

    private final CartRepository cartRepository;
    private final TokenService tokenService;
    private final CartMapper cartMapper = CartMapper.INSTANCE;

    public CartServiceImpl(CartRepository cartRepository, TokenService tokenService) {
        this.cartRepository = cartRepository;
        this.tokenService = tokenService;
    }

    @Override
    public List<CartResponseDTO> getCarts() {
        log.info("Getting all carts");
        return cartRepository.findAll().stream().map(cartMapper::toResponseDTO).toList();
    }

    @Override
    public CartResponseDTO getCartById(Integer id) {
        log.info("Getting cart with id: {}", id);
        return cartRepository.findById(id).map(cartMapper::toResponseDTO)
                .orElseThrow(() -> new ResourceNotFoundException("Cart not found with id " + id));
    }

    @Override
    public CartResponseDTO createCart(CartRequestDTO cart) {
        log.info("Creating cart: {}", cart);
        Cart newCart = cartMapper.toEntity(cart);
        if (newCart.getCreatedAt() == null) {
            newCart.setCreatedAt(Utils.setCurrentTimestamp());
        }
        if (newCart.getUpdatedAt() == null) {
            newCart.setUpdatedAt(Utils.setCurrentTimestamp());
        }
        return cartMapper.toResponseDTO(cartRepository.save(newCart));
    }

    @Override
    public CartResponseDTO updateCart(Integer id, CartRequestDTO cart, String token) {
        log.info("Updating cart with id: {}", id);

        Cart cartToUpdate = cartRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Cart not found with id: " + id));

        // check if token owner is owner of the cart
        String email = tokenService.getEmailFromToken(token);
        if (!cartToUpdate.getCartAccount().getEmail().equals(email)) {
            throw new AccessDeniedException("You do not have permission to update this cart");
        }

        cartToUpdate.setIsActive(cart.isActive());
        return cartMapper.toResponseDTO(cartRepository.save(cartToUpdate));
    }

    @Override
    public void deleteCart(Integer id, String token) {
        log.info("Deleting cart with id: {}", id);
        Cart cartToDelete = cartRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Cart not found with id: " + id));

        // check if token owner is owner of the cart
        String email = tokenService.getEmailFromToken(token);
        if (!cartToDelete.getCartAccount().getEmail().equals(email)) {
            throw new AccessDeniedException("You do not have permission to delete this cart");
        }

        cartRepository.delete(cartToDelete);
    }
}
