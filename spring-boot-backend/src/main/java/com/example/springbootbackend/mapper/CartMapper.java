package com.example.springbootbackend.mapper;

import com.example.springbootbackend.dto.cart.CartRequestDTO;
import com.example.springbootbackend.dto.cart.CartResponseDTO;
import com.example.springbootbackend.model.Cart;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper
public interface CartMapper {
    CartMapper INSTANCE = Mappers.getMapper(CartMapper.class);

    CartResponseDTO toResponseDTO(Cart cart);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    Cart toEntity(CartRequestDTO cartRequestDTO);

}
