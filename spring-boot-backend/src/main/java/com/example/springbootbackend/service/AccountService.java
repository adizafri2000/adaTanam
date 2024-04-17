package com.example.springbootbackend.service;

import com.example.springbootbackend.dto.account.AccountLoginDTO;
import com.example.springbootbackend.model.Account;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface AccountService {
    List<Account> getAccounts();
    Account getAccountById(Integer id);
    Account createAccount(Account account);
    Account updateAccount(Integer id, Account account, String token);
    void deleteAccount(Integer id, String token);
    String loginAccount(AccountLoginDTO accountLoginDTO);
}
