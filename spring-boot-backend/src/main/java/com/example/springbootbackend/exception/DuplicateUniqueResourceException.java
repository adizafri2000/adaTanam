package com.example.springbootbackend.exception;

import com.example.springbootbackend.exception.handler.GlobalControllerExceptionHandler;

/**
 * Exception thrown when a request is trying to create a resource with unique fields that already exist in the DB
 * @see GlobalControllerExceptionHandler
 */
public class DuplicateUniqueResourceException extends RuntimeException {
    public DuplicateUniqueResourceException(String message) {
        super(message);
    }
}