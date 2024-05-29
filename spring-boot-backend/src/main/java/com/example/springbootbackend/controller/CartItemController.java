package com.example.springbootbackend.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.springbootbackend.auth.TokenService;
import com.example.springbootbackend.dto.RequestErrorDTO;
import com.example.springbootbackend.dto.cartitem.CartItemRequestDTO;
import com.example.springbootbackend.service.cartitem.CartItemService;

import lombok.extern.slf4j.Slf4j;

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
    public ResponseEntity<?> getCartItems(@RequestParam(required = false) Integer cartId, @RequestParam(required = false) Integer produceId){
        log.info("Handling GET /cartitem request");
        if (cartId == null && produceId == null) {
            log.info("Getting all cart items");
            return new ResponseEntity<>(cartItemService.getCartItems(), HttpStatus.OK);
        }
        else{
            if (cartId == null) {
                log.info("Getting cart items by produce id: {}", produceId);
                return new ResponseEntity<>(cartItemService.getCartItemByProduce(produceId), HttpStatus.OK);
            }
            else if (produceId == null) {
                log.info("Getting cart items by cart id: {}", cartId);
                return new ResponseEntity<>(cartItemService.getCartItemByCart(cartId), HttpStatus.OK);
            }
            else {
                log.info("Getting cart item by cart id: {} and produce id: {}", cartId, produceId);
                return new ResponseEntity<>(cartItemService.getCartItemByCartAndProduce(cartId, produceId), HttpStatus.OK);
            }
        }
    }

    @PostMapping("")
    public ResponseEntity<?> createCartItem(@RequestBody CartItemRequestDTO cartItemRequestDTO) {
        log.info("Handling POST /cartitem request");
        return new ResponseEntity<>(cartItemService.createCartItem(cartItemRequestDTO), HttpStatus.CREATED);
    }

    @PutMapping("")
    public ResponseEntity<?> updateCartItem(@RequestParam Integer cartId, @RequestParam Integer produceId, @RequestBody CartItemRequestDTO cartItemRequestDTO, @RequestHeader("Authorization") String token) {
        log.info("Handling PUT /cartitem request");
        if (!tokenService.validateToken(token)) {
            RequestErrorDTO response = new RequestErrorDTO("401","Invalid token");
            return new ResponseEntity<>(response, HttpStatus.UNAUTHORIZED);
        }
        return new ResponseEntity<>(cartItemService.updateCartItem(cartId, produceId, cartItemRequestDTO, token), HttpStatus.OK);
    }

    @DeleteMapping("")
    public ResponseEntity<?> deleteCartItem(@RequestParam Integer cartId, @RequestParam Integer produceId, @RequestHeader("Authorization") String token) {
        log.info("Handling DELETE /cartitem request");
        if (!tokenService.validateToken(token)) {
            RequestErrorDTO response = new RequestErrorDTO("401","Invalid token");
            return new ResponseEntity<>(response, HttpStatus.UNAUTHORIZED);
        }
        cartItemService.deleteCartItem(cartId, produceId, token);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

}
