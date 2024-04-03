package com.example.springbootbackend.exception;

public class DuplicateUniqueResourceException extends RuntimeException {
    public DuplicateUniqueResourceException(String message) {
        super(message);
    }
}