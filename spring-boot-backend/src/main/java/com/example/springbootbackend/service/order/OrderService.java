package com.example.springbootbackend.service.order;

import com.example.springbootbackend.dto.order.OrderDetailsResponseDTO;
import com.example.springbootbackend.dto.order.OrderRequestDTO;
import com.example.springbootbackend.dto.order.OrderResponseDTO;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface OrderService {
    List<OrderResponseDTO> getOrders();
    List<OrderDetailsResponseDTO> getOrdersByAccount(Integer accountId);
    OrderResponseDTO getOrderById(Integer id);
    OrderResponseDTO createOrder(OrderRequestDTO orderRequestDTO);
    OrderResponseDTO updateOrder(Integer id, OrderRequestDTO orderRequestDTO, String token);
    void deleteOrder(Integer id, String token);
}
