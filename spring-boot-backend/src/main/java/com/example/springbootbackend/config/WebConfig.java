package com.example.springbootbackend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.MediaType;
import org.springframework.web.servlet.config.annotation.ContentNegotiationConfigurer;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

//    @Bean
//    public WebMvcConfigurer corsConfigurer() {
//        return new WebMvcConfigurer() {
//            @Override
//            public void addCorsMappings(CorsRegistry registry) {
//                registry.addMapping("/**")
//                        .allowedOrigins("*")
//                        .allowedMethods("GET", "POST", "PUT", "DELETE", "HEAD", "OPTIONS")
//                        .allowedHeaders("*")
//                        .allowCredentials(true);
//            }
//        };
//    }

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("*")
                .allowedMethods("GET", "POST", "PUT", "DELETE", "HEAD", "OPTIONS")
                .exposedHeaders(
                        "Access-Control-Allow-Origin",
                        "Access-Control-Allow-Headers",
                        "Access-Control-Allow-Methods",
                        "Access-Control-Expose-Headers"
                );
        //.allowedHeaders("Authorization", "Origin");
    }

    public void configureContentNegotiation(ContentNegotiationConfigurer configurer) {
        configurer.favorParameter(false).
                ignoreAcceptHeader(true).
                defaultContentType(MediaType.APPLICATION_JSON);
    }
}
