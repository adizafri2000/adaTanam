package com.example.springbootbackend.model;

import jakarta.persistence.*;
import lombok.Data;

import java.math.BigDecimal;
import java.sql.Timestamp;

@Entity
@Table(name = "produce")
@Data
public class Produce {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String type;

    @Column(nullable = false)
    private Integer stock;

    @Column(name = "unit_price", nullable = false)
    private BigDecimal unitPrice;

    @Column(name = "selling_unit", nullable = false)
    private String sellingUnit;

    private String description;
    private String status;

    @ManyToOne
    @JoinColumn(name = "store", nullable = false)
    private Store store;

    private Timestamp createdAt;
    private Timestamp updatedAt;
}
