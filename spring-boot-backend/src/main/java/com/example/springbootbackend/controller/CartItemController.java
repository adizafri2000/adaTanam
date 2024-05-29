package com.example.springbootbackend.controller;

import com.example.springbootbackend.auth.TokenService;
import com.example.springbootbackend.dto.cartitem.CartItemRequestDTO;
import com.example.springbootbackend.dto.cartitem.CartItemResponseDTO;
import com.example.springbootbackend.service.cartitem.CartItemService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/cartitem")
@Slf4j
public class CartItemController {
    private final CartItemService cartItemService;
    private final TokenService tokenService;

    public CartItemController(CartItemService cartItemService, TokenService tokenService) {
        this.cartItemService = cartItemService;
        this.tokenService = tokenService;
    }

    @GetMapping("")
    public List<CartItemResponseDTO> getAllCartItems(){
        log.info("Handling GET /cartitem request");
        return cartItemService.getCartItems();
    }

    @PostMapping("")
    public ResponseEntity<?> createCartItem(@RequestBody CartItemRequestDTO cartItemRequestDTO) {
        log.info("Handling POST /cartitem request");
        return new ResponseEntity<>(cartItemService.createCartItem(cartItemRequestDTO), HttpStatus.CREATED);
    }

}
