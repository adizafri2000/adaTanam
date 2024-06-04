package com.example.springbootbackend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;

import java.sql.Timestamp;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Entity
@Table(name = "order")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private Integer account;

    private Integer store;

    private Integer cart;

    @Column(name = "order_timestamp", nullable = false)
    private Timestamp orderTimestamp;

    @Column(nullable = false)
    private Timestamp pickup;

    @Column(name = "is_completed", nullable = false)
    private Boolean isCompleted;

    @Column(name = "completed_timestamp")
    private Timestamp completedTimestamp;

    @Column(nullable = false)
    private String status;

    private Integer rating;
    private String review;

    @Column(name = "created_at", insertable = false, updatable = false)
    private Timestamp createdAt;

    @Column(name = "updated_at", insertable = false, updatable = false)
    private Timestamp updatedAt;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "account", nullable = false, insertable = false, updatable = false)
    private Account orderAccount;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "store", nullable = false, insertable = false, updatable = false)
    private Store orderStore;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "cart", nullable = false, insertable = false, updatable = false)
    private Cart orderCart;
}
