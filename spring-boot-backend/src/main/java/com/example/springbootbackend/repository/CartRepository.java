package com.example.springbootbackend.repository;

import com.example.springbootbackend.model.Cart;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.*;

@Repository
public interface CartRepository extends JpaRepository<Cart, Integer> {
    // to find specific cart via consumer ID
    List<Cart> findByAccount(Integer account);

    // find a cart where account is equal to the given account and isActive is true
    Optional<Cart> findByAccountAndIsActiveTrue(Integer account);
}
