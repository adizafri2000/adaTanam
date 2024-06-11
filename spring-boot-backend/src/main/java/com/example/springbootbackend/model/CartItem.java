package com.example.springbootbackend.model;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.proxy.HibernateProxy;

import java.sql.Timestamp;
import java.util.Objects;

@Entity
@Table(name = "cart_item")
@IdClass(CartItemKey.class)
@Getter
@Setter
@ToString
@RequiredArgsConstructor
public class CartItem {
    @Id
//    @ManyToOne
//    @JoinColumn(name = "cart", nullable = false)
    private Integer cart;

    @Id
//    @ManyToOne
//    @JoinColumn(name = "produce", nullable = false)
    private Integer produce;

    @Column(nullable = false)
    private Integer quantity;

    private Timestamp createdAt;
    private Timestamp updatedAt;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "cart", nullable = false, insertable = false, updatable = false)
    private Cart itemCart;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "produce", nullable = false, insertable = false, updatable = false)
    private Produce itemProduce;

    @Override
    public final boolean equals(Object o) {
        if (this == o) return true;
        if (o == null) return false;
        Class<?> oEffectiveClass = o instanceof HibernateProxy ? ((HibernateProxy) o).getHibernateLazyInitializer().getPersistentClass() : o.getClass();
        Class<?> thisEffectiveClass = this instanceof HibernateProxy ? ((HibernateProxy) this).getHibernateLazyInitializer().getPersistentClass() : this.getClass();
        if (thisEffectiveClass != oEffectiveClass) return false;
        CartItem cartItem = (CartItem) o;
        return getCart() != null && Objects.equals(getCart(), cartItem.getCart())
                && getProduce() != null && Objects.equals(getProduce(), cartItem.getProduce());
    }

    @Override
    public final int hashCode() {
        return Objects.hash(cart, produce);
    }
}
