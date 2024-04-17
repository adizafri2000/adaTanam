package com.example.springbootbackend.exception;

import com.example.springbootbackend.exception.handler.GlobalControllerExceptionHandler;

/**
 * Exception thrown when a resource is not found in the DB
 * @see GlobalControllerExceptionHandler
 */
public class ResourceNotFoundException extends RuntimeException {
    public ResourceNotFoundException(String message) {
        super(message);
    }
}
