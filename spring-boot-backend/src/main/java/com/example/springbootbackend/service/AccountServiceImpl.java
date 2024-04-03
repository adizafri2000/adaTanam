package com.example.springbootbackend.service;

import com.example.springbootbackend.dto.account.AccountLoginDTO;
import com.example.springbootbackend.exception.DuplicateUniqueResourceException;
import com.example.springbootbackend.exception.InvalidCredentialsException;
import com.example.springbootbackend.exception.ResourceNotFoundException;
import com.example.springbootbackend.model.Account;
import com.example.springbootbackend.repository.AccountRepository;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.logging.Logger;

@Service
public class AccountServiceImpl implements AccountService{

    // TODO Read https://medium.com/spring-boot/spring-boot-3-spring-security-6-jwt-authentication-authorization-98702d6313a5

    private static final Logger log = Logger.getLogger(AccountServiceImpl.class.getName());

    private final AccountRepository accountRepository;

    private final BCryptPasswordEncoder passwordEncoder;

    public AccountServiceImpl(AccountRepository accountRepository, BCryptPasswordEncoder passwordEncoder) {
        this.accountRepository = accountRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public List<Account> getAccounts() {
        return accountRepository.findAll();
    }

    @Override
    public Account getAccountById(Integer id) {
        return accountRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Account not found with id " + id));
    }

    @Override
    public Account createAccount(Account account) {
        log.info("Creating account: " + account);
        if(accountRepository.findByEmail(account.getEmail()).isPresent())
            throw new DuplicateUniqueResourceException("Account with email " + account.getEmail() + " already exists");
        if (account.getCreatedAt() == null) {
            account.setCreatedAt(new Timestamp(System.currentTimeMillis()));
        }
        if (account.getUpdatedAt() == null) {
            account.setUpdatedAt(new Timestamp(System.currentTimeMillis()));
        }
        account.setPasswordHash(passwordEncoder.encode(account.getPasswordHash()));
        return accountRepository.save(account);
    }

    @Override
    public Account updateAccount(Integer id, Account accountDetails) {
        Account account = accountRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Account not found with id " + id));

        log.info("Updating account with id: " + id + " to: " + accountDetails);
        account.setEmail(accountDetails.getEmail());
        account.setPasswordHash(passwordEncoder.encode(accountDetails.getPasswordHash()));
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

    @Override
    public String loginAccount(AccountLoginDTO accountLoginDTO) {
        Optional<Account> optionalAccount = accountRepository.findByEmail(accountLoginDTO.email());
        if (optionalAccount.isPresent()) {
            Account account = optionalAccount.get();
            if (passwordEncoder.matches(accountLoginDTO.password(), account.getPasswordHash())) {
                return generateToken(account);
            }
        }
        throw new InvalidCredentialsException("Invalid email or password");
    }

    private String generateToken(Account account) {
        int jwtExpirationInMs = 60000; // 1 minute in m/s
        String jwtSecret = "yourSecretKey"; // Replace with your own secret key

        return Jwts.builder()
                .setSubject(account.getEmail())
                .setIssuedAt(new Date())
                .setExpiration(new Date((new Date()).getTime() + jwtExpirationInMs))
                .signWith(SignatureAlgorithm.HS512, jwtSecret)
                .compact();
    }
}
