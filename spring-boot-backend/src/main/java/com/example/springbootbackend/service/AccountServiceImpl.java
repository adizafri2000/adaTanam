package com.example.springbootbackend.service;

import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;
import com.example.springbootbackend.model.Account;
import com.example.springbootbackend.repository.AccountRepository;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.List;
import java.util.logging.Logger;

@Service
public class AccountServiceImpl implements AccountService{

    private static final Logger log = Logger.getLogger(AccountServiceImpl.class.getName());

    private final AccountRepository accountRepository;

    public AccountServiceImpl(AccountRepository accountRepository) {
        this.accountRepository = accountRepository;
    }

    @Override
    public List<Account> getAccounts() {
        return accountRepository.findAll();
    }

    @Override
    public Account getAccountById(Integer id) {
        return accountRepository.findById(id).orElse(null);
    }

    @Override
    public Account createAccount(Account account) {
        log.info("Creating account: " + account);
        if (account.getCreatedAt() == null) {
            account.setCreatedAt(new Timestamp(System.currentTimeMillis()));
        }
        if (account.getUpdatedAt() == null) {
            account.setUpdatedAt(new Timestamp(System.currentTimeMillis()));
        }
        return accountRepository.save(account);
    }

    @Override
    public Account updateAccount(Integer id, Account accountDetails) {
        Account account = accountRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Account not found with id " + id));

        log.info("Updating account with id: " + id + " to: " + accountDetails);
        account.setEmail(accountDetails.getEmail());
        account.setPasswordHash(accountDetails.getPasswordHash());
        account.setName(accountDetails.getName());
        account.setPhone(accountDetails.getPhone());
        account.setBankNumber(accountDetails.getBankNumber());
        account.setBankName(accountDetails.getBankName());
        account.setType(accountDetails.getType());
        account.setIsActive(accountDetails.getIsActive());

        return accountRepository.save(account);
    }

    @Override
    public void deleteAccount(Integer id) {
        accountRepository.deleteById(id);
    }
}
