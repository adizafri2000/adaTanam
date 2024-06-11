package com.example.springbootbackend.mapper;

import com.example.springbootbackend.dto.order.OrderRequestDTO;
import com.example.springbootbackend.dto.order.OrderResponseDTO;
import com.example.springbootbackend.model.Order;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper
public interface OrderMapper {
    OrderMapper INSTANCE = Mappers.getMapper(OrderMapper.class);

    OrderResponseDTO toResponseDTO(Order order);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    Order toEntity(OrderRequestDTO orderRequestDTO);
}
