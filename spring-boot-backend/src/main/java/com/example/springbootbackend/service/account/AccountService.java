package com.example.springbootbackend.service.account;

import com.example.springbootbackend.dto.account.AccountResponseDTO;
import com.example.springbootbackend.dto.auth.LoginRequestDTO;
import com.example.springbootbackend.dto.account.AccountRequestDTO;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

@Service
public interface AccountService {
    public final static String ACCOUNT_FOLDER_NAME = "profile-pictures";
    List<AccountResponseDTO> getAccounts();
    AccountResponseDTO getAccountById(Integer id);
    AccountResponseDTO getAccountByEmail(String email);
    AccountResponseDTO createAccount(AccountRequestDTO accountRequestDTO, MultipartFile image);
    AccountResponseDTO updateAccount(Integer id, AccountRequestDTO accountRequestDTO, String token, MultipartFile image);
    void deleteAccount(Integer id, String token);
}
