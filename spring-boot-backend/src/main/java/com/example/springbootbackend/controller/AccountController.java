package com.example.springbootbackend.controller;

import com.example.springbootbackend.dto.account.AccountGetDTO;
import com.example.springbootbackend.dto.account.AccountLoginDTO;
import com.example.springbootbackend.dto.account.AccountPostDTO;
import com.example.springbootbackend.mapper.AccountMapper;
import com.example.springbootbackend.model.Account;
import com.example.springbootbackend.service.AccountService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.logging.Logger;

@RestController
@RequestMapping("/api/accounts")
public class AccountController {

    public static final String ACCOUNTS = "/api/accounts";

    private static final Logger log = Logger.getLogger(AccountController.class.getName());
    private final AccountService accountService;
    private final AccountMapper accountMapper = AccountMapper.INSTANCE;

    public AccountController(AccountService accountService) {
        this.accountService = accountService;
    }

    @GetMapping("")
    public ResponseEntity<List<AccountGetDTO>> getAccounts() {
        log.info("Handling GET /api/accounts request");
        List<AccountGetDTO> dtoList = accountService.getAccounts().stream()
                .map(accountMapper::toGetDTO)
                .toList();
        return new ResponseEntity<>(dtoList, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getAccountById(@PathVariable Integer id) {
        log.info("Handling GET /api/accounts/" + id + " request");
        Account account = accountService.getAccountById(id);
        AccountGetDTO dto = accountMapper.toGetDTO(account);
        return new ResponseEntity<>(dto, HttpStatus.OK);
    }

    // User account sign up/registration endpoint
    @PostMapping("/signup")
    public ResponseEntity<?> createAccount(@RequestBody AccountPostDTO accountPostDTO) {
        log.info("Handling POST /api/accounts/signup request");
        log.info("AccountPostDTO: " + accountPostDTO);
        Account account = accountMapper.toEntity(accountPostDTO);
        AccountGetDTO dto = accountMapper.toGetDTO(accountService.createAccount(account));
        return new ResponseEntity<>(dto, HttpStatus.CREATED);
    }


    // User account login endpoint
    @PostMapping("/login")
    public ResponseEntity<?> loginAccount(@RequestBody AccountLoginDTO accountLoginDTO) {
        log.info("Handling POST /api/accounts/login request");
        String token = accountService.loginAccount(accountLoginDTO);
        Map<String, String> response = new HashMap<>();
        response.put("token", token);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateAccount(@PathVariable Integer id, @RequestBody AccountPostDTO accountPostDTO) {
        log.info("Handling PUT /api/accounts/" + id + " request");
        Account account = accountMapper.toEntity(accountPostDTO);
        AccountGetDTO dto = accountMapper.toGetDTO(accountService.updateAccount(id, account));
        return new ResponseEntity<>(dto, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteAccount(@PathVariable Integer id) {
        log.info("Handling DELETE /api/accounts/" + id + " request");
        accountService.deleteAccount(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

}
