package com.example.springbootbackend.mapper;

import com.example.springbootbackend.dto.store.StoreRequestDTO;
import com.example.springbootbackend.dto.store.StoreResponseDTO;
import com.example.springbootbackend.model.Store;
import org.mapstruct.*;
import org.mapstruct.factory.Mappers;

@Mapper
public interface StoreMapper {
    StoreMapper INSTANCE = Mappers.getMapper(StoreMapper.class);

//    @Mapping(target = "location", expression = "java(new LocationDTO(store.getLocation().x, store.getLocation().y))")
    StoreResponseDTO toResponseDTO(Store store);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
//    @Mapping(target = "location", ignore = true)
    Store toEntity(StoreRequestDTO storeRequestDTORequestDTO);

//    @BeforeMapping
//    default void toEntityBeforeMapping(StoreRequestDTO storeRequestDTO, @MappingTarget Store store) {
//        LocationDTO locationDTO = storeRequestDTO.location();
//        store.setLocation(new PGpoint(locationDTO.x(), locationDTO.y()));
//    }
}
