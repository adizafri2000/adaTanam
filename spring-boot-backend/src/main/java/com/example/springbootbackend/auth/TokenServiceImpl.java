package com.example.springbootbackend.auth;

import com.example.springbootbackend.dto.account.AccountResponseDTO;
import com.example.springbootbackend.dto.auth.*;
import com.example.springbootbackend.mapper.AccountMapper;
import com.example.springbootbackend.model.Account;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.SignatureException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Service
public class TokenServiceImpl implements TokenService {

    @Value("${security.jwt.secret-key}")
    private String jwtSecret;

    @Value("${security.jwt.expiration-time}")
    private int jwtExpirationInMs;

    @Value("${security.jwt.refresh-expiration-time}")
    private int jwtRefreshExpirationInMs;

    @Value("${security.jwt.password-reset-expiration-time}")
    private int jwtPasswordResetExpirationInMs;

    @Value("${security.jwt.confirmation-expiration-time}")
    private int jwtConfirmationExpirationInMs;

    @Override
    public boolean validateToken(String token) {
        try {
            if (token.startsWith("Bearer ")) {
                token = token.substring(7);
            }

            Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(token);
            return true;
        } catch (SignatureException e) {
            return false;
        }
    }

    @Override
    public TokenRefreshDTO generateTokens(Account account) {
        String accessToken = Jwts.builder()
                .setSubject(account.getEmail())
                .setIssuedAt(new Date())
                .setExpiration(new Date((new Date()).getTime() + jwtExpirationInMs))
                .signWith(SignatureAlgorithm.HS512, jwtSecret)
                .compact();

        String refreshToken = Jwts.builder()
                .setSubject(account.getEmail())
                .setIssuedAt(new Date())
                .setExpiration(new Date((new Date()).getTime() + jwtRefreshExpirationInMs)) // jwtRefreshExpirationInMs should be longer than jwtExpirationInMs
                .signWith(SignatureAlgorithm.HS512, jwtSecret)
                .compact();

        return new TokenRefreshDTO(accessToken, refreshToken);
    }

    @Override
    public TokenRefreshDTO generateTokens(AccountResponseDTO accountResponseDTO) {
        String accessToken = Jwts.builder()
                .setSubject(accountResponseDTO.email())
                .setIssuedAt(new Date())
                .setExpiration(new Date((new Date()).getTime() + jwtExpirationInMs))
                .signWith(SignatureAlgorithm.HS512, jwtSecret)
                .compact();

        String refreshToken = Jwts.builder()
                .setSubject(accountResponseDTO.email())
                .setIssuedAt(new Date())
                .setExpiration(new Date((new Date()).getTime() + jwtRefreshExpirationInMs)) // jwtRefreshExpirationInMs should be longer than jwtExpirationInMs
                .signWith(SignatureAlgorithm.HS512, jwtSecret)
                .compact();

        return new TokenRefreshDTO(accessToken, refreshToken);
    }

    @Override
    public String generateResetToken(AccountResponseDTO accountResponseDTO) {
        return Jwts.builder()
                .setSubject(accountResponseDTO.email())
                .setIssuedAt(new Date())
                .setExpiration(new Date((new Date()).getTime() + jwtPasswordResetExpirationInMs))
                .signWith(SignatureAlgorithm.HS512, jwtSecret)
                .compact();
    }

    @Override
    public boolean validateResetToken(String token) {
        try {
            Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(token);
            return true;
        } catch (Exception e) {
            return false;
        }
    }


    @Override
    public String getEmailFromToken(String token) {
        if (token.startsWith("Bearer ")) {
            token = token.substring(7);
        }

        return Jwts.parser()
                .setSigningKey(jwtSecret)
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }

    @Override
    public String generateConfirmationToken(Account account){
        return Jwts.builder()
                .setSubject(account.getEmail())
                .setIssuedAt(new Date())
                .setExpiration(new Date((new Date()).getTime() + jwtConfirmationExpirationInMs)) // 24-hour expiration
                .signWith(SignatureAlgorithm.HS512, jwtSecret)
                .compact();
    }

    @Override
    public boolean validateConfirmationToken(String token){
        try {
            Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(token);
            return true;
        } catch (Exception e) {
            return false;
        }
    }
}