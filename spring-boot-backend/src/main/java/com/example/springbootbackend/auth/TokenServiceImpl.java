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

        TokenRefreshDTO tokens = new TokenRefreshDTO(accessToken, refreshToken);
        // tokens.put("accessToken", accessToken);
        // tokens.put("refreshToken", refreshToken);
        return tokens;
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

        TokenRefreshDTO tokens = new TokenRefreshDTO(accessToken, refreshToken);
        // tokens.put("accessToken", accessToken);
        // tokens.put("refreshToken", refreshToken);
        return tokens;
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
}