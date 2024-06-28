package com.example.springbootbackend.controller;

import com.example.springbootbackend.auth.TokenService;
import com.example.springbootbackend.dto.RequestErrorDTO;
import com.example.springbootbackend.dto.account.AccountResponseDTO;
import com.example.springbootbackend.dto.account.AccountRequestDTO;
import com.example.springbootbackend.dto.cart.CartResponseDTO;
import com.example.springbootbackend.service.account.AccountService;
import com.example.springbootbackend.service.cart.CartService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping(path = "/accounts")
@Slf4j
public class AccountController {

    private final AccountService accountService;
    private final TokenService tokenService;
    private final CartService cartService;

    public AccountController(AccountService accountService, TokenService tokenService, CartService cartService) {
        this.accountService = accountService;
        this.tokenService = tokenService;
        this.cartService = cartService;
    }

    @GetMapping("")
    public ResponseEntity<?> getAccounts() {
        log.info("Handling GET /accounts request");
        List<AccountResponseDTO> dtoList = accountService.getAccounts();
        Map<String, List<AccountResponseDTO>> listResponse = new HashMap<>();
        listResponse.put("accounts", dtoList);
        return new ResponseEntity<>(listResponse, HttpStatus.OK);
    }

    @GetMapping(path = "/{id}")
    public AccountResponseDTO getAccountById(@PathVariable Integer id) {
        log.info("Handling GET /accounts/{} request", id);
        return accountService.getAccountById(id);
    }

    @PutMapping(value = "/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> updateAccount(
            @PathVariable Integer id,
            @RequestPart("account") AccountRequestDTO accountRequestDTO,
            @RequestPart(value = "image", required = false) MultipartFile image,
            @RequestHeader("Authorization") String token
    ) {
        log.info("Handling PUT /accounts/{} request", id);
        if (!tokenService.validateToken(token)) {
            RequestErrorDTO response = new RequestErrorDTO("401","Invalid token");
            return new ResponseEntity<>(response, HttpStatus.UNAUTHORIZED);
        }
        return new ResponseEntity<>(accountService.updateAccount(id, accountRequestDTO, token, image), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteAccount(@PathVariable Integer id, @RequestHeader("Authorization") String token) {
        log.info("Handling DELETE /accounts/{} request", id);
        if (!tokenService.validateToken(token)) {
            RequestErrorDTO response = new RequestErrorDTO("401","Invalid token");
            return new ResponseEntity<>(response, HttpStatus.UNAUTHORIZED);
        }
        accountService.deleteAccount(id, token);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    // cart nested mappings
    @GetMapping("/{id}/carts")
    public List<CartResponseDTO> getAccountCarts(@PathVariable Integer id) {
        log.info("Handling GET /accounts/{}/carts request", id);
        return cartService.getCartByConsumer(id);
    }

    @GetMapping("/{id}/carts/active")
    public CartResponseDTO getActiveCart(@PathVariable Integer id) {
        log.info("Handling GET /accounts/{}/carts/active request", id);
        return cartService.getConsumerActiveCart(id);
    }

}
