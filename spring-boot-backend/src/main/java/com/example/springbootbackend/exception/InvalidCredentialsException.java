package com.example.springbootbackend.exception;

import com.example.springbootbackend.exception.handler.GlobalControllerExceptionHandler;
import com.example.springbootbackend.service.account.AccountServiceImpl;

/**
 * Exception thrown when the credentials provided are invalid, currently used for login credentials verification
 * @see GlobalControllerExceptionHandler
 * @see AccountServiceImpl
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
