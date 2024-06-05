package com.example.springbootbackend.service.payment;

import java.util.List;

import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;

import com.example.springbootbackend.auth.TokenService;
import com.example.springbootbackend.dto.payment.PaymentRequestDTO;
import com.example.springbootbackend.dto.payment.PaymentResponseDTO;
import com.example.springbootbackend.exception.ResourceNotFoundException;
import com.example.springbootbackend.mapper.PaymentMapper;
import com.example.springbootbackend.model.Payment;
import com.example.springbootbackend.repository.PaymentRepository;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class PaymentServiceImpl implements PaymentService{
    private final PaymentRepository paymentRepository;
    private final TokenService tokenService;
    private final PaymentMapper paymentMapper = PaymentMapper.INSTANCE;

    public PaymentServiceImpl(PaymentRepository paymentRepository, TokenService tokenService) {
        this.paymentRepository = paymentRepository;
        this.tokenService = tokenService;
    }

    @Override
    public List<PaymentResponseDTO> getPayments() {
        log.info("Getting all payments");
        return paymentRepository.findAll().stream().map(paymentMapper::toResponseDTO).toList();
    }

    @Override
    public PaymentResponseDTO getPaymentById(Integer id) {
        log.info("Getting payment with id: {}", id);
        return paymentRepository.findById(id).map(paymentMapper::toResponseDTO)
                .orElseThrow(() -> new ResourceNotFoundException("Payment not found with id " + id));
    }

    @Override
    public PaymentResponseDTO createPayment(PaymentRequestDTO payment) {
        log.info("Creating payment: {}", payment);
        Payment newPayment = paymentMapper.toEntity(payment);
        return paymentMapper.toResponseDTO(paymentRepository.save(newPayment));
    }

    @Override
    public PaymentResponseDTO updatePayment(Integer id, PaymentRequestDTO payment, String token) {
        log.info("Updating payment with id: {}", id);

        Payment paymentToUpdate = paymentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Payment not found with id: " + id));

        // check if token owner is owner of the payment
        String email = tokenService.getEmailFromToken(token);
        if (!paymentToUpdate.getPaymentOrder().getOrderAccount().getEmail().equals(email)) {
            throw new AccessDeniedException("You are not allowed to update this payment");
        }

        paymentToUpdate.setTotalPrice(payment.totalPrice());
        paymentToUpdate.setPaymentTimestamp(payment.paymentTimestamp());
        paymentToUpdate.setMethod(payment.method());

        return paymentMapper.toResponseDTO(paymentRepository.save(paymentToUpdate));
    }

    @Override
    public void deletePayment(Integer id, String token) {
        log.info("Deleting payment with id: {}", id);

        Payment paymentToDelete = paymentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Payment not found with id: " + id));

        // check if token owner is owner of the payment
        String email = tokenService.getEmailFromToken(token);
        if (!paymentToDelete.getPaymentOrder().getOrderAccount().getEmail().equals(email)) {
            throw new AccessDeniedException("You are not allowed to update this payment");
        }

        paymentRepository.delete(paymentToDelete);
    }
}
