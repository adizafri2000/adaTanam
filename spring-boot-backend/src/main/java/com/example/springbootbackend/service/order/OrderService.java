package com.example.springbootbackend.service;

import com.example.springbootbackend.dto.order.OrderRequestDTO;
import com.example.springbootbackend.dto.order.OrderResponseDTO;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface OrderService {
    List<OrderResponseDTO> getOrders();
    OrderResponseDTO getOrderById(Integer id);
    OrderResponseDTO createOrder(OrderRequestDTO orderRequestDTO);
    OrderResponseDTO updateOrder(Integer id, OrderRequestDTO orderRequestDTO, String token);
    void deleteOrder(Integer id, String token);
}
