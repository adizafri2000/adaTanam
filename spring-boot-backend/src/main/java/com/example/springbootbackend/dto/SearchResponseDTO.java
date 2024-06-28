package com.example.springbootbackend.dto;
import com.example.springbootbackend.dto.produce.ProduceResponseDTO;
import com.example.springbootbackend.dto.store.StoreResponseDTO;

public record SearchResponseDTO(
  List<ProduceResponseDTO> produce,
  List<StoreResponseDTO> store
){}