package com.example.springbootbackend.controller;

import com.example.springbootbackend.auth.TokenService;
import com.example.springbootbackend.dto.RequestErrorDTO;
import com.example.springbootbackend.dto.cart.CartRequestDTO;
import com.example.springbootbackend.dto.cart.CartResponseDTO;
import com.example.springbootbackend.service.cart.CartService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/carts")
@Slf4j
public class CartController {
    private final CartService cartService;
    private final TokenService tokenService;

    public CartController(CartService cartService, TokenService tokenService) {
        this.cartService = cartService;
        this.tokenService = tokenService;
    }

    @GetMapping("")
    public List<CartResponseDTO> getAllCarts() {
        log.info("Handling GET /carts request");
        return cartService.getCarts();
    }

//    @GetMapping("")
//    public ResponseEntity<?> getAllCarts(@RequestParam(required = false) Integer userId, @RequestParam(required = false) Boolean isActive) {
//        log.info("Handling GET /carts request with consumer ID: {}, isActive: {}", userId, isActive);
//        if (userId != null) {
//            List<CartResponseDTO> carts = cartService.getCartByConsumer(userId);
//            if (isActive != null) {
//                // stream carts and filter by isActive=true
//                List<CartResponseDTO> activeCarts = carts.stream().filter(CartResponseDTO::isActive).toList();
//                return new ResponseEntity<>(activeCarts.get(0), HttpStatus.OK);
//            } else {
//                return new ResponseEntity<>(carts, HttpStatus.OK);
//            }
//        } else {
//            List<CartResponseDTO> carts = cartService.getCarts();
//            return new ResponseEntity<>(carts, HttpStatus.OK);
//        }
//    }

    @GetMapping("/{id}")
    public CartResponseDTO getCartById(@PathVariable int id) {
        log.info("Handling GET /carts/{} request", id);
        return cartService.getCartById(id);
    }

    @PostMapping("")
    public ResponseEntity<?> createCart(@RequestBody CartRequestDTO cart) {
        log.info("Handling POST /carts request");
        return new ResponseEntity<>(cartService.createCart(cart), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateCart(@PathVariable int id, @RequestBody CartRequestDTO cart, @RequestHeader("Authorization") String token) {
        log.info("Handling PUT /carts/{} request", id);
        if (!tokenService.validateToken(token)) {
            RequestErrorDTO response = new RequestErrorDTO("401","Invalid token");
            return new ResponseEntity<>(response, HttpStatus.UNAUTHORIZED);
        }
        return new ResponseEntity<>(cartService.updateCart(id, cart, token), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteCart(@PathVariable int id, @RequestHeader("Authorization") String token) {
        log.info("Handling DELETE /carts/{} request", id);
        if (!tokenService.validateToken(token)) {
            RequestErrorDTO response = new RequestErrorDTO("401","Invalid token");
            return new ResponseEntity<>(response, HttpStatus.UNAUTHORIZED);
        }
        cartService.deleteCart(id, token);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

}
