package com.example.springbootbackend.service.auth;

import com.example.springbootbackend.dto.account.AccountResponseDTO;
import com.example.springbootbackend.dto.auth.LoginRequestDTO;
import com.example.springbootbackend.dto.auth.PasswordUpdateRequestDTO;
import com.example.springbootbackend.dto.auth.SignupRequestDTO;
import org.springframework.stereotype.Service;

@Service
public interface AuthService {
    AccountResponseDTO signup(SignupRequestDTO signupRequestDTO);
    AccountResponseDTO login(LoginRequestDTO loginRequestDTO);
    AccountResponseDTO updatePassword(String token, Integer id, PasswordUpdateRequestDTO passwordUpdateRequestDTO);
}
