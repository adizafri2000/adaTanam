package com.example.springbootbackend.service.order;

import java.util.ArrayList;
import java.util.List;

import com.example.springbootbackend.dto.cartitem.CartItemDetailsResponseDTO;
import com.example.springbootbackend.dto.order.OrderDetailsResponseDTO;
import com.example.springbootbackend.dto.payment.PaymentResponseDTO;
import com.example.springbootbackend.service.cartitem.CartItemService;
import com.example.springbootbackend.service.payment.PaymentService;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;

import com.example.springbootbackend.auth.TokenService;
import com.example.springbootbackend.dto.order.OrderRequestDTO;
import com.example.springbootbackend.dto.order.OrderResponseDTO;
import com.example.springbootbackend.exception.ResourceNotFoundException;
import com.example.springbootbackend.mapper.OrderMapper;
import com.example.springbootbackend.model.Order;
import com.example.springbootbackend.repository.OrderRepository;
import com.example.springbootbackend.service.order.OrderService;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class OrderServiceImpl implements OrderService {

    private final OrderRepository orderRepository;
    private final PaymentService paymentService;
    private final TokenService tokenService;
    private final CartItemService cartItemService;
    private final OrderMapper orderMapper = OrderMapper.INSTANCE;

    public OrderServiceImpl(OrderRepository orderRepository, PaymentService paymentService, TokenService tokenService, CartItemService cartItemService) {
        this.orderRepository = orderRepository;
        this.paymentService = paymentService;
        this.tokenService = tokenService;
        this.cartItemService = cartItemService;
    }

    @Override
    public List<OrderResponseDTO> getOrders() {
        log.info("Getting all orders");
        return orderRepository.findAll().stream().map(orderMapper::toResponseDTO).toList();
    }

    @Override
    public List<OrderDetailsResponseDTO> getOrdersByAccount(Integer accountId) {
        log.info("Getting orders by account with id: {}", accountId);
        // fetch all orders
        List<OrderResponseDTO> accountOrders = orderRepository.findByAccount(accountId);
        List<OrderDetailsResponseDTO> results = new ArrayList<>();
        accountOrders.forEach(order -> {
            PaymentResponseDTO payment = paymentService.getPaymentByOrderId(order.id());
            List<CartItemDetailsResponseDTO> orderItems = cartItemService.getCartItemDetailsByCartId(order.cart()).stream()
                    .filter(item -> item.storeId().equals(order.store()))
                    .collect(Collectors.toList());
            results.add(new OrderDetailsResponseDTO(order, payment, orderItems));
        });
        return results;
    }

    @Override
    public OrderResponseDTO getOrderById(Integer id) {
        log.info("Getting order with id: {}", id);
        return orderRepository.findById(id).map(orderMapper::toResponseDTO)
                .orElseThrow(() -> new ResourceNotFoundException("Order not found with id " + id));
    }

    @Override
    public OrderResponseDTO createOrder(OrderRequestDTO orderRequestDTO) {
        log.info("Creating order: {}", orderRequestDTO);
        return orderMapper.toResponseDTO(orderRepository.save(orderMapper.toEntity(orderRequestDTO)));
    }

    @Override
    public OrderResponseDTO updateOrder(Integer id, OrderRequestDTO orderRequestDTO, String token) {
        log.info("Updating order with id: {}", id);

        Order orderToUpdate = orderRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Order not found with id " + id));

        // check if token owner is the owner of the order
        String email = tokenService.getEmailFromToken(token);
        if(!orderToUpdate.getOrderAccount().getEmail().equals(email)) {
            throw new AccessDeniedException("You do not have permission to update this produce");
        }

        orderToUpdate.setOrderTimestamp(orderRequestDTO.orderTimestamp());
        orderToUpdate.setPickup(orderRequestDTO.pickup());
        orderToUpdate.setIsCompleted(orderRequestDTO.isCompleted());
        orderToUpdate.setCompletedTimestamp(orderRequestDTO.completedTimestamp());
        orderToUpdate.setStatus(orderRequestDTO.status());

        return orderMapper.toResponseDTO(orderRepository.save(orderToUpdate));
    }

    @Override
    public void deleteOrder(Integer id, String token) {
        log.info("Deleting order with id: {}", id);

        Order orderToDelete = orderRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Order not found with id " + id));

        // check if token owner is the owner of the order
        String email = tokenService.getEmailFromToken(token);
        if(!orderToDelete.getOrderAccount().getEmail().equals(email)) {
            throw new AccessDeniedException("You do not have permission to delete this produce");
        }

        orderRepository.delete(orderToDelete);
    }
}
