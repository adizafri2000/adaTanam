package com.example.springbootbackend.dto.auth;

/**
 * DTO to request to set new password
 * @param newPassword
 */
public record PasswordUpdateRequestDTO(String newPassword) {
}
