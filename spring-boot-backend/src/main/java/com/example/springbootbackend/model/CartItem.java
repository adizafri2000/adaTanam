package com.example.springbootbackend.model;

import jakarta.persistence.*;
import lombok.Data;

import java.sql.Timestamp;

@Entity
@Table(name = "cart_item", schema = "staging")
@IdClass(CartItemKey.class)
@Data
public class CartItem {
    @Id
    @ManyToOne
    @JoinColumn(name = "cart", nullable = false)
    private Cart cart;

    @Id
    @ManyToOne
    @JoinColumn(name = "produce", nullable = false)
    private Produce produce;

    @Column(nullable = false)
    private Integer quantity;

    private Timestamp createdAt;
    private Timestamp updatedAt;
}
