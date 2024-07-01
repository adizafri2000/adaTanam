package com.example.springbootbackend.dto.auth;

/**
 * DTO to request for a password reset action for the account with the given email
 * @param email
 */
public record PasswordResetRequestDTO(String email) {
}
