package com.example.springbootbackend.service.produce;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.springbootbackend.dto.produce.ProduceRequestDTO;
import com.example.springbootbackend.dto.produce.ProduceResponseDTO;

@Service
public interface ProduceService {
    List<ProduceResponseDTO> getProduces();
    List<ProduceResponseDTO> getProduceByStore(Integer storeId);
    ProduceResponseDTO getProduceById(Integer id);
    ProduceResponseDTO createProduce(ProduceRequestDTO produce);
    ProduceResponseDTO updateProduce(Integer id, ProduceRequestDTO produce, String token);
    void deleteProduce(Integer id, String token);
}
