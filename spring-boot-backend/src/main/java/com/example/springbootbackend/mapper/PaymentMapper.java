package com.example.springbootbackend.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

import com.example.springbootbackend.dto.payment.PaymentRequestDTO;
import com.example.springbootbackend.dto.payment.PaymentResponseDTO;
import com.example.springbootbackend.model.Payment;

@Mapper
public interface PaymentMapper {
    PaymentMapper INSTANCE = Mappers.getMapper(PaymentMapper.class);
    
    PaymentResponseDTO toResponseDTO(Payment payment);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    Payment toEntity(PaymentRequestDTO paymentRequestDTO);
}
