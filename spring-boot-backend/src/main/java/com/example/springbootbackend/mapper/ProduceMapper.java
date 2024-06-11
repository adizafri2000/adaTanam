package com.example.springbootbackend.mapper;

import com.example.springbootbackend.dto.produce.ProduceRequestDTO;
import com.example.springbootbackend.dto.produce.ProduceResponseDTO;
import com.example.springbootbackend.model.Produce;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper
public interface ProduceMapper {
    ProduceMapper INSTANCE = Mappers.getMapper(ProduceMapper.class);

    ProduceResponseDTO toResponseDTO(Produce produce);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    Produce toEntity(ProduceRequestDTO produceRequestDTO);
}
