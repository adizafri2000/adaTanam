package com.example.springbootbackend.model;


import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.DynamicInsert;

import java.sql.Timestamp;

@Entity
@Table(name = "account")
@Data
//@DynamicInsert
public class Account {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false)
    private String email;

    @Column(name = "password_hash", nullable = false)
    private String passwordHash;

    private String name;
    private String phone;
    private String bankNumber;
    private String bankName;

    @Column(nullable = false)
    private String type;

    @Column(name = "is_active", nullable = false)
    private Boolean isActive;

    private Timestamp createdAt;
    private Timestamp updatedAt;
}
