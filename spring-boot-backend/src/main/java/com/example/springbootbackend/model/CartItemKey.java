package com.example.springbootbackend.model;

import java.io.Serializable;
import java.util.Objects;

public class CartItemKey implements Serializable {
    private Integer cart;
    private Integer produce;

    // getters, setters, hashCode, and equals methods

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        CartItemKey that = (CartItemKey) o;
        return Objects.equals(cart, that.cart) &&
                Objects.equals(produce, that.produce);
    }

    @Override
    public int hashCode() {
        return Objects.hash(cart, produce);
    }
}