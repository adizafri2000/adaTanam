package com.example.springbootbackend.service.account;

import com.example.springbootbackend.dto.account.AccountResponseDTO;
import com.example.springbootbackend.dto.account.AccountLoginDTO;
import com.example.springbootbackend.dto.account.AccountRequestDTO;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface AccountService {
    List<AccountResponseDTO> getAccounts();
    AccountResponseDTO getAccountById(Integer id);
    AccountResponseDTO createAccount(AccountRequestDTO accountRequestDTO);
    AccountResponseDTO updateAccount(Integer id, AccountRequestDTO accountRequestDTO, String token);
    void deleteAccount(Integer id, String token);
    String loginAccount(AccountLoginDTO accountLoginDTO);
}
