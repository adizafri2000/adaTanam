package com.example.springbootbackend.auth;

import com.example.springbootbackend.dto.RequestErrorDTO;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.web.filter.OncePerRequestFilter;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;

public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final ObjectMapper objectMapper = new ObjectMapper();

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException {
        String path = request.getRequestURI();
        if ( path.equals("/auth/login") ||
                path.equals("/auth/signup") ||
                path.equals("/auth/refresh") ||
                path.equals("/auth/sendmail") ||
                path.equals("/auth/forgot-password") ||
                path.equals("/auth/reset-password") ||
                path.equals("/auth/resend-confirmation") ||
                path.equals("/swagger-ui")
        ) {
            return true;
        }

        return request.getMethod().equals("GET");
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        String path = request.getRequestURI();
        if (!path.equals("/auth/login") &&
                !path.equals("/auth/signup") &&
                !path.equals("/auth/refresh") &&
                !path.equals("/auth/sendmail") &&
                !path.equals("/swagger-ui") &&
                !path.equals("/auth/forgot-password") &&
                !path.equals("/auth/resend-confirmation") &&
                !path.equals("/auth/reset-password")
        ){
            String header = request.getHeader("Authorization");

            if (header == null || !header.startsWith("Bearer ")) {
                response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                response.setContentType("application/json");
                objectMapper.writeValue(response.getWriter(), new RequestErrorDTO("401", "Missing or invalid Authorization header"));
                return;
            }
        }

        filterChain.doFilter(request, response);
    }
}