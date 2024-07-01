package com.example.springbootbackend.service.auth;
import com.example.springbootbackend.dto.auth.*;
import org.springframework.web.multipart.MultipartFile;
import com.example.springbootbackend.dto.account.AccountResponseDTO;
import org.springframework.stereotype.Service;

@Service
public interface AuthService {
    public static final String WEB_URL = System.getenv("WEB_URL");
    AccountResponseDTO signup(SignupRequestDTO signupRequestDTO);
    TokenRefreshDTO login(LoginRequestDTO loginRequestDTO);
    AccountResponseDTO updatePassword(String email, PasswordUpdateRequestDTO passwordUpdateRequestDTO);
    boolean confirmAccount(String email);
}
