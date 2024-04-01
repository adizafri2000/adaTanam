package com.example.springbootbackend.service;

import com.example.springbootbackend.dto.AccountLoginDTO;
import com.example.springbootbackend.model.Account;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface AccountService {
    List<Account> getAccounts();
    Account getAccountById(Integer id);
    Account createAccount(Account account);
    Account updateAccount(Integer id, Account account);
    void deleteAccount(Integer id);
    String loginAccount(AccountLoginDTO accountLoginDTO);
}
