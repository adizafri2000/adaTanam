package com.example.springbootbackend.controller;

import com.example.springbootbackend.repository.AccountRepository;
import com.example.springbootbackend.service.AccountService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.springbootbackend.model.Account;

import java.util.logging.Logger;

@RestController
@RequestMapping("/api/accounts")
public class AccountController {

    private static final Logger log = Logger.getLogger(AccountController.class.getName());
    private final AccountService accountService;

    public AccountController(AccountService accountService) {
        this.accountService = accountService;
    }

    @GetMapping("")
    public ResponseEntity<?> getAccounts() {
        log.info("Handling GET /api/account/ request");
        return new ResponseEntity<>(accountService.getAccounts(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getAccountById(@PathVariable Integer id) {
        log.info("Handling GET /api/account/" + id + " request");
        return new ResponseEntity<>(accountService.getAccountById(id), HttpStatus.OK);
    }

    @PostMapping("")
    public ResponseEntity<?> createAccount(@RequestBody Account account) {
        log.info("Handling POST /api/account/ request");
        return new ResponseEntity<>(accountService.createAccount(account), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateAccount(@PathVariable Integer id, @RequestBody Account account) {
        log.info("Handling PUT /api/account/" + id + " request");
        return new ResponseEntity<>(accountService.updateAccount(id, account), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteAccount(@PathVariable Integer id) {
        log.info("Handling DELETE /api/account/" + id + " request");
        accountService.deleteAccount(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

}
