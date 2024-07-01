package com.example.springbootbackend.dto;

import com.example.springbootbackend.dto.produce.ProduceResponseDTO;
import com.example.springbootbackend.dto.store.StoreResponseDTO;
import java.util.List;

public record SearchResponseDTO(
  List<ProduceResponseDTO> produce,
  List<StoreResponseDTO> store
){}