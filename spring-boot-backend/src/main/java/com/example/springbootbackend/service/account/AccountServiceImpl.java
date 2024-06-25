package com.example.springbootbackend.service.account;

import com.example.springbootbackend.auth.TokenService;
import com.example.springbootbackend.dto.account.AccountResponseDTO;
import com.example.springbootbackend.dto.auth.*;
import com.example.springbootbackend.dto.account.AccountRequestDTO;
import com.example.springbootbackend.exception.DuplicateUniqueResourceException;
import com.example.springbootbackend.exception.InvalidCredentialsException;
import com.example.springbootbackend.exception.ResourceNotFoundException;
import com.example.springbootbackend.mapper.AccountMapper;
import com.example.springbootbackend.model.Account;
import com.example.springbootbackend.repository.AccountRepository;
import com.example.springbootbackend.service.BlobStorageService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
@Slf4j
public class AccountServiceImpl implements AccountService{

    private final AccountRepository accountRepository;
    private final TokenService tokenService;
    private final BCryptPasswordEncoder passwordEncoder;
    private final BlobStorageService blobStorageService;
    private final AccountMapper accountMapper = AccountMapper.INSTANCE;

    public AccountServiceImpl(AccountRepository accountRepository, TokenService tokenService, BCryptPasswordEncoder passwordEncoder, BlobStorageService blobStorageService) {
        this.accountRepository = accountRepository;
        this.tokenService = tokenService;
        this.passwordEncoder = passwordEncoder;
        this.blobStorageService = blobStorageService;
    }

    @Override
    public List<AccountResponseDTO> getAccounts() {
        log.info("Getting all accounts");
        return accountRepository.findAll().stream()
                .map(accountMapper::toResponseDTO)
                .toList();
    }

    @Override
    public AccountResponseDTO getAccountById(Integer id) {
        log.info("Getting account with id: {}", id);
        return accountRepository.findById(id)
                .map(accountMapper::toResponseDTO)
                .orElseThrow(() -> new ResourceNotFoundException("Account not found with id " + id));
    }


    @Override
    public AccountResponseDTO getAccountByEmail(String email) {
        log.info("Getting account with email: {}", email);
        return accountRepository.findByEmail(email)
                .map(accountMapper::toResponseDTO)
                .orElseThrow(() -> new ResourceNotFoundException("Account not found with email " + email));
    }

    @Override
    public AccountResponseDTO createAccount(AccountRequestDTO accountRequestDTO, MultipartFile image) {
        log.info("Creating account: {}", accountRequestDTO);
        Account newAccount = accountMapper.toEntity(accountRequestDTO);
        if(accountRepository.findByEmail(newAccount.getEmail()).isPresent())
            throw new DuplicateUniqueResourceException("Account with email " + newAccount.getEmail() + " already exists");
        newAccount.setPasswordHash(passwordEncoder.encode(newAccount.getPasswordHash()));
        Account createdAccount = accountRepository.save(newAccount);
        if (image != null) {
            String imageUrl = blobStorageService.uploadImage(image, createdAccount.getId(), ACCOUNT_FOLDER_NAME);
            createdAccount.setImage(imageUrl);
            accountRepository.save(createdAccount);
        }
        return accountMapper.toResponseDTO(createdAccount);
    }

    @Override
    public AccountResponseDTO updateAccount(Integer id, AccountRequestDTO accountRequestDTO, String token, MultipartFile image) {
        Account account = accountRepository.findByEmail(accountRequestDTO.email())
                .orElseThrow(() -> new ResourceNotFoundException("Account not found with id " + id));

        String email = tokenService.getEmailFromToken(token);
        if (!account.getEmail().equals(email)) {
            throw new AccessDeniedException("You do not have permission to update this account");
        }

        log.info("Updating account with id: {} to: {}", id, accountRequestDTO);
        account.setEmail(accountRequestDTO.email());
        // account.setPasswordHash(passwordEncoder.encode(accountRequestDTO.password()));
        account.setName(accountRequestDTO.name());
        account.setPhone(accountRequestDTO.phone());
        account.setBankNumber(accountRequestDTO.bankNumber());
        account.setBankName(accountRequestDTO.bankName());
        account.setType(accountRequestDTO.type());
        account.setIsActive(accountRequestDTO.isActive());

        if (image != null) {
            log.info("Uploading image to blob storage, userId: {}, image: {}", account.getId(), image.getOriginalFilename());
            String imageUrl = blobStorageService.uploadImage(image, account.getId(), ACCOUNT_FOLDER_NAME);
            account.setImage(imageUrl);
        }
        else log.info("No image uploaded");

        return accountMapper.toResponseDTO(accountRepository.save(account));
    }

    @Override
    public void deleteAccount(Integer id, String token) {
        Account account = accountRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Account not found with id " + id));

        String email = tokenService.getEmailFromToken(token);
        if (!account.getEmail().equals(email)) {
            throw new AccessDeniedException("You do not have permission to delete this account");
        }

        accountRepository.deleteById(id);
    }
}
