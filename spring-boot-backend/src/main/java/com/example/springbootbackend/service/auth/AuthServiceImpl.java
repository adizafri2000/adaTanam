package com.example.springbootbackend.service.auth;

import com.example.springbootbackend.dto.account.AccountResponseDTO;
import com.example.springbootbackend.dto.auth.LoginRequestDTO;
import com.example.springbootbackend.dto.auth.PasswordUpdateRequestDTO;
import com.example.springbootbackend.dto.auth.SignupRequestDTO;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class AuthServiceImpl implements AuthService{

    @Override
    public AccountResponseDTO signup(SignupRequestDTO signupRequestDTO) {
        return null;
    }

    @Override
    public AccountResponseDTO login(LoginRequestDTO loginRequestDTO) {
        return null;
    }

    @Override
    public AccountResponseDTO updatePassword(String token, Integer id, PasswordUpdateRequestDTO passwordUpdateRequestDTO) {
        return null;
    }
}
