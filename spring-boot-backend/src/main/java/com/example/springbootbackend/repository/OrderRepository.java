package com.example.springbootbackend.repository;

import com.example.springbootbackend.dto.order.OrderResponseDTO;
import com.example.springbootbackend.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order, Integer> {

    List<OrderResponseDTO> findByAccount(Integer account);
}
