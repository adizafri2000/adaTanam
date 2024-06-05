package com.example.springbootbackend.service.payment;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.springbootbackend.dto.payment.PaymentRequestDTO;
import com.example.springbootbackend.dto.payment.PaymentResponseDTO;

@Service
public interface PaymentService {
    List<PaymentResponseDTO> getPayments();
    PaymentResponseDTO getPaymentById(Integer id);
    PaymentResponseDTO createPayment(PaymentRequestDTO payment);
    PaymentResponseDTO updatePayment(Integer id, PaymentRequestDTO payment, String token);
    void deletePayment(Integer id, String token);
}