package com.example.springbootbackend.service.auth;

import com.example.springbootbackend.dto.account.AccountResponseDTO;
import com.example.springbootbackend.dto.auth.*;
import com.example.springbootbackend.exception.DuplicateUniqueResourceException;
import com.example.springbootbackend.exception.InvalidCredentialsException;
import com.example.springbootbackend.mapper.AccountMapper;
import com.example.springbootbackend.model.Account;
import com.example.springbootbackend.repository.AccountRepository;
import com.example.springbootbackend.service.BlobStorageService;
import com.example.springbootbackend.service.EmailService;
import com.example.springbootbackend.service.account.AccountService;
import com.example.springbootbackend.auth.TokenService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.Optional;

@Service
@Slf4j
public class AuthServiceImpl implements AuthService {

    private final AccountRepository accountRepository;
    private final TokenService tokenService;
    private final BCryptPasswordEncoder passwordEncoder;
    private final BlobStorageService blobStorageService;
    private final EmailService emailService;
    private final AccountMapper accountMapper = AccountMapper.INSTANCE;

    public AuthServiceImpl(AccountRepository accountRepository, TokenService tokenService, BCryptPasswordEncoder passwordEncoder, BlobStorageService blobStorageService, EmailService emailService) {
        this.accountRepository = accountRepository;
        this.tokenService = tokenService;
        this.passwordEncoder = passwordEncoder;
        this.blobStorageService = blobStorageService;
        this.emailService = emailService;
    }

    @Override
    public AccountResponseDTO signup(SignupRequestDTO signupRequestDTO) {
        log.info("Creating account: {}", signupRequestDTO);
        Account newAccount = accountMapper.toEntity(signupRequestDTO);
        if (accountRepository.findByEmail(newAccount.getEmail()).isPresent()) {
            throw new DuplicateUniqueResourceException("Account with email " + newAccount.getEmail() + " already exists");
        }
        newAccount.setPasswordHash(passwordEncoder.encode(newAccount.getPasswordHash()));
        Account createdAccount = accountRepository.save(newAccount);
//        if (image != null) {
//            String imageUrl = blobStorageService.uploadImage(image, createdAccount.getId(), AccountService.ACCOUNT_FOLDER_NAME);
//            createdAccount.setImage(imageUrl);
//            createdAccount = accountRepository.save(createdAccount);
//        }
        if(createdAccount.getIsActivated() == null)
            createdAccount.setIsActivated(false);
        log.info("Account created: {}", createdAccount);
        String token = tokenService.generateConfirmationToken(createdAccount);
        String confirmationLink = WEB_URL + "/confirm-account?token=" + token;
        emailService.sendAccountConfirmationEmail(createdAccount.getEmail(), createdAccount.getName(), confirmationLink);
        return accountMapper.toResponseDTO(createdAccount);
    }

    @Override
    public TokenRefreshDTO login(LoginRequestDTO loginRequestDTO) {
        Optional<Account> optionalAccount = accountRepository.findByEmail(loginRequestDTO.email());
        if (optionalAccount.isPresent()) {
            Account account = optionalAccount.get();
            if (!account.getIsActivated())
                throw new InvalidCredentialsException("Account not activated. Please check registered email for activation link");
            if (passwordEncoder.matches(loginRequestDTO.password(), account.getPasswordHash())) {
                return tokenService.generateTokens(account);
            }
        }
        throw new InvalidCredentialsException("Invalid email or password");
    }

    @Override
    public AccountResponseDTO updatePassword(String email, PasswordUpdateRequestDTO passwordUpdateRequestDTO){
        log.info("Updating password for account with email: {}", email);
        Optional<Account> optionalAccount = accountRepository.findByEmail(email);
        if (optionalAccount.isPresent()) {
            Account account = optionalAccount.get();
            account.setPasswordHash(passwordEncoder.encode(passwordUpdateRequestDTO.newPassword()));
            accountRepository.save(account);
            return accountMapper.toResponseDTO(account);
        }
        throw new InvalidCredentialsException("Invalid email");
    }

    @Override
    public boolean confirmAccount(String email) {
        log.info("Confirming account with email: {}", email);
        Optional<Account> optionalAccount = accountRepository.findByEmail(email);
        if (optionalAccount.isPresent()) {
            Account account = optionalAccount.get();
            account.setIsActivated(true);
            accountRepository.save(account);
            return true;
        }
        return false;
    }
}
