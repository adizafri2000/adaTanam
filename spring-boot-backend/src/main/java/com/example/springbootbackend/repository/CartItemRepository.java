package com.example.springbootbackend.repository;

import com.example.springbootbackend.model.CartItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.List;

@Repository
public interface CartItemRepository extends JpaRepository<CartItem, Integer>{
    Optional<CartItem> findByCartAndProduce(Integer cartId, Integer produceId);
    List<CartItem> findByCart(Integer cartId);
    List<CartItem> findByProduce(Integer produceId);
}
