package com.example.springbootbackend.model;

import com.example.springbootbackend.config.PointConverter;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.Fetch;
import org.hibernate.proxy.HibernateProxy;
import org.postgresql.geometric.PGpoint;

import java.sql.Timestamp;
import java.util.Objects;

@Entity
@Table(name = "store")
@Getter
@Setter
@ToString
@RequiredArgsConstructor
public class Store {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false)
    private String name;

    private double longitude;
    private double latitude;
    private String bankName;
    private String bankNumber;
    private Integer farmer;
    private Timestamp createdAt;
    private Timestamp updatedAt;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "farmer", nullable = false, insertable = false, updatable = false)
    private Account farmerAccount;

    @Override
    public final boolean equals(Object o) {
        if (this == o) return true;
        if (o == null) return false;
        Class<?> oEffectiveClass = o instanceof HibernateProxy ? ((HibernateProxy) o).getHibernateLazyInitializer().getPersistentClass() : o.getClass();
        Class<?> thisEffectiveClass = this instanceof HibernateProxy ? ((HibernateProxy) this).getHibernateLazyInitializer().getPersistentClass() : this.getClass();
        if (thisEffectiveClass != oEffectiveClass) return false;
        Store store = (Store) o;
        return getId() != null && Objects.equals(getId(), store.getId());
    }

    @Override
    public final int hashCode() {
        return this instanceof HibernateProxy ? ((HibernateProxy) this).getHibernateLazyInitializer().getPersistentClass().hashCode() : getClass().hashCode();
    }
}
