package com.example.springbootbackend.model;

import jakarta.persistence.*;
import lombok.Data;
import org.springframework.data.geo.Point;

import java.sql.Timestamp;

@Entity
@Table(name = "store")
@Data
public class Store {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false)
    private String name;

    // https://houarinourreddine.medium.com/integrate-spring-boot-and-postgis-to-manage-spatial-data-272edacf2cb
    // @Convert(converter = PointConverter.class)
    @Column(columnDefinition = "POINT")
    private Point location;

    private String bankName;
    private String bankNumber;

    @OneToOne
    @JoinColumn(name = "farmer", nullable = false)
    private Account farmer;

    private Timestamp createdAt;
    private Timestamp updatedAt;
}
