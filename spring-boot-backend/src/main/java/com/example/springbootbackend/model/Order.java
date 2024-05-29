package com.example.springbootbackend.model;

import jakarta.persistence.*;

import java.sql.Timestamp;

@Entity
@Table(name = "order")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

//    @ManyToOne
//    @JoinColumn(name = "account", nullable = false)
    private Integer account;

//    @ManyToOne
//    @JoinColumn(name = "store", nullable = false)
    private Integer store;

//    @OneToOne
//    @JoinColumn(name = "cart", nullable = false)
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

    private Timestamp createdAt;
    private Timestamp updatedAt;
}
