package com.example.springbootbackend.exception.handler;

import com.example.springbootbackend.dto.RequestErrorDTO;
import com.example.springbootbackend.exception.DuplicateUniqueResourceException;
import com.example.springbootbackend.exception.InvalidCredentialsException;
import com.example.springbootbackend.exception.ResourceNotFoundException;
import io.jsonwebtoken.ExpiredJwtException;
import jakarta.servlet.ServletException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalControllerExceptionHandler {

    /**
     * Handles requests seeking resources that are not found in the DB
     * @return 404 status with given ResourceNotFoundException message
     */
    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<RequestErrorDTO> handleResourceNotFoundException(ResourceNotFoundException ex) {
        RequestErrorDTO dto = new RequestErrorDTO(Integer.toString(HttpStatus.NOT_FOUND.value()), ex.getMessage());
        return new ResponseEntity<>(dto, HttpStatus.NOT_FOUND);
    }

    /**
     * Handles requests attempting to create resources with unique fields that already exist
     * @return 400 status with given DuplicateUniqueResourceException message
     */
    @ExceptionHandler(DuplicateUniqueResourceException.class)
    public ResponseEntity<RequestErrorDTO> handleDuplicateUniqueResourceException(DuplicateUniqueResourceException ex) {
        RequestErrorDTO dto = new RequestErrorDTO(Integer.toString(HttpStatus.BAD_REQUEST.value()), ex.getMessage());
        return new ResponseEntity<>(dto, HttpStatus.BAD_REQUEST);
    }

    /**
     * Handles requests with invalid credentials for login
     * @return a 401 Unauthorized response with given InvalidCredentialsException message
     */
    @ExceptionHandler(InvalidCredentialsException.class)
    public ResponseEntity<RequestErrorDTO> handleInvalidCredentialsException(InvalidCredentialsException ex) {
        RequestErrorDTO dto = new RequestErrorDTO(Integer.toString(HttpStatus.UNAUTHORIZED.value()), ex.getMessage());
        return new ResponseEntity<>(dto, HttpStatus.UNAUTHORIZED);
    }

    /**
     * Handles requests with insufficient permissions
     * @return a 403 Forbidden response with given AccessDeniedException message
     */
    @ExceptionHandler(AccessDeniedException.class)
    public ResponseEntity<RequestErrorDTO> handleAccessDeniedException(AccessDeniedException ex) {
        RequestErrorDTO dto = new RequestErrorDTO(Integer.toString(HttpStatus.FORBIDDEN.value()), ex.getMessage());
        return new ResponseEntity<>(dto, HttpStatus.FORBIDDEN);
    }

    /**
     * Handles requests with expired JWT tokens
     * @return a 401 Unauthorized response with "Expired token" message
     */
    @ExceptionHandler(ExpiredJwtException.class)
    public ResponseEntity<Object> handleExpiredJwtException(ExpiredJwtException ex) {
        RequestErrorDTO dto = new RequestErrorDTO(Integer.toString(HttpStatus.UNAUTHORIZED.value()), "Expired token");
        return new ResponseEntity<>(dto, HttpStatus.UNAUTHORIZED);
    }

    /**
     * Handles requests with invalid or missing Authorization headers
     * @deprecated It seems like this method will not be triggered since ServletException for filtering tokens is thrown before @ControllerAdvice takes place
     * @return a 401 Unauthorized response with given ServletException message
     */
    @ExceptionHandler(ServletException.class)
    public ResponseEntity<RequestErrorDTO> handleServletException(ServletException ex) {
        RequestErrorDTO dto = new RequestErrorDTO(Integer.toString(HttpStatus.UNAUTHORIZED.value()), ex.getMessage());
        return new ResponseEntity<>(dto, HttpStatus.UNAUTHORIZED);
    }
}
