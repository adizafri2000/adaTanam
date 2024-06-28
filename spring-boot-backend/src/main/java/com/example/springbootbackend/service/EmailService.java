package com.example.springbootbackend.service;

import com.example.springbootbackend.dto.account.AccountResponseDTO;
import lombok.extern.slf4j.Slf4j;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class EmailService {

    private final JavaMailSender mailSender;
    private final String FROM_EMAIL = System.getenv("EMAIL_USERNAME");

    public EmailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    public void sendEmail(String to, String subject, String text) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject(subject);
        message.setText(text);
        message.setFrom(FROM_EMAIL);
        log.info("Sending test email to: {}, via: {}", to, FROM_EMAIL);

        mailSender.send(message);
    }

    public String generatePasswordResetEmailText(String resetLink) {
        return String.format(
                "Dear User,\n\n" +
                        "We have received a request to reset your password. If you did not make this request, please ignore this email.\n\n" +
                        "To reset your password, click the following link: %s\n\n" +
                        "Please do not share this link with anyone. The link expires after 1 hour.\n\n" +
                        "Best,\n" +
                        "adatanam admin",
                resetLink
        );
    }

    public void sendPasswordResetEmail(String to, String resetLink){
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject("Password Reset Request");
        message.setText(generatePasswordResetEmailText(resetLink));
        message.setFrom(FROM_EMAIL);
        log.info("Sending password reset email to: {}, via: {}", to, FROM_EMAIL);

        mailSender.send(message);
    }

    public String generateAccountConfirmationEmailText(String accountName, String confirmationLink) {
        return String.format(
                "Dear %s,\n\n" +
                        "Thank you for creating an account with us. Please confirm your account by clicking the following link: %s\n\n" +
                        "Please do not share this link with anyone. The link expires after 24 hours.\n\n" +
                        "Best,\n" +
                        "adatanam admin",
                accountName,
                confirmationLink
        );
    }

    public void sendAccountConfirmationEmail(String to, String name, String confirmationLink){
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject("Account Confirmation");
        message.setText(generateAccountConfirmationEmailText(name, confirmationLink));
        message.setFrom(FROM_EMAIL);
        log.info("Sending account confirmation email to: {}, via: {}", to, FROM_EMAIL);

        mailSender.send(message);
    }
}
