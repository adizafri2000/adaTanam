package com.example.springbootbackend.exception;

import com.example.springbootbackend.exception.handler.GlobalControllerExceptionHandler;

/**
 * Exception thrown when the credentials provided are invalid, currently used for login credentials verification
 * @see GlobalControllerExceptionHandler
 * @see com.example.springbootbackend.service.AccountServiceImpl
 */
public class InvalidCredentialsException extends RuntimeException {
    /**
     * To handle invalid login credentials
     * @param message
     */
    public InvalidCredentialsException(String message) {
        super(message);
    }
}
