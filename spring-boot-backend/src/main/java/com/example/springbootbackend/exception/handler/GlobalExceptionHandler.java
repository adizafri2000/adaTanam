package com.example.springbootbackend.exception.handler;

import com.example.springbootbackend.dto.RequestErrorDTO;
import com.example.springbootbackend.exception.DuplicateUniqueResourceException;
import com.example.springbootbackend.exception.InvalidCredentialsException;
import com.example.springbootbackend.exception.ResourceNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<RequestErrorDTO> handleResourceNotFoundException(ResourceNotFoundException ex) {
        RequestErrorDTO dto = new RequestErrorDTO("404", ex.getMessage());
        return new ResponseEntity<>(dto, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(DuplicateUniqueResourceException.class)
    public ResponseEntity<RequestErrorDTO> handleDuplicateUniqueResourceException(DuplicateUniqueResourceException ex) {
        RequestErrorDTO dto = new RequestErrorDTO("400", ex.getMessage());
        return new ResponseEntity<>(dto, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(InvalidCredentialsException.class)
    public ResponseEntity<RequestErrorDTO> handleInvalidCredentialsException(InvalidCredentialsException ex) {
        RequestErrorDTO dto = new RequestErrorDTO("401", ex.getMessage());
        return new ResponseEntity<>(dto, HttpStatus.UNAUTHORIZED);
    }
}
