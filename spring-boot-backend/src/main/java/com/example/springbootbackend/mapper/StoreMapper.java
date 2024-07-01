package com.example.springbootbackend.mapper;

import com.example.springbootbackend.dto.store.StoreRequestDTO;
import com.example.springbootbackend.dto.store.StoreResponseDTO;
import com.example.springbootbackend.model.Store;
import org.mapstruct.*;
import org.mapstruct.factory.Mappers;

@Mapper
public interface StoreMapper {
    StoreMapper INSTANCE = Mappers.getMapper(StoreMapper.class);

    StoreResponseDTO toResponseDTO(Store store);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    Store toEntity(StoreRequestDTO storeRequestDTORequestDTO);

}
