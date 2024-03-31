package com.example.springbootbackend.service;

import com.example.springbootbackend.model.Account;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface AccountService {
    public List<Account> getAccounts();
    public Account getAccountById(Integer id);
    public Account createAccount(Account account);
    public Account updateAccount(Integer id, Account account);
    public void deleteAccount(Integer id);


}
