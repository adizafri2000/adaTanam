package com.example.springbootbackend.repository;

import com.example.springbootbackend.model.CartItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.example.springbootbackend.dto.cartitem.CartItemDetailsResponseDTO;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;
import java.util.List;

@Repository
public interface CartItemRepository extends JpaRepository<CartItem, Integer>{
    Optional<CartItem> findByCartAndProduce(Integer cartId, Integer produceId);
    List<CartItem> findByCart(Integer cartId);
    List<CartItem> findByProduce(Integer produceId);

    // retrieves all cart items in cart by account id, containing the necessary produce details
    @Query("select new com.example.springbootbackend.dto.cartitem.CartItemDetailsResponseDTO(" +
            "c.id, c.account, p.id, p.name, p.unitPrice, p.sellingUnit, p.store, ci.quantity, s.name) " +
            "from CartItem ci " +
            "left join Cart c on c.id = ci.cart " +
            "left join Produce p on p.id = ci.produce " +
            "left join Store s on s.id = p.store " +
            "where ci.cart = :cartId")
    List<CartItemDetailsResponseDTO> findCartItemDetailsByCartId(Integer cartId);
}
