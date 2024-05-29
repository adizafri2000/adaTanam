package com.example.springbootbackend.repository;

import com.example.springbootbackend.model.CartItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CartItemRepository extends JpaRepository<CartItem, Integer>{
    Optional<CartItem> findByCartAndProduce(Integer cartId, Integer produceId);
    Optional<CartItem> findByCart(Integer cartId);
    Optional<CartItem> findByProduce(Integer produceId);
}
