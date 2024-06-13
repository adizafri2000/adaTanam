package com.example.springbootbackend.service.account;

import com.example.springbootbackend.auth.TokenService;
import com.example.springbootbackend.dto.account.AccountResponseDTO;
import com.example.springbootbackend.dto.account.AccountLoginDTO;
import com.example.springbootbackend.dto.account.AccountRequestDTO;
import com.example.springbootbackend.exception.DuplicateUniqueResourceException;
import com.example.springbootbackend.exception.InvalidCredentialsException;
import com.example.springbootbackend.exception.ResourceNotFoundException;
import com.example.springbootbackend.mapper.AccountMapper;
import com.example.springbootbackend.model.Account;
import com.example.springbootbackend.repository.AccountRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.List;
import java.util.Optional;

@Service
@Slf4j
public class AccountServiceImpl implements AccountService{

    // TODO Read https://medium.com/spring-boot/spring-boot-3-spring-security-6-jwt-authentication-authorization-98702d6313a5

    private final AccountRepository accountRepository;
    private final TokenService tokenService;
    private final BCryptPasswordEncoder passwordEncoder;
    private final AccountMapper accountMapper = AccountMapper.INSTANCE;

    public AccountServiceImpl(AccountRepository accountRepository, TokenService tokenService, BCryptPasswordEncoder passwordEncoder) {
        this.accountRepository = accountRepository;
        this.tokenService = tokenService;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public List<AccountResponseDTO> getAccounts() {
        return accountRepository.findAll().stream()
                .map(accountMapper::toResponseDTO)
                .toList();
    }

    @Override
    public AccountResponseDTO getAccountById(Integer id) {
        return accountRepository.findById(id)
                .map(accountMapper::toResponseDTO)
                .orElseThrow(() -> new ResourceNotFoundException("Account not found with id " + id));
    }

    @Override
    public AccountResponseDTO getAccountByEmail(String email) {
        return accountRepository.findByEmail(email)
                .map(accountMapper::toResponseDTO)
                .orElseThrow(() -> new ResourceNotFoundException("Account not found with email " + email));
    }

    @Override
    public AccountResponseDTO createAccount(AccountRequestDTO account) {
        log.info("Creating account: {}", account);
        Account newAccount = accountMapper.toEntity(account);
        if(accountRepository.findByEmail(newAccount.getEmail()).isPresent())
            throw new DuplicateUniqueResourceException("Account with email " + newAccount.getEmail() + " already exists");
        if (newAccount.getCreatedAt() == null) {
            newAccount.setCreatedAt(new Timestamp(System.currentTimeMillis()));
        }
        if (newAccount.getUpdatedAt() == null) {
            newAccount.setUpdatedAt(new Timestamp(System.currentTimeMillis()));
        }
        newAccount.setPasswordHash(passwordEncoder.encode(newAccount.getPasswordHash()));
        return accountMapper.toResponseDTO(accountRepository.save(newAccount));
    }

    @Override
    public AccountResponseDTO updateAccount(Integer id, AccountRequestDTO accountRequestDTO, String token) {
        Account account = accountRepository.findByEmail(accountRequestDTO.email())
                .orElseThrow(() -> new ResourceNotFoundException("Account not found with id " + id));

        String email = tokenService.getEmailFromToken(token);
        if (!account.getEmail().equals(email)) {
            throw new AccessDeniedException("You do not have permission to update this account");
        }

        log.info("Updating account with id: {} to: {}", id, accountRequestDTO);
        account.setEmail(accountRequestDTO.email());
        account.setPasswordHash(passwordEncoder.encode(accountRequestDTO.password()));
        account.setName(accountRequestDTO.name());
        account.setPhone(accountRequestDTO.phone());
        account.setBankNumber(accountRequestDTO.bankNumber());
        account.setBankName(accountRequestDTO.bankName());
        account.setType(accountRequestDTO.type());
        account.setIsActive(accountRequestDTO.isActive());

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

    @Override
    public String loginAccount(AccountLoginDTO accountLoginDTO) {
        Optional<Account> optionalAccount = accountRepository.findByEmail(accountLoginDTO.email());
        if (optionalAccount.isPresent()) {
            Account account = optionalAccount.get();
            if (passwordEncoder.matches(accountLoginDTO.password(), account.getPasswordHash())) {
                return tokenService.generateToken(account);
            }
        }
        throw new InvalidCredentialsException("Invalid email or password");
    }


}
