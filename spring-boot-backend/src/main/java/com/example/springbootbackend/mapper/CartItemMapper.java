package com.example.springbootbackend.mapper;

import com.example.springbootbackend.dto.cartitem.CartItemRequestDTO;
import com.example.springbootbackend.dto.cartitem.CartItemResponseDTO;
import com.example.springbootbackend.model.CartItem;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper
public interface CartItemMapper {
    CartItemMapper INSTANCE = Mappers.getMapper(CartItemMapper.class);

    CartItemResponseDTO toResponseDTO(CartItem cartItem);

    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    CartItem toEntity(CartItemRequestDTO cartItemRequestDTO);
}
