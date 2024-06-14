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
        if (path.equals("/auth/login") || path.equals("/auth/signup") || path.equals("auth/refresh")) {
            return true;
        }

        return request.getMethod().equals("GET");
    }

//    @Override
//    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
//            throws ServletException, IOException {
//        String header = request.getHeader("Authorization");
//
//        if (header == null || !header.startsWith("Bearer ")) {
//            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
//            response.setContentType("application/json");
//            objectMapper.writeValue(response.getWriter(), new RequestErrorDTO("400", "Missing or invalid Authorization header"));
//            return;
//        }
//
//        String token = header.substring(7);
//
//        if (!tokenService.validateToken(token)) {
//            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
//            response.setContentType("application/json");
//            objectMapper.writeValue(response.getWriter(), new RequestErrorDTO("400", "Invalid token"));
//            return;
//        }
//
//        try {
//            String username = tokenService.getEmailFromToken(token);
//
//            UserDetails userDetails = userDetailsService.loadUserByUsername(username);
//
//            UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
//            authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
//
//            SecurityContextHolder.getContext().setAuthentication(authentication);
//        } catch (UsernameNotFoundException e) {
//            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
//            response.setContentType("application/json");
//            objectMapper.writeValue(response.getWriter(), new RequestErrorDTO("400", "Invalid token"));
//            return;
//        }
//
//        filterChain.doFilter(request, response);
//    }

//    @Override
//    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
//            throws ServletException, IOException {
//        try {
//            String header = request.getHeader("Authorization");
//
//            if (header == null || !header.startsWith("Bearer ")) {
//                throw new ServletException("Missing or invalid Authorization header");
//            }
//
//            filterChain.doFilter(request, response);
//        } catch (ServletException e) {
//            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
//            response.setContentType("application/json");
//
//            objectMapper.writeValue(response.getWriter(), new RequestErrorDTO("401", e.getMessage()));
//        }
//    }
@Override
protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
        throws ServletException, IOException {
    String path = request.getRequestURI();
    if (!path.equals("/auth/login") && !path.equals("/auth/signup") && !path.equals("/auth/refresh")) {
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