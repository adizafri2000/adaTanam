package com.example.springbootbackend.model;

import jakarta.persistence.*;
import lombok.Data;

import java.math.BigDecimal;
import java.sql.Timestamp;

@Entity
@Table(name = "payment")
@Data
public class Payment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

//    @ManyToOne
//    @JoinColumn(name = "order", nullable = false)
    private Integer order;

    @Column(name = "total_price", nullable = false)
    private BigDecimal totalPrice;

    @Column(name = "payment_timestamp", nullable = false)
    private Timestamp paymentTimestamp;

    @Column(nullable = false)
    private String method;

    private Timestamp createdAt;
    private Timestamp updatedAt;
}